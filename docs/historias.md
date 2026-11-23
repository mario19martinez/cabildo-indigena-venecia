# Historias de usuario — Plataforma del Cabildo Indígena de Venecia

Documento de referencia para la evidencia integradora **GA6-220501096 (AA3 + AA4)**.

## 1. Propósito y alcance

Este documento reúne las **diez historias de usuario aprobadas (HU-01 a HU-10)** que sirven de base para los requisitos funcionales RF-01 a RF-14 y, más adelante, para las pantallas del prototipo y de la implementación.

Alcance de la evidencia:

- La entrega es **solo interfaz**: HTML5, CSS3 y JavaScript puro.
- No hay backend, API, base de datos, Supabase, `localStorage`, `sessionStorage` ni IndexedDB.
- Las operaciones se simulan **en memoria** y no persisten al recargar ni al cerrar la página.
- Los datos, nombres y credenciales son **ficticios**.
- Los roles del sistema son **Administrador, Líder y Miembro**.
- Solo el Administrador asigna o cambia roles.
- No existe registro público ni autorregistro: las cuentas se crean previamente.
- Las funcionalidades **P-01 a P-13** no están aprobadas y no forman parte de estas historias.

Las historias se derivan de las decisiones confirmadas del proyecto y de la documentación de referencia; no se inventan módulos ni funciones para completar un número de pantallas.

## 2. Índice de historias

| Código | Nombre | Prioridad (MoSCoW) | RF asociados |
|---|---|---|---|
| HU-01 | Iniciar sesión | Must have | RF-01, RF-02 |
| HU-02 | Cerrar sesión | Should have | RF-02, RF-03 |
| HU-03 | Crear cuentas de acceso | Must have | RF-04 |
| HU-04 | Consultar cuentas y asignar roles | Must have | RF-05, RF-06 |
| HU-05 | Consultar noticias públicas | Should have | RF-07 |
| HU-06 | Registrar solicitud | Must have | RF-08, RF-09, RF-02 |
| HU-07 | Consultar solicitudes propias | Should have | RF-09 |
| HU-08 | Consultar certificados propios | Must have | RF-10 |
| HU-09 | Consultar todas las solicitudes y actualizar su estado | Must have | RF-11, RF-12, RF-02 |
| HU-10 | Registrar comunero y su ficha censal | Must have | RF-13, RF-14 |

---

## 3. Historias de usuario

### HU-01 · Iniciar sesión

**Como** usuario registrado **quiero** iniciar sesión con mi correo y contraseña **para** acceder a las funciones privadas de la plataforma.

**Prioridad:** Must have.

**Criterios de aceptación**

1. La pantalla de acceso ofrece un campo para el correo.
2. La pantalla de acceso ofrece un campo para la contraseña.
3. La pantalla de acceso ofrece un botón de ingreso.
4. Con credenciales válidas, el usuario accede al área autenticada.
5. Si hay campos vacíos o credenciales incorrectas, se muestra un mensaje de error junto al campo o en el formulario.
6. El área autenticada y las funciones privadas solo son accesibles con una sesión iniciada.
7. No existe registro público ni autorregistro; las cuentas se crean previamente.

**Requisitos funcionales:** RF-01 (autenticación) y RF-02 (control de acceso).

**Notas**

- El criterio 6 se cubre con la restricción de no ofrecer registro público.
- La sesión vive solo en memoria; no se implementa almacenamiento.
- La validación funcional de credenciales se implementará posteriormente en JavaScript; el prototipo de baja fidelidad no la demuestra.

---

### HU-02 · Cerrar sesión

**Como** usuario autenticado **quiero** cerrar sesión **para** finalizar mi acceso y dejar de ver las opciones privadas.

**Prioridad:** Should have.

**Criterios de aceptación**

1. La interfaz ofrece una opción de cierre de sesión para el usuario autenticado.
2. Al cerrar sesión, el acceso finaliza.
3. Se vuelve a la vista pública y las opciones privadas desaparecen de la navegación.
4. Después de cerrar sesión, las funciones privadas quedan inaccesibles.
5. La sesión no persiste al recargar ni al cerrar la página.

**Requisitos funcionales:** RF-03 (cierre de sesión) y RF-02 (control de acceso).

**Notas**

- El cierre de sesión es una historia independiente de HU-01.
- No se implementa administración de sesiones de otros usuarios ni cambios de estado de cuenta.

---

### HU-03 · Crear cuentas de acceso

**Como** Líder **quiero** crear cuentas de acceso para comuneros registrados **para** que puedan ingresar a la plataforma.

**Prioridad:** Must have.

**Criterios de aceptación**

1. El formulario solicita correo y contraseña.
2. La cuenta se asocia a un comunero registrado.
3. No se puede crear una cuenta para un comunero que ya tenga una.
4. Los campos obligatorios deben estar completos.
5. Se valida el formato del correo.
6. Se valida que el correo no esté repetido.
7. El rol **Miembro** se asigna automáticamente.
8. No se muestra un selector de rol.
9. Se muestra una confirmación de la creación.
10. No se ofrece registro público.

