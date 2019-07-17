## Robots writeup

#### Challenge Statement

http://188.130.155.66:4444/rAbCilIPOIvDCrjeHIIRDPuPMzARtYUp/

#### Description

This challenge linked to a webpage that was completely static. There were no hints in the source.

#### Solution

However, as is often the case with CTFs, the title of the challenge itself was the clue. Robots would seem to point me to `robots.txt`, a potential [information leakage](https://www.owasp.org/index.php/Review_Webserver_Metafiles_for_Information_Leakage_(OTG-INFO-003)), so I browsed to http://188.130.155.66:4444/robots.txt, where I found the following:


```
User-Agent: *
Disallow: /super-secret-admin-panel/
```

Browsing back to http://188.130.155.66:4444/rAbCilIPOIvDCrjeHIIRDPuPMzARtYUp/super-secret-admin-panel/ shows me a login page with a `username` input and a `password` input. As always, I try some simple tests for SQLi:



username: `admin`
<br />
password: `' OR 1=1 -- `



Once I submit that, I am presented with the flag.

