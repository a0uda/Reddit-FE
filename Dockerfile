FROM node:alpine as builder

WORKDIR /app
COPY ./Frontend/package.json ./
RUN npm install
COPY . .
RUN npm run build || (echo "Build failed with exit code $?"; exit 1)

FROM nginx
EXPOSE 3000
COPY ./Frontend/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html