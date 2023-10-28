FROM node:18-alpine

ENV HOST='0.0.0.0'
ENV PORT='8080'

WORKDIR /app

COPY ./ /app

RUN yarn install
RUN yarn run build

EXPOSE 8080

CMD [ "yarn", "run", "dev" ]