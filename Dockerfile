FROM node:8.10 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# How to build it?
# docker build -t cra-docker .

# How to run it?
# docker run -p 8080:80 cra-docker

# Then enter ${YOUR_DOCKER-MACHINE_IP}:8080 in your browser
