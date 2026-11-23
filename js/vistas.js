/* =========================================================
   Renderizado de solo lectura de la interfaz.
   Evidencia GA6-220501096 (AA3 + AA4) — Etapa 2, Bloque 1.

   Pinta las listas y tablas desde Estado.datos, filtra los datos
   propios por la sesión activa, alterna los estados vacíos y
   actualiza el botón de cierre, la tarjeta del rol y los avisos.
   No valida credenciales ni navega: eso corresponde a
   js/sesion.js y js/navegacion.js.
   ========================================================= */

window.Vistas = (function () {
  'use strict';

  var MESES = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  var ESTADOS_SOLICITUD = ['pendiente', 'en-revision', 'aprobada', 'rechazada', 'completada'];
  var ROLES = ['administrador', 'lider', 'miembro'];

  function porId(id) {
    return document.getElementById(id);
  }

  function limpiar(nodo) {
    while (nodo.firstChild) {
      nodo.removeChild(nodo.firstChild);
    }
  }

  function crearElemento(etiqueta, clase, texto) {
    var elemento = document.createElement(etiqueta);

    if (clase) {
      elemento.className = clase;
    }

    if (texto !== undefined && texto !== null) {
      elemento.textContent = texto;
    }

    return elemento;
  }

  function alternar(contenido, vacio, hayDatos) {
    if (contenido) {
      contenido.hidden = !hayDatos;
    }

    if (vacio) {
      vacio.hidden = hayDatos;
    }
  }

  function fechaTexto(iso) {
    var partes;
    var dia;
    var mes;

    if (!iso) {
      return 'Sin fecha';
    }

    partes = iso.split('-');

    if (partes.length !== 3) {
      return iso;
    }

    dia = parseInt(partes[2], 10);
    mes = parseInt(partes[1], 10) - 1;

    return dia + ' de ' + MESES[mes] + ' de ' + partes[0];
  }

  function crearFecha(iso) {
    var tiempo = document.createElement('time');
    tiempo.dateTime = iso;
    tiempo.textContent = fechaTexto(iso);
    return tiempo;
  }

  function etiquetaRol(rol) {
    if (rol === 'administrador') {
      return 'Administrador';
    }

    if (rol === 'lider') {
      return 'Líder';
    }

    return 'Miembro';
  }

  function etiquetaEstado(estado) {
    var textos = {
      pendiente: 'Pendiente',
      'en-revision': 'En revisión',
      aprobada: 'Aprobada',
      rechazada: 'Rechazada',
      completada: 'Completada',
      vigente: 'Vigente',
      anulado: 'Anulado',
      activo: 'Activo',
      inactivo: 'Inactivo',
      bloqueado: 'Bloqueado'
    };

    return textos[estado] || estado;
  }

  function etiquetaSexo(sexo) {
    var textos = {
      femenino: 'Femenino',
      masculino: 'Masculino',
      otro: 'Otro',
      'no especifica': 'No especifica'
    };

    return textos[sexo] || sexo;
  }

  function crearEtiquetaRol(rol) {
    return crearElemento('span', 'etiqueta-rol', etiquetaRol(rol));
  }

  function crearEtiquetaEstado(estado) {
    return crearElemento(
      'span',
      'etiqueta-estado etiqueta-estado--' + estado,
      etiquetaEstado(estado)
    );
  }

  function crearCelda(etiqueta, contenido) {
    var celda = document.createElement('td');

    celda.setAttribute('role', 'cell');
    celda.setAttribute('data-etiqueta', etiqueta);

    if (contenido && contenido.nodeType === 1) {
      celda.appendChild(contenido);
    } else {
      celda.textContent = contenido === undefined || contenido === null ? '' : contenido;
    }

    return celda;
  }

  function crearCeldaCompuesta(etiqueta, principal, secundario) {
    var celda = crearCelda(etiqueta, principal);
    var detalle = crearElemento('span', 'celda-secundaria', secundario);

    celda.appendChild(detalle);
    return celda;
  }

  function crearFila() {
    var fila = document.createElement('tr');
    fila.setAttribute('role', 'row');
    return fila;
  }

  function crearSelect(id, etiqueta, valores, seleccionado, bloque) {
    var campo = crearElemento('div', 'campo');
    var label = crearElemento('label', 'campo__etiqueta', 'Nuevo ' + etiqueta);
    var select = crearElemento('select', 'campo__control');

    label.htmlFor = id;
    select.id = id;
    select.disabled = true;
    select.setAttribute('data-pendiente', bloque);

    valores.forEach(function (valor) {
      var opcion = document.createElement('option');
      opcion.value = valor.valor;
      opcion.textContent = valor.texto;
      opcion.selected = valor.valor === seleccionado;
      select.appendChild(opcion);
    });

    campo.appendChild(label);
    campo.appendChild(select);
    return campo;
  }

  function crearSelectorEstado(solicitud) {
    var valores = ESTADOS_SOLICITUD.map(function (estado) {
      return { valor: estado, texto: etiquetaEstado(estado) };
    });

    return crearSelect(
      'solicitudes-estado-' + solicitud.id,
      'estado',
      valores,
      solicitud.estado,
      'bloque-3'
    );
  }

  function crearSelectorRol(cuenta) {
    var valores = ROLES.map(function (rol) {
      return { valor: rol, texto: etiquetaRol(rol) };
    });

    return crearSelect(
      'cuentas-rol-' + cuenta.id,
      'rol',
      valores,
      cuenta.rol,
      'bloque-3'
    );
  }

  function renderNoticias() {
    var lista = porId('noticias-lista');
    var noticias;

    if (!lista) {
      return;
    }

    limpiar(lista);
    noticias = window.Estado.datos.noticias;

    noticias.forEach(function (noticia) {
      var elemento = document.createElement('li');
      var articulo = document.createElement('article');

      elemento.className = 'noticia';
      articulo.appendChild(crearElemento('h3', 'noticia__titulo', noticia.titulo));

      var parrafo = crearElemento('p', 'noticia__fecha');
      parrafo.appendChild(crearFecha(noticia.fecha));
      articulo.appendChild(parrafo);

      elemento.appendChild(articulo);
      lista.appendChild(elemento);
    });

    alternar(porId('noticias-listado'), porId('noticias-vacio'), noticias.length > 0);
  }

  function renderCredenciales() {
    var lista = porId('iniciar-sesion-credenciales');

    if (!lista) {
      return;
    }

    limpiar(lista);

    window.Estado.cuentasActivasDeDemostracion().forEach(function (cuenta) {
      var fila = crearElemento('div', 'resumen__fila');
      var correo = crearElemento('code', null, cuenta.correo);
      var clave = crearElemento('code', null, cuenta.contrasena);
      var detalle = document.createElement('dd');

      fila.appendChild(crearElemento('dt', null, etiquetaRol(cuenta.rol)));
      detalle.appendChild(correo);
      detalle.appendChild(document.createTextNode(' · contraseña '));
      detalle.appendChild(clave);
      fila.appendChild(detalle);
      lista.appendChild(fila);
    });
  }

  function renderInicio() {
    var tarjetas = document.querySelectorAll('#vista-inicio [data-rol]');
    var resumen = porId('inicio-sesion-resumen');
    var sesion = window.Estado.sesion;

    Array.prototype.forEach.call(tarjetas, function (tarjeta) {
      tarjeta.hidden = !sesion || tarjeta.getAttribute('data-rol') !== sesion.rol;
    });

    if (!resumen) {
      return;
    }

    if (sesion) {
      resumen.hidden = false;
      resumen.textContent = 'Sesión activa: ' +
        window.Estado.nombreComunero(sesion.idComunero) + ' · ' +
        etiquetaRol(sesion.rol) + ' · ' + sesion.correo + '.';
    } else {
      resumen.hidden = true;
      resumen.textContent = '';
    }
  }

  function renderSesionEncabezado() {
    var boton = porId('cerrar-sesion');

    if (boton) {
      boton.hidden = !window.Sesion.activa();
    }
  }

  function renderAvisoRuta() {
    var aviso = porId('aviso-ruta');

    if (!aviso) {
      return;
    }

    if (window.Estado.mensajeRuta) {
      aviso.textContent = window.Estado.mensajeRuta;
      aviso.hidden = false;
    } else {
      aviso.textContent = '';
      aviso.hidden = true;
    }
  }

  /* Bloque 2 · HU-06: confirmación del alta con resumen de solo lectura.
     Reutiliza los ayudantes de fecha y de etiqueta de estado. */
  function mostrarConfirmacionSolicitud(solicitud) {
    var panel = porId('registrar-solicitud-confirmacion');
    var tipo = porId('registrar-solicitud-resumen-tipo');
    var fecha = porId('registrar-solicitud-resumen-fecha');
    var estado = porId('registrar-solicitud-resumen-estado');

    if (!panel || !tipo || !fecha || !estado || !solicitud) {
      return;
    }

    limpiar(tipo);
    limpiar(fecha);
    limpiar(estado);

    tipo.textContent = solicitud.tipo;
    fecha.appendChild(crearFecha(solicitud.fecha));
    estado.appendChild(crearEtiquetaEstado(solicitud.estado));
    panel.hidden = false;
  }

  function limpiarConfirmacionSolicitud() {
    var panel = porId('registrar-solicitud-confirmacion');
    var tipo = porId('registrar-solicitud-resumen-tipo');
    var fecha = porId('registrar-solicitud-resumen-fecha');
    var estado = porId('registrar-solicitud-resumen-estado');

    if (!panel) {
      return;
    }

    if (tipo) {
      limpiar(tipo);
    }

    if (fecha) {
      limpiar(fecha);
    }

    if (estado) {
      limpiar(estado);
    }

    panel.hidden = true;
  }

  function renderMisSolicitudes() {
    var cuerpo = porId('mis-solicitudes-cuerpo');
    var solicitudes;
    var sesion = window.Estado.sesion;

    if (!cuerpo) {
      return;
    }

    limpiar(cuerpo);
    solicitudes = sesion ? window.Estado.solicitudesDe(sesion.idComunero) : [];

    solicitudes.forEach(function (solicitud) {
      var fila = crearFila();

      fila.appendChild(crearCelda('Tipo de trámite', solicitud.tipo));
      fila.appendChild(crearCelda('Fecha', crearFecha(solicitud.fecha)));
      fila.appendChild(crearCelda('Estado', crearEtiquetaEstado(solicitud.estado)));
      fila.appendChild(crearCelda(
        'Observaciones',
        solicitud.observaciones || 'Sin observaciones.'
      ));
      cuerpo.appendChild(fila);
    });

    alternar(
      porId('mis-solicitudes-listado'),
      porId('mis-solicitudes-vacio'),
      solicitudes.length > 0
    );
  }

  function renderMisCertificados() {
    var cuerpo = porId('mis-certificados-cuerpo');
    var certificados;
    var sesion = window.Estado.sesion;

    if (!cuerpo) {
      return;
    }

    limpiar(cuerpo);
    certificados = sesion ? window.Estado.certificadosDe(sesion.idComunero) : [];

    certificados.forEach(function (certificado) {
      var fila = crearFila();
      var solicitud = window.Estado.solicitudPorId(certificado.idSolicitud);

      fila.appendChild(crearCelda('Código de validación', certificado.codigoValidacion));
      fila.appendChild(crearCelda('Fecha de generación', crearFecha(certificado.fechaGeneracion)));
      fila.appendChild(crearCelda('Estado', crearEtiquetaEstado(certificado.estado)));
      fila.appendChild(crearCelda(
        'Tipo de solicitud',
        solicitud ? solicitud.tipo : 'Sin solicitud asociada'
      ));
      cuerpo.appendChild(fila);
    });

    alternar(
      porId('mis-certificados-listado'),
      porId('mis-certificados-vacio'),
      certificados.length > 0
    );
  }

  function renderSolicitudes() {
    var cuerpo = porId('solicitudes-cuerpo');
    var solicitudes;

    if (!cuerpo) {
      return;
    }

    limpiar(cuerpo);
    solicitudes = window.Estado.datos.solicitudes;

    solicitudes.forEach(function (solicitud) {
      var fila = crearFila();
      var celdaEstado = crearCelda('Cambiar estado', '');

      fila.appendChild(crearCelda(
        'Comunero',
        window.Estado.nombreComunero(solicitud.idComunero)
      ));
      fila.appendChild(crearCeldaCompuesta(
        'Trámite y observaciones',
        solicitud.tipo,
        solicitud.observaciones || 'Sin observaciones.'
      ));
      fila.appendChild(crearCelda('Fecha', crearFecha(solicitud.fecha)));
      fila.appendChild(crearCelda('Estado', crearEtiquetaEstado(solicitud.estado)));
      celdaEstado.appendChild(crearSelectorEstado(solicitud));
      fila.appendChild(celdaEstado);
      cuerpo.appendChild(fila);
    });

    alternar(
      porId('solicitudes-listado'),
      porId('solicitudes-vacio'),
      solicitudes.length > 0
    );
  }

  function renderComuneros() {
    var cuerpo = porId('comuneros-cuerpo');
    var comuneros;

    if (!cuerpo) {
      return;
    }

    limpiar(cuerpo);
    comuneros = window.Estado.datos.comuneros;

    comuneros.forEach(function (comunero) {
      var fila = crearFila();

      fila.appendChild(crearCelda('Documento', comunero.documento));
      fila.appendChild(crearCelda(
        'Comunero',
        comunero.nombres + ' ' + comunero.apellidos
      ));
      fila.appendChild(crearCelda('Sexo', etiquetaSexo(comunero.sexo)));
      fila.appendChild(crearCelda(
        'Familia',
        window.Estado.nombreFamilia(comunero.idFamilia)
      ));
      fila.appendChild(crearCelda(
        'Teléfono',
        comunero.telefono || 'Sin teléfono'
      ));
      cuerpo.appendChild(fila);
    });

    alternar(
      porId('comuneros-listado'),
      porId('comuneros-vacio'),
      comuneros.length > 0
    );
  }

  function renderCuentas() {
    var cuerpo = porId('cuentas-cuerpo');
    var cuentas;
    var sesion = window.Estado.sesion;

    if (!cuerpo) {
      return;
    }

    limpiar(cuerpo);
    cuentas = window.Estado.datos.cuentas;

    cuentas.forEach(function (cuenta) {
      var fila = crearFila();
      var celdaRol = crearCelda('Cambiar rol', '');

      fila.appendChild(crearCelda('Correo', cuenta.correo));
      fila.appendChild(crearCelda('Rol', crearEtiquetaRol(cuenta.rol)));
      fila.appendChild(crearCelda('Estado', crearEtiquetaEstado(cuenta.estado)));

      if (sesion && sesion.idCuenta === cuenta.id) {
        celdaRol.appendChild(crearElemento(
          'p',
          'campo__ayuda',
          'No puede cambiar su propio rol.'
        ));
      } else {
        celdaRol.appendChild(crearSelectorRol(cuenta));
      }

      fila.appendChild(celdaRol);
      cuerpo.appendChild(fila);
    });

    alternar(
      porId('cuentas-listado'),
      porId('cuentas-vacio'),
      cuentas.length > 0
    );
  }

  function renderSelectores() {
    var familia = porId('registrar-comunero-familia');
    var comunero = porId('crear-cuenta-comunero');

    if (familia) {
      limpiar(familia);

      var sinFamilia = document.createElement('option');
      sinFamilia.value = '';
      sinFamilia.textContent = 'Sin familia asignada';
      sinFamilia.selected = true;
      familia.appendChild(sinFamilia);

      window.Estado.datos.familias.forEach(function (registro) {
        var opcion = document.createElement('option');
        opcion.value = registro.id;
        opcion.textContent = registro.nombre;
        familia.appendChild(opcion);
      });
    }

    if (comunero) {
      limpiar(comunero);

      var marcador = document.createElement('option');
      marcador.value = '';
      marcador.textContent = 'Seleccione un comunero';
      marcador.selected = true;
      comunero.appendChild(marcador);

      var disponibles = window.Estado.comunerosSinCuenta();

      disponibles.forEach(function (registro) {
        var opcion = document.createElement('option');
        opcion.value = registro.id;
        opcion.textContent = registro.nombres + ' ' + registro.apellidos +
          ' · ' + registro.documento;
        comunero.appendChild(opcion);
      });

      var formulario = porId('crear-cuenta-formulario');
      var vacio = porId('crear-cuenta-vacio');

      if (formulario) {
        formulario.hidden = disponibles.length === 0;
      }

      if (vacio) {
        vacio.hidden = disponibles.length > 0;
      }
    }
  }

  function renderTodo() {
    renderNoticias();
    renderCredenciales();
    renderMisSolicitudes();
    renderMisCertificados();
    renderSolicitudes();
    renderComuneros();
    renderCuentas();
    renderInicio();
    renderSesionEncabezado();
    renderAvisoRuta();
  }

  return {
    iniciar: function () {
      renderSelectores();
      renderTodo();
    },
    actualizar: function () {
      renderTodo();
    },
    actualizarAviso: function () {
      renderAvisoRuta();
    },
    mostrarConfirmacionSolicitud: mostrarConfirmacionSolicitud,
    limpiarConfirmacionSolicitud: limpiarConfirmacionSolicitud
  };
})();
