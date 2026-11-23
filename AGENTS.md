# Plataforma de Gestión — Cabildo Indígena de Venecia

Prototipo web de la entrega integradora **GA6-220501096 (AA3 + AA4)** para el Cabildo Indígena de Venecia. El contexto general del proyecto abarca comuneros, familias, fichas censales, solicitudes, certificados, actas históricas/etiquetas y noticias; esa enumeración **no es una lista de módulos obligatorios**. Las funcionalidades y pantallas de esta evidencia se determinarán **exclusivamente** a partir de las HU y RF aprobados. Usuarios y roles del sistema: Administrador, Líder y Miembro. La interfaz final es una **aplicación de una sola página** con JavaScript puro y vistas diferenciadas. El código se evalúa junto con el PDF y la bitácora; este archivo también es evidencia (Sección 1).

## Reglas obligatorias

- Solo **HTML5, CSS3 y JavaScript puro**. Nada de frameworks ni librerías (React, Vue, Tailwind, Bootstrap, etc.), CDNs, npm, bundlers ni otras dependencias. No crear `package.json` ni instalar paquetes.
- Esta entrega es **solo interfaz**. Prohibido expresamente: backend, API (incluidas `fetch` y `XMLHttpRequest`), base de datos, Supabase, `localStorage`, `sessionStorage`, IndexedDB y cualquier mecanismo equivalente de persistencia (`window.name`, `history.state`, cookies, caché, `BroadcastChannel`, `SharedWorker`). Las simulaciones se realizan exclusivamente en memoria mediante JavaScript: la sesión y los datos viven en variables y se pierden al recargar o cerrar la página.
- Interfaz 100 % en español, incluidos botones, mensajes y estados. Archivos, rutas y clases en español kebab-case (`index.html`, `datos.js`, `#/registrar-comunero`, `.boton-principal`).
- Datos, nombres y documentos **ficticios**. Los campos de contraseña y sus validaciones están permitidos, pero deben usar únicamente credenciales ficticias de ejemplo; nunca credenciales reales.
- **Antes de crear o modificar archivos, muestra el plan y espera confirmación.**
- Las pantallas se derivan **exclusivamente** de las HU y RF aprobados en `docs/historias.md` y `docs/requisitos.md`. No inventes requisitos, pantallas, módulos ni funcionalidades para completar el número de interfaces. Si un requisito no está aprobado, no lo implementes.
- **Diseño responsivo obligatorio**: la interfaz debe verse y funcionar bien en celular, tableta y escritorio, sin scroll horizontal.
- **Un único `styles.css`** para todos los estilos del proyecto. No crear otros archivos CSS ni usar bloques `<style>` o atributos `style=""` en las vistas finales.
- UTF-8 y `lang="es"`; verifica tildes y eñes al copiar texto de las maquetas.

## Orden de trabajo

> **Arranque documental:** si `docs/historias.md` o `docs/requisitos.md` no existen, puedes proponer su contenido inicial a partir de la documentación de referencia del proyecto y del contexto del Cabildo. Presenta la propuesta para revisión y aprobación; hasta que se apruebe, es un borrador y no debe usarse para construir pantallas.

1. `docs/historias.md`: mínimo 8 HU «Como… quiero… para…», criterios de aceptación y prioridad MoSCoW.
2. `docs/requisitos.md`: RF-01…, «El sistema debe…», HU de origen y prioridad.
3. `docs/componentes.md`: nombre, elemento HTML, clase CSS y pantallas donde se usa.
4. `prototipo/`: una pantalla HTML en escala de grises por nodo, navegable, sin estilos finales.
5. `styles.css` (tokens en `:root` + una clase por componente), `plantilla.html` (header/nav/main/footer) y `componentes.html` (todos los estados).
6. `docs/interfaces.md`: mapa de las vistas finales con su ruta, su maqueta de origen, sus códigos HU/RF, su acceso, sus datos y sus estados. Se escribe antes de programar y no crea requisitos nuevos.
7. Interfaz final: una sola aplicación en `index.html` con las vistas diferenciadas que se desprendan de las HU/RF aprobados. La guía exige entre 12 y 20 interfaces y al menos 2 vistas móviles; cada vista cuenta como una interfaz. Si las HU/RF aprobados no permiten ese mínimo, no inventes vistas: repórtalo y espera aprobación.
8. Auditoría: etiquetas, foco, contraste, consola, enlaces y rutas, responsive, historial del navegador y ausencia de persistencia/API.

No crees la interfaz final antes de completar los pasos 1–6.

## Estructura

- La interfaz final es **una sola página**: `index.html` contiene el armazón de `plantilla.html` y una sección por vista, oculta con `hidden` cuando no está activa. No se crean archivos `.html` por vista.
- Cada vista conserva el `h1`, la línea de trazabilidad y el marcado de su maqueta de `prototipo/`; los `id` se prefijan por vista para que no colisionen dentro del documento único.
- `docs/`, `prototipo/`, `js/`, `styles.css`, `plantilla.html`, `componentes.html`.
- `plantilla.html` y `componentes.html` no son destinos de navegación.
- El armazón de `index.html` parte de `plantilla.html` y usa solo clases de `styles.css`. Si falta un componente, agrégalo primero a `styles.css`, a `componentes.html` y a `docs/componentes.md`; después úsalo.
- En la interfaz final no uses `<style>` ni `style=""`; no dupliques CSS por vista.
- Las vistas se derivan exclusivamente de las HU y RF aprobados. No hay una lista fija de módulos obligatorios ni se crean vistas para alcanzar un número.
- `js/` contiene solo la capa de interfaz y la simulación en memoria, en guiones clásicos (sin módulos ES) para que la aplicación funcione al abrir `index.html` con `file://`. No reproduce la arquitectura de capas de EV05.
- EV05 propone `/src/{interfaz,negocio,repositorio,modelo}` para la implementación futura; **no** apliques esa estructura aquí: esta entrega es solo UI.

