import { createClient } from 'redis'


const client = createClient({ url: "redis://localhost:7000", password: "test" })

client.on('error', (err) => console.log('Redis-1 Client Error', err))

const create = async () => await client.connect()

class Service3 {

  constructor() {
    this.service3Job1()
    this.service3Job2()
    this.service3Job3()
  }

  async service3Job1() {
    await client.blPop("service3Job1", 0)
    client.publish("service3Job1-sub", "service3Job1-answer")
    return this.service3Job1()
  }

  async service3Job2() {
    await client.blPop("service3Job2", 0)
    client.publish("service3Job2-sub", "service3Job2-answer")
    return this.service3Job2()
  }

  async service3Job3() {
    await client.blPop("service3Job3", 0)
    client.publish("service3Job3-sub", "service3Job3-answer")
    return this.service3Job3()
  }

}

create().then(() => new Service3())