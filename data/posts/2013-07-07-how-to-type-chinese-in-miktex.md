"title": "How to type Chinese in MiKTex"
"tags": ["LaTeX", "HowTo"]
"layout": "post"
---

After install MiKTeX on Windows, and play around with some examples, you will
recognize that the Chinese is not showing up. To fix this problem, you will
need:

Install Asian language support
---

1. Open _Settings (Admin)_

2. Select _Package_ tab

3. In _MiKTeX Packages_, under _Language Support_, check _arphic, cjk, cjk-fonts, yi4latex_.

4. Hit OK/Apply, wait for download to complete.

Enable new font
---

1. Start _Command Prompt_ as administrator

2. Run command `initexmf -u`

3. Run command `initexmf --edit-config-file updmap`, then type in following
commands in poped up editor. (Don't forget to save.)

```tex
Map cwmu.map
Map cwku.map
Map cwfsu.map
Map cwhbu.map
Map cwyu.map
```

4. Run command `initexmf --mkmaps`

Choose font in document
---
Try:

```tex
\documentclass{article}
\usepackage{CJKutf8}
\begin{document}

\begin{CJK}{UTF8}{gkai}
这是一个楷体中文测试，处理简体字。
\end{CJK}

\begin{CJK}{UTF8}{gbsn}
这是一个宋体中文测试，处理简体字。
\end{CJK}

\begin{CJK}{UTF8}{bkai}
這是一個big5編碼的楷體中文測試，處理繁體文字。
\end{CJK}
```

Reference
---
[Miktex 2.9 + Texmaker 中文显示][1]

[1]: http://my.oschina.net/zenologo/blog/60160
