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

# Expose port 5000
EXPOSE 5000

# Run the development server
CMD ["npm", "run", "dev"]