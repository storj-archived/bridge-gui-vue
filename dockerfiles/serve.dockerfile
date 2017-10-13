#
# Based on https://github.com/KyleAMathews/docker-nginx
#
FROM kyma/docker-nginx

COPY ./dist /var/www/

# Used only for testing with ssl
#COPY ./files/configs/nginx-default-ssl /etc/nginx/sites-available/default-ssl
#RUN ln -s /etc/nginx/sites-available/default-ssl /etc/nginx/sites-enabled

COPY ./dockerfiles/files/configs/nginx-default /etc/nginx/sites-available/default
RUN rm /etc/nginx/sites-enabled/default
RUN ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
COPY ./dockerfiles/files/scripts/inject_static_secrets /usr/local/bin/inject_static_secrets
COPY ./dockerfiles/files/scripts/start-bridge-gui /usr/local/bin/start-bridge-gui

WORKDIR /etc/nginx

CMD ["/usr/local/bin/start-bridge-gui"]
