FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY . /usr/share/nginx/html

RUN rm -f /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/nginx.conf \
    /usr/share/nginx/html/.dockerignore \
    /usr/share/nginx/html/getD.php

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

