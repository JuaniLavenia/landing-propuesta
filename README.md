# Landing Page de Ventas

Landing page estática para vender el servicio de digitalización de negocios locales.

## Estructura

```
landing-venta/
├── index.html      # Landing page completa
├── package.json    # Configuración minimal
└── README.md       # Este archivo
```

## Deploy a Vercel

### Opción 1: CLI de Vercel (recomendado)

```bash
# En la carpeta landing-venta:
cd landing-venta
npx vercel
```

Te va a pedir login y te da una URL типа `landing-venta-xxxx.vercel.app`.

### Opción 2: Desde la web

1. Ir a https://vercel.com
2. "New Project"
3. Importar este repositorio o subir los archivos directamente
4. Listo!

## Personalización

### Cambiar datos de contacto
En `index.html`, buscar y reemplazar:
- `https://wa.me/5491112345678` → tu número de WhatsApp
- formspree endpoint → tu endpoint de Formspree o usar otro servicio

### Cambiar textos
Editar directamente el HTML, todos los textos están ahí.

## Tecnologías usadas
- Tailwind CSS via CDN (sin build)
- HTML semántico
- Responsive (funciona en móvil)