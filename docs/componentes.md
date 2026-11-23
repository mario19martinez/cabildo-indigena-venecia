# Componentes reutilizables y plantilla común

Documentación técnica de la evidencia integradora **GA6-220501096 (AA3 + AA4)** para la Plataforma de Gestión del Cabildo Indígena de Venecia.

> **Alcance de este documento.** Describe los componentes que ya existen en las doce maquetas de `prototipo/`, la plantilla común (`plantilla.html`) y la guía visual (`componentes.html`). No es un módulo de la plataforma, no amplía las historias de usuario ni sustituye `docs/historias.md` o `docs/requisitos.md`. Tampoco es un segundo documento integrador del SENA.

## 1. Propósito

1. Fijar el inventario real de componentes, sus clases y sus pantallas de uso.
2. Servir de referencia para construir las interfaces finales de AA4 sin reinventar marcado ni estilos.
3. Evitar que la capa de maqueta (fichas, sellos y variantes estáticas) se filtre a las pantallas definitivas.
4. Registrar las reglas de accesibilidad y la trazabilidad de cada componente con las HU y los RF aprobados.

## 2. Cómo se usa

- **Para crear una vista final:** la interfaz es una sola página (`index.html`). Cada vista es una `section` con `data-vista` e `id="vista-<clave>"`, oculta con `hidden` cuando no está activa. Se copia el armazón de `plantilla.html` una sola vez y se agrega el contenido de la vista con el prefijo de su clave en los `id`, `for` y referencias `aria-*`. No se crean archivos `.html` por vista.
- **Para registrar una ruta:** se agrega o ajusta su entrada en `js/rutas.js`, que es la única tabla de rutas, y se comprueba que exista la sección correspondiente en `index.html`.
- **Para consultar un componente:** se abre `componentes.html` en el navegador o se revisan las maquetas de `prototipo/`; ambos son material de referencia, no destinos de navegación.
- **Para agregar un componente:** primero se define la clase en `styles.css`, se documenta aquí, se muestra en `componentes.html` y solo después se usa en una vista. Así lo exige `AGENTS.md`.
- `plantilla.html` y `componentes.html` **no son destinos de navegación** de la plataforma: no se enlazan desde el menú ni desde las vistas.

## 3. Capas de estilo y tokens

`styles.css` es el único archivo CSS. Los componentes no usan colores hexadecimales: consumen tokens semánticos.

| Capa | Selector | Uso |
|---|---|---|
| Interfaz final | `:root` | Paleta institucional y tokens semánticos de AA4 |
| Maqueta de baja fidelidad | `body.baja-fidelidad` | Redefine los mismos tokens en escala de grises para `prototipo/` |

Las doce maquetas llevan `body class="baja-fidelidad"`, por lo que conservan su presentación en grises. `plantilla.html` y `componentes.html` no llevan esa clase y muestran la identidad definitiva.

### 3.1 Paleta de marca

| Token | Valor | Uso |
|---|---|---|
| `--verde` | `#174A35` | Color principal, encabezado y botón primario |
| `--verde-hover` | `#103725` | Estado hover del botón primario |
| `--crema` | `#F5F1E7` | Fondo general |
| `--gris` | `#292D2A` | Texto principal y bordes fuertes |
| `--blanco` | `#FFFFFF` | Superficies y texto sobre verde |
| `--borde` | `#D6D2C9` | Separadores decorativos |
| `--texto-secundario` | `#626762` | Texto secundario y bordes de controles |
| `--error` | `#A12622` | Mensajes de error |
| `--foco` | `#B78328` | Anillo interior del foco |
| `--relleno` | `#EBE6D8` | Relleno secundario de paneles, avisos y encabezados de tabla |

### 3.2 Tokens semánticos

