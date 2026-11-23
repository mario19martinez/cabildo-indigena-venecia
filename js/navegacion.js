/* =========================================================
   Navegación, guardas de acceso y sesión simulada.
   Evidencia GA6-220501096 (AA3 + AA4) — Etapa 2, Bloque 1.

   El enrutador resuelve el hash, aplica las guardas de sesión y
   rol, reconstruye el menú del rol activo y actualiza título,
   foco y aviso de redirección. El ingreso, el cierre de sesión, el
   registro de solicitudes y el cambio de estado de una solicitud
   se enlazan aquí; los demás formularios siguen inertes.

   Reglas:
   - Ruta vacía o desconocida → #/noticias.
   - D-14: con sesión, #/iniciar-sesion → #/inicio + aviso.
   - D-02: sin sesión, ruta privada → #/iniciar-sesion + aviso;
     rol sin permiso → #/inicio + aviso.
   - #/ficha-censal queda reservada para el Bloque 4.
   - HU-09: el cambio de estado se confirma en línea antes de escribir.
   - La carga inicial no mueve el foco; los cambios de vista sí.
   - Ningún formulario se envía ni recarga la página.
   ========================================================= */

(function () {
  'use strict';

  var RUTAS = window.RUTAS || [];
  var RUTA_INICIAL = window.RUTA_INICIAL || (RUTAS[0] ? RUTAS[0].clave : '');
  var claveActiva = null;
  var cambioEstadoPendiente = null;
  var cambioRolPendiente = null;

  function porId(id) {
    return document.getElementById(id);
  }

  function entradaDe(clave) {
    var i;

    for (i = 0; i < RUTAS.length; i += 1) {
      if (RUTAS[i].clave === clave) {
        return RUTAS[i];
      }
    }

    return null;
  }

  function seccionDe(clave) {
    return porId('vista-' + clave);
  }

  /* Una entrada aparece en el menú si su rol la admite y no es
     una ruta de invitado cuando ya hay sesión. */
  function visibleEnMenu(entrada) {
    if (!entrada.enMenu) {
      return false;
    }

    if (entrada.soloInvitado && window.Sesion.activa()) {
      return false;
    }

    return window.Sesion.puede(entrada);
  }

  function construirMenu() {
    var lista = porId('menu-principal');
    var fragmento;
    var entradas;

    if (!lista) {
      return;
    }

    while (lista.firstChild) {
      lista.removeChild(lista.firstChild);
    }

    fragmento = document.createDocumentFragment();
    entradas = RUTAS.filter(visibleEnMenu).sort(function (a, b) {
      return (a.ordenMenu || 0) - (b.ordenMenu || 0);
    });

    entradas.forEach(function (entrada) {
      var elemento = document.createElement('li');
      var enlace = document.createElement('a');

      enlace.className = 'menu-principal__enlace';
      enlace.href = entrada.ruta;
      enlace.textContent = entrada.etiqueta;

      elemento.appendChild(enlace);
      fragmento.appendChild(elemento);
    });

    lista.appendChild(fragmento);
  }

  function claveDesdeHash() {
    var hash = window.location.hash;

    if (hash.indexOf('#/') !== 0) {
      return null;
    }

    var clave = hash.slice(2).replace(/\/+$/, '');

    return entradaDe(clave) ? clave : undefined;
  }

  function marcarNavegacion(entrada) {
    var enlaces = document.querySelectorAll('.menu-principal__enlace');
    var resaltada = entradaDe(entrada.resalta || entrada.clave);
    var ruta = resaltada ? resaltada.ruta : entrada.ruta;

    Array.prototype.forEach.call(enlaces, function (enlace) {
      if (enlace.getAttribute('href') === ruta) {
        enlace.setAttribute('aria-current', 'page');
      } else {
        enlace.removeAttribute('aria-current');
      }
    });
  }

  /* Devuelve el destino real de una ruta y el aviso que debe
     mostrarse. El aviso vacío significa navegación normal. */
  function resolver(entrada) {
    if (entrada.soloInvitado && window.Sesion.activa()) {
      return { clave: 'inicio', mensaje: 'Su sesión ya está activa.' };
    }

    if (!window.Sesion.puede(entrada)) {
      if (!window.Sesion.activa()) {
        return {
          clave: 'iniciar-sesion',
          mensaje: 'Inicie sesión para acceder a esta vista.'
        };
      }

      return {
        clave: 'inicio',
        mensaje: 'Su rol no tiene acceso a esta vista.'
      };
    }

    if (entrada.disponible === false) {
      return {
        clave: 'registrar-comunero',
        mensaje: 'La ficha censal se habilitará en el Bloque 4.'
      };
    }

    return { clave: entrada.clave, mensaje: '' };
  }

  function enfocarTitulo(clave) {
    var seccion = seccionDe(clave);
    var titulo = seccion ? seccion.querySelector('h1') : null;

    if (titulo) {
      titulo.focus();
    }
  }

  function activar(clave, enfocar, mensaje) {
    var entrada = entradaDe(clave);

    if (!entrada) {
      return;
    }

    RUTAS.forEach(function (ruta) {
      var seccion = seccionDe(ruta.clave);

      if (seccion) {
        seccion.hidden = ruta.clave !== clave;
      }
    });

    marcarNavegacion(entrada);
    document.title = entrada.titulo + ' — Cabildo Indígena de Venecia';
    window.Estado.mensajeRuta = mensaje || '';
    claveActiva = clave;
    window.Vistas.actualizar();

    if (clave === 'registrar-solicitud') {
      prepararVistaRegistro();
    }

    if (clave === 'solicitudes') {
      prepararVistaSolicitudes();
    }

    if (clave === 'cuentas') {
      prepararVistaCuentas();
    }

    if (enfocar) {
      enfocarTitulo(clave);
    }
  }

  function procesar(clave, enfocar) {
    var entrada = entradaDe(clave);
    var destino;
    var aplicado;

    if (!entrada) {
      return;
    }

    destino = resolver(entrada);
    aplicado = destino.clave === clave;

    if (!aplicado) {
      window.location.replace('#/' + destino.clave);
    }

    activar(destino.clave, enfocar, destino.mensaje);
  }

  function prepararCargaInicial() {
    var clave = claveDesdeHash();

    if (clave === null || clave === undefined) {
      window.location.replace('#/' + RUTA_INICIAL);
      procesar(RUTA_INICIAL, false);
      return;
    }

    procesar(clave, false);
  }

  function alCambiarHash() {
    var clave = claveDesdeHash();

    if (clave === undefined) {
      window.location.replace('#/' + RUTA_INICIAL);
      procesar(RUTA_INICIAL, true);
      return;
    }

    if (clave === null) {
      return;
    }

    /* La redirección ya activó la vista: no se repite el foco. */
    if (clave === claveActiva) {
      return;
    }

    procesar(clave, true);
  }

  function mostrarErrorDeCampo(control, error, texto) {
    var campo = control.parentNode;

    error.textContent = texto;
    error.hidden = false;
    control.setAttribute('aria-invalid', 'true');

    while (campo && campo.className.indexOf('campo') === -1) {
      campo = campo.parentNode;
    }

    if (campo && campo.className.indexOf('campo--error') === -1) {
      campo.className += ' campo--error';
    }
  }

  function limpiarErrorDeCampo(control, error) {
    var campo = control.parentNode;

    error.textContent = '';
    error.hidden = true;
    control.removeAttribute('aria-invalid');

    while (campo && campo.className.indexOf('campo') === -1) {
      campo = campo.parentNode;
    }

    if (campo) {
      campo.className = campo.className.replace(/\s*campo--error/g, '');
    }
  }

  function limpiarErroresDeAcceso() {
    var correo = porId('iniciar-sesion-correo');
    var contrasena = porId('iniciar-sesion-contrasena');
    var errorCorreo = porId('iniciar-sesion-error-correo');
    var errorContrasena = porId('iniciar-sesion-error-contrasena');
    var errorGeneral = porId('iniciar-sesion-error-general');

    if (correo && errorCorreo) {
      limpiarErrorDeCampo(correo, errorCorreo);
    }

    if (contrasena && errorContrasena) {
      limpiarErrorDeCampo(contrasena, errorContrasena);
    }

    if (errorGeneral) {
      errorGeneral.textContent = '';
      errorGeneral.hidden = true;
    }
  }

  function manejarIngreso(evento) {
    var correo = porId('iniciar-sesion-correo');
    var contrasena = porId('iniciar-sesion-contrasena');
    var errorCorreo = porId('iniciar-sesion-error-correo');
    var errorContrasena = porId('iniciar-sesion-error-contrasena');
    var errorGeneral = porId('iniciar-sesion-error-general');
    var primerError = null;
    var resultado;

    evento.preventDefault();

    if (!correo || !contrasena || !errorCorreo || !errorContrasena || !errorGeneral) {
      return;
    }

    limpiarErroresDeAcceso();

    if (!correo.value.trim()) {
      mostrarErrorDeCampo(correo, errorCorreo, 'Ingrese su correo electrónico.');
      primerError = correo;
    }

    if (!contrasena.value) {
      mostrarErrorDeCampo(contrasena, errorContrasena, 'Ingrese su contraseña.');

      if (!primerError) {
        primerError = contrasena;
      }
    }

    if (primerError) {
      primerError.focus();
      return;
    }

    resultado = window.Sesion.ingresar(correo.value, contrasena.value);

    if (!resultado.ok) {
      errorGeneral.textContent = resultado.motivo === 'inactiva'
        ? 'La cuenta está inactiva o bloqueada. Comuníquese con el Cabildo.'
        : 'Correo o contraseña incorrectos';
      errorGeneral.hidden = false;
      errorGeneral.focus();
      return;
    }

    construirMenu();
    window.Vistas.actualizar();
    window.location.replace('#/inicio');
  }

  function cerrarSesion() {
    var entrada = entradaDe('noticias');

    window.Sesion.cerrar();
    window.Estado.mensajeRuta = '';
    construirMenu();
    window.Vistas.actualizar();

    if (window.location.hash === '#/noticias') {
      marcarNavegacion(entrada);
      document.title = entrada.titulo + ' — Cabildo Indígena de Venecia';
      claveActiva = 'noticias';
      enfocarTitulo('noticias');
      return;
    }

    window.location.replace('#/noticias');
  }

  function enlazarAcceso() {
    var formulario = porId('iniciar-sesion-formulario');

    if (formulario) {
      formulario.addEventListener('submit', manejarIngreso);
    }
  }

  /* Bloque 2 · HU-06: registro de la solicitud en memoria. */
  function prepararVistaRegistro() {
    var tipo = porId('registrar-solicitud-tipo-tramite');
    var errorTipo = porId('registrar-solicitud-error-tramite');
    var boton = porId('registrar-solicitud-boton');

    window.Vistas.limpiarConfirmacionSolicitud();

    if (tipo && errorTipo) {
      limpiarErrorDeCampo(tipo, errorTipo);
    }

    if (boton) {
      boton.disabled = false;
    }
  }

  function alEscribirTipoSolicitud() {
    var tipo = porId('registrar-solicitud-tipo-tramite');
    var boton = porId('registrar-solicitud-boton');

    if (!tipo || !boton) {
      return;
    }

    if (tipo.value.trim() !== '') {
      boton.disabled = false;
    }
  }

  function manejarRegistroSolicitud(evento) {
    var formulario = porId('registrar-solicitud-formulario');
    var tipo = porId('registrar-solicitud-tipo-tramite');
    var observaciones = porId('registrar-solicitud-observaciones');
    var errorTipo = porId('registrar-solicitud-error-tramite');
    var boton = porId('registrar-solicitud-boton');
    var titulo = porId('registrar-solicitud-titulo-confirmacion');
    var tipoNormalizado;
    var solicitud;

    evento.preventDefault();

    if (!formulario || !tipo || !observaciones || !errorTipo) {
      return;
    }

    limpiarErrorDeCampo(tipo, errorTipo);
    tipoNormalizado = tipo.value.trim();

    if (!tipoNormalizado) {
      window.Vistas.limpiarConfirmacionSolicitud();
      mostrarErrorDeCampo(tipo, errorTipo, 'Ingrese el tipo de trámite.');
      tipo.focus();
      return;
    }

    solicitud = window.Estado.registrarSolicitud(
      tipoNormalizado,
      observaciones.value.trim()
    );

    if (!solicitud) {
      return;
    }

    formulario.reset();
    window.Vistas.actualizar();
    window.Vistas.mostrarConfirmacionSolicitud(solicitud);

    if (boton) {
      boton.disabled = true;
    }

    if (titulo) {
      titulo.focus();
    }
  }

  function enlazarRegistroSolicitud() {
    var formulario = porId('registrar-solicitud-formulario');
    var tipo = porId('registrar-solicitud-tipo-tramite');

    if (formulario) {
      formulario.addEventListener('submit', manejarRegistroSolicitud);
    }

    if (tipo) {
      tipo.addEventListener('input', alEscribirTipoSolicitud);
    }
  }

  /* HU-09 / RF-12: cambio de estado con confirmación en línea. */
  function prepararVistaSolicitudes() {
    cambioEstadoPendiente = null;
    window.Vistas.limpiarConfirmacionEstado();
  }

  function alCambiarEstadoSolicitud(evento) {
    var select = evento.target;
    var solicitud;
    var estadoAnterior;

    if (!select || select.tagName !== 'SELECT') {
      return;
    }

    if (select.id.indexOf('solicitudes-estado-') !== 0) {
      return;
    }

    solicitud = window.Estado.solicitudPorId(
      select.getAttribute('data-solicitud')
    );

    if (!solicitud) {
      return;
    }

    estadoAnterior = solicitud.estado;

    if (select.value === estadoAnterior) {
      cambioEstadoPendiente = null;
      window.Vistas.limpiarConfirmacionEstado();
      return;
    }

    cambioEstadoPendiente = {
      idSolicitud: solicitud.id,
      estadoAnterior: estadoAnterior,
      estadoNuevo: select.value
    };

    window.Vistas.mostrarConfirmacionEstado(
      solicitud,
      estadoAnterior,
      select.value,
      false
    );
  }

  function confirmarCambioEstado() {
    var pendiente = cambioEstadoPendiente;
    var resultado;

    if (!pendiente) {
      return;
    }

    resultado = window.Estado.cambiarEstadoSolicitud(
      pendiente.idSolicitud,
      pendiente.estadoNuevo
    );

    cambioEstadoPendiente = null;
    window.Vistas.actualizar();

    if (!resultado.ok) {
      window.Vistas.limpiarConfirmacionEstado();
      return;
    }

    window.Vistas.mostrarConfirmacionEstado(
      resultado.solicitud,
      resultado.anterior,
      resultado.solicitud.estado,
      true
    );
  }

  function cancelarCambioEstado() {
    var pendiente = cambioEstadoPendiente;
    var select;

    cambioEstadoPendiente = null;
    window.Vistas.limpiarConfirmacionEstado();

    if (!pendiente) {
      return;
    }

    select = porId('solicitudes-estado-' + pendiente.idSolicitud);

    if (select) {
      select.value = pendiente.estadoAnterior;
      select.focus();
    }
  }

  function enlazarCambioEstadoSolicitudes() {
    var cuerpo = porId('solicitudes-cuerpo');
    var confirmar = porId('solicitudes-confirmar');
    var cancelar = porId('solicitudes-cancelar');

    if (cuerpo) {
      cuerpo.addEventListener('change', alCambiarEstadoSolicitud);
    }

    if (confirmar) {
      confirmar.addEventListener('click', confirmarCambioEstado);
    }

    if (cancelar) {
      cancelar.addEventListener('click', cancelarCambioEstado);
    }
  }

  /* HU-04 / RF-06: cambio de rol con confirmación en línea. */
  function prepararVistaCuentas() {
    cambioRolPendiente = null;
    window.Vistas.limpiarConfirmacionRol();
  }

  function alCambiarRolCuenta(evento) {
    var select = evento.target;
    var cuenta;
    var rolAnterior;

    if (!select || select.tagName !== 'SELECT') {
      return;
    }

    if (select.id.indexOf('cuentas-rol-') !== 0) {
      return;
    }

    cuenta = window.Estado.cuentaPorId(select.getAttribute('data-cuenta'));

    if (!cuenta) {
      return;
    }

    rolAnterior = cuenta.rol;

    if (select.value === rolAnterior) {
      cambioRolPendiente = null;
      window.Vistas.limpiarConfirmacionRol();
      return;
    }

    cambioRolPendiente = {
      idCuenta: cuenta.id,
      rolAnterior: rolAnterior,
      rolNuevo: select.value
    };

    window.Vistas.mostrarConfirmacionRol(
      cuenta,
      rolAnterior,
      select.value,
      false
    );
  }

  function confirmarCambioRol() {
    var pendiente = cambioRolPendiente;
    var resultado;

    if (!pendiente) {
      return;
    }

    resultado = window.Estado.cambiarRolCuenta(
      pendiente.idCuenta,
      pendiente.rolNuevo
    );

    cambioRolPendiente = null;
    window.Vistas.actualizar();

    if (!resultado.ok) {
      window.Vistas.limpiarConfirmacionRol();
      return;
    }

    window.Vistas.mostrarConfirmacionRol(
      resultado.cuenta,
      resultado.anterior,
      resultado.cuenta.rol,
      true
    );
  }

  function cancelarCambioRol() {
    var pendiente = cambioRolPendiente;
    var select;

    cambioRolPendiente = null;
    window.Vistas.limpiarConfirmacionRol();

    if (!pendiente) {
      return;
    }

    select = porId('cuentas-rol-' + pendiente.idCuenta);

    if (select) {
      select.value = pendiente.rolAnterior;
      select.focus();
    }
  }

  function enlazarCambioRolCuentas() {
    var cuerpo = porId('cuentas-cuerpo');
    var confirmar = porId('cuentas-confirmar');
    var cancelar = porId('cuentas-cancelar');

    if (cuerpo) {
      cuerpo.addEventListener('change', alCambiarRolCuenta);
    }

    if (confirmar) {
      confirmar.addEventListener('click', confirmarCambioRol);
    }

    if (cancelar) {
      cancelar.addEventListener('click', cancelarCambioRol);
    }
  }

  function enlazarCierre() {
    var boton = porId('cerrar-sesion');

    if (boton) {
      boton.addEventListener('click', cerrarSesion);
    }
  }

  /* El salto al contenido no debe interpretarse como ruta desconocida. */
  function prepararSaltoContenido() {
    var salto = document.querySelector('.salto-contenido');

    if (!salto) {
      return;
    }

    salto.addEventListener('click', function (evento) {
      evento.preventDefault();

      var activa = document.querySelector('main#contenido section[data-vista]:not([hidden])');
      var destino = activa ? activa.querySelector('h1') : porId('contenido');

      if (destino) {
        if (!destino.hasAttribute('tabindex')) {
          destino.setAttribute('tabindex', '-1');
        }
        destino.focus();
      }
    });
  }

  function evitarEnvioDeFormularios() {
    document.addEventListener('submit', function (evento) {
      evento.preventDefault();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    window.Estado.iniciar();
    window.Vistas.iniciar();
    construirMenu();
    enlazarAcceso();
    enlazarCierre();
    enlazarRegistroSolicitud();
    enlazarCambioEstadoSolicitudes();
    enlazarCambioRolCuentas();
    prepararSaltoContenido();
    evitarEnvioDeFormularios();
    prepararCargaInicial();

    window.addEventListener('hashchange', alCambiarHash);
  });
})();
