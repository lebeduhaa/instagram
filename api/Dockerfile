FROM node
RUN ["npm", "install", "bcrypt"]
WORKDIR /index
COPY package.json /index
RUN npm install
COPY . /index/
CMD ["npm", "start"]