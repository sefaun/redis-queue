import { createClient } from 'redis'


const client = createClient({ url: "redis://localhost:7000", password: "test" })

client.on('error', (err) => console.log('Redis-1 Client Error', err))

const create = async () => await client.connect()

class Service1 {

  constructor() {
    this.service1Job1()
    this.service1Job2()
    this.service1Job3()
  }

  async service1Job1() {
    await client.blPop("service1Job1", 0)
    client.publish("service1Job1-sub", "service1Job1-answer")
    return this.service1Job1()
  }

  async service1Job2() {
    await client.blPop("service1Job2", 0)
    client.publish("service1Job2-sub", "service1Job2-answer")
    return this.service1Job2()
  }

  async service1Job3() {
    await client.blPop("service1Job3", 0)
    client.publish("service1Job3-sub", "service1Job3-answer")
    return this.service1Job3()
  }

}

create().then(() => new Service1())