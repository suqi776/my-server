import type { Request, Response } from 'express'
import express from 'express'

import tang from './router/tang.ts'

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World12211!')
})

app.use('/tang', tang)

app.listen(port, () => {
  console.error(`Example app listening on port ${port}`)
})

export default app
