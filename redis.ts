import { createClient } from "redis"
import dotenv from "dotenv"

dotenv.config()

export const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  }
})
