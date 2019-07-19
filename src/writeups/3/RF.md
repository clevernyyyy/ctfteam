## RF writeup

#### Challenge Statement

I was walking on rails when suddenly i found this on wooden fence: I3_nase7ncamсo_r1сCt_t4T07_}Fnhs{1

#### Description

The goal of this challenge was to obviously decipher the ciphertext in the challenge statement.

#### Solution

I looked at various ciphers and stumbled across the [Rail Fence cipher](https://en.wikipedia.org/wiki/Rail_fence_cipher). Like usual, the title of the challenge assisted.  I then increased the number of rails until it formed a flag.

```
I.............3............._.....
.n...........a.s...........e.7....
..n.........c...a.........m...с...
...o......._.....r.......1.....с..
....C.....t......._.....t.......4.
.....T...0.........7..._.........}
......F.n...........h.s...........
.......{.............1............
```

#### Flag

`InnoCTF{n0t_ca3sar_7h1s_t1me_7сс4}`