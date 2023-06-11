FROM ubuntu:18.04

RUN apt update
RUN DEBIAN_FRONTEND=noninteractive apt install -y apache2
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y libapache2-mod-php
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y php-mysql
 
COPY . /var/www/html/

EXPOSE 80



CMD service apache2 start && tail -f /dev/null
