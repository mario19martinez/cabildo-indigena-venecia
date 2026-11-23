# Interfaces finales — mapa, rutas y fichas

Documentación técnica de la evidencia integradora **GA6-220501096 (AA3 + AA4)** para la Plataforma de Gestión del Cabildo Indígena de Venecia.

> **Alcance de este documento.** Describe las doce vistas finales, sus rutas, sus datos y su comportamiento previsto. No amplía `docs/historias.md` ni `docs/requisitos.md`, no crea requisitos ni permisos, y no es un entregable académico independiente: el entregable es el PDF integrador. Cuando existe discrepancia, mandan las historias y los requisitos aprobados.

## 1. Propósito y alcance

1. Fijar el mapa verificable **HU → RF → vista** de la interfaz final.
2. Servir de guía de implementación para AA4 sin reabrir decisiones ya aprobadas.
3. Documentar el estado en memoria, la sesión simulada y sus límites.
4. Permitir que las fichas del PDF se redacten a partir de datos ciertos y no de memoria.

Este documento **no** implementa nada: la Etapa 0 es solo documental. Las vistas se construyen en las etapas siguientes, previa autorización.

---

## 2. Arquitectura de la interfaz

### 2.1 Aplicación de una sola página

La interfaz final es una **aplicación de una sola página** con HTML5, CSS3 y JavaScript puro:

- Un único `index.html` contiene el armazón y las doce vistas.
- JavaScript alterna la vista activa sin recargar el documento.
- Los datos y la sesión viven en variables de memoria y se pierden al recargar o cerrar.
- No hay backend, API, base de datos ni almacenamiento persistente de ningún tipo.

La decisión se adoptó porque las HU exigen que los cambios se reflejen entre vistas dentro de la misma sesión (HU-06 → HU-07, HU-09 → HU-07, HU-03 → HU-04, HU-10 → listado de comuneros). Con documentos separados, la memoria de JavaScript se destruye en cada navegación y solo podría sobrevivir usando almacenamiento, que está prohibido por R-02.

### 2.2 Composición de `index.html`

```text
index.html
├─ a.salto-contenido            → #contenido
├─ header.encabezado-sitio      → identidad + nav generada por rol
├─ main#contenido
│  ├─ section#vista-noticias        (hidden)
│  ├─ section#vista-iniciar-sesion  (hidden)
│  ├─ section#vista-inicio          (hidden)
│  ├─ section#vista-registrar-solicitud
│  ├─ section#vista-mis-solicitudes
│  ├─ section#vista-mis-certificados
│  ├─ section#vista-solicitudes
│  ├─ section#vista-comuneros
│  ├─ section#vista-registrar-comunero
│  ├─ section#vista-ficha-censal
│  ├─ section#vista-crear-cuenta
│  └─ section#vista-cuentas
├─ footer.pie-sitio
└─ scripts clásicos en js/ (sin type="module")
```

Reglas:

- El armazón parte de `plantilla.html` **una sola vez**.
- Cada sección conserva el `h1`, la línea de trazabilidad y el marcado de su maqueta.
- La sección activa es la única sin `hidden`.
- Los `id` internos se prefijan con la clave de la vista.
- Las vistas conservan el contenido y la semántica de las maquetas de `prototipo/`; solo se excluyen los elementos exclusivos de baja fidelidad (PE-12). Las filas estáticas se sustituyen por el renderizado desde la semilla sin cambiar columnas, leyendas ni etiquetas.

### 2.3 Guiones clásicos

Se usan etiquetas `<script src="js/…"></script>` sin `type="module"`, porque los módulos ES se bloquean por CORS al abrir el archivo con `file://`, que es la forma de revisión usada en el proyecto. La comunicación entre archivos se hace mediante un espacio de nombres mínimo y un único objeto de estado.

### 2.4 Por qué no multipágina

| Criterio | Multipágina | Una sola página |
|---|---|---|
| Conserva datos entre vistas | No, salvo almacenamiento prohibido | Sí, en memoria |
| Cumple R-02 | Solo si cada pantalla es una simulación aislada | Sí |
| Duplica cabecera y menú | Doce veces | Una vez |
| Historial y «Atrás» | Nativo | Con `location.hash` |

---

## 3. Convenciones

### 3.1 Identificadores

- Sección de vista: `vista-<clave>` (`vista-mis-solicitudes`).
- Identificadores internos: `<clave>-<nombre>` (`solicitudes-titulo-listado`, `acceso-error-credenciales`).
- El prefijo resuelve las colisiones detectadas en las maquetas: `titulo-vacio` (7 vistas), `titulo-listado` (5), `form-titulo` (5), `titulo-confirmacion` (5), `titulo-error` (2), además de `contenido` y `ficha-titulo` (12 cada uno, que desaparecen al existir un solo `main` y ninguna ficha de maqueta).
- Todo `for`, `aria-labelledby` y `aria-describedby` debe apuntar a un `id` existente **dentro de la misma vista**.

### 3.2 Rutas internas

| Clave | Ruta | Título de la vista |
|---|---|---|
| noticias | `#/noticias` | Noticias del Cabildo |
| iniciar-sesion | `#/iniciar-sesion` | Iniciar sesión |
| inicio | `#/inicio` | Inicio |
| registrar-solicitud | `#/registrar-solicitud` | Registrar solicitud |
| mis-solicitudes | `#/mis-solicitudes` | Mis solicitudes |
| mis-certificados | `#/mis-certificados` | Mis certificados |
| solicitudes | `#/solicitudes` | Todas las solicitudes |
| comuneros | `#/comuneros` | Comuneros |
| registrar-comunero | `#/registrar-comunero` | Registrar comunero |
| ficha-censal | `#/ficha-censal` | Ficha censal |
| crear-cuenta | `#/crear-cuenta` | Crear cuenta de acceso |
| cuentas | `#/cuentas` | Cuentas de usuario |

