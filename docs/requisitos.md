# Requisitos funcionales — Plataforma del Cabildo Indígena de Venecia

Documento de referencia para la evidencia integradora **GA6-220501096 (AA3 + AA4)**.

## 1. Propósito y alcance

Este documento define los requisitos funcionales **RF-01 a RF-14** derivados de las historias de usuario aprobadas **HU-01 a HU-10** en `docs/historias.md`.

Cada requisito describe una función verificable, indica su HU de origen y hereda su prioridad MoSCoW. Las decisiones de diseño, las tecnologías y los detalles de implementación no se registran como requisitos.

La entrega es **solo interfaz**: HTML5, CSS3 y JavaScript puro, sin backend, API, base de datos ni almacenamiento persistente. Las operaciones se simulan en memoria.

## 2. Restricciones transversales

No son requisitos funcionales; limitan el alcance y se usan en la trazabilidad.

| Código | Restricción |
|---|---|
| R-01 | No existe registro público ni autorregistro; las cuentas se crean previamente |
| R-02 | No hay backend, API, base de datos, Supabase ni almacenamiento persistente (`localStorage`, `sessionStorage`, IndexedDB). Las operaciones se simulan en memoria y el estado se descarta al recargar o cerrar la página |
| R-03 | Solo HTML5, CSS3 y JavaScript puro; sin frameworks, librerías ni CDN |
| R-04 | Los certificados solo se consultan como listado; no se generan, descargan, imprimen, abren ni validan individualmente |
| R-05 | Las noticias públicas solo se consultan como listado; no hay detalle individual |
| R-06 | No se implementan las funcionalidades P-01 a P-13 sin aprobación expresa |
| R-07 | No se implementa gestión de asistencia ni QR |
| R-08 | El registro de comunero no crea una cuenta de acceso; eso corresponde a HU-03 |
| R-09 | No se implementan funciones para administrar las sesiones de otros usuarios ni para activar, desactivar, bloquear o cambiar el estado de las cuentas |
| R-10 | No se establece una matriz completa de permisos por rol; solo se usan las responsabilidades confirmadas |

## 3. Tabla resumen

| Código | Nombre | HU de origen | Prioridad |
|---|---|---|---|
| RF-01 | Autenticación de usuarios | HU-01 | Must have |
| RF-02 | Control de acceso a funciones privadas | HU-01 | Must have |
| RF-03 | Cierre de sesión | HU-02 | Should have |
| RF-04 | Creación de cuentas de acceso | HU-03 | Must have |
| RF-05 | Consulta de cuentas de usuario | HU-04 | Must have |
| RF-06 | Asignación o cambio de rol | HU-04 | Must have |
| RF-07 | Consulta pública de noticias | HU-05 | Should have |
| RF-08 | Registro de solicitud | HU-06 | Must have |
| RF-09 | Consulta de solicitudes propias | HU-07 | Should have |
| RF-10 | Consulta de certificados propios | HU-08 | Must have |
| RF-11 | Consulta de todas las solicitudes | HU-09 | Must have |
| RF-12 | Actualización de estado de solicitud | HU-09 | Must have |
| RF-13 | Registro de comunero | HU-10 | Must have |
| RF-14 | Registro de ficha censal | HU-10 | Must have |

## 4. Requisitos funcionales detallados

### RF-01 · Autenticación de usuarios

**Descripción:** El sistema debe autenticar a los usuarios mediante correo y contraseña, conceder acceso al área autenticada cuando las credenciales sean válidas y mostrar un mensaje de error cuando los campos estén vacíos o las credenciales sean incorrectas.

**HU de origen:** HU-01.

**Prioridad:** Must have.

**Criterios de la HU cubiertos:** 1, 2, 3 y 4.

---

### RF-02 · Control de acceso a funciones privadas

**Descripción:** El sistema debe mantener la vista pública accesible sin sesión, restringir las funciones privadas a los usuarios autenticados y redirigir al inicio de sesión cuando no exista una sesión activa.

**HU de origen:** HU-01.

**Prioridad:** Must have.

**Criterios de la HU cubiertos:** HU-01, criterios 5 y 7; HU-02, criterio 4.

**Nota:** la sesión se conserva solo en memoria durante la navegación y se descarta al recargar, según R-02. No se usa almacenamiento persistente.

---

### RF-03 · Cierre de sesión

**Descripción:** El sistema debe permitir al usuario autenticado cerrar sesión, finalizar su acceso y volver a la vista pública, retirando las opciones privadas de la navegación.

**HU de origen:** HU-02.

**Prioridad:** Should have.

**Criterios de la HU cubiertos:** 1, 2 y 3.

---

### RF-04 · Creación de cuentas de acceso

