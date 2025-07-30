FROM node:20.10.0-alpine as build

ARG REACT_APP_NODE_ENV
ARG API_HOST
ARG REVALIDATE_TOKEN

RUN echo "${REACT_APP_NODE_ENV}"
RUN echo "${API_HOST}"
RUN echo "${REVALIDATE_TOKEN}"

WORKDIR /app

COPY . .
COPY yarn.stable.lock yarn.lock

RUN yarn install
RUN yarn build

# Serve app with nginx
FROM nginx:1.21-alpine
COPY --from=build /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


