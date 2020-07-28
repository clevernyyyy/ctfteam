# Too Secure


## Challenge Description
Find a vulnerability in our novel message commitment system. Read the paper here: <a href='https://cybrics.net/files/too_secure.pdf' target='_blank' download='./too_secure.pdf'>too_secure.pdf</a>

Enter decimal r2 value as the flag. Flag format here is NOT cybrics{...}

### Maths
<br/>Let H(x) be the function that generates &#226; given x
<br/>Let x<sub>1</sub>, x<sub>2</sub> be the integer representations of M<sub>1</sub> and M<sub>2</sub>, respectively.
<br/>We're given
<br/>c = G h^r
<br/>Where G = g^x mod p and h = g^H(x) mod p
<br/>We can combine and simplify: 
<br/>c = g^(x + H(x)r) mod p
<br/>
<br/>To break the system, we want to find r<sub>2</sub> such that
<br/>c<sub>1</sub> = c<sub>2</sub> mod p
<br/>g^(x<sub>1</sub> + H(x<sub>1</sub>)r<sub>1</sub>) = g^(x<sub>2</sub> + H(x<sub>2</sub>)r<sub>2</sub>) mod p
<br/>Since g is known, and we're given that the O<sub>p</sub>(g) = q, we could solve the above by solving:
<br/>x<sub>1</sub> + H(x<sub>1</sub>)r<sub>1</sub> = x<sub>2</sub> + H(x<sub>2</sub>)r<sub>2</sub> mod q
<br/>r2 = (x<sub>1</sub> - x<sub>2</sub> + H(x<sub>1</sub>)r<sub>1</sub>) H(x<sub>2</sub>)<sup>-1</sup> mod q
<br/>Where H(x<sub>2</sub>)<sup>-1</sup> is the multiplicative inverse of H(x<sub>2</sub>) modulo q
  
### Finding q
<br/>We were given q | (p-1), g<sup>q</sup> = 1 mod p. Luckily, factoring p-1 was pretty quick via some online factorization calculators
<br/>https://www.dcode.fr/prime-factors-decomposition
<br/>We test each prime factor against g and p.
<pre><code>
g = 10729072579307052184848302322451332192456229619044181105063011741516558110216720725
qs = [2, 3, 7, 3671, 10733, 1039300813886545966418005631983853921163721828798787466771912919828750891]
p = 12039102490128509125925019010000012423515617235219127649182470182570195018265927223
q = 0
for q_ in qs:
    v = pow(g, q_, p)
    if v == 1:
        q = q_

print("q", q)

>>> q 1039300813886545966418005631983853921163721828798787466771912919828750891
</code></pre>
  
### Finding H(x)
<br/>Computing H(x) (called HAT(x) in the code below) was a little convoluted given the instructions:
<br/>Note: since p is prime, totient(p) = p-1

<pre><code>
def str2val(message):
  val = 0
  mult = 1
  for let in message:
    val += ord(let) * mult
    mult *= 256
  return val

def chunkstring(string, length):
    return (string[0+i:length+i] for i in range(0, len(string), length))

def bitstring_to_bytes(s):
    b = bytearray()
    chunks = chunkstring(s, 8)
    for chunk in chunks:
        num = int(chunk, 2)
        b.append(num & 0xff)
    return bytes(b)

def HAT(x):
  G = pow(g, x, p)
  numStr = "{0:b}".format(G)
  if len(numStr) < 1024:
      numStr = "0" * (1024 - len(numStr)) + numStr

  Gp = bitstring_to_bytes(numStr)
  a = hashlib.sha512(Gp).hexdigest()
  ap = int(a, 16)
  app = pow(ap, ap, p-1)
  return app

r1 = 31245182471
M1 = "Hi! I am Vadim Davydov from ITMO University"
x1 = str2val(M1)
M2 = "Transfer the points for easy task to this team"
x2 = str2val(M2)

hat_x1 = HAT(x1)
hat_x2 = HAT(x2)
</code></pre>
  
### Finding H(x<sub>2</sub>)<sup>-1</sup>
Since q is prime, H(x<sub>2</sub>) and q are coprime, so we can use the Extended Euclidean Algorithm to find H(x<sub>2</sub>)<sup>-1</sup>:
  
<pre><code>
def modulo_multiplicative_inverse(A, M):
    """
    Assumes that A and M are co-prime
    Returns multiplicative modulo inverse of A under M
    """
    # Find gcd using Extended Euclid's Algorithm
    gcd, x, y = extended_euclid_gcd(A, M)

    # In case x is negative, we handle it by adding extra M
    # Because we know that multiplicative inverse of A in range M lies
    # in the range [0, M-1]
    if x < 0:
        x += M

    return x


def extended_euclid_gcd(a, b):
    """
    Returns a list `result` of size 3 where:
    Referring to the equation ax + by = gcd(a, b)
        result[0] is gcd(a, b)
        result[1] is x
        result[2] is y
    """
    s = 0;
    old_s = 1
    t = 1;
    old_t = 0
    r = b;
    old_r = a

    while r != 0:
        quotient = old_r // r  # In Python, // operator performs integer or floored division
        # This is a pythonic way to swap numbers
        # See the same part in C++ implementation below to know more
        old_r, r = r, old_r - quotient * r
        old_s, s = s, old_s - quotient * s
        old_t, t = t, old_t - quotient * t
    return [old_r, old_s, old_t]


inv = modulo_multiplicative_inverse(hat_x2, q)
</code></pre>
  
### Putting it all together
<br/>r2 = (x<sub>1</sub> - x<sub>2</sub> + H(x<sub>1</sub>) r<sub>1</sub>) H(x<sub>2</sub>)<sup>-1</sup> mod q
<pre><code>
print ( ((x1 - x2 + hat_x1 * r1) * inv ) % q )

>>> 299610740605778098196154877327490870095375317123548563579894088319476495
</code></pre>