- Ruta vacía, `#/` o desconocida → `#/noticias`.
- `document.title` = título de la vista + « — Cabildo Indígena de Venecia».

### 3.3 Nombres

- Archivos y carpetas en kebab-case y español (`index.html`, `js/datos.js`).
- Clases BEM en español, ya existentes en `styles.css`. No se inventan clases nuevas sin documentarlas antes.
- Funciones en camelCase español (`registrarSolicitud`, `cambiarEstadoSolicitud`).

### 3.4 Terminología

| Término | Significado |
|---|---|
| **Vista** | Cada una de las doce interfaces de la aplicación final |
| **Pantalla** | Término histórico de las maquetas de AA3; se conserva en `prototipo/` |
| **Maqueta** | Archivo de `prototipo/` en escala de grises, intacto |
| **Ruta** | Identificador `#/…` que activa una vista |

---

## 4. Mapa de las doce vistas

### 4.1 Zonas y navegación por rol

| Zona | Opciones del menú |
|---|---|
| Pública | Noticias · Iniciar sesión |
| Miembro | Inicio · Registrar solicitud · Mis solicitudes · Mis certificados · Noticias · Cerrar sesión |
| Líder | Inicio · Todas las solicitudes · Comuneros · Crear cuenta · Noticias · Cerrar sesión |
| Administrador | Inicio · Todas las solicitudes · Comuneros · Cuentas de usuario · Noticias · Cerrar sesión |

El menú se genera desde la tabla de rutas filtrada por el rol de la sesión. No se representa una matriz de permisos (R-10): la restricción se muestra por ausencia de la opción y por la guarda de la ruta. «Cerrar sesión» es un `button`, no un enlace de navegación.

### 4.2 Tabla maestra

| # | Vista | Ruta | Maqueta de origen | HU | RF | Acceso |
|---|---|---|---|---|---|---|
| 1 | Noticias públicas | `#/noticias` | `prototipo/index.html` | HU-05 | RF-07 | Público |
| 2 | Iniciar sesión | `#/iniciar-sesion` | `prototipo/iniciar-sesion.html` | HU-01 | RF-01, RF-02 | Público |
| 3 | Inicio autenticado | `#/inicio` | `prototipo/inicio.html` | HU-01, HU-02 | RF-02, RF-03 | Administrador, Líder y Miembro |
| 4 | Registrar solicitud | `#/registrar-solicitud` | `prototipo/registrar-solicitud.html` | HU-06 | RF-02, RF-08, RF-09 | Miembro |
| 5 | Mis solicitudes | `#/mis-solicitudes` | `prototipo/mis-solicitudes.html` | HU-07 | RF-09 | Miembro |
| 6 | Mis certificados | `#/mis-certificados` | `prototipo/mis-certificados.html` | HU-08 | RF-10 | Miembro |
| 7 | Todas las solicitudes | `#/solicitudes` | `prototipo/solicitudes.html` | HU-09 | RF-02, RF-11, RF-12 | Líder y Administrador |
| 8 | Comuneros | `#/comuneros` | `prototipo/comuneros.html` | HU-10 | RF-13 | Líder y Administrador |
| 9 | Registrar comunero | `#/registrar-comunero` | `prototipo/registrar-comunero.html` | HU-10 | RF-13 | Líder y Administrador |
| 10 | Ficha censal | `#/ficha-censal` | `prototipo/registrar-ficha-censal.html` | HU-10 | RF-14 | Líder y Administrador, con borrador |
| 11 | Crear cuenta | `#/crear-cuenta` | `prototipo/crear-cuenta.html` | HU-03 | RF-04 | Solo Líder |
| 12 | Cuentas de usuario | `#/cuentas` | `prototipo/cuentas.html` | HU-04 | RF-05, RF-06 | Solo Administrador |

Son exactamente doce. No se agregan vistas para alcanzar un número: las doce provienen de las diez HU aprobadas.

### 4.3 El proceso en dos pasos

Las vistas 9 y 10 son **dos pasos del mismo proceso** (HU-10), no dos módulos:

- La vista 10 no aparece en el menú.
- Solo se llega desde la 9, con un borrador en memoria.
- Si se accede sin borrador, se redirige a la 9 con un aviso (D-11).
- El comunero aparece en la vista 8 **solo** al confirmar la 10.
- Cancelar en la 9 limpia el borrador; volver desde la 10 lo conserva.
- Ningún paso crea una cuenta de acceso (R-08).

---

## 5. Trazabilidad

### 5.1 HU → vistas

| HU | Nombre | Vistas |
|---|---|---|
| HU-01 | Iniciar sesión | 2, 3 |
| HU-02 | Cerrar sesión | 3 |
| HU-03 | Crear cuentas de acceso | 11 |
| HU-04 | Consultar cuentas y asignar roles | 12 |
| HU-05 | Consultar noticias públicas | 1 |
| HU-06 | Registrar solicitud | 4 |
| HU-07 | Consultar solicitudes propias | 5 |
| HU-08 | Consultar certificados propios | 6 |
| HU-09 | Consultar todas las solicitudes y actualizar su estado | 7 |
| HU-10 | Registrar comunero y su ficha censal | 8, 9, 10 |

Las diez HU quedan representadas. HU-02 se verifica en la 3 porque el cierre de sesión vive en el menú del área autenticada.

### 5.2 RF → vistas

