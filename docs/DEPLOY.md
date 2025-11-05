# Guía de Despliegue en Producción

Esta guía te ayudará a desplegar la aplicación MERN Herramientas AV en diferentes plataformas de hosting.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [AWS EC2](#aws-ec2)
- [DigitalOcean](#digitalocean)
- [Railway](#railway)
- [Render](#render)
- [Azure Container Apps](#azure-container-apps)
- [Configuración SSL](#configuración-ssl)

## Requisitos Previos

Antes de desplegar, asegúrate de tener:

- ✅ Docker y Docker Compose instalados en el servidor
- ✅ Dominio configurado (opcional pero recomendado)
- ✅ Certificados SSL (Let's Encrypt recomendado)
- ✅ Variables de entorno configuradas correctamente

## AWS EC2

### 1. Crear instancia EC2

1. **Accede a AWS Console** → EC2 → Launch Instance
2. **Selecciona AMI:** Ubuntu Server 22.04 LTS
3. **Tipo de instancia:** t2.medium (mínimo para correr MongoDB)
4. **Configura Security Group:**
   - Puerto 22 (SSH)
   - Puerto 80 (HTTP)
   - Puerto 443 (HTTPS)
   - Puerto 5000 (Backend - temporal para pruebas)

### 2. Conectar al servidor

```bash
ssh -i tu-llave.pem ubuntu@tu-ip-publica
```

### 3. Instalar Docker

```bash
# Actualizar paquetes
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Añadir usuario al grupo docker
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo apt install docker-compose -y

# Verificar instalación
docker --version
docker-compose --version
```

### 4. Desplegar la aplicación

```bash
# Clonar repositorio
git clone <tu-repositorio>
cd mern-herramientas-av-gestion

# Configurar variables de entorno
nano .env

# Construir y levantar contenedores
docker-compose up -d --build

# Verificar estado
docker-compose ps
docker-compose logs -f
```

### 5. Configurar dominio

```bash
# Instalar Nginx (proxy reverso)
sudo apt install nginx -y

# Crear configuración
sudo nano /etc/nginx/sites-available/herramientas
```

Añade:

```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    location / {
        proxy_pass http://localhost;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activar configuración
sudo ln -s /etc/nginx/sites-available/herramientas /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. Configurar SSL con Let's Encrypt

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# El certificado se renovará automáticamente
```

## DigitalOcean

### 1. Crear Droplet

1. **Accede a DigitalOcean** → Create Droplet
2. **Imagen:** Ubuntu 22.04 LTS
3. **Plan:** Basic ($12/mes - 2GB RAM mínimo)
4. **Datacenter:** El más cercano a tus usuarios
5. **Autenticación:** SSH keys (recomendado)

### 2. Configuración inicial

```bash
# Conectar
ssh root@tu-ip

# Crear usuario no-root
adduser deploy
usermod -aG sudo deploy
usermod -aG docker deploy

# Cambiar a usuario deploy
su - deploy
```

### 3. Instalar dependencias

```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalar Docker Compose
sudo apt install docker-compose -y
```

### 4. Desplegar

Sigue los mismos pasos que en AWS EC2 desde el punto 4.

### Ventajas de DigitalOcean:

- ✅ Interface más simple que AWS
- ✅ Precios predecibles
- ✅ Backups automáticos disponibles
- ✅ Firewall integrado fácil de configurar

## Railway

Railway es perfecto para despliegues rápidos sin configurar servidores.

### 1. Preparar el proyecto

Railway detecta Docker automáticamente. Solo necesitas:

```bash
# Asegúrate de tener estos archivos:
# - docker-compose.yml
# - Dockerfiles en client/ y server/
```

### 2. Desplegar

1. **Accede a [railway.app](https://railway.app)**
2. **Conecta tu repositorio de GitHub**
3. **Selecciona el proyecto**
4. **Railway detectará automáticamente Docker**
5. **Configura variables de entorno:**
   - `MONGO_USERNAME`
   - `MONGO_PASSWORD`
   - `MONGO_DB`
   - `NODE_ENV=production`

### 3. Configurar servicios

Railway puede separar los servicios:

- **MongoDB:** Usa el servicio de MongoDB de Railway
- **Backend:** Despliega desde `/server`
- **Frontend:** Despliega desde `/client`

### 4. Obtener URL

Railway te dará URLs automáticas:
- `tu-app.railway.app`
- Puedes conectar tu dominio personalizado

### Ventajas de Railway:

- ✅ Deploy con un click
- ✅ No necesitas gestionar servidores
- ✅ MongoDB incluido
- ✅ SSL automático
- ✅ Logs en tiempo real
- ✅ Plan gratuito disponible ($5 crédito/mes)

## Render

Similar a Railway pero con más control.

### 1. Preparar repositorio

Render también detecta Docker automáticamente.

### 2. Crear servicios

1. **Accede a [render.com](https://render.com)**
2. **Conecta GitHub**
3. **Crea 3 servicios:**

   **MongoDB:**
   - Tipo: Private Service
   - Usa imagen oficial: `mongo:7.0`
   - Environment: Variables de Mongo

   **Backend:**
   - Tipo: Web Service
   - Build Command: `docker build -f server/Dockerfile .`
   - Start Command: automático
   - Port: 5000

   **Frontend:**
   - Tipo: Static Site o Web Service
   - Build Command: `docker build -f client/Dockerfile .`
   - Port: 80

### 3. Conectar servicios

Render crea URLs internas para comunicación entre servicios.

### 4. Variables de entorno

Configura en cada servicio:

**Backend:**
```
MONGODB_URI=mongodb://mongo:27017/herramientas
NODE_ENV=production
PORT=5000
```

### Ventajas de Render:

- ✅ Plan gratuito generoso
- ✅ SSL automático
- ✅ Deploy automático en push
- ✅ Logs persistentes
- ✅ Fácil rollback

## Azure Container Apps

Ideal si ya usas el ecosistema de Microsoft.

### 1. Instalar Azure CLI

```bash
# Windows
winget install Microsoft.AzureCLI

# macOS
brew install azure-cli

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### 2. Login

```bash
az login
```

### 3. Crear recursos

```bash
# Variables
RESOURCE_GROUP="mern-herramientas-rg"
LOCATION="westeurope"
CONTAINER_APP_ENV="herramientas-env"

# Crear grupo de recursos
az group create --name $RESOURCE_GROUP --location $LOCATION

# Crear Container Apps Environment
az containerapp env create \
  --name $CONTAINER_APP_ENV \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION
```

### 4. Desplegar contenedores

```bash
# Backend
az containerapp create \
  --name backend \
  --resource-group $RESOURCE_GROUP \
  --environment $CONTAINER_APP_ENV \
  --image tu-registry/backend:latest \
  --target-port 5000 \
  --ingress external \
  --env-vars MONGODB_URI=secretref:mongodb-uri

# Frontend
az containerapp create \
  --name frontend \
  --resource-group $RESOURCE_GROUP \
  --environment $CONTAINER_APP_ENV \
  --image tu-registry/frontend:latest \
  --target-port 80 \
  --ingress external
```

### Ventajas de Azure:

- ✅ Escalado automático
- ✅ Integración con Azure Cosmos DB
- ✅ Monitorización avanzada
- ✅ Red privada entre servicios

## Configuración SSL

### Let's Encrypt (Gratuito)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado
sudo certbot --nginx -d tu-dominio.com

# Renovación automática (ya configurada)
sudo certbot renew --dry-run
```

### Cloudflare (Gratuito + CDN)

1. **Apunta tu dominio a Cloudflare**
2. **Configura DNS** apuntando a tu servidor
3. **Activa SSL/TLS** → Full (strict)
4. **Beneficios adicionales:**
   - CDN global gratuito
   - Protección DDoS
   - Cache automático
   - Analytics

### Manual con OpenSSL

```bash
# Generar certificado autofirmado (solo desarrollo)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/nginx-selfsigned.key \
  -out /etc/ssl/certs/nginx-selfsigned.crt
```

## Monitorización

### PM2 (para Node.js sin Docker)

```bash
npm install -g pm2
pm2 start server/server.js --name "herramientas-backend"
pm2 startup
pm2 save
```

### Docker Stats

```bash
# Ver uso de recursos
docker stats

# Ver logs
docker-compose logs -f backend
```

### Uptime Monitoring

Servicios recomendados:
- **UptimeRobot** (gratuito) - Ping cada 5 min
- **Pingdom** - Monitoring profesional
- **StatusCake** - Alternativa gratuita

## Backup

### MongoDB

```bash
# Backup manual
docker exec mern-herramientas-mongodb mongodump \
  --out /backup/$(date +%Y%m%d)

# Restaurar
docker exec mern-herramientas-mongodb mongorestore \
  /backup/20241105
```

### Automatizar backups

Crea un cron job:

```bash
crontab -e
```

Añade:

```cron
# Backup diario a las 2 AM
0 2 * * * docker exec mern-herramientas-mongodb mongodump --out /backup/$(date +\%Y\%m\%d)

# Limpiar backups antiguos (>30 días)
0 3 * * * find /backup -type d -mtime +30 -exec rm -rf {} +
```

## Troubleshooting

### Problema: Contenedor no inicia

```bash
# Ver logs detallados
docker-compose logs backend

# Reiniciar servicio
docker-compose restart backend

# Reconstruir desde cero
docker-compose down
docker-compose up -d --build
```

### Problema: MongoDB no conecta

```bash
# Verificar estado
docker-compose ps

# Ver logs de MongoDB
docker-compose logs mongodb

# Verificar red
docker network inspect mern-herramientas_mern-network
```

### Problema: Sin espacio en disco

```bash
# Limpiar imágenes no usadas
docker system prune -a

# Limpiar volúmenes no usados
docker volume prune
```

## Checklist de Producción

Antes de ir a producción, verifica:

- [ ] Variables de entorno configuradas en `.env`
- [ ] Credenciales de MongoDB seguras (no usar defaults)
- [ ] SSL/TLS configurado
- [ ] Firewall configurado (solo puertos necesarios)
- [ ] Backups automáticos configurados
- [ ] Monitoring activado
- [ ] Logs siendo recolectados
- [ ] Dominio apuntando correctamente
- [ ] Health checks funcionando
- [ ] Recursos del servidor adecuados
- [ ] `NODE_ENV=production`
- [ ] CORS configurado correctamente
- [ ] Rate limiting implementado (opcional)

## Recursos Adicionales

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [MongoDB Production Notes](https://docs.mongodb.com/manual/administration/production-notes/)
- [Let's Encrypt](https://letsencrypt.org/)
- [Nginx Configuration](https://nginx.org/en/docs/)

---

**¿Necesitas ayuda?** Abre un issue en el repositorio del proyecto.
