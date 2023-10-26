# Use an official Node runtime as the base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /rest

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Migrate the database
# RUN npx prisma migrate deploy

# Bundle app source
COPY . .

# Run the app when the container launches
CMD ["npm", "start"]