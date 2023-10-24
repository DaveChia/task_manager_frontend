# Use the official Nginx image as a parent image
FROM nginx

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy your Vue.js app's build files to the Nginx document root
COPY dist/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80
