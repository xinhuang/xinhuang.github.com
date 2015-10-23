---
layout: post
title: "Visual Leak Detector Stack Overflow And Thread Local Storage"
description: ""
category: Debug
tags: [Windows, Debug]
---
{% include JB/setup %}

## In General

In Windows, Thread Local Storage (TLS) by default has 64 slots. Later it is expand
to 1024 more slots. These expansion slots are created on demand when TLS APIs
`TlsAlloc/TlsFree/TlsGetValue/TlsSetValue` are invoked. The expansion is done by
calling Window API `RtlAllocateHeap`. Because Visual Leak Detector (VLD) hooked
`RtlAllocatedHeap` to trace memory allocation, the expansion will be redirect to VLD first.

TLS expansion will be done only for current thread. So when a newly created thread
tries to access TLS, it will trigger an expansion. And if the expansion is triggered
by VLD when it tries to trace allocation, there will be a infinite loop.

---

## Analysis

Today I meet a crash with call stack like below. It appears to be somehow VLD
enters an infinite loop when calling `Visual LeakDetector::getTls`. What's more interesting is that
VLD has been enabled in our product for a long time, but this crash is repeatable.

The call stack looks like this:
```
...
6dc9 0759f314 09ddbfcc 00000042 0a16b870 09defbd0 KERNELBASE!TlsSetValue+0x4f
6dca 0759f360 09ddc1a3 09defbd0 00490000 0759f38c vld!VisualLeakDetector::getTls+0xfc [c:\build\vld\v24c\src\vld.cpp @ 1075]
6dcb 0759f370 09dda74b 0baa5930 00000008 0759f69c vld!VisualLeakDetector::enabled+0x23 [c:\build\vld\v24c\src\vld.cpp @ 982]
6dcc 0759f38c 75c445cf 00490000 00000008 00001000 vld!VisualLeakDetector::_HeapAlloc+0x2b [c:\build\vld\v24c\src\vld_hooks.cpp @ 1617]
6dcd 0759f3a8 09ddbfcc 00000042 0a16b870 09defbd0 KERNELBASE!TlsSetValue+0x4f
6dce 0759f3f4 09ddc1a3 09defbd0 05480fe8 0759f420 vld!VisualLeakDetector::getTls+0xfc [c:\build\vld\v24c\src\vld.cpp @ 1075]
6dcf 0759f404 09dda74b 05480fd0 0000004c 0759f45c vld!VisualLeakDetector::enabled+0x23 [c:\build\vld\v24c\src\vld.cpp @ 982]
6dd0 0759f420 7614ea43 00490000 00000000 00000018 vld!VisualLeakDetector::_HeapAlloc+0x2b [c:\build\vld\v24c\src\vld_hooks.cpp @ 1617]
6dd1 0759f434 7614ea5f 762466bc 00000018 0759f450 ole32!CRetailMalloc_Alloc+0x16 [d:\w7rtm\com\ole32\com\class\memapi.cxx @ 641]
...
6dec 0759fde0 77419882 0546b610 718c8e2a 00000000 kernel32!BaseThreadInitThunk+0xe
6ded 0759fe20 77419855 7612d854 0546b610 00000000 ntdll!__RtlUserThreadStart+0x70
6dee 0759fe38 00000000 7612d854 0546b610 00000000 ntdll!_RtlUserThreadStart+0x1b
```

When a thread starts and it tries to allocate memory, VLD kicks in to trace memory
allocation. Inside VLD it record internal state in a TLS slot. When VLD tries to
initialize the TLS slot, Windows API TlsSetValue tries to allocate more memory,
and in return goes back to VLD memory tracing. Thus the loop closes.

But why `TlsSetValue` will allocate memory? Take a look at the assembly code: (uninteresting details are omited)

