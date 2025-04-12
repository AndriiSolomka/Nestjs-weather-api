FROM node:20-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
USER node
RUN npm install
COPY . .
RUN npx prisma generate --schema ./prisma/schema.prisma
EXPOSE 3000
CMD [ "npm", "start", "start:dev" ]