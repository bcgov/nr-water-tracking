# stage 1: use npm to install dependencies into node_modules 
#          directory
FROM node:alpine3.12

WORKDIR /app
COPY ["db", "./db"]
COPY ["public", "./public"]
COPY ["public", "package-lock.json", "package.json", "."]
RUN npm install; npm run build

# stage 2: don't need node itself, just need the acutal react app files that
#          it insalled / built. This stage builds from caddy and copied the 
#          dependencies from previous stage

#-----------------
FROM caddy:2.1.1-alpine
WORKDIR /app

COPY --from=BUILD_IMAGE /app/build .

# -----------------
EXPOSE 8888
ENTRYPOINT ["caddy", "file-server", "--listen", ":8888", "." ]