## Sender

#### Challenge Statement

We've intercepted this text off the wire of some conspirator, but we have no idea what to do with that. 
Get us their secret documents

```
220 ugm.cybrics.net ESMTP Postfix (Ubuntu)
EHLO localhost
250-ugm.cybrics.net
250-PIPELINING
250-SIZE 10240000
250-VRFY
250-ETRN
250-AUTH PLAIN LOGIN
250-ENHANCEDSTATUSCODES
250-8BITMIME
250 DSN
AUTH LOGIN
334 VXNlcm5hbWU6
ZmF3a2Vz
334 UGFzc3dvcmQ6
Q29tYmluNHQxb25YWFk=
235 2.7.0 Authentication successful
MAIL FROM: <fawkes@ugm.cybrics.net>
250 2.1.0 Ok
RCPT TO: <area51@af.mil>
250 2.1.5 Ok
DATA
354 End data with <CR><LF>.<CR><LF>
From: fawkes <fawkes@ugm.cybrics.net>
To: Area51 <area51@af.mil>
Subject: add - archive pw
Content-Type: text/plain; charset="iso-8859-1"
Content-Transfer-Encoding: quoted-printable
MIME-Version: 1.0

=62=74=77=2E=0A=0A=70=61=73=73=77=6F=72=64 =66=6F=72 =74=68=65 =61=72=63=
=68=69=76=65 =77=69=74=68 =66=6C=61=67=3A =63=72=61=63=6B=30=57=65=73=74=
=6F=6E=38=38=76=65=72=74=65=62=72=61=0A=0A=63=68=65=65=72=73=21=0A
.
250 2.0.0 Ok: queued as C4D593E8B6
QUIT
221 2.0.0 Bye
```

#### Description
Here we are connecting to an authorized mail server and attempting to gain access
to a protected document containing the flag

#### Solution
For the first step, we had to connect to the mail server. I ran
`nmap ugm.cybrics.net` to get a list of open ports on the mail server. NMAP showed that 
port 110 was open.

From there we had to login to the server. We used the pop3 command `AUTH LOGIN` to initiate
a three-way handshake. I entered the messages that do not contain a `+`

```
AUTH LOGIN
+ VXNlcm5hbWU6
ZmF3a2Vz
+ UGFzc3dvcmQ6
Q29tYmluNHQxb25YWFk=
```

We're in!!! 

Now we can retrieve emails from the server. Using the command `LIST` we can see all emails on the server.
Here we can see we have one message with an ID of 1. Use `RETR 1` to pull that message.

The output from this is a huge blob of base64 encoded text but the headers show...

```
Content-Type: application/zip
Content-Disposition: attatchment; filename="secret_flag.zip"
Content-Transfer-Encoding: base64
```

From here I used a trivial python script to decode the base64 output into a zip file. 

The Final Stretch...

If you try to unzip this file using the `unzip` command, you get the error `unsupported compression method 99`
which uses AES to encrypt the zip file.

If you recall the POP3 logs in the problelm statement, we are given this...

```
=62=74=77=2E=0A=0A=70=61=73=73=77=6F=72=64 =66=6F=72 =74=68=65 =61=72=63=
=68=69=76=65 =77=69=74=68 =66=6C=61=67=3A =63=72=61=63=6B=30=57=65=73=74=
=6F=6E=38=38=76=65=72=74=65=62=72=61=0A=0A=63=68=65=65=72=73=21=0A
```

if you remove the `=` and base64 decode it we are given the string...

```
btw.

passwordforthearchivewithflag:crack0Weston88vertebra

cheers!
```

Since the file is encrypted, we must use a special zip with AES support, `p7zip`.  If your run that on the zip
file, you are prompted to enter the password, which in our case is: `crack0Weston88vertebra`.

This gives you a file called `secred_flag.pdf` which contains the key!!

#### Flag
`cybrics{Y0uV3_G0T_m41L}`