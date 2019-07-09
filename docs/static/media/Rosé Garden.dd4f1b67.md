## Rosé Garden writeup

#### Challenge Statement

Rosé is a beautiful singer with a sweet voice, but she is so much busy and she needs more staff to work in her garden.

#### Description

This challenge linked to a webpage that didn't really do much. It had a few pictures of "Rosé" and a link to a `/request` page.

Navigating to the `Send request` page was not super fruitful either. This page had a single input box with a watermarked IP address asking for a URL. However, every single URL I entered resulted in an error. Clearly something was missing.


<figure class='image-centered'>
	<img src='/static/media/failedRequest.png' alt='Oops, something was wrong...' />
  <figcaption>Oops, something was wrong...</figcaption>
</figure>


#### Solution

Before I ran scans on the website looking for extra information, I ran through typical information leakage on web servers.  See [this OWASP document](https://www.owasp.org/index.php/Review_Webserver_Metafiles_for_Information_Leakage_(OTG-INFO-003)) for more information. I find `/robots.txt` where there is the information I was looking for.

```
User-Agent: *
Disallow: /source.zip
```

Download the `/source.zip` and expand it to find an `app.py` which contains below.

```py
#!/usr/bin/env python
from flask import Flask, render_template, request, send_from_directory, abort
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse
from socket import inet_aton

import requests
import asyncio

app = Flask(__name__)
app.jinja_env.lstrip_blocks = True
app.jinja_env.trim_blocks = True

async def check_func(hostname, port):
    try:
        if len(hostname.split('.')) != 4: 0/0
        
        if '127.' in hostname or '.0.' in hostname or '.1' in hostname: 0/0

        if inet_aton(hostname) != b'\x7f\x00\x00\x01': 0/0

        if not port: port = 80
        
        result = []
        with ThreadPoolExecutor(max_workers=3) as executor:
            loop = asyncio.get_event_loop()
            tasks = [
                loop.run_in_executor(
                    executor,
                    lambda u: requests.get(u, allow_redirects=False, timeout=2),
                    url
                ) for url in [f'http://{hostname}:{port}', 'http://127.0.0.1:3333']
            ]
            for res in await asyncio.gather(*tasks):
                result.append(res.text)
    except:
        return False

    return result[1] if result[0] == result[1] else False

@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/request', methods=['GET', 'POST'])
def request_page():
    if 'url' in request.form and request.form['url']:
        url = request.form['url']
        if url[:7] != 'http://':
            url = 'http://' + url

        host_info = urlparse(url)._hostinfo

        asyncio.set_event_loop(asyncio.new_event_loop())
        loop = asyncio.get_event_loop()
        FLAG = loop.run_until_complete( asyncio.ensure_future( check_func(*host_info) ) )
        if FLAG:
            return render_template('request.html', flag=FLAG)
        else:
            return render_template('request.html', error=True)

    return render_template('request.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=False)
```

The part to pay attention to is the `check_func` function, where they appear to ensure the URL input meets certain criteria.  Immediately, I notice that these appear to contradict each other.

```py
if '127.' in hostname or '.0.' in hostname or '.1' in hostname: 0/0     # can't be 127.0.0.1

if inet_aton(hostname) != b'\x7f\x00\x00\x01': 0/0    					# has to be 127.0.0.1
```

So I know that `hostname` must resolve to `127.0.0.1` aka `localhost`.  I also know that the port must be `3333` based off of this line:

```py
) for url in [f'http://{hostname}:{port}', 'http://127.0.0.1:3333']
```

My next thought process is what resolves to `127.0.0.1`, but _isn't_ `127.0.0.1`?  After a little googling, I realize I can bypass this restriction with either the octal or hex representation of `127.0.0.1`.  I used the octal representation to grab the flag `0177.00.00.01:3333` and boom, the site spit out the flag.


<figure class='image-centered'>
	<img src='/static/media/rosegardenflag.png' alt='Rosé Garden Flag' />
  <figcaption>Rosé Garden Flag</figcaption>
</figure>


#### Flag

`ISITDTU{warmup task is not that hard}`


#### Issues

I thought this was not the greatest CTF challenge. First off, the site didn't make any sense and was totally without purpose. I think CTF challenges where you must guess the intentions of the author are poor at best.

Secondly, notice the watermark in the above picture. `172.217.19.227[:80]` is the IP address for google without the `[ ]`. However, I thought they _wanted_ the brackets in their final IP address, so it took me a few minutes to try `0177.00.00.01:3333` in lieu of `0177.00.00.01[:3333]`. 

It was a frustrating challenge (despite the easy nature of it) in more ways than one.


