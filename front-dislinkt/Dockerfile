#stage 1
FROM node:16-alpine3.12 as builder

WORKDIR /app

COPY . .

#RUN npm install

#RUN npm run build --prod

RUN wget -c https://github.com/dusan-madzarevic/dislinkt-frontend/releases/latest/download/dislinkt-front-latest.tar.gz -O - | tar -xz

#stage 2
FROM nginx:alpine
EXPOSE 8000
COPY --from=builder /app/dist/front-dislinkt /usr/share/nginx/html
