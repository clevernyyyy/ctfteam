## Back In Time writeup

#### Challenge Statement

http://188.130.155.66:1111/qwBJmMVbOyNNWXMJoXeuOyyVvJlzQkgY/

#### Description

This link led to a static website with a background image.

#### Solution

The challenge title again led me to a typical CTF-style challenge. I believe that it was either telling me to:


1. Expire cookies, sessions, etc... or...
2. Check for past commit information leaked


Clearly this static page didn't have user management so I tried to find a `.git` repo right away. For those who don't know, this is a possible information leakage from a git repo. Sure enough, we have access to a `.git` repo at:


http://188.130.155.66:1111/qwBJmMVbOyNNWXMJoXeuOyyVvJlzQkgY/.git


Morgan and I saw of ton of commits with the message `NOT A FLAG`. We noticed the commits added and removed an `index.php` file over and over. Morgan ended up grepping the logs for `Inno` and found the flag that way.

```
$ git log -p | grep -C 5 'Inno'
diff --git a/index.php b/index.php
index daf1483..3bf83f1 100644
--- a/index.php
+++ b/index.php
@@ -1 +1 @@
-InnoCTF{yLdXNHtdNmmlwxfzChKiLqjJzFwiDdjB}
\ No newline at end of file
+NOT A FLAG uGttuZUKpiUBXHipLuTMFAmSUQDTIiTh
\ No newline at end of file

commit b773ab9e02054c4f649b1094fea605e63d67c05a
--
--- a/index.php
+++ b/index.php
@@ -1 +1 @@
-NOT A FLAG JVsEkDXVgrTWIiKjnWwhMOwhGcnMFoOb
\ No newline at end of file
+InnoCTF{yLdXNHtdNmmlwxfzChKiLqjJzFwiDdjB}
\ No newline at end of file

commit 5f8bd3f16559f38fc51214e5b9378892c794d313
Author: medved72 <dima.bobyrev@ya.ru>
Date:   Thu Jul 11 19:44:49 2019 +0500
```


#### Flag

`InnoCTF{yLdXNHtdNmmlwxfzChKiLqjJzFwiDdjB}`