| Token | Interfaz final | Maqueta | Función |
|---|---|---|---|
| `--superficie` | `#FFFFFF` | `#FFFFFF` | Fondo de tarjetas, campos y tablas |
| `--fondo` | `#F5F1E7` | `#F2F2F0` | Fondo de la página |
| `--relleno` | `#EBE6D8` | `#E7E7E4` | Paneles, avisos y cabeceras |
| `--texto` | `#292D2A` | `#232623` | Texto principal |
| `--texto-suave` | `#626762` | `#4A4E4A` | Texto secundario |
| `--linea` | `#D6D2C9` | `#8A8F8A` | Separadores decorativos |
| `--linea-control` | `#626762` | `#8A8F8A` | Bordes de controles |
| `--linea-fuerte` | `#292D2A` | `#3A3E3A` | Bordes de énfasis |
| `--acento` | `#174A35` | `#333733` | Botón primario |
| `--acento-hover` | `#103725` | `#141714` | Hover del botón primario |
| `--texto-acento` | `#FFFFFF` | `#FFFFFF` | Texto sobre acento |
| `--fondo-encabezado` | `#174A35` | `#FFFFFF` | Fondo del encabezado |
| `--texto-encabezado` | `#FFFFFF` | `#232623` | Texto del encabezado |
| `--error` | `#A12622` | `#232623` | Texto de error |
| `--foco` | `#B78328` | `#0B0D0B` | Anillo interior del foco |
| `--foco-contraste` | `#292D2A` | `#FFFFFF` | Anillo exterior del foco |

## 4. Inventario de componentes

Pantallas de las maquetas: **N** `index` · **S** `iniciar-sesion` · **I** `inicio` · **RS** `registrar-solicitud` · **MS** `mis-solicitudes` · **MC** `mis-certificados` · **TS** `solicitudes` · **C** `comuneros` · **RC** `registrar-comunero` · **FC** `registrar-ficha-censal` · **CC** `crear-cuenta` · **CU** `cuentas`.

Vistas de la interfaz final: `#/noticias` · `#/iniciar-sesion` · `#/inicio` · `#/registrar-solicitud` · `#/mis-solicitudes` · `#/mis-certificados` · `#/solicitudes` · `#/comuneros` · `#/registrar-comunero` · `#/ficha-censal` · `#/crear-cuenta` · `#/cuentas`. Los componentes de esta tabla se reutilizan en esas doce secciones de `index.html`.

