# TaskFlow

## Запуск

**Потрібно встановити:** Node.js 20+, pnpm, Docker Desktop

### 1. Залежності

```bash
pnpm install
```

### 2. База даних (PostgreSQL + Redis)

```bash
cd apps/api
docker compose up -d
```

### 3. Запустити проєкт

```bash
pnpm dev        # фронт + бек одночасно
pnpm dev:web    # тільки фронт  →  http://localhost:5173
pnpm dev:api    # тільки бек    →  http://localhost:3000
```

---

## Prisma

```bash
pnpm --filter @taskflow/api db:migrate    # застосувати міграції
pnpm --filter @taskflow/api db:generate   # згенерувати client після зміни schema
pnpm --filter @taskflow/api db:studio     # GUI для бази даних
```

> Схема знаходиться в `apps/api/prisma/schema.prisma`
> Prisma client — `apps/api/generated/prisma/client.ts`
> Конфіг підключення до БД — `apps/api/prisma.config.ts`
