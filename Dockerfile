FROM node:16-alpine AS appbuild

WORKDIR /usr/src/app
COPY . .

RUN yarn install
RUN yarn run tsc


FROM node:16-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY --from=appbuild /usr/src/app/build ./build
COPY --from=appbuild /usr/src/app/node_modules  ./node_modules
EXPOSE 8080
CMD [ "node", "./build/index.js" ]

