## QShell Writeup

#### Challenge Statement

QShell is running on `nc spbctf.ppctf.net 37338`

Grab the flag.

#### Description

After netcat'ing into the server, the server returned a QR code.

#### Solution

Decoding this QR code I see `sh-5.0$` which shows the server is giving us the shell. Therefore, we need to make a client to encode a command into QR Code format and send it back to the server.

```py
import socket

from PIL import Image
from qr import *
from pyzbar.pyzbar import decode
from pyzbar.pyzbar import ZBarSymbol

import numpy as np
import qrcode


white = '█'.encode()
black = ' '.encode()

class Netcat:

    """ Python 'netcat like' module """

    def __init__(self, ip, port):

        self.buff = b''
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.connect((ip, port))

    def read(self, length = 1024):

        """ Read 1024 bytes off the socket """

        return self.socket.recv(length)
 
    def read_until(self, data):

        """ Read data into the buffer until we have data """

        while not data in self.buff:
            self.buff += self.socket.recv(1024)
 
        pos = self.buff.find(data)
        rval = self.buff[:pos + len(data)]
        self.buff = self.buff[pos + len(data):]
 
        return rval
 
    def write(self, data):

        self.socket.send(data)
    
    def close(self):

        self.socket.close()

def makeqr(data):
    qr = qrcode.QRCode(
        version=2,
        box_size=1,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    return qr.make_image(fill_color="black", back_color="white")

def qr_to_payload(qr):
    payload = []
    arr = np.array(qr)
    row = list()
    print(arr.shape)
    for i in arr:
        row =[]
        for j in i:
            if j:
                row.append(white)
            else:
                row.append(black)
        payload.append(row)
    return payload
    
def print_recvd(data):
    print(data.decode('utf-8'))

def read_next_qr():
    curr_recv = nc.read_until(b'.\n')[:-4]
    print("Recvd: ")
    print()
    print_recvd(curr_recv)
    return curr_recv

def parse_qr(qr_data):
    data = [ [0xFF if j == white.decode() else 0x00 for j in item.decode()] for item in qr_data.split(b'\n')]    
    arr = np.array(data)
    Image.fromarray(arr.astype('uint8')).show()
    height, width = arr.shape[:2]
    print(decode((arr[:, :].astype('uint8').tobytes(), height, width), symbols=[ZBarSymbol.QRCODE]))
    
def write_command(cmd):
    print('Send: ', cmd)    
    print()
    ls_qr = makeqr(cmd)
    arr = qr_to_payload(ls_qr)
    for i in arr:
        for j in i:
            print(j.decode(), end='')
            nc.write(j)
        print()
        nc.write(b'\n')
            
    nc.write(b'.\n')

def recv_data():
    curr_recv = read_next_qr()
    parse_qr(curr_recv)


if __name__ == "__main__":
    
    nc = Netcat('spbctf.ppctf.net', 37338)
    recv_data()
    write_command('ls')
    recv_data()
    write_command('cat flag.txt')
    recv_data()

```  



#### Flag

`cybrics{QR_IS_MY_LOVE}`