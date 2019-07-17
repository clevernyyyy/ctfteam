## Prism writeup

#### Challenge Statement

Do you have a prism to take a closer look?

<figure class='image-centered'>
	<img src='/static/media/prism.png' alt='Prism' />
  <figcaption>Prism</figcaption>
</figure>


#### Description

This challenge gave us a something that _looks_ like a QR code, but doesn't quite scan as one.

#### Solution

I am not the best stegonography ctf solver so I didn't have high expectations, but I fired up [Steg Solve](https://github.com/eugenekolo/sec-tools/tree/master/stego/stegsolve/stegsolve) and started playing with the channels.

I noticed that the red channel looked like a QR code.


<figure class='image-centered'>
	<img src='/static/media/red-prism.png' alt='Red Prism' />
  <figcaption>Red Prism</figcaption>
</figure>


So I scanned it, and got part of a flag.  `InnoCTF{N9GntE`. Okay, so I was on the right track.  I scanned the green and blue channels as well and concatenated them to find the flag.

#### Flag

`InnoCTF{N9GntEPyy5mNT3VvjbpCHrtIC4lyls3DL}`




