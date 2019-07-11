## Do You Like Math? Writeup

#### Challenge Statement

nc 104.154.120.223 8083

#### Description

After connecting to the provided server via the command line, a randomized arithmetic problem appeared, written in ASCII-star art. Entering the correct answer within a few seconds revealed a new random problem, and taking too long caused the server to disconnect. Many of the multiplication problems were too difficult to solve quickly. Presumably we had to write a program to parse and solve the problems automatically.

<figure class='image-centered'>
    <img src='/static/media/math_example.png' alt='8 + 39 =' />
  <figcaption>Basic arithmetic</figcaption>
</figure>

#### Solution

This problem boiled down to a loop of the following:

1. opening up a connection to the server via a socket
1. parsing the provided problem
1. calculating the solution
1. sending the result back to the server

For the first step, we use python's built-in `socket` library.

```py
import socket
HOST, PORT = "104.154.120.223", 8083
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((HOST, PORT))
```
Within a `while` loop, we receive data from the server.

```py
data = str(sock.recv(1024))
```
Next, we need to parse the problem. Notice that between each character is a column containing entirely whitespace - the idea here is to find the indexes of these columns so we can extract each multi-line character. To do this, we find the set intersection of the whitespace indexes in each row:

```py
for line in lines:
    # find indexes of blanks in the lines
    empties.append(set([m.start(0) for m in re.finditer(' ', line)]))
# discard the blank columns at the end (we know they're for "=")
blank_columns = [-1] + sorted(set.intersection(*empties))[:-4]
```

Notice that we also append `-1` to this list, to denote a character starting at index 0. Next we get a list of characters, with each character represented as a list of strings, one string per line, between the previously identified column separators. For example, consider the following example, where we extract the number 6.

```
 ##### 
#     #
#      
###### 
#     #
#     #
 ##### 
```

This is converted to the following python list...

```py
[' ##### ',
 '#     #',
 '#      ',
 '###### ',
 '#     #',
 '#     #',
 ' ##### ']
```

...and flattened to a single string.

```py
' ##### #     ##      ###### #     ##     # ##### '
```
We look this string up in a predefined dictionary from "flat" digits to their numerical value:

```py
FLAT_CHAR_TRANSLATOR = {
    '  ###   #   # #     ##     ##     # #   #   ###  ': 0,
    '  #   ##  # #    #    #    #  #####': 1,
    ' ##### #     #      # ##### #      #      #######': 2,
    ' ##### #     #      # #####       ##     # ##### ': 3,
    '#      #    # #    # #    # #######     #      # ': 4,
    '########      #      ######       ##     # ##### ': 5,
    ' ##### #     ##      ###### #     ##     # ##### ': 6,
    '########    #     #     #     #      #      #    ': 7,
    ' ##### #     ##     # ##### #     ##     # ##### ': 8,
    ' ##### #     ##     # ######      ##     # ##### ': 9,
    '               #####               ': '-',
    '       #    #  #####  #    #       ': '+',
    '        #   #   # #  #######  # #   #   #        ': '*'
}
```

The parse result of each character is added to a list (`eqn`), and we find the index of the operator (`op_index`) by checking its type (`str` for operators, `int` for digits). Once we can separate digits into numbers, we concatenate them as strings and re-cast to an integer. This converts something like `[4, 2]` into `42`. Finally, we look up the operator in a dictionary mapping operators to _functions_:

```py
OP_FUNCTIONS = {
    '-': operator.sub,
    '+': operator.add,
    '*': operator.mul
}
```

In one fell swoop, we calculate the result:

```py
return str(OP_FUNCTIONS[eqn[op_index]](num1, num2))
```

After

```py
sock.send(result)
```

we loop and solve again. After 100 iterations, the flag was revealed.

#### Flag

`ISITDTU{sub5cr1b3_b4_t4n_vl0g_4nd_p3wd13p13}`

#### Additional Notes

Looping through each problem failed until we added a slight delay before receiving data each time. This non-obvious bug caused quite a bit of pain, but the fix was simple. In the main loop:

```py
time.sleep(0.1)
```

#### Source Code

The full python (2.7) script `math.py` is available below:

```py
# MATH Client
import socket
import re
import time
import operator
HOST, PORT = "104.154.120.223", 8083
# dictionary from 'flattened' version of a character to its value
FLAT_CHAR_TRANSLATOR = {
    '  ###   #   # #     ##     ##     # #   #   ###  ': 0,
    '  #   ##  # #    #    #    #  #####': 1,
    ' ##### #     #      # ##### #      #      #######': 2,
    ' ##### #     #      # #####       ##     # ##### ': 3,
    '#      #    # #    # #    # #######     #      # ': 4,
    '########      #      ######       ##     # ##### ': 5,
    ' ##### #     ##      ###### #     ##     # ##### ': 6,
    '########    #     #     #     #      #      #    ': 7,
    ' ##### #     ##     # ##### #     ##     # ##### ': 8,
    ' ##### #     ##     # ######      ##     # ##### ': 9,
    '               #####               ': '-',
    '       #    #  #####  #    #       ': '+',
    '        #   #   # #  #######  # #   #   #        ': '*'
}
OP_FUNCTIONS = {
    '-': operator.sub,
    '+': operator.add,
    '*': operator.mul
}
def play():
    # Create a socket (SOCK_STREAM means a TCP socket)
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    # Connect to server and send data
    sock.connect((HOST, PORT))
    i = 0
    while True:
        # wait for the prompt
        time.sleep(0.1)
        # Receive data from the server
        data = str(sock.recv(1024))
        print('---problem ' + str(i))
        print(data)
        print('------------')
        if i == 100:
            break
        result = parse_and_solve(data)
        print(result)
        sock.send(result)
        i = i + 1
    sock.close()
def parse_and_solve(data):
    lines = data.splitlines()[1:8]
    empties = []
    for line in lines:
        # find indexes of blanks in the lines
        empties.append(set([m.start(0) for m in re.finditer(' ', line)]))
    # find all columns with only blanks (char separators)
    # discard the blank lines at the end (we know they're for "=")
    blank_columns = [-1] + sorted(set.intersection(*empties))[:-4]
    chars = []
    # get each char as a list of lines between each separator
    for i in range(len(blank_columns) - 1):
        charlines = []
        for line in lines:
            charlines.append(line[blank_columns[i] + 1 : blank_columns[i + 1]])
        chars.append(charlines)
    # convert the printed representation of the chars to their actual meaning
    # also find the index of the operator
    eqn = []
    op_index = -1
    for i, charlines in enumerate(chars):
        flat_char = ''.join(charlines)
        c = FLAT_CHAR_TRANSLATOR[flat_char]
        if isinstance(c, str):
            op_index = i
        eqn.append(str(c))
    # convert digits to integers
    num1 = int(''.join(eqn[:op_index]))
    num2 = int(''.join(eqn[op_index + 1:]))
    # perform the operation and return the result
    return str(OP_FUNCTIONS[eqn[op_index]](num1, num2))
play()
```