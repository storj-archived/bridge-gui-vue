#
# Based on https://github.com/KyleAMathews/docker-nginx
#
FROM kyma/docker-nginx 
COPY ./dist /var/www/
VOLUME ["/var/www/", "/var/log/nginx", "/etc/nginx/certs", "/etc/nginx/sites-enabled"]
WORKDIR /etc/nginx
CMD ["nginx"]
