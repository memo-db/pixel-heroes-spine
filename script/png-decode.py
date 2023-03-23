#!/usr/bin/env python3
import os


def decode(filename):

    print(f"Decode {filename}.png")

    with open(f"{filename}.png", "rb") as f:

        data = f.read()

    key = [
        original ^ cipher
        for original, cipher in zip([0x89, 0x50, 0x4E, 0x47], data[:4])
    ]

    bound = data[-5]

    print(f" -> guess key: {[hex(k) for k in key]}, bound: {hex(bound)}")

    dec = []

    for i in range(bound):

        kbyte = key.pop(0)

        key.append(kbyte)

        dbyte = data[i]

        dec.append(dbyte ^ kbyte)

    dec = bytes(dec[:bound]) + data[bound:-12] + bytes([
        0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82
    ])

    with open(f"decode/{filename}.png", "wb") as f:

        f.write(dec)


if not os.path.exists("decode"):

    os.mkdir("decode")

mode = input("input filename (leave empty for all): ")

if not mode:

    for filename in os.listdir("."):

        if not filename.endswith(".png"):

            continue

        decode(filename[:-4])

else:

    decode(mode)