@echo off
REM Script de inicio rápido para Docker en Windows

echo 🚀 Iniciando MERN Herramientas AV...
echo.

REM Verificar si existe .env
if not exist .env (
    echo ⚠️  No se encontró archivo .env
    echo 📝 Creando desde .env.example...
    copy .env.example .env
    echo ✅ Archivo .env creado. Por favor, edita las credenciales antes de continuar.
    echo    notepad .env
    exit /b 1
)

REM Verificar que Docker esté corriendo
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker no está corriendo. Por favor, inicia Docker Desktop.
    exit /b 1
)

echo 🐳 Construyendo contenedores...
docker-compose up -d --build

echo.
echo ✅ Aplicación iniciada!
echo.
echo 📍 Accede a la aplicación:
echo    Frontend: http://localhost
echo    Backend:  http://localhost:5000
echo    MongoDB:  localhost:27017
echo.
echo 📊 Ver logs:
echo    docker-compose logs -f
echo.
echo 🛑 Detener aplicación:
echo    docker-compose down
echo.
pause
