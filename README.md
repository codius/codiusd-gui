# How to install codiusd-gui:

This will install the GUI and once sucessfully started it will run on 127.0.0.1 on port 3300. You can SSH 
redirect in, or you can add an NGinx config

```bash
cd /usr/lib/node_modules
git clone https://github.com/codius/codiusd-gui.git
cd /usr/lib/node_modules/codiusd-gui/
npm install
cp ./extra/systemd/codiusd-gui.service /etc/systemd/system/codiusd-gui.service
systemctl daemon-reload
systemctl enable codiusd-gui
systemctl start codiusd-gui
```

# Add Nginx Config
To keep it simple we use the same template as with Codius. In this example you will see a 'allow 127.0.0.1;'. You must add another line with your trusted IP address to gain access.

```
map $http_upgrade $connection_upgrade {
  default upgrade;
  '' $http_connection;
}

server {
    listen 444 ssl;

    server_name gui.your.host.name;

    ssl_certificate /etc/letsencrypt/live/your.host.name/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your.host.name/privkey.pem;

    ssl_protocols TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_dhparam /etc/nginx/dhparam.pem;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
    ssl_ecdh_curve secp384r1;
    ssl_session_timeout 10m;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 1.1.1.1 1.0.0.1 valid=300s;
    resolver_timeout 5s;
    add_header Strict-Transport-Security 'max-age=63072000; includeSubDomains; preload';
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection '1; mode=block';

    location / {
      allow 127.0.0.1;
      deny all;

      proxy_pass http://127.0.0.1:3300;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $remote_addr;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
      proxy_buffering off;
      #proxy_connect_timeout      300;
      #proxy_send_timeout         300;
      #proxy_read_timeout          300;
      #send_timeout                300;
    }
}
```