| # | Componente | Elemento base | Clases | Pantallas | Reutilización |
|---|---|---|---|---|---|
| 1 | Salto al contenido | `a` | `.salto-contenido` | todas | Directa |
| 2 | Encabezado institucional | `header` | `.encabezado-sitio`, `__interior`, `.identidad-sitio`, `.nombre-sitio` | todas | Directa |
| 3 | Sello de maqueta | `p` | `.sello-mockup` | todas | Solo maqueta |
| 4 | Navegación principal | `nav`, `ul`, `a` | `.menu-principal`, `__lista`, `__enlace` | todas | Directa; menú provisional de doce rutas en la Etapa 1, variantes por rol en la Etapa 2 |
| 5 | Contenedor y títulos | `div`, `h1`, `h2` | `.contenedor`, `.contenido-principal`, `.contenido-angosto`, `.titulo-pantalla`, `.titulo-seccion` | todas | Directa |
| 6 | Trazabilidad | `p` | `.trazabilidad` | todas | Directa; obligatoria en cada pantalla |
| 7 | Tarjeta | `section` | `.tarjeta`, `__titulo`, `--rol` | todas / I | Directa |
| 8 | Rejilla de accesos | `div`, `article`, `ul` | `.rejilla`, `.lista-accesos`, `.tarjeta--rol` | I | Directa |
| 9 | Marca de pendiente | `span` | `.marca-pendiente` | I | Solo maqueta |
| 10 | Lista de noticias | `ul`, `li`, `article` | `.lista-noticias`, `.noticia`, `__titulo`, `__fecha` | N | Directa |
| 11 | Botón principal | `a` o `button` | `.boton-principal` | S, RS, RC, FC, CC, C | Directa |
| 12 | Botón secundario | `a` o `button` | `.boton-secundario` | RC, FC, CC | Directa |
| 13 | Fila de acciones | `div` | `.acciones` | RC, FC, CC | Directa |
| 14 | Formulario y campos | `form`, `div`, `label`, `input`, `select`, `textarea` | `.formulario`, `.campo`, `__etiqueta`, `__control`, `__ayuda`, `.area-texto` | S, RS, RC, FC, CC, CU, TS | Directa |
| 15 | Error de campo | `div`, `p` | `.campo--error`, `.mensaje-error` | S, RS, RC, CC | Directa |
| 16 | Tabla adaptable | `table` | `.tabla-datos`, `__leyenda`, `[data-etiqueta]`, `.celda-secundaria` | MS, MC, TS, C, CU | Directa |
| 17 | Etiqueta de rol | `span` | `.etiqueta-rol` | TS, C, RC, FC, CC, CU | Directa |
| 18 | Etiqueta de estado | `span` | `.etiqueta-estado` + variantes | MS, MC, TS, CU | Directa |
| 19 | Aviso | `p` | `.aviso` | 10 de las doce vistas | Directa |
| 20 | Confirmación | `p` | `.mensaje-exito` | S, RS, RC, FC, CC, CU, TS | Directa |
| 21 | Estado vacío | `div`, `p` | `.estado-vacio` | N, MS, MC, TS, C, CC, CU | Directa |
| 22 | Resumen de solo lectura | `dl`, `div`, `dt`, `dd` | `.resumen`, `__fila` | TS, FC, CC, CU | Directa |
| 23 | Indicador de pasos | `ol`, `li`, `span` | `.pasos`, `__item`, `__numero`, `--actual`, `--completado` | RC, FC | Directa |
| 24 | Variante de ejemplo | `section`, `p` | `.ejemplo-visual`, `.etiqueta-ejemplo` | 11 pantallas | Solo maqueta |
| 25 | Ficha documental | `aside`, `dl` | `.ficha-mockup`, `__titulo`, `__lista`, `__fila` | todas | Solo maqueta |
| 26 | Bloque de código | `pre`, `code` | `.bloque-codigo` | guía | Solo guía |

## 5. Fichas de componentes

### 5.1 Salto al contenido

- **Propósito:** permitir que quien navega con teclado evite el menú y llegue al contenido.
- **Marcado:** primer elemento de `body`; `a.salto-contenido` con destino `#contenido`.
- **Reglas:** el `main` debe tener `id="contenido"`; el enlace se oculta fuera de pantalla y aparece al recibir foco.
- **En la aplicación de una sola página:** `js/navegacion.js` intercepta el clic, conserva el hash de la ruta activa y mueve el foco al `h1` de la vista visible, que tiene `tabindex="-1"`. Así el salto no se interpreta como una ruta desconocida.
- **Accesibilidad:** no debe eliminarse en ninguna vista. Su foco usa el indicador de dos tonos.

### 5.2 Encabezado institucional

- **Propósito:** identificar el Cabildo y alojar la navegación.
- **Clases:** `.encabezado-sitio`, `.encabezado-sitio__interior`, `.identidad-sitio`, `.nombre-sitio`.
- **Reglas:** el nombre del Cabildo es un `p`, no un `h1`; el `h1` pertenece al contenido. En la interfaz final el encabezado va en verde con texto blanco; en la maqueta, en blanco con texto oscuro.
- **Accesibilidad:** `header` como landmark; contraste de 10,16:1 (blanco sobre verde). No incluye el sello de maqueta ni la etiqueta de rol.

### 5.3 Navegación principal

