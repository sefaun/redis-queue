import { createClient } from 'redis'


const client = createClient({ url: "redis://localhost:6379", password: "test" })

client.on('error', (err) => console.log('Redis Client Error', err))

const create = async () => {
  await client.connect()
}

const start = async () => {

  const result = await client.blPop("sefa", 0)
  console.log(result, "client-3")

  return start()
}

create().then(() => {
  start()
})
