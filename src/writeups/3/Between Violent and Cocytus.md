## Between Violent and Cocytus writeup

#### Challenge Statement

This is inferno!

```
‘&%$#”!=6;:98765.Rsrqponmlkjihgfedcba`_^]\[ZYXWVUTSRQPONMLKJIHGFEDCBA@?>Z<XW
VUTSRQPOHlkKDIHAe(‘=B;@?>=<;4Xyxwvutsrqponmlkjihgfe#”y~}|{zsxq7uWmlk1onmlkMi
b(IHGFEDCBA@?>=<;:98T6RQPONGLKJCgA@d’&%$#”!=65:98765.Rsr0)(-,+*)(!Efedcba`_^
]\[ZYXWVUTSonmlkjiKa`e^$EDCBA@?>=<;:9876543OHMLKJIHGF?c&BA:?>=<5YXyxwvutsrqp
onmlkjihgf$#”y~}|{zsxq7Xtsrqpoh.fejibgf_%FEDCBA]\UZYXWVUTMqQ3IHMLKDh+*)(‘&<A
@?>=<;:92Vwvutsrqponmlkjihgfedcba`_^]\[ZYXWVUTSRQPONMLKJIHGFEDCBA@?>=<;QPOTS
RQPOHMFjW
```

#### Description

The challenge was clearly cryptograhpy where we had to translate the above ciphertext to a flag.

#### Solution


The challenge statement was pretty obviously pointing to Dante's Inferno. I knew that Violent and Cocytus were stages of the nine circles of hell, but I had to pull it up to find the circle between them.

The eight circle of hell was Fraud, but that didn't really help. However I found this [article](https://www.thoughtco.com/dantes-9-circles-of-hell-741539) which said _"within the 8th circle there is another called the Malebolge"_.


Googling 'Malebolge' as a language shows me that it's actually a programming language. From more googling, I find an online interpreter - http://malbolge.doleczek.pl/. Pasting the 'ciphertext' from above into the interpreter gives me the flag.



#### Flag

`InnoCTF{50m3_1337_c0d3}`