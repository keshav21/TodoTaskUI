# Use an official Node.js runtime as a parent image
FROM node:16.10.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application files to the working directory
COPY . .

# Build the React application
RUN yarn build

# Install a lightweight web server to serve the build files
RUN yarn global add serve

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "build", "-l", "3000"]