- **Propósito:** ofrecer los accesos disponibles según la zona y el rol.
- **Clases:** `.menu-principal`, `.menu-principal__lista`, `.menu-principal__enlace`, `[aria-current="page"]`.
- **Estado en la Etapa 1:** `js/navegacion.js` construye un menú provisional con las doce rutas de `js/rutas.js` y un aviso global explica que todavía no existe control de acceso. Todas las opciones están disponibles para pruebas estructurales.
- **Variantes previstas para la Etapa 2:**
  - **Pública:** Noticias · Iniciar sesión.
  - **Miembro:** Inicio · Registrar solicitud · Mis solicitudes · Mis certificados · Noticias · Cerrar sesión.
  - **Líder:** Inicio · Todas las solicitudes · Comuneros · Crear cuenta · Noticias · Cerrar sesión.
  - **Administrador:** Inicio · Todas las solicitudes · Comuneros · Cuentas de usuario · Noticias · Cerrar sesión.
- **Reglas:** una sola opción con `aria-current="page"` por vista; el cierre de sesión se rotulará como simulación mientras no exista sesión funcional. El menú se genera desde la tabla de rutas y no se escribe a mano en cada vista.
- **Accesibilidad:** `nav` con `aria-label="Navegación principal (modo de prueba)"` en la Etapa 1, lista real y enlaces de 44 px de alto. No se representa una matriz de permisos (R-10): la restricción se mostrará por ausencia de la opción.

### 5.4 Contenedor, títulos y trazabilidad

- **Clases:** `.contenedor` (máximo 1200 px), `.contenido-angosto` (máximo 640 px), `.contenido-principal`, `.titulo-pantalla`, `.titulo-seccion`, `.trazabilidad`.
- **Reglas:** un solo `h1` por vista; sin saltos de nivel; la trazabilidad va inmediatamente bajo el `h1` con los códigos exactos de `docs/historias.md` y `docs/requisitos.md`.
- **En la aplicación de una sola página:** cada vista es una `section[data-vista]` con `aria-labelledby` hacia su `h1`; el `h1` lleva `tabindex="-1"` para recibir el foco cuando cambia la ruta. Solo una vista está visible a la vez y `document.title` se actualiza desde la tabla de rutas.
- **Accesibilidad:** `main` con `id="contenido"`; la trazabilidad es información documental obligatoria, no una acción.

### 5.5 Pie de página

- **Clases:** `.pie-sitio`.
- **Reglas:** `footer` con dos párrafos breves; en la interfaz final informa el carácter académico y la ausencia de persistencia.
- **Accesibilidad:** texto secundario de 5,78:1 sobre blanco.

### 5.6 Tarjeta

- **Clases:** `.tarjeta`, `.tarjeta__titulo`, `.tarjeta--rol`.
- **Reglas:** cada tarjeta se asocia a su título con `aria-labelledby`; `.tarjeta--rol` se usa en la rejilla de accesos y no lleva margen inferior.
- **Accesibilidad:** `section` con encabezado propio; no se usa para decorar.

### 5.7 Rejilla y listas de accesos

- **Clases:** `.rejilla`, `.lista-accesos`, `.tarjeta--rol`, `.marca-pendiente`.
- **Reglas:** una columna a 360 px y tres desde 768 px. `.marca-pendiente` es exclusiva de la maqueta de `inicio.html` y no debe copiarse.
- **Accesibilidad:** listas con viñetas reales; los enlaces conservan su texto completo.

### 5.8 Lista de noticias

- **Clases:** `.lista-noticias`, `.noticia`, `.noticia__titulo`, `.noticia__fecha`.
- **Reglas:** cada noticia es un `article` dentro de un `li`; la fecha usa `time datetime`. No hay enlace de detalle (R-05).
- **Accesibilidad:** encabezados de nivel 3 dentro de la sección; no se depende del color.

### 5.9 Botones y acciones

