## Oldman Reverse Writeup

#### Challenge Statement

I've found this file in my grandfather garage. Help me understand what it does.

```assembly
.MCALL  .TTYOUT,.EXIT
START:
    mov   #MSG r1 
    mov #0d r2
    mov #32d r3
loop:       
    mov   #MSG r1 
    add r2 r1
    movb    (r1) r0
    .TTYOUT
    sub #1d r3
    cmp #0 r3
    beq     DONE
    add #33d r2
    swab r2
    clrb r2
    swab r2    
    br      loop      
DONE: 
    .EXIT

MSG:
    .ascii "cp33AI9~p78f8h1UcspOtKMQbxSKdq~^0yANxbnN)d}k&6eUNr66UK7Hsk_uFSb5#9b&PjV5_8phe7C#CLc#<QSr0sb6{NC8G|ra!YJyaG_~RfV3sw_&SW~}((_1>rh0dMzi><i6)wPgxiCzJJVd8CsGkT^p>_KXGxv1cIs1q(QwpnONOU9PtP35JJ5<hlsThB{uCs4knEJxGgzpI&u)1d{4<098KpXrLko{Tn{gY<|EjH_ez{z)j)_3t(|13Y}}"
.end START
```

#### Description

We're provided with a file, oldman.asm, containing assembly code. There's a suspicious-looking `.ascii` data titled `MSG`. If we can run the assembly (or an equivalent program), it should output the flag.

#### Solution

I manually translated this assembly into python3 code line-by-line. The last three lines in the main loop are annotated below:

```assembly
  swab r2  ; swap r2's top byte with its bottom byte
  clrb r2  ; clear r2's bottom byte
  swab r2  ; swap r2's top byte with its bottom byte
```

Presumably, each register contains 2 bytes. Thus, this operation is functionally equivalent to applying a bitmask of 0xFF, which clears the top byte.

The full translation is as follows:

```py
msg = ("cp33AI9~p78f8h1UcspOtKMQbxSKdq~^0yANxbnN)d}k&6eUNr66UK7Hsk_uFSb5#9b&P"
       "jV5_8phe7C#CLc#<QSr0sb6{%NC8G|ra!YJyaG_~RfV3sw_&SW~}((_1>rh0dMzi><i6)"
       "wPgxiCzJJVd8CsGkT^p>_KXGxv1cIs1q(QwpnONOU9PtP35JJ5<hlsThB{uCs4knEJxGg"
       "zpI&u)1d{4<098KpXrLko{Tn{gY<|EjH_ez{z)j)_3t(|13Y}}")

r1 = 0  # where 0 is the message's memory address
r2 = 0
r3 = 32
while True:
    r1 = 0  # where 0 is the message's memory address
    r1 += r2
    r0 = msg[r1]
    print(r0, end='')
    r3 -= 1
    if r3 == 0:
        break
    r2 += 33
    r2 &= 0xFF
```

Running with python3 gives the flag...

#### Flag

`cybrics{pdp_gpg_crc_dtd_bkb_php}`