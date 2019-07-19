## Librarian Skill

#### Description

We're given three sets of numbers in a picture and three sets of texts that are classic books: 1984, Catcher and the Rye, and Animal Farm.

#### Solution

Usually with texts like this, we can expect a book cipher, where characters of the text reveal a flag.  After some testing, I wrote a quick python script that gave me two words and some gibberish.

```py
cs = [[1,48,53,53,138],[13,69,123,2,103,151],[4,6,1,13,26,75,102]]
texts = [open(f).read().split(' ') for f in ["1984.txt", "Animal Farm.txt", "The Catcher in the Rye.txt"]]
for text in texts:
    for c in cs:
        try:
            print(''.join(text[i-1][0] for i in c))
        except IndexError:
            pass
```

The words were `Hurry`, `slowly`, and `inNuwsT`. Given some unusual challenge solutions, I tried concatenating this with `_` into a flag and sure enough, it worked.

#### Flag

`InnoCTF{Hurry_slowly_inNuwsT}`
