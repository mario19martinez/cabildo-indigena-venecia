/* =========================================================
   Tabla única de rutas de la aplicación.
   Evidencia GA6-220501096 (AA3 + AA4) — Etapa 2, Bloque 1.

   Cada entrada declara una de las doce vistas aprobadas en
   docs/interfaces.md y los metadatos que usan el menú y las
   guardas. El menú y el control de acceso se derivan de esta
   misma tabla para que no exista una opción visible pero
   bloqueada, ni una vista accesible pero oculta.

   Formato:
   - clave:            identificador interno y prefijo de los id.
   - ruta:             fragmento real de la barra de direcciones.
   - titulo:           texto de document.title, sin el nombre del sitio.
   - etiqueta:         texto visible en el menú de navegación.
   - acceso:           'publico', 'autenticado' o 'roles'.
   - roles:            roles autorizados cuando acceso es 'roles'.
   - enMenu:           si la ruta se ofrece en el menú principal.
   - soloInvitado:     D-14: con sesión redirige a #/inicio.
   - ordenMenu:        posición dentro del menú del rol activo.
   - resalta:          clave del menú que se marca si la ruta no
                       aparece en el menú (por ejemplo, el paso 1
                       del registro de comunero).
   - requiereBorrador: declarado para el Bloque 4; en este bloque
                       no se consume.
   - disponible:       false reserva la vista para un bloque
                       posterior sin habilitar su contenido.
   ========================================================= */

window.RUTAS = [
  {
    clave: 'noticias',
    ruta: '#/noticias',
    titulo: 'Noticias del Cabildo',
    etiqueta: 'Noticias',
    acceso: 'publico',
    enMenu: true,
    ordenMenu: 90
  },
  {
    clave: 'iniciar-sesion',
    ruta: '#/iniciar-sesion',
    titulo: 'Iniciar sesión',
    etiqueta: 'Iniciar sesión',
    acceso: 'publico',
    enMenu: true,
    soloInvitado: true,
    ordenMenu: 95
  },
  {
    clave: 'inicio',
    ruta: '#/inicio',
    titulo: 'Inicio',
    etiqueta: 'Inicio',
    acceso: 'autenticado',
    enMenu: true,
    ordenMenu: 10
  },
  {
    clave: 'registrar-solicitud',
    ruta: '#/registrar-solicitud',
    titulo: 'Registrar solicitud',
    etiqueta: 'Registrar solicitud',
    acceso: 'roles',
    roles: ['miembro'],
    enMenu: true,
    ordenMenu: 20
  },
  {
    clave: 'mis-solicitudes',
    ruta: '#/mis-solicitudes',
    titulo: 'Mis solicitudes',
    etiqueta: 'Mis solicitudes',
    acceso: 'roles',
    roles: ['miembro'],
    enMenu: true,
    ordenMenu: 30
  },
  {
    clave: 'mis-certificados',
    ruta: '#/mis-certificados',
    titulo: 'Mis certificados',
    etiqueta: 'Mis certificados',
    acceso: 'roles',
    roles: ['miembro'],
    enMenu: true,
    ordenMenu: 40
  },
  {
    clave: 'solicitudes',
    ruta: '#/solicitudes',
    titulo: 'Todas las solicitudes',
    etiqueta: 'Todas las solicitudes',
    acceso: 'roles',
    roles: ['lider', 'administrador'],
    enMenu: true,
    ordenMenu: 20
  },
  {
    clave: 'comuneros',
    ruta: '#/comuneros',
    titulo: 'Comuneros',
    etiqueta: 'Comuneros',
    acceso: 'roles',
    roles: ['lider', 'administrador'],
    enMenu: true,
    ordenMenu: 30
  },
  {
    clave: 'registrar-comunero',
    ruta: '#/registrar-comunero',
    titulo: 'Registrar comunero',
    etiqueta: 'Registrar comunero',
    acceso: 'roles',
    roles: ['lider', 'administrador'],
    enMenu: false,
    resalta: 'comuneros'
  },
  {
    clave: 'ficha-censal',
    ruta: '#/ficha-censal',
    titulo: 'Ficha censal',
    etiqueta: 'Ficha censal',
    acceso: 'roles',
    roles: ['lider', 'administrador'],
    enMenu: false,
    requiereBorrador: true,
    disponible: false
  },
  {
    clave: 'crear-cuenta',
    ruta: '#/crear-cuenta',
    titulo: 'Crear cuenta de acceso',
    etiqueta: 'Crear cuenta',
    acceso: 'roles',
    roles: ['lider'],
    enMenu: true,
    ordenMenu: 40
  },
  {
    clave: 'cuentas',
    ruta: '#/cuentas',
    titulo: 'Cuentas de usuario',
    etiqueta: 'Cuentas de usuario',
    acceso: 'roles',
    roles: ['administrador'],
    enMenu: true,
    ordenMenu: 40
  }
];

/* Vista que se muestra cuando no hay una ruta válida en el hash. */
window.RUTA_INICIAL = 'noticias';
