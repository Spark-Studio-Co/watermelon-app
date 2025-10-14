# Проблема дублирования точек между приватной и глобальной картами

## Описание проблемы

Точки, созданные на глобальной карте (выигранные в аукционе), неправильно отображаются на приватной карте всех пользователей. По логике приложения:

- **Приватная карта** должна показывать только точки, принадлежащие текущему пользователю
- **Глобальная карта** должна показывать все публичные точки + собственные приватные точки пользователя

## Корень проблемы

**Проблема в бэкенд API** `/markers?isAvailable=${boolean}`

### Текущее поведение API:

- `/markers?isAvailable=true` - возвращает ВСЕ доступные точки (включая чужие глобальные)
- `/markers?isAvailable=false` - возвращает ВСЕ точки

### Ожидаемое поведение API:

- `/markers?isAvailable=true` - должен возвращать ТОЛЬКО точки текущего пользователя (приватные)
- `/markers?isAvailable=false` - должен возвращать публичные точки + собственные приватные точки

## Временный фикс на фронтенде

Добавлена фильтрация в `src/features/map/ui/map.tsx`:

```typescript
// TEMPORARY FIX: Filter markers properly based on map mode
if (me?.id && Array.isArray(filteredMarkersList)) {
  if (isPrivate) {
    // Private mode: only show markers owned by current user
    filteredMarkersList = filteredMarkersList.filter(
      (marker: any) => marker.ownerId === me.id
    );
  } else {
    // Global mode: show all markers except private ones from other users
    filteredMarkersList = filteredMarkersList.filter(
      (marker: any) => !marker.isPrivate || marker.ownerId === me.id
    );
  }
}
```

## Необходимые изменения в бэкенде

1. **Исправить endpoint** `/markers?isAvailable=true`:

   - Фильтровать по `ownerId = currentUser.id`
   - Возвращать только точки текущего пользователя

2. **Исправить endpoint** `/markers?isAvailable=false`:

   - Возвращать публичные точки (`isPrivate = false`)
   - Добавлять собственные приватные точки пользователя (`isPrivate = true AND ownerId = currentUser.id`)

3. **Добавить валидацию**:
   - Убедиться, что приватные точки других пользователей не попадают в ответ для глобальной карты

## После исправления бэкенда

После исправления API можно будет удалить временный фикс фильтрации с фронтенда в файле `src/features/map/ui/map.tsx`.

## Влияние на пользователей

- Приватные карты пользователей засоряются чужими точками
- Нарушается приватность - пользователи видят точки, к которым не должны иметь доступ
- Путаница в навигации между приватным и глобальным режимами
