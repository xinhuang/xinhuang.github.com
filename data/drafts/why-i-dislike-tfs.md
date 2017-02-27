# Why I Dislike TFS: Team Foundation Server

## Branching

B is branched from branch A, C is also branched from branch A. You can have B merge to A, C merge to A.
B to C? They are not considered as in a branching relationship so that TFS will do a baseless merge for you.

And what's worse: you will see tons of files are going to be changed which supposed not to be - they are not
changed in branch B or C, but just because they are different. (If B and C are created at different version)

## How Others Say?
[Why I Dislike TFS - Team Foundation Server](https://www.altamiracorp.com/blog/employee-posts/why-i-dislike-tfs---team-found)
[TFS is destroying your development](https://news.ycombinator.com/item?id=2984091)
[TFS is destroying your development capacity](http://www.reddit.com/r/programming/comments/kc5di/tfs_is_destroying_your_development_capacity/)
[TFS Upgrade! - The Daily WTF](https://what.thedailywtf.com/t/tfs-upgrade/3661)
[TFS, utter shit](http://linsux.org/index.php?/topic/4905-tfs-utter-shit/)
