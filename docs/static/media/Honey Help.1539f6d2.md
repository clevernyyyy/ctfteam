## Honey, Help! Writeup

### Challenge Statement

HONEY HELP!!!

I was working in my Kali MATE, pressed something, AND EVERYTHING DISAPPEARED!

```bash
root@myLOVELYcomputer:~/cybrics# ls -la
total 12
drwxr-xr-x  2 root root 4096 Jul 22  2019 .
drwxr-xr-x 21 root root 4096 Jul 22  2019 ..
-rw-r--r--  1 root root   44 Jul 22  2019 flag
root@myLOVELYcomputer:~/cybrics# echo $'\e(0'

⎼⎺⎺├@└≤LOVELY␌⎺└⎻┤├␊⎼:·/␌≤␉⎼␋␌⎽# ┌⎽ -┌▒
├⎺├▒┌ 12
␍⎼┬│⎼-│⎼-│  2 ⎼⎺⎺├ ⎼⎺⎺├ 4096 J┤┌ 22  2019 .
␍⎼┬│⎼-│⎼-│ 21 ⎼⎺⎺├ ⎼⎺⎺├ 4096 J┤┌ 22  2019 ..
-⎼┬-⎼--⎼--  1 ⎼⎺⎺├ ⎼⎺⎺├   44 J┤┌ 22  2019 °┌▒±
⎼⎺⎺├@└≤LOVELY␌⎺└⎻┤├␊⎼:·/␌≤␉⎼␋␌⎽# ␌▒├ °┌▒± 
␌≤␉⎼␋␌⎽π␤0┌≤_␌⎼4⎻_1⎽_├␤␋⎽_▒┌13┼␋$␤_0⎼_┬4├?£
⎼⎺⎺├@└≤LOVELY␌⎺└⎻┤├␊⎼:·/␌≤␉⎼␋␌⎽# 
```

#### Solution

Running `echo $'\e(0` in my own terminal led to an environment identical to the one in the problem statement. I pasted in a string containing common ascii characters to obtain the muddled version of each character.

```py
coded =   ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ◆▒␉␌␍␊°±␤␋┘┐┌└┼⎺⎻─⎼⎽├┤┴┬│≤≥π≠£·\n'
decoded = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\n_'
```

Most flags contain underscores, but that character didn't translate properly, so I made it the default value for decoding by putting it at index -1.

This python3 loop decodes and prints the terminal session, whose transcript is saved as a string in `orig`:

```py
for c in orig:
    print(decoded[coded.find(c)], end='')
```

And we obtain

```bash
root@myLOVELYcomputer:~/cybrics# ls -la
total 12
drwxr-xr-x  2 root root 4096 Jul 22  2019 .
drwxr-xr-x 21 root root 4096 Jul 22  2019 ..
-rw-r--r--  1 root root   44 Jul 22  2019 flag
root@myLOVELYcomputer:~/cybrics# cat flag
cybrics{h0ly_cr4p_1s_this_al13ni$h_0r_w4t?}
root@myLOVELYcomputer:~/cybrics#[plazorchak@slate honey_help]
```

#### Flag

`cybrics{h0ly_cr4p_1s_this_al13ni$h_0r_w4t?}`