- **Clases:** `.boton-principal`, `.boton-secundario`, `.acciones`.
- **Reglas:** altura mínima de 48 px; el primario es verde con texto blanco; el secundario es blanco con borde oscuro y subrayado. En una vista se usa `a` para navegar y `button` para ejecutar una acción; en la guía se muestran como elementos no interactivos. En celular ocupan el ancho completo y se apilan; desde 768 px pasan a fila.
- **En la Etapa 1:** los `button` nativos heredan `font-family`, `font-size` y `line-height` para no perder el peso tipográfico de la clase; llevan `cursor: pointer`. Las acciones todavía no funcionales se marcan con `data-pendiente` y un aviso textual; no simulan resultados. En el Bloque 2 el botón de registro de solicitud ya es funcional y no lleva esa marca.
- **Accesibilidad:** texto explícito, foco de dos tonos, contraste de 10,16:1 en el primario. No se agrega un estado deshabilitado general: la única excepción es el botón de registro de solicitud, que se deshabilita después de un alta correcta y se rehabilita al escribir un tipo no vacío o al volver a la vista (DP-06).

### 5.10 Formulario y campos

- **Clases:** `.formulario`, `.campo`, `.campo__etiqueta`, `.campo__control`, `.campo__ayuda`, `.area-texto`.
- **Reglas:** cada control tiene `<label for>` e `id`; la ayuda se enlaza con `aria-describedby`; los formularios de maqueta usan `novalidate` y no llevan `name`; los campos de contraseña usan `autocomplete="new-password"` o `current-password` según corresponda.
- **Accesibilidad:** borde de control de 5,78:1 sobre blanco; el error se muestra junto al campo con `aria-invalid` y nunca en `alert()`. A 360 px todos los controles ocupan el ancho disponible.

### 5.11 Tabla adaptable

- **Clases:** `.tabla-datos`, `.tabla-datos__leyenda`, `[data-etiqueta]`, `.celda-secundaria`.
- **Reglas:** por debajo de 768 px la tabla se apila: el `thead` queda oculto visualmente y cada celda muestra su etiqueta con `td::before { content: attr(data-etiqueta) }`. Desde 768 px vuelve a ser una tabla real. El marcado conserva `role="table"`, `role="rowgroup"`, `role="row"`, `role="cell"` y `role="columnheader"` para sostener la semántica cuando cambia el `display`.
- **Accesibilidad:** `caption`, `th scope="col"`, una etiqueta `data-etiqueta` por celda y ningún desplazamiento horizontal. Al generar filas desde datos simulados, el texto de `data-etiqueta` debe mantenerse sincronizado con la columna.

### 5.12 Etiqueta de rol

- **Clases:** `.etiqueta-rol`.
- **Reglas:** muestra Administrador, Líder o Miembro con texto real; las mayúsculas son solo `text-transform`. Se usa en el encabezado de las maquetas con rol representado y en las tablas de cuentas.
- **Accesibilidad:** contraste de 12,34:1 sobre el relleno de maqueta y de 11,21:1 sobre el relleno final; el texto no depende del color.

### 5.13 Etiqueta de estado

- **Clases:** `.etiqueta-estado` y variantes `--pendiente`, `--en-revision`, `--aprobada`, `--rechazada`, `--completada`, `--vigente`, `--anulado`, `--activo`, `--inactivo`, `--bloqueado`.
- **Reglas:** el estado de una solicitud usa las cinco primeras; el de un certificado, `--vigente` y `--anulado`; el de una cuenta, `--activo`, `--inactivo` y `--bloqueado`. La variante `--completada` se incorporó para cubrir el quinto estado de HU-09 / RF-12, que ya aparece en el selector de `solicitudes.html` pero no tenía estilo propio.
- **Accesibilidad:** cada variante combina texto, borde y relleno; ninguna se distingue solo por color. El estado de una cuenta es de solo lectura y no lleva controles (R-09).

### 5.14 Mensajes

