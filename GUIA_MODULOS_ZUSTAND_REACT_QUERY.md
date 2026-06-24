# Guia Frontend: Zustand + React Query + CRUD de Catalogos

Esta guia documenta el patron recomendado del proyecto para autenticacion, estado global, fetch de datos, paginacion, filtros y CRUD con modal de Ant Design.

## 1. Estado global con Zustand

Archivo principal:
- `store/zustand/store.ts`

Que guarda actualmente:
- `accessToken`: token de acceso
- `refreshToken`: token de refresh
- `user`: usuario autenticado
- `hydrated`: indica cuando el estado persistido ya se cargo
- `isAuthenticated`: bandera de sesion activa

Funciones clave:
- `setSession({ accessToken, refreshToken, user })`
- `setUser(user)`
- `clearSession()`

Uso basico en componentes:

```tsx
import { useAuthStore } from '@/store/zustand/store';

const user = useAuthStore((state) => state.user);
const clearSession = useAuthStore((state) => state.clearSession);
```

Notas:
- La persistencia se hace con `persist` de Zustand.
- Evita guardar tokens directo en `localStorage` manualmente; usa siempre el store.

## 2. Flujo de autenticacion (Laravel Passport)

Archivos relacionados:
- `app/api/auth/login/route.ts`
- `app/api/auth/refresh/route.ts`
- `app/api/auth/me/route.ts`
- `utils/apiRequest.ts`
- `providers/AuthBootstrap.tsx`

Resumen del flujo:
1. Login del frontend pega a `/api/auth/login`.
2. El route handler de Next llama a `Laravel /oauth/token` (password grant).
3. Se guarda sesion en Zustand (`accessToken`, `refreshToken`).
4. En cada request, `utils/apiRequest.ts` agrega `Authorization: Bearer ...`.
5. Si el backend responde `401`, el interceptor intenta refresh automatico en `/api/auth/refresh`.
6. Si refresh falla, se limpia sesion y redirige a `/login`.

## 3. React Query: queries y mutations

Provider global:
- `providers/QueryProvider.tsx`

### 3.1 Queries (lectura)

Se usan con `useQuery`.

Patron recomendado:

```tsx
const queryParams = { page, per_page, search };

const catalogoQuery = useQuery({
  queryKey: ['mi-catalogo', queryParams],
  queryFn: () => miService.paginate(queryParams),
});
```

Reglas utiles:
- `queryKey` debe incluir filtros/paginacion para cache correcto.
- El `queryFn` debe delegar al service.

### 3.2 Mutations (escritura)

Se usan con `useMutation` para crear/editar/eliminar.

Patron recomendado:

```tsx
const queryClient = useQueryClient();

const createMutation = useMutation({
  mutationFn: (payload) => miService.create(payload),
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ['mi-catalogo'] });
  },
});
```

Regla clave:
- Despues de mutar, siempre invalidar query del modulo para refrescar tabla.

Helper disponible:
- `hooks/useCatalogInvalidation.ts`

## 4. Estructura recomendada para un modulo nuevo

Ejemplo base ya implementado:
- `app/(administrador)/catalogo-ejemplo/page.tsx`
- `services/catalogoEjemploService.ts`

Para un modulo nuevo (ejemplo: `productos`):

1. Crear service en `services/productoService.ts`:

```ts
import { BaseApiService } from '@/utils/baseApiService';

class ProductoService extends BaseApiService {
  protected endpoint = '/productos';
}

export default new ProductoService();
```

2. Crear pagina en `app/(administrador)/productos/page.tsx`.
3. Copiar patron de `catalogo-ejemplo`.
4. Ajustar:
- interfaces (`ProductoItem`)
- `queryKey` (`['productos', queryParams]`)
- columnas de tabla
- campos del modal
- payload de create/update

5. Agregar opcion al sidebar en `app/components/HeaderSidebar.tsx`.

## 5. Paso a paso CRUD con tabla + paginacion + filtros + modal

### Paso 1: Estado local de pantalla

Necesitas estado para:
- paginacion (`current`, `pageSize`)
- filtros (`search`, etc.)
- modal (`open`)
- registro en edicion (`editingItem`)
- formulario (`Form.useForm()`)

### Paso 2: Query params memoizados

```tsx
const queryParams = useMemo(() => ({
  page: pagination.current,
  per_page: pagination.pageSize,
  search: filters.search || undefined,
}), [pagination, filters]);
```

### Paso 3: Fetch con `useQuery`

```tsx
const query = useQuery({
  queryKey: ['productos', queryParams],
  queryFn: () => productoService.paginate(queryParams),
});
```

### Paso 4: Normalizar respuesta para tabla

Tu backend puede responder en distintos formatos. Patron usado:

```tsx
const rawData = query.data;
const rows = Array.isArray(rawData) ? rawData : (rawData?.data ?? []);
const total = Array.isArray(rawData) ? rawData.length : (rawData?.total ?? rows.length);
```

### Paso 5: Mutations de create/update/delete

- `createMutation`
- `updateMutation`
- `deleteMutation`

Cada `onSuccess`:
- mostrar mensaje
- cerrar modal si aplica
- reset de formulario
- `invalidateQueries` del modulo

### Paso 6: Tabla con paginacion server-side

Con `TablaAntd`:

```tsx
<TablaAntd
  data={rows}
  loading={query.isLoading}
  columns={columns}
  pagination={{
    current: pagination.current,
    pageSize: pagination.pageSize,
    total,
    showSizeChanger: true,
  }}
  onChange={(nextPagination) => {
    setPagination({
      current: nextPagination.current || 1,
      pageSize: nextPagination.pageSize || 10,
    });
  }}
/>
```

### Paso 7: Filtros

Recomendado:
- usar estado de input (`searchInput`) separado de filtro aplicado (`filters.search`)
- aplicar filtro con boton Buscar
- resetear paginacion a pagina 1 al buscar o limpiar

### Paso 8: Modal CRUD

- Modal unico para crear/editar
- Si `editingItem` existe, modo editar
- Si no existe, modo crear

Patron submit:

```tsx
const onSubmit = async () => {
  const values = await form.validateFields();
  if (editingItem) {
    updateMutation.mutate({ id: editingItem.id, payload: values });
    return;
  }
  createMutation.mutate(values);
};
```

## 6. Checklist rapido para nuevo catalogo

1. Crear `services/<modulo>Service.ts` con `endpoint`.
2. Crear `app/(administrador)/<modulo>/page.tsx` basado en `catalogo-ejemplo`.
3. Definir `queryKey` unica del modulo.
4. Agregar `useQuery` con `queryParams`.
5. Agregar `useMutation` create/update/delete.
6. Invalidar queries en cada success.
7. Construir columnas y acciones (editar/eliminar).
8. Configurar modal con `Form`.
9. Conectar filtros y paginacion.
10. Agregar ruta al sidebar.

## 7. Errores comunes a evitar

- No invalidar query despues de mutation.
- Reusar la misma `queryKey` entre modulos distintos.
- Mezclar estado del input de busqueda con filtro aplicado.
- Guardar token manual en `localStorage` fuera de Zustand.
- Exponer `client_secret` de Passport en frontend.

## 8. Plantilla oficial del proyecto

Usa como referencia directa:
- `app/(administrador)/catalogo-ejemplo/page.tsx`

Si sigues ese archivo como base, tendras un comportamiento consistente en todos los catalogos.
