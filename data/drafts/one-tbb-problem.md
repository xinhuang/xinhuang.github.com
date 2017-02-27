# One TBB Problem

On a 8-core machine, TBB will create 7 threads for its internal thread pool: the 8th thread comes
when you call "task_group::wait_for_all()".

When your thread which kicks off the TBB thread pool using an alternative way to wait for all tasks
to finish, waiting for an external event which be fired after all tasked executed for example, will
block entire application on a 1-core machine, or when you set the thread count to 1.
