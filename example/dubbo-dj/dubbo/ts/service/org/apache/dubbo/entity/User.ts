/**
 * auto generated by dubbo dj
 * ~~~ 💗 machine coding 💗 ~~~
 */

import java from 'js-to-java'
import { Address, IAddress } from './Address'

export interface IUser {
  /**
   * 用户id
   */
  id: number

  /**
   * 用户名
   */
  name: string

  /**
   * 年龄
   */
  age: number

  addr: IAddress

  addresses: Array<IAddress>
}

export class User {
  /**
   * 用户id
   */
  id: number

  /**
   * 用户名
   */
  name: string

  /**
   * 年龄
   */
  age: number

  addr: IAddress

  addresses: Array<IAddress>

  constructor(props: IUser) {
    this.id = props.id
    this.name = props.name
    this.age = props.age
    this.addr = new Address(props.addr)
    this.addresses = ((list: Array<IAddress>) =>
      list.map((v) => new Address(v)))(props.addresses)
  }

  __fields2java() {
    return java('org.apache.dubbo.entity.User', {
      id: java.Integer(this.id),
      name: java.String(this.name),
      age: java.int(this.age),
      addr: ((v: IAddress) => new Address(v).__fields2java())(this.addr),
      addresses: ((list: Array<IAddress> = []) =>
        java.List(list.map((v) => new Address(v).__fields2java())))(
        this.addresses
      ),
    })
  }
}
