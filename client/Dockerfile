# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Declarar ARG para recibir la variable durante el build
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build de la aplicación React
RUN npm run build

# Etapa 2: Producción con nginx
FROM nginx:alpine

# Copiar build de React a nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuración de nginx como plantilla (se rellena $PORT al arrancar)
COPY nginx.conf /etc/nginx/nginx.conf.template

# Railway inyecta $PORT; fallback 80 para ejecución local
ENV PORT=80
EXPOSE 80

# Sustituir solo $PORT y arrancar nginx
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
