#!/bin/bash

# Script de inicio rápido para Docker
echo "🚀 Iniciando MERN Herramientas AV..."

# Verificar si existe .env
if [ ! -f .env ]; then
    echo "⚠️  No se encontró archivo .env"
    echo "📝 Creando desde .env.example..."
    cp .env.example .env
    echo "✅ Archivo .env creado. Por favor, edita las credenciales antes de continuar."
    echo "   nano .env"
    exit 1
fi

# Verificar que Docker esté corriendo
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker no está corriendo. Por favor, inicia Docker Desktop."
    exit 1
fi

echo "🐳 Construyendo contenedores..."
docker-compose up -d --build

echo ""
echo "✅ Aplicación iniciada!"
echo ""
echo "📍 Accede a la aplicación:"
echo "   Frontend: http://localhost"
echo "   Backend:  http://localhost:5000"
echo "   MongoDB:  localhost:27017"
echo ""
echo "📊 Ver logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Detener aplicación:"
echo "   docker-compose down"
