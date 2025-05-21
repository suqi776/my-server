import express from 'express'
import tangRouter from './router/tang.js'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World12211!')
})

app.use('/tang', tangRouter)

app.listen(port, () => {
  console.error(`Example app listening on port ${port}`)
})

export default app