```
KERNELBASE!TlsSetValue:
// BOOL WINAPI TlsSetValue(_In_ DWORD dwTlsIndex, _In_opt_ LPVOID lpTlsValue)
...
75c44585 56              push    esi
75c44586 648b3518000000  mov     esi,dword ptr fs:[18h]
// ESI points to Thread Environment Block (TEB)
75c4458d 57              push    edi
75c4458e 8b7d08          mov     edi,dword ptr [ebp+8]
75c44591 83ff40          cmp     edi,40h
75c44594 7260            jb      KERNELBASE!TlsSetValue+0x76 (75c445f6)  Branch

if (slot >= 0x40) {

  KERNELBASE!TlsSetValue+0x16:
  75c44596 83ef40          sub     edi,40h
  75c44599 81ff00040000    cmp     edi,400h
  75c4459f 734e            jae     KERNELBASE!TlsSetValue+0x6f (75c445ef)  Branch

  // if (dwTlsIndex < 0x440) {

    KERNELBASE!TlsSetValue+0x21:
    75c445a1 8b86940f0000    mov     eax,dword ptr [esi+0F94h]
    75c445a7 85c0            test    eax,eax
    75c445a9 753c            jne     KERNELBASE!TlsSetValue+0x67 (75c445e7)  Branch

      KERNELBASE!TlsSetValue+0x2b:
      75c445ab e88126ffff      call    KERNELBASE!KernelBaseGetGlobalData (75c36c31)
      75c445b0 8b402c          mov     eax,dword ptr [eax+2Ch]
      75c445b3 648b0d18000000  mov     ecx,dword ptr fs:[18h]
      75c445ba 6800100000      push    1000h
      75c445bf 83c808          or      eax,8
      75c445c2 50              push    eax
      75c445c3 8b4130          mov     eax,dword ptr [ecx+30h]
      75c445c6 ff7018          push    dword ptr [eax+18h]
      75c445c9 ff151810c375    call    dword ptr [KERNELBASE!_imp__RtlAllocateHeap (75c31018)]
      75c445cf 85c0            test    eax,eax
      75c445d1 750e            jne     KERNELBASE!TlsSetValue+0x61 (75c445e1)  Branch
      ...
      KERNELBASE!TlsSetValue+0x61:
      75c445e1 8986940f0000    mov     dword ptr [esi+0F94h],eax

      // if (pTeb->TlsExpansionSlots == NULL)
      //   pTeb->TlsExpansionSlots = RtlAllocateHeap(...)

      KERNELBASE!TlsSetValue+0x67:
      75c445e7 8b4d0c          mov     ecx,dword ptr [ebp+0Ch]
      75c445ea 890cb8          mov     dword ptr [eax+edi*4],ecx
      75c445ed eb11            jmp     KERNELBASE!TlsSetValue+0x80 (75c44600)  Branch

      // Set value to TLS slot
    }
  }  else { // ERROR if (dwTlsIndex >= 0x440) }
} // if (dwTlsIndex >= 0x40)
```

From the disassembled code we can found that the expansion occurs when passed in
a TLS slot >= 0x40. But since VLD will enter infinite loop when it's using a TLS
slot >= 64, why this stack overflow has never been observed before?

This question has puzzled me for quite some time: the expansion is already done
in `TlsAlloc`, why memory allocation is still needed? Until I notice that the expansion
is only applied to a **Thread** Environment Block, which means for newly created
thread, it will expand its own TLS at the first-time usage.

That's when the expansion requires memory allocation: VLD gets a TLS slot index >= 64
and captures the first memory allocation in a new thread.

## Reproduce

After above analysis, the root cause if almost clear. Next thing to do is how to
reproduce this issue.

To increase TLS slot number, simply calling `TlsAlloc` in a loop will do the trick.

Another thing required to reproduce this issue is make sure VLD gets a TLS slot >= 64.
To achieve this, first increase TLS slot number, then load enable VLD. After VLD is
turned on, allocate memory in a new thread:

_Minimum reproduce_

```
#include <windows.h>
#include <thread>
#include <chrono>
#include <memory>

int main(int argc, wchar_t *argv[]) {
  for (int i = 0; i < 0x40; ++i)
    TlsAlloc();

  HMODULE h_vld = LoadLibraryA("vld.dll");
  typedef void(*vld_enable_t)(void);
  auto vld_enable = (vld_enable_t)::GetProcAddress(h_vld, "VLDGlobalEnable");
  vld_enable();
  std::thread([]() {std::make_shared<int>(); }).join();
  return 0;
}

## References

Thanks Ken Johnson, his post of [Thread Local Storage, part 2: Explicit TLS] shed lights
when I am wondering why this issue happens when TLS expansion is checked inside each API.

I submit an bug for VLD for [this issue].

```

[TLS on MSDN]: https://msdn.microsoft.com/en-us/library/ms686749.aspx
[Thread Local Storage, part 2: Explicit TLS]: http://www.nynaeve.net/?p=181
[this issue]: https://vld.codeplex.com/workitem/10590
