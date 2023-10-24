# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Build your Vue project (you might need to adjust this command)
RUN npm run build

# Expose the port the app will run on
EXPOSE 8080

# Start the app
CMD [ "npm", "run", "serve" ]
