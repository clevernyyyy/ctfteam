## Lines writeup

#### Challenge Statement

<figure class='image-centered'>
	<img src='/static/media/lines.png' alt='Lines' />
  <figcaption>Lines</figcaption>
</figure>


#### Description

The challenge was simply this picture (above) with no words.

#### Solution

Immediately I noted that `1` and `8` are the start and finish nodes. Also, the nodes with multiple lines to them appear to have clear entry and exit points. So the first thing I did was trace it forward and backwards and I got:

```
8NQEM5K17CATD0OG_S4W_T1
1T_W4S_GO0DTAC71K5MEQN8
```

Notice the second one looks like leet speak for IT WAS GOOD TACTICS, then some garbage. Attempting those flags didn't work.  I tried...

```
InnoCTF{8NQEM5K17CATD0OG_S4W_T1}
InnoCTF{CATD0OG_S4W_T1}
InnoCTF{1T_W4S_GO0DTAC71K5MEQN8}
InnoCTF{1T_W4S_GO0DTAC71K5}
```

None of those flags worked. Okay, so then Peter wrote a map accounting for all of the entry / exit nodes. That quickly became a large list, however, still we couldn't find the flag.

```
8NQEM5K17CATD0OG_W4S_T1
8NQEM5K17CATD0OG_S4W_T1
8NQEM5K17CAT_S4W_GO0DT1
8NQEM5K17CAT_W4S_GO0DT1
8NQEM5K1TD0OG_W4S_TAC71
8NQEM5K1TD0OG_S4W_TAC71
8NQEM5K1T_W4S_GO0DTAC71
8NQEM5K1T_S4W_GO0DTAC71

1T_S4W_GO0DTAC71K5MEQN8
1T_W4S_GO0DTAC71K5MEQN8
1TD0OG_W4S_TAC71K5MEQN8
1TD0OG_S4W_TAC71K5MEQN8
17CAT_S4W_GO0DT1K5MEQN8
17CAT_W4S_GO0DT1K5MEQN8
17CATD0OG_S4W_T1K5MEQN8
17CATD0OG_W4S_T1K5MEQN81
```

We were super frustrated and left it alone for quite some time. Eventually I tried lowercase and sure enough, that was the flag.

```
InnoCTF{1t_w4s_go0dtac71k5meqn8}
```

What a gross challenge. They clearly have capital letters and we wasted a TON of time trying to figure out this flag when we had it in the first two minutes.