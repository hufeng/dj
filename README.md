# dj

A dsl tool that generates dubbo code

# getting started

## installation

```sh
npm i -g @dubbo/dj
```

## command

```txt
> djc
Usage: dj [options]

A dsl tool that generate dubbo code ❤️

Options:
  -V, --version   output the version number
  -i, --init      init dubbo dsl project in current dir
  -b, --build     support generate language such as java, go, ts (default: "ts")
  -h, --help      display help for command
```

## DSL API

### entity object

---

#### **entity**

| args    | type   | description          | required |
| :------ | :----- | :------------------- | :------: |
| name    | string | entity class name    |   true   |
| comment | string | entity class comment |  false   |

#### **field**

| args    | type                                                 | description          | required |
| :------ | :--------------------------------------------------- | :------------------- | :------: |
| name    | string                                               | entity field name    |   true   |
| type    | entity, enum, dl.{Integer, String, Boolean, Char...} | entity field type    |   true   |
| comment | string                                               | entity field comment |  false   |

#### **ok**

it means that we finish the entity declaration.

---

> Talk is cheap, Show me the code!!

```typescript
// dl means dubbo-lang ^_^
import { dl } from '@dubbo/dj'

const user = dl
  .entity('org.apache.dubbo.entity.User')
  .field('id', dl.Integer)
  .field('name', dl.String)
  .field('email', dl.String)
  .ok()
```

**from `djc` compile, it will be emit source code like this,**

```typescript
/**
 * auto generated by dubbo dj
 * ~~~ 💗 machine coding 💗 ~~~
 */

import java from 'js-to-java'

export interface IUser {
  id: number
  name: string
  age: string
}

export default class User {
  id: number
  name: string
  age: string

  constructor(props: IUser) {
    this.id = props.id
    this.name = props.name
    this.age = props.age
  }

  __fields2java() {
    java('org.apache.dubbo.entity.User', {
      id: java.Integer(this.id),
      name: java.String(this.name),
      age: java.String(this.age),
    })
  }
}
```

#### enum

---

#### **enumer**

| args    | type   | description        | required |
| :------ | :----- | :----------------- | :------: |
| name    | string | enum class name    |   true   |
| comment | string | enum class comment |  false   |

#### **field**

| args    | type           | description        | required |
| :------ | :------------- | :----------------- | :------: |
| name    | string         | enum field name    |   true   |
| type    | string, number | enum field type    |   true   |
| comment | string         | enum field comment |  false   |

#### **ok**

it means that we finish the entity declaration.

---

> Talk is cheap, Show me the code!!

```typescript
const color = dl
  .enumer('org.apache.dubbo.entity.Color')
  .field('Red', 0, '红色')
  .field('Green', 1, '绿色')
  .field('Blue', 2, '蓝色')
  .ok()

const fileType = dl
  .enumer('org.apache.dubbo.entity.FileType')
  .field('PDF', 'PDF', 'PDF')
  .field('MP3', 'MP3', 'mp3')
  .ok()
```

**from `djc` compile, it will be emit source code like this,**

```typescript
/**
 * auto generated by dubbo dj
 * ~~~ 💗 machine coding 💗 ~~~
 */

export enum Color {
  /**
   * 红色
   */
  Red = 0,

  /**
   * 绿色
   */
  Green = 1,

  /**
   * 蓝色
   */
  Blue = 2,
}

/**
 * auto generated by dubbo dj
 * ~~~ 💗 machine coding 💗 ~~~
 */

export enum FileType {
  /**
   * PDF
   */
  PDF = 'PDF',

  /**
   * mp3
   */
  MP3 = 'MP3',
}
```

#### service

---

#### **service**

| args    | type   | description        | required |
| :------ | :----- | :----------------- | :------: |
| name    | string | enum class name    |   true   |
| comment | string | enum class comment |  false   |

#### **group**

| args | type   | description | required |
| :--- | :----- | :---------- | :------: |
| name | string | group name  |  false   |

