## One hundred times RSA writeup

#### Challenge Statement

We had intercepted message(823987601539551928252661654437667295378450335918666145079851234798343062080579451801129289418220555) and modulus(1522605027922533360535618378132637429718068114961380688657908494580122963258952897654000350692006139). Not that we needed all that for the dercrypting, but once you started to break crypto systems, the tendency is to push it as far as you can.

#### Description

This challenge was obviously a RSA encryption challenge. RSA can be a difficult encryption algorithm so there are often CTF challenges around implementation. I wasn't positive from reading the title, but I thought I may have to write some code to iterate as well (One hundred times).

#### Solution

This one took quite a while.  I was able to find p and q off of http://factordb.com.

```
p=37975227936943673922808872755445627854565536638199
q=40094690950920881030683735292761468389214899724061
```

Standard RSA python scripts didn't work at first, so I wrote my own.

```py

def egcd(a, b):
    if a == 0:
        return (b, 0, 1)
    g, y, x = egcd(b%a,a)
    return (g, x - (b//a) * y, y)

def modinv(a, m):
    g, x, y = egcd(a, m)
    if g != 1:
        raise Exception('No modular inverse')
    return x%m

n = 1522605027922533360535618378132637429718068114961380688657908494580122963258952897654000350692006139
p = 37975227936943673922808872755445627854565536638199
q = 40094690950920881030683735292761468389214899724061
c = 594147643758126272722748149715320287571901225730250492908477114410071694555274921111773337859009576
for i in range(65537):
    try:
        d = modinv(i, (p-1)*(q-1))
    except Exception:
        continue
    m = pow(c,d,n)
    if hex(m).startswith("0x496e6e6f435446"):
        print(hex(m).replace('L','')[2:].decode('hex'))
        break
```

This output the flag in a matter of seconds.


#### Flag

`InnoCTF{cr4ck_rs4_4g41n_7bca}`