| RF | Nombre | Vistas |
|---|---|---|
| RF-01 | Autenticación de usuarios | 2 |
| RF-02 | Control de acceso a funciones privadas | 2, 3, 4, 7 |
| RF-03 | Cierre de sesión | 3 |
| RF-04 | Creación de cuentas de acceso | 11 |
| RF-05 | Consulta de cuentas de usuario | 12 |
| RF-06 | Asignación o cambio de rol | 12 |
| RF-07 | Consulta pública de noticias | 1 |
| RF-08 | Registro de solicitud | 4 |
| RF-09 | Consulta de solicitudes propias | 4, 5 |
| RF-10 | Consulta de certificados propios | 6 |
| RF-11 | Consulta de todas las solicitudes | 7 |
| RF-12 | Actualización de estado de solicitud | 7 |
| RF-13 | Registro de comunero | 8, 9 |
| RF-14 | Registro de ficha censal | 10 |

Los catorce RF quedan representados. RF-09 figura en la 4 porque el criterio 6 de HU-06 exige que la solicitud aparezca en la consulta propia.

### 5.3 Criterios de aceptación → dónde se verifican

| HU | Criterios | Verificación |
|---|---|---|
| HU-01 | 1–5 | Vista 2: campos, botón, error y acceso |
| HU-01 | 6–7 | Guardas de ruta y ausencia de registro público |
| HU-02 | 1–5 | Vista 3 y menú; recarga |
| HU-03 | 1–9 | Vista 11: campos, asociación, validaciones, rol y confirmación |
| HU-04 | 1–5 | Vista 12: listado, cambio, confirmación y Líder excluido |
| HU-05 | 1–5 | Vista 1: acceso público, sin datos privados, sin detalle, vacío |
| HU-06 | 1–5 | Vista 4: tipo obligatorio, observaciones, fecha/estado y confirmación |
| HU-06 | 6–8 | Vistas 5 y guardas; recarga |
| HU-07 | 1–5 | Vista 5: filtro por comunero, columnas, sin acciones, vacío |
| HU-08 | 1–6 | Vista 6: filtro, columnas, solo lectura |
| HU-09 | 1–6 | Vista 7: listado completo, cambio, confirmación, reflejo en 5, vacío |
| HU-10 | 1–9 | Vistas 9 y 10: campos, obligatorios, documento único, sexo, ficha, fecha, familia, alta en 8, cancelar |
| HU-10 | 10–11 | R-08 y recarga |

---

## 6. Fichas de las vistas

### 6.1 Noticias públicas

| Campo | Contenido |
|---|---|
| Identificador | `vista-noticias` |
| Ruta | `#/noticias` |
| Maqueta | `prototipo/index.html` |
| HU / RF | HU-05 · RF-07 |
| Prioridad | Should have |
| Acceso | Público, sin sesión |
| Objetivo | Mostrar el listado de noticias del Cabildo sin exponer datos privados |
| Datos | `noticias`: título y fecha |
| Interacciones | Ninguna sobre la noticia; enlaces a iniciar sesión o al inicio según la sesión |
| Estados | Listado con tres noticias · vacío «No hay noticias publicadas» |
| Accesibilidad | `ul` + `article` + `h3`; `<time datetime>`; sin enlaces de detalle (R-05); foco visible |
| Dependencias | Ninguna; es la ruta inicial y el destino del cierre de sesión |
| Verificación | Abrir `index.html` sin sesión; comprobar que no hay datos privados ni enlaces vacíos |

### 6.2 Iniciar sesión

| Campo | Contenido |
|---|---|
| Identificador | `vista-iniciar-sesion` |
| Ruta | `#/iniciar-sesion` |
| Maqueta | `prototipo/iniciar-sesion.html` |
| HU / RF | HU-01 · RF-01, RF-02 |
| Prioridad | Must have |
| Acceso | Público |
| Objetivo | Validar credenciales ficticias y abrir la sesión en memoria |
| Datos | `cuentas`: correo, contraseña ficticia, estado y rol; panel con las tres cuentas de demostración (D-03) |
| Interacciones | Validar vacíos por campo; comparar credenciales; al ingresar, ir a `#/inicio` y redibujar el menú |
| Estados | Error de campo vacío · «Correo o contraseña incorrectos» (D-08) · cuenta inactiva o bloqueada (D-04) · aviso de simulación · aviso de redirección (D-14) |
| Accesibilidad | `label` por campo, `autocomplete`, `aria-describedby`, `aria-invalid`, error junto al campo, foco al primer error, nunca `alert()` |
| Dependencias | Vista 3 como destino; datos de 12; cuentas creadas en 11 |
| Verificación | Enviar vacío, contraseña errónea, cuenta inactiva y cuenta válida |

### 6.3 Inicio autenticado

| Campo | Contenido |
|---|---|
| Identificador | `vista-inicio` |
| Ruta | `#/inicio` |
| Maqueta | `prototipo/inicio.html` |
| HU / RF | HU-01, HU-02 · RF-02, RF-03 |
| Prioridad | Must have |
| Acceso | Administrador, Líder y Miembro con sesión |
| Objetivo | Servir de entrada al área autenticada y ofrecer el cierre de sesión |
| Datos | `sesion`: correo, rol y comunero asociado |
| Interacciones | Mostrar solo la tarjeta del rol activo (D-05); cerrar sesión desde el botón del encabezado (PE-08) |
| Estados | Tarjeta del rol · aviso de que la sesión y los datos no persisten |
| Accesibilidad | Un solo `h1`; etiqueta de rol con texto; foco al `h1` al entrar; cierre de sesión como `button` |
| Dependencias | Vista 2; todas las privadas |
| Verificación | Ingresar con los tres roles y comprobar que solo aparece la tarjeta correspondiente |

### 6.4 Registrar solicitud

