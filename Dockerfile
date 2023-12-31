# use node 16 alpine image as build image
FROM node:18-alpine as builder

# update and install the latest dependencies for the alpine version
RUN apk update && apk upgrade

# create work directory in app folder
WORKDIR /app

# install required packages for node image
RUN apk --no-cache add openssh g++ make python3 git

# copy over package.json files
COPY package* /app
COPY yarn* /app

# install all depencies
RUN yarn install && yarn cache clean --force

# copy over all files to the work directory
ADD . /app

# build the project
RUN yarn build

# start final image
FROM node:18-alpine

# update and install the latest dependencies for the alpine version
RUN apk update && apk upgrade

WORKDIR /app

# copy over build files from builder step
COPY --from=builder /app  /app

# expose the host and port 3000 to the server
ENV HOST=0.0.0.0 PORT=8080 NODE_ENV=production CHOKIDAR_USEPOLLING=true
EXPOSE 8080

# run the build project with node
ENTRYPOINT ["node", ".output/server/index.mjs"]