## Sistema visual

- Tokens existentes: `--verde:#174A35`, `--verde-hover:#103725`, `--crema:#F5F1E7`, `--gris:#292D2A`, `--blanco:#FFFFFF`, `--borde:#D6D2C9`, `--texto-secundario:#626762`, `--error:#A12622`; agrega `--foco:#B78328`.
- Tipografía Arial/Helvetica/sans-serif, base 16px, `line-height:1.5`; contenedor máximo 1200px; encabezado verde y fondo crema.
- Foco visible: `outline:3px solid var(--foco); outline-offset:3px`.
- HTML semántico (`header`, `nav`, `main`, `section`, `table`, `form`); cada campo con `<label for>` e `id`; el error va junto al campo, no en `alert()`.
- Iconos en SVG inline; no uses Font Awesome ni fuentes externas.
- Navegación interna con enlaces reales a rutas declaradas en una única tabla de rutas (`href="#/solicitudes"`). Toda ruta enlazada debe existir y toda vista debe tener su ruta.
- No dejes `href="#"` ni enlaces sin destino en la interfaz final. La única excepción es el enlace «Saltar al contenido», que apunta al ancla `#contenido`.

## Trazabilidad

- Bajo el `<h1>` de cada vista, registra **todos** los códigos `RF-xx` y `HU-xx` que esa interfaz cumple. Una vista puede estar relacionada con varias HU y varios RF; no omitas ninguno.
- Usa los códigos exactos de `docs/historias.md` y `docs/requisitos.md`; no renombres ni crees códigos nuevos.
- La tabla de rutas repite, por vista, su ruta, su título y sus códigos HU/RF; debe coincidir con lo que muestra la vista y con `docs/interfaces.md`.
- En la ficha documental de cada vista (nombre, ruta, RF/HU, descripción, decisión de accesibilidad) lista todos los RF y HU correspondientes, no solo uno.
- Antes de entregar, verifica la trazabilidad completa: cada HU y RF aprobado debe poder ubicarse en una o más vistas o en la ficha de la vista que lo implementa. Si un requisito aprobado no tiene vista, no inventes una interfaz: repórtalo para revisión.

## Verificación

No hay build, lint, typecheck ni tests; no agregues un runner.

- Abre `index.html` en el navegador y recorre las doce rutas revisando la consola sin errores.
- Comprueba el botón Atrás y Adelante, la recarga en una ruta privada y la navegación completa con teclado.
- Prueba el envío de formularios con campos vacíos, el error junto al campo y las confirmaciones.
- Revisa 360 px, 768 px y 1280 px sin scroll horizontal (DevTools: Ctrl+Shift+M).
- Confirma que no existan llamadas a backend/API (`fetch`, `XMLHttpRequest`) ni uso de `localStorage`, `sessionStorage`, IndexedDB, `window.name`, `history.state`, cookies, `BroadcastChannel` o `SharedWorker`; toda simulación debe vivir solo en memoria.
- Confirma que exista un único `styles.css` y que la interfaz final no use `<style>` ni `style=""`.
- Confirma que cada vista mueva el foco a su `h1` al activarse, actualice `document.title` y marque una sola opción con `aria-current="page"`.
- Una vista no está lista hasta haberla abierto y recorrido en el navegador.

## Material de referencia

- `Referencias\GA6-AA3-AA4_Guia_entregable_integrador.pdf`: reglas, checklist y estructura de la entrega.
- `Referencias\GA6-AA3-AA4_Agentes_RodaBike.pdf`: ejemplo del flujo; no copies sus pantallas ni lo entregues como propio.
- `Referencias\EV02_Informe_entregables_diseno.pdf`: alcance, usuarios y procesos del proyecto para el borrador inicial de HU/RF.
- `Referencias\EV05_Plataforma-Cabildo-indigena-Venecia.pdf` y `Referencias\BD_CabildoIndigenaVenecia_3336064.txt`: dominio, clases y esquema de datos.
- `..\..\html\Maquetas-Cabildo\`: referencia de paleta y formularios. Usa solo los valores visuales; esas maquetas tienen CSS embebido que **no** debe copiarse.

## Entregable

- Un solo PDF para las seis evidencias; el código es apoyo (repo público o ZIP).
- No inventes capturas, prompts ni entradas de bitácora; la bitácora requiere mínimo 6 entradas reales y 3 correcciones propias.
- Registra en la bitácora las decisiones que cambien la arquitectura o estas reglas —por ejemplo, adoptar una aplicación de una sola página—, con fecha, motivo y efecto. No inventes entradas.
- Mantén este `AGENTS.md` actualizado: se captura como evidencia.