| Campo | Contenido |
|---|---|
| Identificador | `vista-registrar-solicitud` |
| Ruta | `#/registrar-solicitud` |
| Maqueta | `prototipo/registrar-solicitud.html` |
| HU / RF | HU-06 · RF-02, RF-08, RF-09 |
| Prioridad | Must have |
| Acceso | Solo Miembro |
| Objetivo | Registrar una solicitud asociada al comunero de la sesión |
| Datos | `sesion.idComunero`; `solicitudes`; fecha actual del sistema (D-13) |
| Interacciones | Tipo de trámite obligatorio y de texto libre; observaciones opcionales; alta con estado pendiente y fecha automática; confirmación en la vista de destino (D-12) |
| Estados | Formulario · error si el tipo está vacío · confirmación con resumen · aviso de no persistencia |
| Accesibilidad | Error junto al campo con `aria-invalid`; confirmación con `role="status"`; foco al resumen tras el alta |
| Dependencias | Vistas 3, 5 y 7 |
| Verificación | Enviar vacío; registrar y comprobar la fila en 5 |

### 6.5 Mis solicitudes

| Campo | Contenido |
|---|---|
| Identificador | `vista-mis-solicitudes` |
| Ruta | `#/mis-solicitudes` |
| Maqueta | `prototipo/mis-solicitudes.html` |
| HU / RF | HU-07 · RF-09 |
| Prioridad | Should have |
| Acceso | Solo Miembro |
| Objetivo | Consultar las solicitudes propias y su estado actual |
| Datos | `solicitudes` filtradas por `sesion.idComunero` |
| Interacciones | Solo lectura; enlace a la vista 4 |
| Estados | Tabla con tipo, fecha, estado y observaciones · vacío |
| Accesibilidad | `caption`, `th scope="col"`, `data-etiqueta` por celda, sin desplazamiento horizontal |
| Dependencias | Vista 4 (alta) y vista 7 (cambio de estado) |
| Verificación | Consultar con una cuenta sin solicitudes; cambiar un estado en 7 y volver |

### 6.6 Mis certificados

| Campo | Contenido |
|---|---|
| Identificador | `vista-mis-certificados` |
| Ruta | `#/mis-certificados` |
| Maqueta | `prototipo/mis-certificados.html` |
| HU / RF | HU-08 · RF-10 |
| Prioridad | Must have |
| Acceso | Solo Miembro |
| Objetivo | Consultar el listado de certificados propios en modo de solo lectura |
| Datos | `certificados` de las solicitudes del comunero; el tipo se toma de la solicitud asociada |
| Interacciones | Ninguna: no se abre, descarga, imprime, genera ni valida (R-04) |
| Estados | Tabla con código, fecha, estado y tipo · vacío |
| Accesibilidad | Tabla adaptable; `<time datetime>`; sin botones de acción |
| Dependencias | Solo datos iniciales: la plataforma no genera certificados |
| Verificación | Comprobar que no existe ninguna acción sobre las filas |

### 6.7 Todas las solicitudes

| Campo | Contenido |
|---|---|
| Identificador | `vista-solicitudes` |
| Ruta | `#/solicitudes` |
| Maqueta | `prototipo/solicitudes.html` |
| HU / RF | HU-09 · RF-02, RF-11, RF-12 |
| Prioridad | Must have |
| Acceso | Líder y Administrador |
| Objetivo | Consultar todas las solicitudes y actualizar su estado |
| Datos | Todas las `solicitudes` con el comunero asociado |
| Interacciones | Selector de estado por fila; confirmación en línea con «Confirmar» y «Cancelar» (D-06); confirmar aplica el cambio; cancelar no modifica nada |
| Estados | Tabla · confirmación pendiente · cambio aplicado · vacío · aviso de que el selector solo propone el cambio |
| Accesibilidad | Un `label` con `for` único por selector; confirmación con `role="status"`; foco al panel de confirmación |
| Dependencias | Vistas 3, 4 y 5; el cambio se refleja en la 5 |
| Verificación | Cambiar el estado de una solicitud de Ana e ingresar como Ana para verlo |

### 6.8 Comuneros

| Campo | Contenido |
|---|---|
| Identificador | `vista-comuneros` |
| Ruta | `#/comuneros` |
| Maqueta | `prototipo/comuneros.html` |
| HU / RF | HU-10 · RF-13 |
| Prioridad | Must have |
| Acceso | Líder y Administrador |
| Objetivo | Consultar los comuneros registrados y acceder al proceso de registro |
| Datos | `comuneros`: documento, nombres, sexo, familia opcional y teléfono |
| Interacciones | Solo lectura; enlace a la vista 9; confirmación de alta al llegar desde la 10 (D-12) |
| Estados | Tabla · vacío · confirmación de registro |
| Accesibilidad | Tabla adaptable con etiquetas por celda; familia ausente como texto, no como celda vacía |
| Dependencias | Vistas 9 y 10 |
| Verificación | Confirmar una ficha en 10 y comprobar la fila nueva y el mensaje |

### 6.9 Registrar comunero (paso 1)

| Campo | Contenido |
|---|---|
| Identificador | `vista-registrar-comunero` |
| Ruta | `#/registrar-comunero` |
| Maqueta | `prototipo/registrar-comunero.html` |
| HU / RF | HU-10 · RF-13 |
| Prioridad | Must have |
| Acceso | Líder y Administrador |
| Objetivo | Capturar los datos personales del comunero y preparar la ficha censal |
| Datos | `familias` para el selector; `comuneros` para validar el documento; borrador en memoria |
| Interacciones | Obligatorios: documento, nombres, apellidos, fecha de nacimiento y sexo. Opcionales: teléfono y familia. «Continuar» guarda el borrador y abre la 10; «Cancelar» limpia y vuelve a la 8. No crea cuenta (R-08) |
| Estados | Formulario · errores por campo (vacío, documento repetido) · aviso de que no crea cuenta |
| Accesibilidad | Pasos con `aria-current="step"`; error junto al campo; foco al primer error |
| Dependencias | Vistas 8 y 10 |
| Verificación | Documento repetido, campos vacíos, cancelar y continuar |