**Descripción:** El sistema debe permitir al Líder crear una cuenta de acceso con correo y contraseña, asociada a un comunero registrado que aún no tenga cuenta, exigir los campos obligatorios, validar el formato y la unicidad del correo, asignar automáticamente el rol Miembro sin mostrar un selector de rol y mostrar una confirmación de la creación.

**HU de origen:** HU-03.

**Prioridad:** Must have.

**Criterios de la HU cubiertos:** 1 a 9.

**Nota:** el criterio 10 se cubre con R-01. La creación de cuentas por el Administrador sigue pendiente en P-07.

---

### RF-05 · Consulta de cuentas de usuario

**Descripción:** El sistema debe permitir al Administrador consultar las cuentas de usuario con su correo, rol y estado.

**HU de origen:** HU-04.

**Prioridad:** Must have.

**Criterios de la HU cubiertos:** 1 y 3.

---

### RF-06 · Asignación o cambio de rol

**Descripción:** El sistema debe permitir al Administrador asignar o cambiar el rol de una cuenta entre Administrador, Líder y Miembro, solicitar confirmación, mostrar el rol actualizado y no permitir que el Líder realice esta operación.

**HU de origen:** HU-04.

**Prioridad:** Must have.

**Criterios de la HU cubiertos:** 2, 3, 4 y 5.

**Nota:** el criterio 6 se cubre con R-02. No se incluyen operaciones de administración de sesiones ni cambios de estado de cuenta, según R-09.

---

### RF-07 · Consulta pública de noticias

**Descripción:** El sistema debe mostrar un listado de noticias públicas accesible sin iniciar sesión, sin exponer datos privados, sin ofrecer una vista de detalle individual y con un estado vacío cuando no haya noticias.

**HU de origen:** HU-05.

**Prioridad:** Should have.

**Criterios de la HU cubiertos:** 1, 2, 3, 4 y 5.

**Nota:** el criterio 6 es de diseño responsivo y se rige por `AGENTS.md`, no por un RF. Los campos concretos del listado no están definidos en las referencias ni en HU-05. El detalle individual está prohibido por R-05. Para la representación visual se usan **título** y **fecha**, aprobados como decisión de diseño y no como campos de este requisito.

---

### RF-08 · Registro de solicitud

**Descripción:** El sistema debe permitir al Miembro autenticado registrar una solicitud con tipo de trámite de texto libre obligatorio y observaciones opcionales, asignar automáticamente la fecha y el estado pendiente, asociarla al comunero del miembro, mostrar un mensaje cuando el tipo esté vacío y confirmar el registro.

**HU de origen:** HU-06.

**Prioridad:** Must have.

**Criterios de la HU cubiertos:** 1, 2, 3, 4 y 5.

**Nota:** el criterio 6 se cubre con RF-09; el 7 con RF-02; el 8 con R-02. No se define un catálogo de tipos.

---

### RF-09 · Consulta de solicitudes propias

**Descripción:** El sistema debe permitir al Miembro autenticado consultar únicamente sus propias solicitudes con tipo, fecha, estado y observaciones, sin acciones de edición ni eliminación, y mostrar un estado vacío cuando no tenga solicitudes.

**HU de origen:** HU-07.

**Prioridad:** Should have.

**Criterios de la HU cubiertos:** 1 a 5.

**Nota:** el criterio 6 se cubre con R-02. RF-09 pertenece exclusivamente a HU-07; su consulta es la vista del miembro donde RF-12 verifica que se refleja el estado actualizado.

---

### RF-10 · Consulta de certificados propios

**Descripción:** El sistema debe permitir al Miembro autenticado consultar únicamente el listado de sus certificados con código de validación, fecha de generación, estado vigente o anulado y tipo de solicitud, en modo de solo lectura, sin acciones de apertura, descarga, impresión, generación o validación individual, y con un estado vacío cuando no tenga certificados.

**HU de origen:** HU-08.

**Prioridad:** Must have.

**Criterios de la HU cubiertos:** 1 a 6.

**Nota:** el criterio 7 se cubre con R-02. Mostrar el estado en el listado está permitido; R-04 prohíbe las acciones sobre el certificado.

---

### RF-11 · Consulta de todas las solicitudes

**Descripción:** El sistema debe permitir al Administrador y al Líder consultar todas las solicitudes registradas con comunero, tipo, fecha, estado y observaciones, y mostrar un estado vacío cuando no haya solicitudes.

**HU de origen:** HU-09.

**Prioridad:** Must have.

**Criterios de la HU cubiertos:** 1, 5 y 6.

**Nota:** el criterio 5 se refuerza con RF-02 y R-10. El criterio 7 se cubre con R-02.

---

### RF-12 · Actualización de estado de solicitud

**Descripción:** El sistema debe permitir al Administrador y al Líder cambiar el estado de una solicitud entre pendiente, en revisión, aprobada, rechazada y completada, mostrar una confirmación y reflejar el cambio en la consulta del miembro.

**HU de origen:** HU-09.

