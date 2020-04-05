FROM node:12.8.1-alpine

# Set working directory
RUN mkdir app
WORKDIR /app

# Copy package.json
COPY ./package.json .

# Copy yarn.lock
COPY ./yarn.lock .

# Install node modules
RUN yarn install

# Copy source code into the image
COPY . .

# start app
CMD ["yarn", "start-local"]