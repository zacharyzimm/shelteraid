# Stage 1: Build the React app
FROM node:16 AS build

WORKDIR /app

COPY package.json ./ 
COPY package-lock.json ./

RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./

RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove the default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output to the Nginx html folder
COPY --from=build /app/build /usr/share/nginx/html



# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