### 6.10 Ficha censal (paso 2)

| Campo | Contenido |
|---|---|
| Identificador | `vista-ficha-censal` |
| Ruta | `#/ficha-censal` |
| Maqueta | `prototipo/registrar-ficha-censal.html` |
| HU / RF | HU-10 · RF-14 |
| Prioridad | Must have |
| Acceso | Líder y Administrador, solo con borrador |
| Objetivo | Completar la ficha censal y confirmar el alta del comunero |
| Datos | Borrador del paso 1; nivel educativo, ocupación y observaciones; fecha actual (D-13) |
| Interacciones | «Confirmar registro» crea comunero y ficha y vuelve a la 8 con confirmación; «Volver» conserva el borrador; sin borrador redirige a la 9 con aviso (D-11) |
| Estados | Formulario · error de campos obligatorios · redirección por falta de borrador |
| Accesibilidad | Resumen del comunero en `dl`; pasos con `aria-current="step"`; foco al `h1` |
| Dependencias | Vista 9 obligatoria; vista 8 como destino |
| Verificación | Acceder directo por ruta sin borrador; completar y confirmar |

### 6.11 Crear cuenta de acceso

| Campo | Contenido |
|---|---|
| Identificador | `vista-crear-cuenta` |
| Ruta | `#/crear-cuenta` |
| Maqueta | `prototipo/crear-cuenta.html` |
| HU / RF | HU-03 · RF-04 |
| Prioridad | Must have |
| Acceso | Solo Líder |
| Objetivo | Crear una cuenta para un comunero registrado que aún no tenga |
| Datos | `comuneros` sin cuenta; `cuentas` para validar el correo; rol fijo Miembro |
| Interacciones | Seleccionar comunero, correo y contraseña; validar obligatorios, formato, correo único y comunero sin cuenta; crear; confirmar con resumen; volver a la 8 |
| Estados | Formulario · error de formato · error de correo repetido · error de comunero con cuenta · confirmación · estado vacío si no quedan comuneros sin cuenta |
| Accesibilidad | `autocomplete="new-password"`; errores asociados con `aria-describedby`; rol mostrado como texto, sin selector |
| Dependencias | Vistas 8 y 9 (comuneros), 2 (la cuenta nueva puede ingresar) y 12 (aparece en el listado) |
| Verificación | Correo repetido, comunero con cuenta e intento desde el Administrador |

### 6.12 Cuentas de usuario

| Campo | Contenido |
|---|---|
| Identificador | `vista-cuentas` |
| Ruta | `#/cuentas` |
| Maqueta | `prototipo/cuentas.html` |
| HU / RF | HU-04 · RF-05, RF-06 |
| Prioridad | Must have |
| Acceso | Solo Administrador |
| Objetivo | Consultar las cuentas y cambiar roles con confirmación |
| Datos | `cuentas`: correo, rol y estado |
| Interacciones | Selector de rol por fila; confirmación en línea (D-06); la fila del propio Administrador no lleva selector y muestra «No puede cambiar su propio rol» (D-07) |
| Estados | Tabla · confirmación pendiente · rol aplicado · vacío · aviso de que el estado es de solo lectura (R-09) |
| Accesibilidad | Un `label` por selector; confirmación con `role="status"`; el rol actualizado se muestra como texto |
| Dependencias | Vista 11 (cuentas creadas en la sesión) y vista 3 |
| Verificación | Cambiar el rol de otra cuenta y comprobar la ausencia de selector en la propia |

---

## 7. Estado en memoria

### 7.1 Entidades

| Entidad | Campos usados por la interfaz | Origen |
|---|---|---|
| `familias` | id, nombre | Ficticio inicial |
| `comuneros` | id, documento, nombres, apellidos, fechaNacimiento, sexo, telefono, idFamilia | Ficticio + altas de la sesión |
| `fichas` | id, idComunero, fechaRegistro, nivelEducativo, ocupacion, observaciones | Ficticio + altas de la sesión |
| `cuentas` | id, correo, contrasena, estado, rol, idComunero | Ficticio + altas de la sesión |
| `solicitudes` | id, fecha, tipo, estado, observaciones, idComunero | Ficticio + altas y cambios de la sesión |
| `certificados` | id, codigoValidacion, fechaGeneracion, estado, idSolicitud | Solo ficticio inicial |
| `noticias` | id, titulo, fecha | Solo ficticio inicial |
| `sesion` | `null` o `{idCuenta, correo, rol, idComunero}` | Solo en memoria |

Los nombres siguen el esquema de `Referencias/BD_CabildoIndigenaVenecia_3336064.txt`, sin conexión con una base de datos.

### 7.2 Semilla inicial

Los identificadores `FAM-`, `COM-`, `CUE-`, `SOL-`, `CV-` y `NOT-` son identificadores de datos ficticios, **no** códigos de requisitos.

**Familias (3)**

| Id | Nombre |
|---|---|
| FAM-01 | Familia Amaru |
| FAM-02 | Familia Quispe |
| FAM-03 | Familia Yupanqui |

**Comuneros (6)**

