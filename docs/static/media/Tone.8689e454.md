## Tone Writeup

#### Challenge Statement

Ha! Looks like this guy forgot to turn off his video stream and entered his password on his phone!

youtu.be/11k0n7TOYeM

#### Description

The linked YouTube video depicts an empty gaming chair. The background audio contains what appears to be DTMF tones.

#### Solution

I first extracted the audio as an mp3 file using an online converter and amplified the volume with audacity. Listening *very* carefully to each tone and comparing them to DTMF tones, I obtained the following sequence:

```
222 999 22 777 444 222 7777 7777 33 222 777 33 8 8 666 66 2 555 333 555 2 4
```

Then I translated this to letters according to any phone's keypad.

```
222 999 22 777 444 222 7777 7777 33 222 777 33 8 8 666 66 2 555 333 555 2 4
C   Y   B  R   I   C   S    S    E  C   R   E  T T O   N  A L   F   L   A G
```

Converting this to the standard flag format yielded the correct flag.

#### Flag

`cybrics{SECRETTONALFLAG}`