**Requisitos funcionales:** RF-04 (creación de cuentas de acceso).

**Notas**

- El criterio 10 se cubre con la restricción de no ofrecer autorregistro.
- La creación de cuentas por parte del Administrador sigue pendiente (P-07) y no se implementa.
- El Líder no cambia roles.

---

### HU-04 · Consultar cuentas y asignar roles

**Como** Administrador **quiero** consultar las cuentas y cambiar su rol **para** mantener actualizados los permisos del sistema.

**Prioridad:** Must have.

**Criterios de aceptación**

1. El listado de cuentas muestra correo, rol y estado.
2. El Administrador puede asignar o cambiar el rol entre **Administrador**, **Líder** y **Miembro**.
3. El cambio de rol solicita confirmación.
4. Se muestra el rol actualizado.
5. El Líder no puede realizar esta operación.
6. Los cambios no persisten al recargar.

**Requisitos funcionales:** RF-05 (consulta de cuentas) y RF-06 (asignación o cambio de rol).

**Notas**

- No se implementa una matriz completa de permisos por rol.
- No se implementan operaciones para administrar sesiones de otros usuarios ni para activar, desactivar, bloquear o cambiar el estado de las cuentas.
- Los roles se limitan a los tres definidos para el proyecto.

---

### HU-05 · Consultar noticias públicas

**Como** visitante **quiero** ver el listado de noticias públicas **para** informarme sobre el Cabildo sin necesidad de iniciar sesión.

**Prioridad:** Should have.

**Criterios de aceptación**

1. El listado es accesible sin iniciar sesión.
2. No se exponen datos privados.
3. No se ofrece una vista de detalle individual de la noticia.
4. Se muestra un estado vacío cuando no hay noticias.
5. Los campos concretos del listado no están definidos en las referencias y no se especifican en esta historia.
6. La pantalla debe verse y funcionar bien en celular, tableta y escritorio, sin scroll horizontal.

**Requisitos funcionales:** RF-07 (consulta pública de noticias).

**Notas**

- El criterio 6 es una regla de diseño responsivo establecida en `AGENTS.md`; no es un requisito funcional.
- El detalle individual de noticias está fuera del alcance.

---

### HU-06 · Registrar solicitud

**Como** Miembro autenticado **quiero** registrar una solicitud **para** que sea atendida por el Cabildo.

**Prioridad:** Must have.

**Criterios de aceptación**

1. El formulario solicita el tipo de trámite como texto libre obligatorio.
2. Las observaciones son opcionales.
3. La fecha y el estado **pendiente** se asignan automáticamente, y la solicitud queda asociada al comunero del miembro.
4. Si el tipo de trámite está vacío, se muestra un mensaje.
5. Se muestra una confirmación del registro.
6. La solicitud aparece en la consulta de solicitudes propias del miembro.
7. El registro requiere una sesión activa.
8. La solicitud no persiste al recargar.

**Requisitos funcionales:** RF-08 (registro de solicitud), RF-09 (consulta de solicitudes propias) y RF-02 (control de acceso).

**Notas**

- No se define un catálogo de tipos de trámite.
- No se definen reglas de validación adicionales para el tipo de trámite.

---

### HU-07 · Consultar solicitudes propias

**Como** Miembro autenticado **quiero** consultar mis solicitudes **para** saber en qué estado se encuentran.

**Prioridad:** Should have.

**Criterios de aceptación**

1. El listado muestra únicamente las solicitudes del miembro autenticado.
2. Cada solicitud muestra tipo, fecha, estado y observaciones.
3. No hay acciones de edición.
4. No hay acciones de eliminación.
5. Se muestra un estado vacío cuando el miembro no tiene solicitudes.
6. Los datos no persisten al recargar.

**Requisitos funcionales:** RF-09 (consulta de solicitudes propias).

**Notas**

- Esta consulta es la vista donde se refleja el cambio de estado realizado en HU-09.
- No se implementan filtros ni búsquedas que no estén definidos en las referencias.

---

### HU-08 · Consultar certificados propios

**Como** Miembro autenticado **quiero** consultar el listado de mis certificados **para** conocer cuáles tengo y en qué estado están.

**Prioridad:** Must have.

**Criterios de aceptación**

1. El listado muestra únicamente los certificados del miembro autenticado.
2. Cada certificado muestra el código de validación.
3. Cada certificado muestra la fecha de generación.
4. Cada certificado muestra el estado **vigente** o **anulado**.
5. Cada certificado muestra el tipo de solicitud.
6. La consulta es de solo lectura: no se abre, descarga, imprime, genera ni valida individualmente ningún certificado.
7. Los datos no persisten al recargar.

**Requisitos funcionales:** RF-10 (consulta de certificados propios).

**Notas**

- Mostrar el estado en el listado está permitido; las acciones sobre el certificado están fuera del alcance.
- No se implementa generación, descarga, impresión ni validación individual.

---

### HU-09 · Consultar todas las solicitudes y actualizar su estado

**Como** Administrador o Líder **quiero** consultar todas las solicitudes y cambiar su estado **para** gestionar su atención.

