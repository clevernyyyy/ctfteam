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
git log -p | grep 'Inno'
```


#### Flag

`InnoCTF{yLdXNHtdNmmlwxfzChKiLqjJzFwiDdjB}`