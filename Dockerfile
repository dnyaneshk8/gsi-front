FROM node:10

WORKDIR /usr/src/app/

COPY package.json ./

COPY .babelrc ./

ENV npm_lifecycle_event=build

RUN yarn

COPY ./ ./

# RUN npm run test:all
RUN yarn build --no-cache

# CMD ["npm", "run", "build"]