**Prioridad:** Must have.

**Criterios de aceptación**

1. El listado muestra todas las solicitudes registradas con comunero, tipo, fecha, estado y observaciones.
2. El Administrador y el Líder pueden cambiar el estado entre **pendiente**, **en revisión**, **aprobada**, **rechazada** y **completada**.
3. El cambio de estado solicita confirmación.
4. El cambio se refleja en la consulta del miembro definida en HU-07.
5. Solo el Administrador y el Líder acceden a esta consulta.
6. Se muestra un estado vacío cuando no hay solicitudes.
7. Los datos no persisten al recargar.

**Requisitos funcionales:** RF-11 (consulta de todas las solicitudes) y RF-12 (actualización de estado), con RF-02 como control de acceso.

**Notas**

- RF-09 pertenece a HU-07 y no es un requisito de origen de esta historia; se usa únicamente como vista donde se refleja el estado actualizado.
- No se definen transiciones obligatorias entre estados.
- No se implementan operaciones de edición ni eliminación de solicitudes.

---

### HU-10 · Registrar comunero y su ficha censal

**Como** Administrador o Líder **quiero** registrar un comunero con su ficha censal **para** mantener actualizado el censo del Cabildo.

**Prioridad:** Must have.

**Criterios de aceptación**

1. El formulario solicita documento, nombres, apellidos, fecha de nacimiento, sexo y teléfono; la asignación de una familia existente es opcional.
2. Se exigen los campos obligatorios; el teléfono es opcional.
3. Se valida que el documento no esté repetido.
4. El sexo se selecciona entre los valores de referencia del esquema documental.
5. La ficha censal solicita nivel educativo, ocupación y observaciones opcionales.
6. La fecha de registro se asigna automáticamente.
7. Cuando se selecciona una familia, esta debe existir previamente; no se crean ni editan familias.
8. El nuevo comunero aparece en el listado de comuneros.
9. Al cancelar, el formulario se limpia.
10. El registro del comunero no crea una cuenta de acceso.
11. Los datos no persisten al recargar.

**Requisitos funcionales:** RF-13 (registro de comunero) y RF-14 (registro de ficha censal).

**Notas**

- Los valores de sexo se reproducen como referencia del esquema documental, sin conexión con una base de datos.
- El registro de la ficha censal forma parte del proceso de registro del comunero, queda asociado al comunero correspondiente y no constituye un módulo independiente.
- La creación de la cuenta de acceso corresponde a HU-03.
- No se incorporan campos que no estén en el esquema documental.

---

## 4. Trazabilidad HU → RF

| HU | RF | Criterios cubiertos por RF | Criterios sin RF y su cobertura |
|---|---|---|---|
| HU-01 | RF-01, RF-02 | 1–5 y 7 | 6 → restricción de no ofrecer registro público; la sesión en memoria → simulación sin persistencia |
| HU-02 | RF-02, RF-03 | 1–4 | 5 → simulación sin persistencia |
| HU-03 | RF-04 | 1–9 | 10 → restricción de no ofrecer registro público |
| HU-04 | RF-05, RF-06 | 1–5 | 6 → simulación sin persistencia |
| HU-05 | RF-07 | 1–5 | 6 → regla de diseño responsivo de `AGENTS.md` |
| HU-06 | RF-02, RF-08, RF-09 | 1–5 | 6 → RF-09; 7 → RF-02; 8 → simulación sin persistencia |
| HU-07 | RF-09 | 1–5 | 6 → simulación sin persistencia |
| HU-08 | RF-10 | 1–6 | 7 → simulación sin persistencia |
| HU-09 | RF-02, RF-11, RF-12 | 1–6 | 4 → RF-12 reflejado en RF-09; 7 → simulación sin persistencia |
| HU-10 | RF-13, RF-14 | 1–9 | 10 → el registro no crea cuenta (corresponde a HU-03); 11 → simulación sin persistencia |

**Conclusión:** las diez historias tienen al menos un requisito funcional asociado y todos sus criterios de aceptación tienen cobertura mediante un RF, una restricción del proyecto o una regla no funcional.

## 5. Requisitos funcionales derivados

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

## 6. Funcionalidades excluidas y pendientes

**Excluidas de esta entrega**

- Registro público y autorregistro.
- Gestión de asistencia y códigos QR.
- Generación, descarga, impresión, apertura o validación individual de certificados.
- Detalle individual de noticias públicas.
- Administración de sesiones de otros usuarios y cambios de estado de cuenta.
- Matriz completa de permisos por rol.
- Backend, API, base de datos, Supabase o cualquier forma de persistencia.

**Pendientes de aprobación (no implementadas)**

- P-01 a P-13: familias, actas, etiquetas, noticias administrativas, perfil, creación de cuentas por el Administrador y demás funcionalidades no aprobadas.

Ninguna de estas funcionalidades debe incorporarse a las pantallas sin aprobación expresa.

---

*Documento de trabajo de la evidencia GA6-220501096 (AA3 + AA4). Las historias aquí registradas no amplían el alcance aprobado.*
