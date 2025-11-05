# Usar imagen oficial de Node.js
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Crear directorio para uploads
RUN mkdir -p uploads

# Exponer puerto
EXPOSE 5000

# Variables de entorno por defecto (se pueden sobrescribir)
ENV NODE_ENV=production
ENV PORT=5000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
