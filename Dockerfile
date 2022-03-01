FROM node:12-alpine
# Adding build tools to make yarn install work on Apple silicon / arm64 machines
RUN apk add --no-cache python2 g++ make
WORKDIR /src
COPY . .
RUN npm install --production
CMD ["node", "customStart","--","mysql","3306","gazin","secret"]