- **Clases:** `.aviso`, `.mensaje-exito`, `.mensaje-error`.
- **Reglas:** el aviso es informativo y usa el relleno secundario; la confirmación es un bloque con borde fuerte; el error va junto al campo. En la interfaz final el texto completo se escribe en el HTML (`Error: …`, `Confirmación: …`). Los prefijos automáticos `::before` existen solo bajo `body.baja-fidelidad` para no alterar las maquetas.
- **Estado:** en la Etapa 1 los contenedores de error, confirmación y vacío se conservan ocultos en el marcado. En el Bloque 2 el formulario de solicitud valida en memoria, muestra el error junto al campo y la confirmación con resumen; los demás formularios siguen sin guardar ni enviar información.
- **Accesibilidad:** la confirmación del alta usa `role="status"`; el error se asocia con `aria-describedby` y `aria-invalid`. No se usan ventanas emergentes.

### 5.15 Estado vacío

- **Clases:** `.estado-vacio`.
- **Reglas:** sustituye al listado o al formulario cuando no hay datos; no se muestra al mismo tiempo que el contenido.
- **Accesibilidad:** texto centrado con 5,78:1 sobre blanco; el mensaje describe la situación sin ofrecer acciones inexistentes.

### 5.16 Resumen de solo lectura

- **Clases:** `.resumen`, `.resumen__fila`.
- **Reglas:** `dl` con `dt` y `dd`; repite datos sin controles. Se usa para el comunero del paso 1, la confirmación de una solicitud y el cambio de rol.
- **Accesibilidad:** a 360 px cada fila es una columna; desde 768 px pasa a dos columnas de 220 px y el resto.

### 5.17 Indicador de pasos

- **Clases:** `.pasos`, `.pasos__item`, `.pasos__numero`, `.pasos__item--actual`, `.pasos__item--completado`.
- **Reglas:** `ol` con `aria-label`; exactamente un elemento con `aria-current="step"`. El estado se escribe en el texto («completado», «paso actual») además del estilo.
- **Accesibilidad:** los pasos se envuelven en celular sin scroll horizontal; el número no es el único indicador.

### 5.18 Bloque de código

- **Clases:** `.bloque-codigo`.
- **Reglas:** exclusivo de `componentes.html`. Usa `white-space: pre-wrap` y `overflow-wrap: anywhere` para no generar desplazamiento horizontal a 360 px.
- **Accesibilidad:** el código se muestra como texto; no se ejecuta ni se copia automáticamente.

### 5.19 Clases exclusivas de maqueta

No deben copiarse a las interfaces finales:

| Clase | Motivo |
|---|---|
| `.sello-mockup` | Rotula la baja fidelidad |
| `.ficha-mockup`, `.ficha-mockup__titulo`, `.ficha-mockup__lista`, `.ficha-mockup__fila` | Ficha académica de cada maqueta |
| `.ejemplo-visual`, `.etiqueta-ejemplo` | Variantes estáticas que no son estados activos |
| `.marca-pendiente` | Señal de pantalla actual en `inicio.html` |

La interfaz final `index.html` no usa ninguna de estas clases: conserva el contenido y la semántica de las maquetas, pero retira el sello, la ficha documental, los ejemplos visuales y la marca de pendiente. Los estados de error, confirmación y vacío se mantienen como contenedores ocultos del componente correspondiente, no como ejemplos de maqueta.

## 6. Patrones de página

Los patrones se aplican dentro de una sola página: comparten el encabezado, el menú, el `main` y el pie, y solo cambia la sección visible.

| Patrón | Composición | Vistas de referencia |
|---|---|---|
| Zona pública | Encabezado + menú + tarjeta + pie | `#/noticias` |
| Acceso | Contenedor angosto + formulario + aviso de etapa | `#/iniciar-sesion` |
| Área autenticada | Rejilla de tarjetas por rol | `#/inicio` |
| Listado | `h1` + tarjeta + tabla adaptable + estado vacío | `#/solicitudes`, `#/comuneros`, `#/cuentas` |
| Formulario breve | Contenedor angosto + tarjeta + campos + acciones | `#/registrar-solicitud`, `#/crear-cuenta` |
| Proceso en dos pasos | Pasos + resumen + formulario + acciones | `#/registrar-comunero`, `#/ficha-censal` |
| Solo lectura | Tarjeta + tabla o resumen sin controles | `#/mis-solicitudes`, `#/mis-certificados` |

