import { fmt, fmtJSON } from '../common'

export const pkg = {
  filename: 'package.json',
  code: fmtJSON(`{
  "name": "dj-scaffold",
  "version": "1.0.0",
  "scripts": {
    "build": "npx ts-node build.ts"
  },
  "dependencies": {
    "@dubbo/dj": "0.0.1"
  },
  "devDependencies": {
    "ts-node": "^10.0.0",
    "typescript":"^4.3.5"
  }
}
`),
}

export const index = {
  filename: 'index.ts',
  code: fmt(`
    import * as entity from './entity'
    import * as service from './service'

    export {
      entity,
      service
    }
  `),
}

export const build = {
  filename: 'build.ts',
  code: fmt(`
    import {djc} from '@dubbo/dj'
    import * as entry from './index'
    
    djc({
        entry,
    })
`),
}

export const entity = {
  filename: 'entity.ts',
  code: fmt(`
import { entity, t } from '@dubbo/dj'

export const address = entity('org.apache.dubbo.entity.Address')
  .field('province', t.String)
  .field('city', t.String)
  .ok()

export const user = entity('org.apache.dubbo.entity.User')
  .field('id', t.Integer, '用户id')
  .field('name', t.String, '用户名')
  .field('age', t.int, '年龄')
  .field('addr', address)
  .field('addresses', t.List(address))
  .ok()
`),
}

export const enumeration = {
  filename: 'enum.ts',
  code: fmt(`
    import {enumeration} from '@dubbo/dj'
    
    export const color = enumeration('org.apache.dubbo.e.Color')
      .field('Red', 0, '红色')
      .field('Green', 1, '绿色')
      .field('Blue', 2, '蓝色')
      .ok()
`),
}

export const service = {
  filename: 'service.ts',
  code: fmt(`
    import {service, f, t} from '@dubbo/dj'
    import { user } from './entity'
    
    export const helloService = service('org.apache.dubbo.service.UserService')
      .func(
        f.name('sayHello'),
        f.args(f.arg('user', user)),
        f.ret(user)
      )
      .func(
        f.name('sayWorld'),
        f.args(f.arg('names', t.List(t.String))),
        f.ret(t.String)
      ).ok()
`),
}

export const tsconfig = {
  filename: 'tsconfig.json',
  code: fmtJSON(`{
    "target": "es2017",
    "module": "commonjs",
    "strict": true,

    "allowUnreachableCode": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,

    "skipDefaultLibCheck": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "forceConsistentCasingInFileNames": true
  }`),
}
