import { createClient } from 'redis';

const client = createClient({ url: "redis://localhost:6379", password: "test" });

client.on('error', (err) => console.log('Redis Client Error', err));

const start = async () => {
  await client.connect();

  let counter = 0
  setInterval(async () => {
    await client.rPush("sefa", "data->" + counter++)
  }, 1000);

}

start()