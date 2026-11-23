/* =========================================================
   Estado único de la aplicación, solo en memoria.
   Evidencia GA6-220501096 (AA3 + AA4) — Etapa 2, Bloque 1.

   Guarda la semilla, la sesión simulada, el borrador censal
   (nulo en este bloque) y el aviso de la última redirección.
   No usa almacenamiento: al recargar, iniciar() vuelve a crear
   las colecciones desde Datos.crearSemilla().

   Las consultas son de solo lectura. Las escrituras sobre los datos
   son el alta de solicitudes (HU-06) y el cambio de estado de una
   solicitud (HU-09 / RF-12); las demás operaciones que modifican
   datos corresponden a bloques posteriores.
   ========================================================= */

window.Estado = (function () {
  'use strict';

  var ESTADOS_SOLICITUD = [
    'pendiente', 'en-revision', 'aprobada', 'rechazada', 'completada'
  ];

  var API = {
    datos: null,
    sesion: null,
    borradorCenso: null,
    mensajeRuta: '',

    iniciar: function () {
      API.datos = window.Datos.crearSemilla();
      API.sesion = null;
      API.borradorCenso = null;
      API.mensajeRuta = '';
    },

    familiaPorId: function (id) {
      return buscarPorId(API.datos.familias, id);
    },

    comuneroPorId: function (id) {
      return buscarPorId(API.datos.comuneros, id);
    },

    cuentaPorId: function (id) {
      return buscarPorId(API.datos.cuentas, id);
    },

    cuentaPorCorreo: function (correo) {
      var buscado = String(correo || '').trim().toLowerCase();
      var cuentas = API.datos.cuentas;
      var i;

      for (i = 0; i < cuentas.length; i += 1) {
        if (cuentas[i].correo.toLowerCase() === buscado) {
          return cuentas[i];
        }
      }

      return null;
    },

    solicitudPorId: function (id) {
      return buscarPorId(API.datos.solicitudes, id);
    },

    nombreComunero: function (id) {
      var comunero = API.comuneroPorId(id);

      if (!comunero) {
        return 'Comunero no identificado';
      }

      return comunero.nombres + ' ' + comunero.apellidos;
    },

    nombreFamilia: function (id) {
      var familia = API.familiaPorId(id);

      return familia ? familia.nombre : 'Sin familia asignada';
    },

    solicitudesDe: function (idComunero) {
      return API.datos.solicitudes.filter(function (solicitud) {
        return solicitud.idComunero === idComunero;
      });
    },

    certificadosDe: function (idComunero) {
      var idsSolicitudes = API.solicitudesDe(idComunero).map(function (solicitud) {
        return solicitud.id;
      });

      return API.datos.certificados.filter(function (certificado) {
        return idsSolicitudes.indexOf(certificado.idSolicitud) !== -1;
      });
    },

    comunerosSinCuenta: function () {
      var idsConCuenta = API.datos.cuentas.map(function (cuenta) {
        return cuenta.idComunero;
      });

      return API.datos.comuneros.filter(function (comunero) {
        return idsConCuenta.indexOf(comunero.id) === -1;
      });
    },

    cuentasActivasDeDemostracion: function () {
      return API.datos.cuentas.filter(function (cuenta) {
        return cuenta.estado === 'activo';
      }).slice(0, 3);
    },

    /* Bloque 2 · HU-06: alta de una solicitud en memoria.
       La validación del texto corresponde al formulario; aquí solo
       se comprueba la sesión y el rol antes de escribir. */
    registrarSolicitud: function (tipo, observaciones) {
      var sesion = API.sesion;
      var solicitud;

      if (!sesion || sesion.rol !== 'miembro' || !sesion.idComunero) {
        return null;
      }

      if (!tipo) {
        return null;
      }

      solicitud = {
        id: siguienteIdSolicitud(),
        idComunero: sesion.idComunero,
        tipo: tipo,
        fecha: fechaDeHoy(),
        estado: 'pendiente',
        observaciones: observaciones || ''
      };

      API.datos.solicitudes.push(solicitud);

      return solicitud;
    },

    /* HU-09 / RF-12: cambio de estado en memoria.
       Solo Administrador y Líder. No define transiciones obligatorias:
       cualquier estado de la lista es válido. */
    cambiarEstadoSolicitud: function (idSolicitud, nuevoEstado) {
      var sesion = API.sesion;
      var solicitud = API.solicitudPorId(idSolicitud);
      var anterior;

      if (!sesion || (sesion.rol !== 'administrador' && sesion.rol !== 'lider')) {
        return { ok: false, motivo: 'sin-permiso' };
      }

      if (!solicitud) {
        return { ok: false, motivo: 'no-encontrada' };
      }

      if (ESTADOS_SOLICITUD.indexOf(nuevoEstado) === -1) {
        return { ok: false, motivo: 'estado-invalido' };
      }

      if (solicitud.estado === nuevoEstado) {
        return { ok: false, motivo: 'sin-cambios' };
      }

      anterior = solicitud.estado;
      solicitud.estado = nuevoEstado;

      return { ok: true, solicitud: solicitud, anterior: anterior };
    }
  };

  /* Identificador consecutivo a partir del máximo existente. */
  function siguienteIdSolicitud() {
    var maximo = 0;

    API.datos.solicitudes.forEach(function (solicitud) {
      var coincidencia = /^SOL-(\d+)$/.exec(solicitud.id);
      var numero;

      if (coincidencia) {
        numero = parseInt(coincidencia[1], 10);

        if (numero > maximo) {
          maximo = numero;
        }
      }
    });

    return 'SOL-' + dosDigitos(maximo + 1);
  }

  /* Fecha local del sistema en formato YYYY-MM-DD. */
  function fechaDeHoy() {
    var hoy = new Date();

    return hoy.getFullYear() + '-' +
      dosDigitos(hoy.getMonth() + 1) + '-' +
      dosDigitos(hoy.getDate());
  }

  function dosDigitos(numero) {
    return numero < 10 ? '0' + numero : String(numero);
  }

  function buscarPorId(coleccion, id) {
    var i;

    if (!coleccion) {
      return null;
    }

    for (i = 0; i < coleccion.length; i += 1) {
      if (coleccion[i].id === id) {
        return coleccion[i];
      }
    }

    return null;
  }

  return API;
})();