| Id | Documento | Nombre | Sexo | Familia | Teléfono |
|---|---|---|---|---|---|
| COM-01 | 1.045.223.111 | Ana Benavides | Femenino | FAM-01 | 300 123 4567 |
| COM-02 | 1.098.334.552 | Luis Cárdenas | Masculino | Sin asignar | 311 884 2210 |
| COM-03 | 1.012.887.443 | Marta Yupanqui | Femenino | FAM-03 | 320 447 9081 |
| COM-04 | 1.063.442.190 | Rosa Quispe | Femenino | FAM-02 | 301 220 6674 |
| COM-05 | 1.079.556.204 | Ramiro Amaru | Masculino | FAM-01 | 310 664 1188 |
| COM-06 | 1.055.309.771 | Celina Yupanqui | Femenino | FAM-03 | 312 905 4471 |

COM-05 y COM-06 existen porque el esquema exige que toda cuenta esté asociada a un comunero (D-09). Por eso el listado final muestra seis filas y no cuatro.

**Cuentas (5)**

| Id | Correo | Contraseña ficticia | Rol | Estado | Comunero |
|---|---|---|---|---|---|
| CUE-01 | `admin@cabildo.ejemplo` | `admin2026` | Administrador | Activo | COM-05 |
| CUE-02 | `lider@cabildo.ejemplo` | `lider2026` | Líder | Activo | COM-06 |
| CUE-03 | `ana@cabildo.ejemplo` | `miembro2026` | Miembro | Activo | COM-01 |
| CUE-04 | `marta@cabildo.ejemplo` | `marta2026` | Miembro | Inactivo | COM-03 |
| CUE-05 | `luis@cabildo.ejemplo` | `luis2026` | Miembro | Bloqueado | COM-02 |

En la vista 2 solo se muestran las tres primeras (D-03). Las cuentas inactiva y bloqueada existen para comprobar D-04; sus contraseñas no se muestran.

**Solicitudes (5)**

| Id | Comunero | Tipo de trámite | Fecha | Estado | Observaciones |
|---|---|---|---|---|---|
| SOL-01 | COM-01 | Solicitud de certificado de residencia | 2026-10-02 | Pendiente | Requiere constancia para trámite bancario. |
| SOL-02 | COM-01 | Actualización de ficha censal | 2026-09-14 | En revisión | Informó cambio de dirección en la vereda. |
| SOL-03 | COM-01 | Constancia de pertenencia | 2026-08-30 | Aprobada | Sin observaciones adicionales. |
| SOL-04 | COM-02 | Constancia de pertenencia | 2026-08-12 | Aprobada | Sin observaciones adicionales. |
| SOL-05 | COM-03 | Solicitud de certificado de residencia | 2026-07-03 | Rechazada | Documento para matrícula educativa. |

Las tres primeras coinciden con la vista de Ana. SOL-04 se separa de la fecha de la maqueta (30 de agosto) para no duplicar tipo y fecha con SOL-03; es un ajuste de dato ficticio, no de requisito. No hay transiciones obligatorias entre estados (RF-12).

**Certificados (2)**

| Id | Código | Fecha de generación | Estado | Solicitud asociada | Tipo mostrado |
|---|---|---|---|---|---|
| CV-01 | CV-2026-0014 | 2026-10-20 | Vigente | SOL-01 | Solicitud de certificado de residencia |
| CV-02 | CV-2026-0007 | 2026-09-02 | Anulado | SOL-03 | Constancia de pertenencia |

Ambos pertenecen a Ana. El estado del certificado es independiente del estado de la solicitud: la plataforma no genera certificados ni los crea al cambiar un estado (R-04). La asociación es solo referencial y se conserva porque el esquema exige `id_solicitud`.

**Noticias (3)**

| Id | Título | Fecha |
|---|---|---|
| NOT-01 | Asamblea general del Cabildo | 2026-10-12 |
| NOT-02 | Jornada de salud en la vereda Venecia | 2026-09-03 |
| NOT-03 | Convocatoria a minga comunitaria | 2026-08-21 |

**Fichas censales (6)**

Una por comunero, con fecha de registro, nivel educativo, ocupación y observaciones. Las fichas de COM-01 a COM-04 son datos iniciales; las de COM-05 y COM-06 existen para que la semilla sea coherente aunque la interfaz no las muestre. Las fichas creadas durante la demostración se añaden a esta colección.

> **Limitación temporal del Bloque 1.** Los valores de las seis fichas no están definidos en las fuentes aprobadas, así que la semilla de este bloque usa `fichas: []` y no inventa datos. Ninguna vista del Bloque 1 muestra fichas censales. La colección se completará en el Bloque 4, cuando el flujo censal la necesite.

### 7.3 Datos iniciales frente a datos de la sesión

- **Iniciales:** se construyen con una función que devuelve copias nuevas en cada arranque. No se congelan ni se guardan.
- **De la sesión:** las altas y los cambios se aplican sobre las mismas colecciones. Los registros nuevos reciben un identificador creciente.
- **Reinicio:** recargar vuelve a ejecutar el arranque: sesión nula y colecciones restauradas. No hay «deshacer» ni «restaurar».
- La interfaz no distingue visualmente unos datos de otros; la distinción es interna y sirve para explicar la simulación.

### 7.4 Operaciones que modifican el estado

| Operación | Entrada | Efecto | Vistas afectadas |
|---|---|---|---|
| Ingresar | correo y contraseña | Crea `sesion` si la cuenta está activa | 2, 3 y menú |
| Cerrar sesión | — | `sesion = null`; descarta el borrador | Todas |
| Registrar solicitud | tipo y observaciones | Añade una solicitud pendiente con fecha actual | 4, 5, 7 |
| Cambiar estado | solicitud y estado confirmado | Actualiza la solicitud | 7, 5 |
| Guardar borrador | datos del paso 1 | Guarda el borrador en memoria | 9, 10 |
| Confirmar censo | borrador y ficha | Añade comunero y ficha | 8, 9, 10 |
| Crear cuenta | comunero, correo y contraseña | Añade una cuenta con rol Miembro | 11, 12, 2 |
| Cambiar rol | cuenta y rol confirmado | Actualiza el rol | 12, menú si es la cuenta propia (impedido por D-07) |