#### **version**

| args | type   | description    | required |
| :--- | :----- | :------------- | :------: |
| name | string | version number |   true   |

#### **method**

| args | type   | description | required |
| :--- | :----- | :---------- | :------: |
| name | string | method name |   true   |

#### **arg**

| args | type                        | description     | required |
| :--- | :-------------------------- | :-------------- | :------: |
| name | string                      | method arg name |   true   |
| type | enum/entity, dl.{String...} | method arg type |   true   |

#### **ret**

| args | type | description         | required |
| :--- | :--- | :------------------ | :------: |
| name | any  | method return value |  false   |

#### **ok**

it means that we finish the service declaration.

---

> Talk is cheap, Show me the code!!

```typescript
import { dl } from '@dubbo/dj'
import { user } from './entity'

export const userService = dl
  .service('org.apache.dubbo.service.UserService')
  .group('')
  .version('1.0.0')
  .method('sayHello')
  <!-- prettier-ignore -->
    .arg('user', user)
    .ret(user)
  .method('sayWorld')
    .arg('name', dl.String)
    .ret(dl.String)
  .ok()
```

**from `djc` compile, it will be emit source code like this,**

=> UserService (Abstract Service)

```typescript
/**
 * auto generated by dubbo dj
 * ~~~ 💗 machine coding 💗 ~~~
 */

import User, { IUser } from '../../entity/User'
import java from 'js-to-java'

export default abstract class UserService {
  dubboInterface = 'org.apache.dubbo.service.UserService'
  group = ''
  version = '1.0.0'
  methods = {
    sayHello: async (user: IUser) => {
      const res = await this.sayHello(user)
      return new User(res).__fields2java()
    },
    sayWorld: async (name: string) => {
      const res = await this.sayWorld(name)
      return java.String(res)
    },
  }

  abstract sayHello(user: IUser): Promise<IUser>

  abstract sayWorld(name: string): Promise<string>
}
```

=> UserServiceImpl (Dubbo provider service)

```typescript
/**
 * auto generated by dubbo dj
 * ~~~ 💗 machine coding 💗 ~~~
 */

import { IUser } from '../entity/User'
import UserService from './base/UserService'

export default class UserServiceImpl extends UserService {
  async sayHello(user: IUser): Promise<IUser> {
    throw new Error('Method not implemented.')
  }

  async sayWorld(name: string): Promise<string> {
    throw new Error('Method not implemented.')
  }
}
```

=> consumer (dubbo invoker)

```typescript
/**
 * auto generated by dubbo dj
 * ~~~ 💗 machine coding 💗 ~~~
 */

import { Dubbo, TDubboCallResult } from 'apache-dubbo-js'
import { argumentMap } from 'interpret-util'
import { IUser } from '../../entity/User'

export interface IUserService {
  sayHello(user: IUser): TDubboCallResult<IUser>

  sayWorld(name: string): TDubboCallResult<string>
}

export const UserServiceWrapper = {
  sayHello: argumentMap,
  sayWorld: argumentMap,
}

export function UserService(dubbo: Dubbo): IUserService {
  return dubbo.proxyService<IUserService>({
    dubboInterface: 'org.apache.dubbo.service.UserService',
    methods: UserServiceWrapper,
  })
}
```

the gen code structure, We will support java and go soon.

```txt
.
├── go
├── java
└── ts
    └── org
        └── apache
            └── dubbo
                ├── entity
                │   └── User.ts
                └── service
                    ├── UserService.ts
                    ├── base
                    │   └── UserService.ts
                    └── consumer
                        └── UserService.ts

10 directories, 4 files
```

### build api

```typescript
import { djc } from '@dubbo/dj'
import * as entity from './entity'
import * as service from './service'

djc({
  buildEntry: { entity, service },
  config: {
    lang: ['ts'], // optional（support multiple value）， ts, go, java
    type: ['service'], // optional （support multiple value）， entity, consumer, service, serviceImpl
  },
})
```
