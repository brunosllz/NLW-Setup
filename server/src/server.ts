import Fastify from "fastify";
import cors from '@fastify/cors';
import { prisma } from "./lib/prisma";
const app = Fastify()

app.register(cors)

app.get('/hello', async () => {
  const habits = await prisma.habit.findMany({})

  return habits
})

app.listen({
  port: 3333
}).then(() => {
  console.log('Server Runnig! 🚀')
})