### 7.5 Reglas de consistencia

1. Documento de comunero único.
2. Correo de cuenta único.
3. Relación uno a uno entre cuenta y comunero.
4. Toda cuenta nueva recibe rol Miembro y no muestra selector de rol.
5. El registro de comunero no crea cuenta (R-08).
6. La familia asignada debe existir; no se crean ni editan familias.
7. No se crean certificados ni noticias desde la interfaz.
8. Los estados de solicitud y de certificado son conceptos distintos.
9. Ninguna operación escribe fuera de memoria.

---

## 8. Sesión simulada y control de acceso

### 8.1 Cuentas de demostración

La vista 2 muestra un panel con las tres cuentas activas y sus contraseñas ficticias (D-03): Administrador, Líder y Miembro. El panel usa componentes existentes (aviso o resumen) y advierte que son credenciales de ejemplo.

### 8.2 Ingreso y cierre

- **Ingreso:** se normaliza el correo, se busca la cuenta, se compara la contraseña y se comprueba el estado. Si coincide y está activa, se crea la sesión y se navega a `#/inicio`.
- **Cierre:** se anula la sesión, se descarta el borrador del censo, los datos permanecen y se navega a `#/noticias` reemplazando la entrada de historial, para que «Atrás» no vuelva a una vista privada.
- **Recarga:** arranque limpio; una ruta privada en el hash cae en la guarda y termina en el acceso.

### 8.3 Guardas y redirecciones

| Ruta | Sin sesión | Sesión con rol no autorizado |
|---|---|---|
| `#/noticias` | Permitida | Permitida |
| `#/iniciar-sesion` | Permitida | → `#/inicio` + aviso (D-14) |
| `#/inicio` | → `#/iniciar-sesion` + aviso | Permitida |
| `#/registrar-solicitud`, `#/mis-solicitudes`, `#/mis-certificados` | → acceso + aviso | → `#/inicio` + aviso (D-02) |
| `#/solicitudes`, `#/comuneros`, `#/registrar-comunero`, `#/ficha-censal` | → acceso + aviso | → `#/inicio` + aviso (D-02) |
| `#/ficha-censal` sin borrador | — | → `#/registrar-comunero` + aviso (D-11) |
| `#/crear-cuenta` | → acceso + aviso | → `#/inicio` + aviso (D-02) |
| `#/cuentas` | → acceso + aviso | → `#/inicio` + aviso (D-02) |

La guarda y el menú se derivan de la **misma** tabla de rutas, para que no exista una vista visible pero bloqueada, ni al contrario.

> **Bloque 1 (temporal).** `#/ficha-censal` está reservada para el Bloque 4. Mientras el borrador censal no exista, la ruta redirige a `#/registrar-comunero` con el aviso «La ficha censal se habilitará en el Bloque 4». Esta guarda temporal **no** implementa D-11: la regla funcional del borrador se implementará exclusivamente en el Bloque 4.

### 8.4 Reglas documentadas frente a decisiones aprobadas

| Regla | Origen | Estado |
|---|---|---|
| Noticias es pública | HU-05, RF-07 | Documentada |
| Noticias e inicio de sesión son las únicas públicas | RF-02 | Documentada |
| Miembro: registrar solicitud, mis solicitudes, mis certificados | HU-06, HU-07, HU-08 | Documentada |
| Líder y Administrador: solicitudes y comuneros | HU-09, HU-10 | Documentada |
| Solo el Líder crea cuentas | HU-03 | Documentada |
| El Administrador no crea cuentas; P-07 sigue pendiente | HU-03, P-07 | Documentada; fuera del Bloque 1 |
| Solo el Administrador consulta cuentas y cambia roles | HU-04 | Documentada |
| El Líder no cambia roles | HU-04, criterio 5 | Documentada |
| El registro de comunero no crea cuenta | R-08 | Documentada |
| Cuenta inactiva o bloqueada no ingresa | D-04 | Aprobada |
| Rol sin permiso → inicio con aviso | D-02 | Aprobada |
| Credenciales de demostración visibles | D-03 | Aprobada |
| Administrador no cambia su propio rol | D-07 | Aprobada |
| Ficha censal sin borrador → paso 1 | D-11 | Aprobada |
| Sesión activa en `#/iniciar-sesion` → `#/inicio` con aviso | D-14 | Aprobada |

**Acceso con sesión activa (D-14).** `#/iniciar-sesion` deja de ofrecerse en el menú cuando hay una sesión y, si se abre por la barra de direcciones, redirige a `#/inicio` con el aviso «Su sesión ya está activa». No se reemplaza la sesión ni se muestra de nuevo el formulario. La regla se implementa en el Bloque 1 y sustituye el borde que había quedado pendiente en la Etapa 0.

### 8.5 Límites de la simulación

- No es seguridad real: las guardas viven en el cliente y se evaden con DevTools.
- Las contraseñas son ficticias y visibles en el código; no hay datos reales.
- No hay recuperación de contraseña, administración de sesiones ni cambios de estado de cuenta (R-09).
- No se establece una matriz completa de permisos (R-10).

---

## 9. Navegación, historial y foco