## 7. Reglas de accesibilidad

1. **Foco:** `outline: 3px solid var(--foco)` con `outline-offset: 0` y `box-shadow: 0 0 0 6px var(--foco-contraste)`. El dorado aporta la identidad; el anillo oscuro garantiza el mínimo en fondos claros.
2. **Contraste medido:** texto 12,39:1 sobre crema y 13,97:1 sobre blanco; secundario 5,12:1 sobre crema; blanco sobre verde 10,16:1; error 6,61:1 sobre crema; borde de control 5,78:1 sobre blanco.
3. **Foco medido:** dorado 3,34:1 sobre blanco, 3,04:1 sobre verde y 2,96:1 sobre crema; el anillo oscuro aporta 12,39:1 sobre crema y 11,21:1 sobre el relleno. La combinación cubre fondos claros y oscuros.
4. **Bordes:** `--linea-control` (`#626762`) para controles; `--linea` (`#D6D2C9`) solo para separadores decorativos.
5. **Etiquetas:** todo control tiene `<label for>` e `id`; las ayudas y los errores se enlazan con `aria-describedby`.
6. **Errores:** junto al campo, con `aria-invalid="true"`; nunca en `alert()`.
7. **Estado actual:** `aria-current="page"` en la navegación y `aria-current="step"` en el proceso.
8. **Tablas:** `caption`, `th scope="col"`, roles explícitos y `data-etiqueta` por celda.
9. **Jerarquía:** un solo `h1`; sin saltos de nivel; landmarks `header`, `nav`, `main`, `footer`.
10. **Color:** ningún estado, error o rol se comunica solo por color; siempre hay texto.
11. **Objetivos:** botones y enlaces de acción con 48 px de alto mínimo; opciones del menú con 44 px.
12. **Responsive:** puntos de quiebre en 768 px y 1200 px; una columna a 360 px; sin scroll horizontal. El bloque de código usa `pre-wrap`.
13. **Vista activa:** cada vista es una `section[data-vista]`; las inactivas llevan `hidden`. La regla `[hidden] { display: none !important; }` evita que los `display` de `.tabla-datos` o `.rejilla` vuelvan a mostrarlas.
14. **Cambio de ruta:** al activar una vista se actualiza `document.title`, se marca un solo enlace con `aria-current="page"` y el foco pasa al `h1` (`tabindex="-1"`). La carga inicial no mueve el foco; Atrás y Adelante del navegador se resuelven con `hashchange`.
15. **Formularios:** el envío se intercepta y se cancela; ninguna vista recarga la página ni transmite datos.

## 8. Convenciones de código

- Archivos en kebab-case y en español: `index.html`, `js/rutas.js`, `js/navegacion.js`, `registrar-comunero.html` en `prototipo/`.
- Clases en español, BEM con `__` para elementos y `--` para variantes.
- Una clase por componente; los estados se expresan con variantes, no con estilos en línea.
- Sin `<style>` ni `style=""` en las vistas finales.
- Sin `href="#"`: los enlaces apuntan a rutas `#/…` declaradas en `js/rutas.js` o al ancla `#contenido` del salto.
- Sin `name` en los formularios y sin envío real: `js/navegacion.js` cancela el evento `submit`.
- Scripts clásicos, sin módulos ES: `js/rutas.js` declara la tabla única de rutas y `js/navegacion.js` implementa el enrutador y el foco.
- Sin dependencias externas, CDN, frameworks, backend, API ni almacenamiento de ningún tipo; la simulación vive solo en memoria.

## 9. Trazabilidad componente → HU/RF

