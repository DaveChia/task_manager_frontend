# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of your application's code
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 80

# Define the command to run your application
CMD [ "npm", "run", "build" ]
