FROM node:alpine as builder

ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

WORKDIR /app
COPY ./Frontend/package.json ./
RUN npm install --legacy-peer-deps
RUN npm install --save-dev typescript
RUN npm install --save-dev vite
COPY ./Frontend .
RUN npm run buildDev

FROM nginx
EXPOSE 3000
COPY ./Frontend/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html