angular-gmaps-token
===================

Experimenting with Angular, Google maps and Token based authentication
You need to run the 'foxtest' binary, that's where the app is making the HTTP post requests.

<strong>HTTP calls use relative urls, be sure to forward all of them to port 3000 by adding proxypass in your vhosts; replace 192.168.56.1 with the IP of the machine foxtest is running from.</strong

```
  ProxyPass /v1/token http://192.168.56.1:3000/v1/token
  ProxyPassReverse /v1/token http://192.168.56.1:3000/v1/token
  ProxyPass /v1/offers http://192.168.56.1:3000/v1/offers
  ProxyPassReverse /v1/offers http://192.168.56.1:3000/v1/offers
```

In order to use proxypass, you need to install mod_proxy ; https://www.digitalocean.com/community/tutorials/how-to-use-apache-http-server-as-reverse-proxy-using-mod_proxy-extension . 
