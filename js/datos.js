/* =========================================================
   Semilla ficticia de la aplicación.
   Evidencia GA6-220501096 (AA3 + AA4) — Etapa 2, Bloque 1.

   Devuelve colecciones nuevas en cada arranque. No lee ni
   escribe fuera de la memoria del documento: recargar la página
   vuelve a ejecutar crearSemilla() y restaura estos valores.

   Los identificadores FAM-, COM-, CUE-, SOL-, CV- y NOT- son
   datos ficticios, no códigos de requisitos. Los valores siguen
   la semilla aprobada en docs/interfaces.md §7.2.
   ========================================================= */

window.Datos = (function () {
  'use strict';

  function crearSemilla() {
    return {
      familias: [
        { id: 'FAM-01', nombre: 'Familia Amaru' },
        { id: 'FAM-02', nombre: 'Familia Quispe' },
        { id: 'FAM-03', nombre: 'Familia Yupanqui' }
      ],

      comuneros: [
        {
          id: 'COM-01',
          documento: '1.045.223.111',
          nombres: 'Ana',
          apellidos: 'Benavides',
          fechaNacimiento: '1990-03-12',
          sexo: 'femenino',
          telefono: '300 123 4567',
          idFamilia: 'FAM-01'
        },
        {
          id: 'COM-02',
          documento: '1.098.334.552',
          nombres: 'Luis',
          apellidos: 'Cárdenas',
          fechaNacimiento: null,
          sexo: 'masculino',
          telefono: '311 884 2210',
          idFamilia: null
        },
        {
          id: 'COM-03',
          documento: '1.012.887.443',
          nombres: 'Marta',
          apellidos: 'Yupanqui',
          fechaNacimiento: null,
          sexo: 'femenino',
          telefono: '320 447 9081',
          idFamilia: 'FAM-03'
        },
        {
          id: 'COM-04',
          documento: '1.063.442.190',
          nombres: 'Rosa',
          apellidos: 'Quispe',
          fechaNacimiento: null,
          sexo: 'femenino',
          telefono: '301 220 6674',
          idFamilia: 'FAM-02'
        },
        {
          id: 'COM-05',
          documento: '1.079.556.204',
          nombres: 'Ramiro',
          apellidos: 'Amaru',
          fechaNacimiento: null,
          sexo: 'masculino',
          telefono: '310 664 1188',
          idFamilia: 'FAM-01'
        },
        {
          id: 'COM-06',
          documento: '1.055.309.771',
          nombres: 'Celina',
          apellidos: 'Yupanqui',
          fechaNacimiento: null,
          sexo: 'femenino',
          telefono: '312 905 4471',
          idFamilia: 'FAM-03'
        }
      ],

      cuentas: [
        {
          id: 'CUE-01',
          correo: 'admin@cabildo.ejemplo',
          contrasena: 'admin2026',
          rol: 'administrador',
          estado: 'activo',
          idComunero: 'COM-05'
        },
        {
          id: 'CUE-02',
          correo: 'lider@cabildo.ejemplo',
          contrasena: 'lider2026',
          rol: 'lider',
          estado: 'activo',
          idComunero: 'COM-06'
        },
        {
          id: 'CUE-03',
          correo: 'ana@cabildo.ejemplo',
          contrasena: 'miembro2026',
          rol: 'miembro',
          estado: 'activo',
          idComunero: 'COM-01'
        },
        {
          id: 'CUE-04',
          correo: 'marta@cabildo.ejemplo',
          contrasena: 'marta2026',
          rol: 'miembro',
          estado: 'inactivo',
          idComunero: 'COM-03'
        },
        {
          id: 'CUE-05',
          correo: 'luis@cabildo.ejemplo',
          contrasena: 'luis2026',
          rol: 'miembro',
          estado: 'bloqueado',
          idComunero: 'COM-02'
        }
      ],

      solicitudes: [
        {
          id: 'SOL-01',
          idComunero: 'COM-01',
          tipo: 'Solicitud de certificado de residencia',
          fecha: '2026-10-02',
          estado: 'pendiente',
          observaciones: 'Requiere constancia para trámite bancario.'
        },
        {
          id: 'SOL-02',
          idComunero: 'COM-01',
          tipo: 'Actualización de ficha censal',
          fecha: '2026-09-14',
          estado: 'en-revision',
          observaciones: 'Informó cambio de dirección en la vereda.'
        },
        {
          id: 'SOL-03',
          idComunero: 'COM-01',
          tipo: 'Constancia de pertenencia',
          fecha: '2026-08-30',
          estado: 'aprobada',
          observaciones: 'Sin observaciones adicionales.'
        },
        {
          id: 'SOL-04',
          idComunero: 'COM-02',
          tipo: 'Constancia de pertenencia',
          fecha: '2026-08-12',
          estado: 'aprobada',
          observaciones: 'Sin observaciones adicionales.'
        },
        {
          id: 'SOL-05',
          idComunero: 'COM-03',
          tipo: 'Solicitud de certificado de residencia',
          fecha: '2026-07-03',
          estado: 'rechazada',
          observaciones: 'Documento para matrícula educativa.'
        }
      ],

      certificados: [
        {
          id: 'CV-01',
          codigoValidacion: 'CV-2026-0014',
          fechaGeneracion: '2026-10-20',
          estado: 'vigente',
          idSolicitud: 'SOL-01'
        },
        {
          id: 'CV-02',
          codigoValidacion: 'CV-2026-0007',
          fechaGeneracion: '2026-09-02',
          estado: 'anulado',
          idSolicitud: 'SOL-03'
        }
      ],

      noticias: [
        { id: 'NOT-01', titulo: 'Asamblea general del Cabildo', fecha: '2026-10-12' },
        { id: 'NOT-02', titulo: 'Jornada de salud en la vereda Venecia', fecha: '2026-09-03' },
        { id: 'NOT-03', titulo: 'Convocatoria a minga comunitaria', fecha: '2026-08-21' }
      ],

      /* Limitación temporal del Bloque 1: los valores de las seis
         fichas no están definidos en las fuentes aprobadas. La
         colección se completará en el Bloque 4. */
      fichas: []
    };
  }

  return {
    crearSemilla: crearSemilla
  };
})();
