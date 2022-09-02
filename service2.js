import { createClient } from 'redis'


const client = createClient({ url: "redis://localhost:7000", password: "test" })

client.on('error', (err) => console.log('Redis-1 Client Error', err))

const create = async () => await client.connect()

class Service2 {

  constructor() {
    this.service2Job1()
    this.service2Job2()
    this.service2Job3()
  }

  async service2Job1() {
    await client.blPop("service2Job1", 0)
    client.publish("service2Job1-sub", "service2Job1-answer")
    return this.service2Job1()
  }

  async service2Job2() {
    await client.blPop("service2Job2", 0)
    client.publish("service2Job2-sub", "service2Job2-answer")
    return this.service2Job2()
  }

  async service2Job3() {
    await client.blPop("service2Job3", 0)
    client.publish("service2Job3-sub", "service2Job3-answer")
    return this.service2Job3()
  }

}

create().then(() => new Service2())