# magnetic-switch-rest-server


The goal of this repository was to connect a magnetic sensor (door and window sensor) to a raspberry pi zero.

The status changed should be tracked and stored. The raspberry should also host a webserver to grab the data from remote.

### Used Packages:

* [onoff](https://github.com/fivdi/onoff)
* [jsonfile](https://github.com/jprichardson/node-jsonfile)
* [express](https://github.com/expressjs/express)
* [dotenv](https://github.com/motdotla/dotenv)

## Setup Raspberry Pi Zero

### Fresh install
1. Download and install [Raspbian Strecht Lite](https://www.raspberrypi.org/downloads/raspbian/) (it's without UI)
2. Flash the SD-Card. (My one was 8MB)
     * I used [etcher](https://etcher.io/) for flashing the SD-Card.
3. Remove and put your SD-Card back into your Computer/Card-Reader. Open the SD-Card. Create a new File in the SD-Card root directory called `wpa_supplicant.conf`. Insert the following lines and insert your information to `country`, `ssid` and `psk`. Save that file.
```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

network={
     ssid="Your network name/SSID"
     psk="Your WPA/WPA2 security key"
     key_mgmt=WPA-PSK
}
```
5. Add also a file called `ssh.txt` to the root directory of the SD-Card - just an empty file. (Enables SSH)
5. Put your SD-Card into your Raspberry Pi Zero and turn it on. The raspberry should connect to your wifi automatically now.
6. You can connect to your rasbperry now by using `ssh pi@<IP>`. The default password is `raspberry`.
7. You should change the username and password. (Security)

### Install [nodejs](https://nodejs.org/en/)

You have to use the armv6l-version of nodejs on the Raspberry Pi zero.

1. The following four lines will install nodejs 8.9.4 (LTS):

```
wget https://nodejs.org/dist/v8.9.4/node-v8.9.4-linux-armv6l.tar.gz
tar -xvf node-v8.9.4-linux-armv6l.tar.gz
cd node-v8.9.4-linux-armv6l
sudo cp -R * /usr/local/
```

2. Test it by using
`node` or `npm`.

3. Remove the tar.gz and the folder by using
```
cd ..
rm node-v8.9.4-linux-armv6l.tar.gz
rm node-v8.9.4-linux-armv6l
```

### Install yarn

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

Be careful! When is was installing yarn like the above way on my fresh raspbian strech lite installation, it installs the "wrong" yarn. It installs the yarn from the `cmdtest` package.
Just remove `cmdtest` and install yarn again:

```
sudo apt remove cmdtest
sudo apt-get install yarn
```

