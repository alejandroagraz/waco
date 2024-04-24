FROM node:18.15.0-alpine3.17 As development

WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN yarn install

RUN yarn run build

FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/app/dist/frontend /usr/share/nginx/html

EXPOSE 4200:80
CMD ["nginx", "-g", "daemon off;"]


