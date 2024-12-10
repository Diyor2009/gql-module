# GraphQL Module Builder

**GraphQL Module Builder** - это библиотека, предназначенная для упрощения работы с модулями GraphQL, позволяющая быстро создавать, регистрировать и объединять типы и резолверы в единую модульную структуру.

## Смысл и причины создания

### 1. **Упрощение разработки модульной архитектуры GraphQL**

При масштабировании приложений, использующих GraphQL, организация кода может стать сложной задачей. Эта библиотека позволяет структурировать код с использованием модулей, где каждый модуль содержит типы и резолверы для определенной функциональности.

### 2. **Повышение читаемости и удобства поддержки**

Четкая структура, разделенная на модули, делает код понятным и легким для поддержки. Каждый модуль управляет отдельной областью приложения, что снижает вероятность конфликтов в резолверах и упрощает добавление новых функциональностей.

### 3. **Автоматизация объединения типов и резолверов**

Вместо ручной агрегации типов и резолверов, библиотека автоматически генерирует итоговые `typeDefs` и `resolvers`. Это избавляет разработчиков от рутинной работы, снижает количество ошибок и улучшает скорость разработки.

### 4. **Гибкость в создании резолверов**

Библиотека предоставляет простой API для создания резолверов с четким разделением запросов, мутаций и подписок. Это позволяет разработчикам сосредоточиться на бизнес-логике, а не на инфраструктурных деталях.

---

## Установка

Установите библиотеку с помощью npm или yarn:

```bash
npm install gql-module
```

или

```bash
yarn add gql-module
```

---

## Использование

```typescript
import { gql } from "apollo-server-core";
import { resolvers, gqlModule, registerModules } from "gql-module";

// Определение GraphQL типов
const userTypes = gql`
  type User {
    name: String
    password: String
  }

  type UsersOutput {
    payload: [User]
  }
`;

// Определение GraphQL резолверов
const userQueries = resolvers({
  getAllUsers: {
    handler(...args) {
      // Ваш обработчик запроса
    },
    type: ": UsersOutput",
  },
});

// Создание GraphQL модуля
const userModule = gqlModule({
  resolvers: {
    queries: userQueries,
  },
  types: [userTypes],
});

// Регистрация модулей и получение итоговых типизаций и резолверов
const { resolvers: builtResolvers, typeDefs } = registerModules([userModule]);

// Вывод результатов
console.log("builtResolvers", builtResolvers);
// Result:
// builtResolvers { Query: { getAllUsers: [Function: builtResolver] } }

console.log("typeDefs", typeDefs.loc.source.body);
// Result:
// typeDefs
//   type User {
//     name: String
//     password: String
//   }
//
//   type UsersOutput {
//     payload: [User]
//   }
//
//   type Query {
//     getAllUsers: UsersOutput
//   }
```

---

## Лицензия

Данная библиотека распространяется под лицензией MIT. Полный текст лицензии можно найти в файле [LICENSE](./LICENSE).

---

Мы надеемся, что эта библиотека упростит вашу работу с GraphQL. Если у вас есть идеи, как улучшить проект, или вы столкнулись с проблемами, будем рады вашим отзывам и предложениям в разделе [Issues](https://github.com/your-repo/gql-module/issues)!

```

```
