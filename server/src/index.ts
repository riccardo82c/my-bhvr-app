import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { ApiResponse } from 'shared/dist'
import { serve } from '@hono/node-server'


const app = new Hono()

app.use(cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/hello', async (c) => {

  const data: ApiResponse = {
    message: "Hello BHVR!",
    success: true
  }

  return c.json(data, { status: 200 })
})

serve({
  fetch: app.fetch,
  port: 8080
})

export default app
