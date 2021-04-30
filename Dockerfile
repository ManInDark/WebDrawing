# docker build -t webimage .
FROM node

WORKDIR /usr/app
RUN npm install -g npm@7.11.2
RUN npm install canvas
RUN npm install http
RUN npm install fs
RUN npm install

COPY ./main.js ./main.js
COPY ./image.js ./image.js
COPY ./post-site.html ./post-site.html

EXPOSE 8080

CMD ["node", "main.js", "64", "64"]
