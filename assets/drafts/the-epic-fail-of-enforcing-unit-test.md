# The Epic Fail of Enforcing Unit Test

The DIRECT TV "Get Rid Of Cable" commercial is a very interesting commercial.
If you haven't watch it yet, you can watch the full commercial [here].
It starts by a simple thing, then it suddenly leads to complete a different
story "reasonably".

I follow the way "Get Rid Of Cable" commercial, but you can see the story behind:

> When you enforcing people to write unit tests, they write sh*t tests which
test nothing.

> When people write sh*t tests, their tests depend on the implementation.

> When the tests depend on the implementation, production code is difficult to change.

> When production code is difficult to change and you change it, you break tests.

> When you break tests in a test-enforcing culture, you fix tests.

> When you find the tests are shit tests which test nothing, you want to delete them.

> But you cannot delete tests in a test-enforcing culture, you get pissed off.

> Don't get pissed off, teach people why and how to write tests from the beginning.

I am working on a large-scale legacy software. Recently I am moving on to a
internal team involves a lot of refactoring, which in general is to separate business
logic from UI logic so we can move it onto the Web.

In the meeting, people are saying that we should add unit tests to the business logic
that we separated.

[here]: https://www.youtube.com/watch?v=NZ80SVOHKoo
