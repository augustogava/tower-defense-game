FROM nginx:alpine

COPY nginx.conf /etc/nginx/templates/default.conf.template

COPY . /usr/share/nginx/html

RUN rm -f /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/nginx.conf \
    /usr/share/nginx/html/.dockerignore \
    /usr/share/nginx/html/getD.php

ENV PORT=80

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
