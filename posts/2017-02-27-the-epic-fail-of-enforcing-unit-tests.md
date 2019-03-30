title = "The Epic Fail of Enforcing Unit Tests"
tags = ["unit test"]
layout = "post"
---

_The DIRECT TV "Get Rid Of Cable" commercial is a very interesting commercial. If you haven't watch it yet, you can watch the full commercial [here]. It starts by a simple thing, then it leads to complete a different story "**convincingly**" and "**reasonably**"._

Here is what will happen when your developers are forced to reach 100% test coverage:

> When developers are forced to write unit tests, they write shit tests which test nothing.

> When people write shit tests, their tests depend on the implementation.

> When the tests depend on the implementation, production code is difficult to change.

> When production code is difficult to change and you change it, you break tests.

> When you break tests, you fix tests.

> When you find the tests are shit tests, you want to delete them.

> If you delete tests, test coverage drops.

> If test coverage drops, everyone is blaming you.

> If you cannot delete broken shit tests and have to fix them, you get pissed off.

> Don't get pissed off, teach people why and how to write tests from the beginning.
>
> And most importantly, don't force people to write unit tests.

You would say: **That is not true. By forcing people writing tests to reach test coverage of N%, (N is usually around 80 hopefully) they will carefully design their code so that it is unit-testable/testable.**

Once I had the same belief, until I came across a code snippet looked like below:

```cs
[TestMethod]
public void DrawGauge_Test()
{
	using (ShimsContext.Create())
	{
        var privateTestObj = SetupTestObject();
        var e = new PaintEventArgs(g, clipRect);

        privateTestObj.SetField("m_pDomainIconIsSmall", BmpIconSmall)
        DrawGauge();
    }
    // If no exception, everything is OK
}
```

Let me explain:

1. `privateTestObj` is the SUT (System Under Test).
2. `privateTestObj` is inherited from a type provided by the SDK. It overrides several methods, and these methods are used only by the `DrawGauge()`.
3. By calling `DrawGauge()` in the test, the override methods are considered "__covered__".

This test brings no value, but only maintenance burden. For a better design, the code should first setting up appropriate condition,  calling the override methods, and asserting correct values are returned (or side effect happened). Calling the `DrawGauge()` method and assert there is no exception is like cheating. The reason I was tripped over by the test is that I renamed the variable name accessed using reflection, but not because it actually found anything wrong.

Before your developers are ready, please don't force them to write tests aiming for N% test coverage. Unless they are willing to write tests - usually that is the time stakeholders start to ask questions like "Do we really have to write tests now? Can we do it later? Maybe tomorrow?" (Teach your stakeholders, too!)

For the God's sake, don't force people to write unit tests.

[here]: https://www.youtube.com/watch?v=NZ80SVOHKoo
