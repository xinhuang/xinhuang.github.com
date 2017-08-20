title = "Terminal Tips & Tricks"
layout = "page"
---

*   **The `<HOME>` and `<END>` key in a macOS terminal:**

    `<Control>-a`: Go to line beginning

    `<Control>-e`: Go to line **E**nding

    _[Here is why "E" stands for **E**nding but "A" for **beginning**.](https://unix.stackexchange.com/questions/179671/why-is-the-shortcut-ctrl-a-jumping-to-the-start-of-a-line-in-the-terminal)_

*   **When you forget to add `sudo`:**

    `sudo !!`: `!!<Enter>` will yield previous command executed in prompt.

    Similiarly, `!-1` is the same as `!!`, `!-2` is the last but 2 command executed, `!-N` is the last but N command executed.

    _`minus N` is the array index from the end, starting from -1. Just like in Ruby & Python._

*   **Viewing log file:**

    `less +F path/to/file.log`: Tail the log file and keep updating. `<Ctrl>-c` to exit. `F` (capital F) to scroll to bottom and keep updating. _[Ref](https://linuxcommando.blogspot.ca/2007/11/log-watching-using-tail-or-less.html)_
