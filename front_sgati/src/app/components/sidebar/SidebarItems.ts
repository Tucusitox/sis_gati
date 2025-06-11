// ITEMS DEL SIDEBAR, AGREGUE MAS ITEMS DE SER NECESARIO
// EN CASO DE NECESITAR CREAR NUEVOS MODULOS
export const SidebarItems = [
  {
    id: 'gestionActivos',
    rolesPermitidos: ['Administrador', 'Estandar'],
    titulo: 'Gestionar Activos',
    links: [
      { subtitulo: 'Activos', url: '/activos' },
      { subtitulo: 'Crear Activo', url: '/crearActivo' },
      { subtitulo: 'Asignar Activo', url: '/asignarActivo' },
    ],
  },
  {
    id: 'gestionarEmpleados',
    rolesPermitidos: ['Administrador', 'Estandar'],
    titulo: 'Gestionar Empleados',
    links: [
      { subtitulo: 'Empleados', url: '/empleados' },
      { subtitulo: 'Crear Empleado', url: '/crearEmpleado' },
    ],
  },
  {
    id: 'opcionesAvanzadas',
    rolesPermitidos: ['Administrador'],
    titulo: 'Opciones Avanzadas',
    links: [
      { subtitulo: 'Usuarios', url: '/usuarios' },
      { subtitulo: 'Ubicaciones', url: '/locaciones' },
      { subtitulo: 'Tipos de Activos', url: '/tiposActivos' },
    ],
  },
];
