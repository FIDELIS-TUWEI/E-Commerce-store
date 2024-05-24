# Use the official Node.js 20 Alpine image
FROM node:20-alpine3.18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Run npm install
RUN npm install

# Bundle app source
COPY . .

# Copy the .env file
COPY .env ./

# Expose port specified in the env file
ARG PORT
ENV PORT=$PORT
EXPOSE $PORT

# Run the development server
CMD ["npm", "run", "dev"]