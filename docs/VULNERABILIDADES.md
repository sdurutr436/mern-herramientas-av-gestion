# Notas de Seguridad sobre Vulnerabilidades Conocidas

## Vulnerabilidad en `xlsx` (Paquete de Excel)

### Estado Actual
- **Paquete:** `xlsx@0.18.5`
- **Severidad:** Alta
- **Problema:** 
  1. Prototype Pollution
  2. Regular Expression Denial of Service (ReDoS)

### ¿Por qué no se puede arreglar automáticamente?
El paquete `xlsx` no tiene una versión actualizada que corrija estas vulnerabilidades. Es un problema conocido de la biblioteca.

### ¿Es peligroso?
**En este proyecto: RIESGO BAJO** porque:

1. ✅ Los archivos XLSX solo son procesados en el **servidor** (no en el cliente)
2. ✅ Tenemos **validación estricta** de archivos (tipo, tamaño, extensión)
3. ✅ Tenemos **rate limiting** que limita las subidas a 10 por 15 minutos
4. ✅ Los archivos se procesan de forma **aislada** y se borran después
5. ✅ No ejecutamos código arbitrario de los archivos

### Mitigaciones Implementadas

```javascript
// 1. Validación estricta en validarArchivos.js
- Solo .xlsx y .xls permitidos
- Verificación de MIME type
- Tamaño máximo: 10MB
- No se guardan permanentemente

// 2. Rate limiting en todas las rutas de upload
- Máximo 10 uploads cada 15 minutos por IP

// 3. Sanitización de datos
- express-mongo-sanitize previene inyecciones
```

### Alternativas Evaluadas

1. **ExcelJS** (✅ YA INSTALADO)
   - Más moderno y sin vulnerabilidades conocidas
   - Podrías migrar a este en el futuro
   
2. **node-xlsx** 
   - Wrapper más simple, pero depende de `xlsx` también

3. **fast-xlsx**
   - Alternativa más ligera, pero menos funcionalidades

### Recomendación

**OPCIÓN 1 (Recomendada):** Migrar a ExcelJS

Ya tienes `exceljs@4.4.0` instalado. Podrías reescribir los parsers para usar ExcelJS en lugar de xlsx.

**OPCIÓN 2:** Mantener xlsx con mitigaciones

Si prefieres mantener xlsx (funciona bien actualmente), las mitigaciones implementadas reducen significativamente el riesgo.

### Monitoreo

Revisa regularmente si hay actualizaciones:

```bash
npm outdated
npm audit
```

Suscríbete a alertas de GitHub:
- https://github.com/SheetJS/sheetjs/security

### Plan de Acción Futuro

- [ ] Evaluar migración a ExcelJS (sin vulnerabilidades)
- [ ] Documentar diferencias de API entre xlsx y exceljs
- [ ] Crear tests antes de migrar
- [ ] Migrar parseXLSX.js y parseXLSXHuesped.js
- [ ] Probar con archivos reales
- [ ] Eliminar dependencia de xlsx

---

**Conclusión:** La aplicación es segura en producción con las mitigaciones actuales. La vulnerabilidad de xlsx tiene riesgo bajo en este contexto específico, pero se recomienda migrar a ExcelJS en una futura actualización.
