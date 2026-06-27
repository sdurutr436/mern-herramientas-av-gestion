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

# Plantilla de nginx + script de arranque (rellenan $PORT y el resolver DNS)
COPY nginx.conf /etc/nginx/nginx.conf.template
COPY start.sh /start.sh
RUN sed -i 's/\r$//' /start.sh && chmod +x /start.sh

# Railway inyecta $PORT; fallback 80 para ejecución local
ENV PORT=80
EXPOSE 80

CMD ["/start.sh"]
