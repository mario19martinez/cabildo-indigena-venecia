/* =========================================================
   Sesión simulada de la aplicación.
   Evidencia GA6-220501096 (AA3 + AA4) — Etapa 2, Bloque 1.

   Valida credenciales ficticias contra la semilla, rechaza
   cuentas inactivas o bloqueadas y guarda la sesión únicamente
   en Estado.sesion. No toca el DOM y no usa almacenamiento.
   ========================================================= */

window.Sesion = (function () {
  'use strict';

  function ingresar(correo, contrasena) {
    var cuenta = window.Estado.cuentaPorCorreo(correo);

    if (!cuenta || cuenta.contrasena !== contrasena) {
      return { ok: false, motivo: 'credenciales' };
    }

    if (cuenta.estado !== 'activo') {
      return { ok: false, motivo: 'inactiva' };
    }

    window.Estado.sesion = {
      idCuenta: cuenta.id,
      correo: cuenta.correo,
      rol: cuenta.rol,
      idComunero: cuenta.idComunero
    };
    window.Estado.borradorCenso = null;

    return { ok: true };
  }

  function cerrar() {
    window.Estado.sesion = null;
    window.Estado.borradorCenso = null;
  }

  function activa() {
    return Boolean(window.Estado.sesion);
  }

  function rol() {
    return window.Estado.sesion ? window.Estado.sesion.rol : null;
  }

  function idComunero() {
    return window.Estado.sesion ? window.Estado.sesion.idComunero : null;
  }

  /* Aplica las reglas de acceso de una entrada de js/rutas.js.
     D-14 (sesión activa en el acceso) y las guardas temporales
     se resuelven en el enrutador, no aquí. */
  function puede(entrada) {
    if (!entrada) {
      return false;
    }

    if (entrada.acceso === 'publico') {
      return true;
    }

    if (!activa()) {
      return false;
    }

    if (entrada.acceso === 'autenticado') {
      return true;
    }

    return Array.isArray(entrada.roles) && entrada.roles.indexOf(rol()) !== -1;
  }

  return {
    ingresar: ingresar,
    cerrar: cerrar,
    activa: activa,
    rol: rol,
    idComunero: idComunero,
    puede: puede
  };
})();
