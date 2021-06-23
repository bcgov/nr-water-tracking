# stage 1: use npm to install dependencies into node_modules 
#          directory
FROM node:alpine3.12
WORKDIR /app
COPY ["db", "./db"]
COPY ["package-lock.json", "package.json", "server.js", "."]
RUN npm install; apk --update add curl bash

# should get the port from env var
EXPOSE 3000
ENTRYPOINT ["node", "server.js" ]
