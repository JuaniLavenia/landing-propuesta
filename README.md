# Codbyte — Landing

Landing de Codbyte (digitalización de negocios locales en San Miguel de Tucumán) y demos para mostrar a clientes.

## Stack

- Astro 5 + Tailwind CSS 3 (sitio estático)
- Formspree para el formulario de contacto
- Google Sheets como fuente de datos de los catálogos demo

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Datos de contacto

Todo está centralizado en `src/config/site.ts` (nombre, WhatsApp, endpoint de Formspree).
**Antes de publicar, reemplazá el número de WhatsApp de ejemplo.**

## Demos

| Ruta | Descripción |
| --- | --- |
| `/demos/visual-detailing` | Catálogo de Visual Detailing (paquete Básico). Variable: `VISUAL_DETAILING_SHEET_URL` |
| `/demos/dulcemood` | Carta de la pastelería DulceMood (paquete Básico). Variable: `DULCEMOOD_SHEET_URL` |

### Conectar una demo a Google Sheets

1. Creá una planilla con estas columnas en la primera fila:
   `nombre, marca, categoria, precio, stock, imagen, descripcion`
2. Archivo → Compartir → Publicar en la web → elegí la hoja y el formato **CSV** → Publicar.
3. Copiá la URL y cargala como variable de entorno del build:

```bash
VISUAL_DETAILING_SHEET_URL="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
```

Si la variable no está o la planilla no responde, el build usa los datos de ejemplo de `src/data/<demo>.csv`.

Los datos se leen **en el build**: un cambio en la planilla aparece en el sitio después del próximo deploy. Para automatizarlo, programá un deploy hook (por ejemplo, cada hora).

- `imagen`: URL pública de la foto (opcional; sin foto se muestra la marca).
- `stock`: `0` muestra "Sin stock" ("Por encargo" en DulceMood) y de `1` a `3` muestra "Últimas unidades" ("Quedan pocas").
- `marca`: opcional (DulceMood la deja vacía).
