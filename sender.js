import { createClient } from 'redis'


const client = createClient({ url: "redis://localhost:7000", password: "test" })
const sub_client = createClient({ url: "redis://localhost:7000", password: "test" })

client.on('error', (err) => console.log('Redis-1 Client Error', err))
sub_client.on('error', (err) => console.log('Redis-2 Client Error', err))

const create = async () => {
  await client.connect()
  await sub_client.connect()
}

const start = async () => {
  //Service 1
  sub_client.subscribe("service1Job1-sub", (message, channel) => {
    console.log("Service-1 Job-1", message, channel)
  })
  sub_client.subscribe("service1Job2-sub", (message, channel) => {
    console.log("Service-1 Job-2", message, channel)
  })
  sub_client.subscribe("service1Job3-sub", (message, channel) => {
    console.log("Service-1 Job-3", message, channel)
  })
  //Service 2
  sub_client.subscribe("service2Job1-sub", (message, channel) => {
    console.log("Service-2 Job-1", message, channel)
  })
  sub_client.subscribe("service2Job2-sub", (message, channel) => {
    console.log("Service-2 Job-2", message, channel)
  })
  sub_client.subscribe("service2Job3-sub", (message, channel) => {
    console.log("Service-2 Job-3", message, channel)
  })
  //Service 3
  sub_client.subscribe("service3Job1-sub", (message, channel) => {
    console.log("Service-3 Job-1", message, channel)
  })
  sub_client.subscribe("service3Job2-sub", (message, channel) => {
    console.log("Service-3 Job-2", message, channel)
  })
  sub_client.subscribe("service3Job3-sub", (message, channel) => {
    console.log("Service-3 Job-3", message, channel)
  })

  let counter = 0
  setInterval(async () => {
    //Service 1
    await client.rPush("service1Job1", "data->" + counter++)
    await client.rPush("service1Job2", "data->" + counter++)
    await client.rPush("service1Job3", "data->" + counter++)
    //Service 2
    await client.rPush("service2Job1", "data->" + counter++)
    await client.rPush("service2Job2", "data->" + counter++)
    await client.rPush("service2Job3", "data->" + counter++)
    //Service 3
    await client.rPush("service3Job1", "data->" + counter++)
    await client.rPush("service3Job2", "data->" + counter++)
    await client.rPush("service3Job3", "data->" + counter++)
  }, 100)

}

create().then(() => start())