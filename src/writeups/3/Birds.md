## Birds writeup

#### Challenge Statement

The challenge statement showed a picture of birds on 5 wires and referenced [RFC-1149](https://tools.ietf.org/html/rfc1149). 

<figure class='image-centered'>
	<img src='/static/media/cryptobirds.png' alt='Birds On a Wire' />
  <figcaption>Birds On A Wire</figcaption>
</figure>

#### Description

This challenge was cryptography challenge so clearly we had translate these birds on a wire to something that actually made sense.

#### Solution

At first, I thought we had to find an IP address out of the birds. I started taking notes:

```
Birds per line - 10 14 16 11 6 19

Groups of birds per line:
2 3 2 3
3 5 6
4 4 5 3
8 3
4 2
4 5 10
```

I wasn't making sense of that and kept searching online for bird base cryptography. Eventually, the term `birds on a wire` led me to this link https://www.geocachingtoolbox.com/index.php?lang=en&page=codeTables&id=birdsOnAWire which allowed me to translate the picture into a flag.
