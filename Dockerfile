FROM node:18 AS construcao

WORKDIR /projeto

COPY . .

RUN npm install

RUN npm run build  

FROM nginx:alpine AS final

COPY --from=construcao /projeto/dist/lab-school /usr/share/nginx/html

EXPOSE 80