| Componente | HU | RF |
|---|---|---|
| Navegación y control de acceso | HU-01, HU-02 | RF-02, RF-03 |
| Formulario de acceso | HU-01 | RF-01 |
| Creación de cuenta y rol automático | HU-03 | RF-04 |
| Tabla y etiquetas de cuentas | HU-04 | RF-05, RF-06 |
| Lista de noticias | HU-05 | RF-07 |
| Formulario de solicitud | HU-06 | RF-08 |
| Tabla de solicitudes propias | HU-07 | RF-09 |
| Tabla de certificados | HU-08 | RF-10 |
| Tabla de todas las solicitudes y estados | HU-09 | RF-11, RF-12 |
| Indicador de pasos, formulario de comunero y ficha censal | HU-10 | RF-13, RF-14 |
| Avisos, confirmaciones, errores y estados vacíos | HU-01, HU-03, HU-06, HU-09, HU-10 | RF-01, RF-04, RF-08, RF-12, RF-13 |

## 10. Pendientes y fuera de alcance

- **Botón deshabilitado:** no se agrega como estado general; solo el botón de registro de solicitud se deshabilita temporalmente después de un alta correcta para evitar un segundo envío (DP-06).
- **Creación de cuentas por el Administrador:** sigue pendiente (P-07) y no se representa.
- **Componentes de familias, actas, etiquetas, perfil o noticias administrativas:** no están aprobados (P-01 a P-13) y no se crean.
- **Sesión en memoria y validaciones funcionales:** el Bloque 1 implementó la sesión y el control de acceso; el Bloque 2, la validación y el alta de solicitudes; el Bloque 3, el cambio de estado de una solicitud (RF-12) y el cambio de rol (RF-06). El censo y la creación de cuentas siguen pendientes.
- **D-11:** la restricción de acceso directo a la ficha censal se implementará en la Etapa 2; en la Etapa 1 «Continuar» solo demuestra la navegación y advierte que no hay borrador guardado.
- **D-12:** el Bloque 2 implementó la confirmación del alta dentro de `#/registrar-solicitud`; las confirmaciones de censo y cuentas se implementan en sus bloques.
- **D-14 y panel de credenciales (P-4):** se documentarán e implementarán en la Etapa 2, no en esta estructura.
- **Verificación visual:** la auditoría de navegador se ejecutó en el ancho disponible del entorno. Las comprobaciones a 360, 768 y 1280 px no pudieron ejecutarse por falta de una herramienta de cambio de viewport y quedan pendientes; se revisó el CSS de los puntos de quiebre de forma estática.

## 11. Registro de cambios

| Fecha | Cambio |
|---|---|
| 15/11/2026 | Creación del documento con el inventario real de las doce maquetas, la estrategia de dos capas de `styles.css`, la plantilla común y la guía visual. |
| 15/11/2026 | Etapa 1: se documenta la aplicación de una sola página (`index.html`), la tabla de rutas de `js/rutas.js`, el enrutador de `js/navegacion.js`, el menú provisional de doce rutas, el salto al contenido interceptado, el foco del `h1`, la regla `[hidden]` y las acciones marcadas con `data-pendiente`. |
| 19/11/2026 | Bloque 2: el formulario de solicitud registra en memoria (HU-06), muestra la confirmación con resumen y conserva las consultas de solicitudes y certificados; se retira `data-pendiente` de ese botón y se documenta su deshabilitado temporal. |
| 22/11/2026 | HU-09 / RF-12: el selector de estado de `#/solicitudes` deja de estar deshabilitado; la confirmación en línea reutiliza `.acciones`, `.boton-principal`, `.boton-secundario`, `.resumen` y `.mensaje-exito`, sin componentes nuevos. |
| 22/11/2026 | HU-04 / RF-06: el selector de rol de `#/cuentas` se habilita para el Administrador y reutiliza la misma confirmación en línea; la fila propia conserva el texto «No puede cambiar su propio rol». |
