FROM node:16-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/configfile.template


ENV PORT 5173
ENV HOST 0.0.0.0
EXPOSE 5173

CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

HEALTHCHECK CMD curl --fail http://localhost:5173/health || exit 1
