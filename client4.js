import Redis from "ioredis"

const client = new Redis({ password: "test" })

const start = () => {

  client.blpop("sefa", 0, (err, result) => {
    console.log(result, "client-4")
    return start()
  })
}

start()