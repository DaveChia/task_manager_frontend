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

# Add your entrypoint script to the container
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# Build your Vue project (you might need to adjust this command)
RUN npm run build

# Expose the port the app will run on
EXPOSE 8080

# Start the app using the entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]