- **Historial:** cada navegación asigna `location.hash`; el evento `hashchange` activa la vista. «Atrás» y «Adelante» funcionan sin código adicional.
- **Enlaces:** son `<a href="#/ruta">` reales, con destino existente. Nunca `href="#"`.
- **Foco:** al cambiar de vista se enfoca el `h1` (`tabindex="-1"`). En la carga inicial no se roba el foco. Al cerrar sesión, el foco vuelve al `h1` de Noticias, incluso si ya era la vista activa.
- **Título:** se actualiza `document.title` en cada cambio.
- **Estado actual:** una sola opción del menú lleva `aria-current="page"`.
- **Cierre de sesión:** se usa `location.replace` para no dejar la vista privada en el historial.
- **Saltar al contenido:** se conserva y apunta a `#contenido`.
- **Avisos de redirección:** se muestran en la vista de destino, con `role="status"`.

---

## 10. Decisiones D-01 a D-14

| # | Decisión | Efecto documental |
|---|---|---|
| D-01 | Una sola página con doce vistas | Secciones 2, 4 y 9; parches de `AGENTS.md` |
| D-02 | Rol sin permiso → inicio con aviso | Sección 8.3 |
| D-03 | Mostrar tres cuentas ficticias en el acceso | Sección 8.1; ficha 6.2 |
| D-04 | Impedir ingreso de cuentas inactivas o bloqueadas | Ficha 6.2; semilla CUE-04 y CUE-05 |
| D-05 | Mostrar solo las opciones del rol activo | Sección 4.1; ficha 6.3 |
| D-06 | Confirmación en línea para estado y rol | Fichas 6.7 y 6.12 |
| D-07 | El Administrador no cambia su propio rol | Ficha 6.12 |
| D-08 | «Correo o contraseña incorrectos» con validación independiente | Ficha 6.2 |
| D-09 | Dos comuneros adicionales para Administrador y Líder | Semilla COM-05 y COM-06 |
| D-10 | Cinco solicitudes y dos certificados | Semilla SOL y CV |
| D-11 | Ficha censal sin borrador → paso 1 con aviso | Sección 8.3; ficha 6.10 |
| D-12 | Confirmaciones en la vista de destino | Fichas 6.4, 6.8 y 6.11 |
| D-13 | Fecha actual del sistema | Fichas 6.4 y 6.10; semilla nueva |
| D-14 | Sesión activa en el acceso → inicio con aviso | Sección 8.3; ficha 6.2 |

---

## 11. Límites académicos y verificación

### 11.1 Lo que la interfaz no hace

| Restricción | Cómo se refleja |
|---|---|
| R-01 | No hay registro público ni autorregistro |
| R-02 | Sesión y datos solo en memoria; sin almacenamiento |
| R-03 | Sin frameworks, librerías ni CDN |
| R-04 | Certificados solo de consulta; sin generación |
| R-05 | Noticias solo como listado; sin detalle |
| R-06 | No se implementan P-01 a P-13 |
| R-07 | Sin asistencia ni QR |
| R-08 | El censo no crea cuenta |
| R-09 | Sin administración de sesiones ni estados de cuenta |
| R-10 | Sin matriz completa de permisos |

### 11.2 Lista de verificación de la entrega

1. Doce vistas declaradas y alcanzables.
2. Diez HU y catorce RF ubicados en al menos una vista.
3. Sin códigos inventados.
4. Menú y guardas derivados de la misma tabla.
5. Proceso de censo en dos pasos, sin módulo independiente.
6. Certificados sin acciones.
7. Sin `fetch`, `XMLHttpRequest`, `localStorage`, `sessionStorage`, IndexedDB, `window.name`, `history.state`, cookies, `BroadcastChannel` ni `SharedWorker`.
8. Un solo `styles.css`; sin `<style>` ni `style=""`.
9. Sin `href="#"`.
10. Consola sin errores en las doce rutas.
11. Foco, título y `aria-current` por vista.
12. 360, 768 y 1280 px sin scroll horizontal; dos capturas móviles para el PDF.

### 11.3 Guion de demostración

1. Entrar como Líder.
2. Crear una cuenta para Rosa Quispe.
3. Cerrar sesión.
4. Entrar como Rosa.
5. Registrar una solicitud y verla en «Mis solicitudes».
6. Cerrar sesión y entrar como Administrador; cambiar el estado de esa solicitud.
7. Cerrar sesión y entrar de nuevo como Rosa para comprobar el estado actualizado.

Cubre RF-04, RF-08, RF-09, RF-12 y RF-02 en una sola sesión, sin recargar.

---

## 12. Registro de cambios

| Fecha | Cambio |
|---|---|
| 15/11/2026 | Creación del documento en la Etapa 0: mapa de las doce vistas, fichas, semilla en memoria, sesión simulada, decisiones D-01 a D-13 y verificaciones. Sin cambios en `docs/historias.md` ni en `docs/requisitos.md`. |
| 16/11/2026 | Etapa 2, Bloque 1: se registra D-14 (sesión activa en `#/iniciar-sesion` → `#/inicio` con aviso), se corrige §8.3 y §8.4, se deja constancia de que P-07 sigue pendiente, se documenta PE-12 sobre la conservación de maquetas y se anota la limitación temporal `fichas: []` que se resolverá en el Bloque 4. La guarda provisional de `#/ficha-censal` se identifica como temporal y no como D-11. Se corrige en la ficha 6.3 la referencia al cierre de sesión, que se realiza desde el botón del encabezado (PE-08). |
| 22/11/2026 | HU-09 / RF-12: el cambio de estado de una solicitud se habilita con confirmación en línea. El selector solo propone el cambio; la escritura ocurre al confirmar y se refleja en la consulta del miembro. Se actualiza la ficha 6.7. |
| 22/11/2026 | HU-04 / RF-06: el cambio de rol de una cuenta se habilita con confirmación en línea y solo para el Administrador; la fila propia sigue sin selector (D-07). Se actualiza la ficha 6.12. |