**Prioridad:** Must have.

**Criterios de la HU cubiertos:** 2, 3 y 4.

**Nota:** no se definen transiciones obligatorias entre estados porque las referencias no las establecen. El criterio 4 se verifica en la consulta del miembro definida por RF-09, que pertenece a HU-07. El criterio 7 se cubre con R-02.

---

### RF-13 · Registro de comunero

**Descripción:** El sistema debe permitir al Administrador y al Líder registrar un comunero con documento, nombres, apellidos, fecha de nacimiento, sexo según los valores de referencia del esquema documental y teléfono opcional; **la asignación de una familia existente es opcional**. Debe exigir los campos obligatorios, validar la unicidad del documento, mostrar el nuevo registro en el listado de comuneros y limpiar el formulario al cancelar.

**HU de origen:** HU-10.

**Prioridad:** Must have.

**Criterios de la HU cubiertos:** 1, 2, 3, 4, 6, 7, 8 y 9.

**Nota:** los valores de sexo se reproducen como referencia del esquema documental, sin conexión con una base de datos. No se crean ni editan familias. Cuando se asigna una familia, esta debe existir previamente; si no se asigna ninguna, el registro es válido igualmente. El criterio 10 se cubre con R-08; el 11 con R-02.

---

### RF-14 · Registro de ficha censal

**Descripción:** El sistema debe permitir al Administrador y al Líder registrar la ficha censal asociada a un comunero con nivel educativo, ocupación y observaciones opcionales, y asignar automáticamente la fecha de registro.

**HU de origen:** HU-10.

**Prioridad:** Must have.

**Criterios de la HU cubiertos:** 1, 5 y 8.

**Nota:** el registro de la ficha censal forma parte del proceso de registro del comunero definido en HU-10, queda asociada al comunero correspondiente y no constituye un módulo independiente. Se mantiene como RF separado para verificar sus campos y su asociación. La captura puede organizarse en dos pasos consecutivos; el comunero se incorpora al listado solo al completar la ficha y confirmar el registro. No se incorporan campos que no estén en el esquema.

## 5. Matriz de trazabilidad

| HU | RF que la implementan | Criterios cubiertos por RF | Criterios sin RF y su cobertura |
|---|---|---|---|
| HU-01 | RF-01, RF-02 | 1–5 y 7 | 6 → R-01; la sesión en memoria → R-02 |
| HU-02 | RF-02, RF-03 | 1–4 | 5 → R-02 |
| HU-03 | RF-04 | 1–9 | 10 → R-01; el criterio 9 también se refuerza con RF-06 |
| HU-04 | RF-05, RF-06 | 1–5 | 6 → R-02 |
| HU-05 | RF-07 | 1–5 | 6 → regla de `AGENTS.md`; el criterio 3 también se refuerza con R-05 |
| HU-06 | RF-02, RF-08, RF-09 | 1–5 | 6 → RF-09; 7 → RF-02; 8 → R-02 |
| HU-07 | RF-09 | 1–5 | 6 → R-02 |
| HU-08 | RF-10 | 1–6 | 7 → R-02; el criterio 4 también se refuerza con R-04 |
| HU-09 | RF-02, RF-11, RF-12 | 1–6 | 4 → RF-12 reflejado en RF-09; 5 → RF-11/RF-12 + RF-02; 7 → R-02 |
| HU-10 | RF-13, RF-14 | 1–9 | 10 → R-08; 11 → R-02 |

**Aclaración sobre HU-09:** RF-09 no es un requisito de origen de HU-09; pertenece a HU-07 y es la vista donde RF-12 refleja el cambio.

## 6. Cobertura y consistencia

- Las diez HU tienen al menos un RF asociado.
- Los 14 RF tienen código, nombre, descripción iniciada con «El sistema debe…», HU de origen y prioridad heredada.
- No se incorporaron funcionalidades de P-01 a P-13.
- No se incorporaron funciones descartadas: registro público, QR, generación o descarga de certificados, detalle de noticias ni administración de sesiones.
- No se estableció una matriz completa de permisos por rol.
- No se detectan duplicados: RF-01/RF-02, RF-04/RF-05/RF-06, RF-09/RF-11 y RF-13/RF-14 separan funciones distintas.

## 7. Funcionalidades excluidas y pendientes

**Excluidas:** registro público, autorregistro, recuperación de contraseña, detalle de noticias, acciones sobre certificados, edición o eliminación de solicitudes, detalle de solicitudes o comuneros, gestión de familias, actas, etiquetas, noticias administrativas, perfil, reportes, asistencia, QR, administración de sesiones y cambios de estado de cuenta.

**Pendientes de aprobación:** P-01 a P-13.

---

*Documento de trabajo de la evidencia GA6-220501096 (AA3 + AA4). Los requisitos aquí registrados no amplían el alcance aprobado en `docs/historias.md`.*
