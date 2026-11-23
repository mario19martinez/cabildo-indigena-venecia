# Plataforma de Gestión — Cabildo Indígena de Venecia

## Descripción

Prototipo académico de interfaz web para la gestión del Cabildo Indígena de Venecia, desarrollado como evidencia integradora del SENA: **GA6-220501096 (AA3 + AA4)** y **GA7-220501096-AA1-EV02**.

La plataforma contempla tres roles: **Administrador**, **Líder** y **Miembro**. Las pantallas se derivan exclusivamente de las historias de usuario y los requisitos funcionales aprobados en `docs/historias.md` y `docs/requisitos.md`; no existen módulos ni funcionalidades fuera de ese alcance.

Estado actual: **maqueta de interfaz**, no un sistema en producción.

- Implementado: HTML5, CSS3 y JavaScript puro (guiones clásicos), en una aplicación de una sola página (`index.html`) con doce vistas diferenciadas y navegación por rutas `#/…`.
- **Sin backend, sin API, sin base de datos y sin persistencia.** La sesión y los datos viven únicamente en memoria: al recargar o cerrar la página se restablecen los valores iniciales.
- Todos los datos, nombres, documentos y credenciales son **ficticios**.
- **React, Vite, Tailwind CSS, Node.js, Express y PostgreSQL son tecnologías proyectadas, no implementadas.** No forman parte del código de esta entrega y no se requieren para ejecutarla.

Documentación del proyecto:

| Archivo | Contenido |
|---|---|
| `docs/historias.md` | Historias de usuario con criterios de aceptación y prioridad MoSCoW |
| `docs/requisitos.md` | Requisitos funcionales y su trazabilidad con las HU |
| `docs/componentes.md` | Componentes de interfaz, elemento HTML y clase CSS |
| `docs/interfaces.md` | Mapa de las doce vistas, rutas, datos, estados y decisiones |

Estructura del repositorio:

```text
index.html          Aplicación de una sola página (armazón y vistas)
styles.css          Único archivo de estilos del proyecto
js/                 Capa de interfaz y simulación en memoria
prototipo/          Maquetas de baja fidelidad en escala de grises
plantilla.html      Plantilla de referencia del armazón (no es una vista)
componentes.html    Catálogo de componentes y estados (no es una vista)
docs/               Documentación de análisis, diseño e interfaces
```

## Instalación

No hay dependencias, paquetes ni proceso de compilación: el proyecto no usa `npm`, ni bundlers, ni frameworks, y no incluye `package.json`.

1. Descargue o clone el repositorio en una carpeta local. Mientras el repositorio remoto no esté publicado, utilice la carpeta del proyecto tal como se entrega.
2. Verifique que la carpeta conserve la estructura anterior; `index.html`, `styles.css` y `js/` deben quedar en la raíz.

No se requiere instalar nada más ni ejecutar comandos adicionales.

## Uso

1. Abra `index.html` con doble clic o desde el menú «Abrir con» de su navegador. Funciona directamente con el protocolo `file://`.
2. Navegue con el menú principal o escribiendo la ruta en la barra de direcciones: `#/noticias`, `#/iniciar-sesion`, `#/inicio`, `#/registrar-solicitud`, `#/mis-solicitudes`, `#/mis-certificados`, `#/solicitudes`, `#/comuneros`, `#/registrar-comunero`, `#/ficha-censal`, `#/crear-cuenta` y `#/cuentas`.
3. Inicie sesión con una de las cuentas de demostración ficticias documentadas en `docs/interfaces.md` §8.1. El menú cambia según el rol autenticado y las rutas privadas redirigen al acceso cuando no hay sesión.
4. Los botones Atrás y Adelante del navegador funcionan sobre las rutas internas. Al recargar, la sesión y los datos vuelven a su estado inicial.

`plantilla.html` y `componentes.html` son archivos de referencia: no se abren desde la navegación de la aplicación.

## Autor

**Mario Martinez Dominguez** — Aprendiz SENA, ficha **3336064**.

Proyecto académico con datos ficticios, elaborado como evidencia del programa de formación. No representa información real del Cabildo Indígena de Venecia ni sustituye un sistema institucional.
