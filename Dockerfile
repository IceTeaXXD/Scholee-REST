# Use the official Node.js image as the base image
FROM node:21.1.0

# Set the working directory in the container
WORKDIR /app

COPY package*.json ./
COPY ./prisma/schema.prisma ./prisma/
COPY .env ./

RUN yarn install
RUN npx prisma generate

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]