# pull official base image
FROM node:14.3.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

# Expose API port to the outside
EXPOSE 4200

# start app
CMD ["npm", "start"]
