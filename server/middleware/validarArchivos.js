// Middleware de validación de archivos
const validarArchivoXLSX = (req, res, next) => {
    if (!req.file && !req.files) {
        return res.status(400).json({ 
            error: 'No se ha subido ningún archivo' 
        });
    }

    const file = req.file || req.files.reservas || req.files.apartamentos || req.files.file;
    
    if (!file) {
        return res.status(400).json({ 
            error: 'Archivo requerido no encontrado' 
        });
    }

    // Validar extensión
    const extensionesPermitidas = ['.xlsx', '.xls'];
    const extension = file.originalname.toLowerCase().slice(file.originalname.lastIndexOf('.'));
    
    if (!extensionesPermitidas.includes(extension)) {
        return res.status(400).json({ 
            error: 'Solo se permiten archivos XLSX o XLS',
            extensionRecibida: extension
        });
    }

    // Validar MIME type
    const mimeTypesPermitidos = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel', // .xls
    ];
    
    if (!mimeTypesPermitidos.includes(file.mimetype)) {
        return res.status(400).json({ 
            error: 'Tipo de archivo no permitido',
            tipoRecibido: file.mimetype
        });
    }

    // Validar tamaño (máximo 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        return res.status(400).json({ 
            error: 'El archivo es demasiado grande',
            tamañoMaximo: '10MB',
            tamañoRecibido: `${(file.size / 1024 / 1024).toFixed(2)}MB`
        });
    }

    next();
};

// Validar múltiples archivos
const validarMultiplesArchivos = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ 
            error: 'No se han subido archivos' 
        });
    }

    const archivos = Object.values(req.files);
    const maxSize = 10 * 1024 * 1024; // 10MB

    for (const file of archivos) {
        // Validar extensión
        const extension = file.originalname.toLowerCase().slice(file.originalname.lastIndexOf('.'));
        if (!['.xlsx', '.xls'].includes(extension)) {
            return res.status(400).json({ 
                error: `Archivo ${file.originalname}: solo se permiten archivos XLSX o XLS` 
            });
        }

        // Validar MIME type
        const mimeTypesPermitidos = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
        ];
        if (!mimeTypesPermitidos.includes(file.mimetype)) {
            return res.status(400).json({ 
                error: `Archivo ${file.originalname}: tipo de archivo no permitido` 
            });
        }

        // Validar tamaño
        if (file.size > maxSize) {
            return res.status(400).json({ 
                error: `Archivo ${file.originalname}: el archivo es demasiado grande (máx. 10MB)` 
            });
        }
    }

    next();
};

module.exports = {
    validarArchivoXLSX,
    validarMultiplesArchivos
};
