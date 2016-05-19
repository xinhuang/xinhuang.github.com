"title": "Test Daemon For Nose In Python"
"description": "A daemon to run your unit tests automatically after they are modified."
"tags": ["Python"]
---

Last week we had a great night with Tim Ottinger, playing with Python to analyze commit history.

One thing impressed me is Tim's Python develop environment. His tests are running automatically after a change. I didn't caught up how he made it work, and cannot find a apropiate key word to google. So here is my own. :P

The basic idea is quite simple: Use nose API to re-run tests every time a source change is detected.

	while True
	    while sourceChanged(dirs):
	        time.sleep(1)
	    nose.run()

Only thing needs special attention is to isolate test modules by provide option `--with-isolation`, so nose will reload them before each `nose.run`.

{% gist 7280997 %}

There could be more enhancement:

1. Not only monitor \*.py files, but all files. Configuration files can also have an impact on test result.

2. Ignore version control files, because these folders are always filled by tones of files.

---

Update:

There is a python lib [watchdog](https://github.com/gorakhargosh/watchdog) that can be used to monitor file changes. Try it!
