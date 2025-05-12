# Stage 1: Build the Vite application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
# If you use yarn, replace with: COPY yarn.lock ./ \n RUN yarn install --frozen-lockfile
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
# Replace 'build' with your actual build script name in package.json if different
RUN npm run build

# Stage 2: Serve the built application using a lightweight web server (e.g., Nginx)
FROM nginx:alpine

# Copy the built assets from the builder stage
# The default output for Vite is 'dist'. Adjust if your vite.config.js changes this.
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (default for Nginx)
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
