import express from 'express'
import tangRouter from './router/tang.js'

const app = express()
const port = 3000

// 允许所有来源跨域（开发时用，生产请限制）
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // 允许所有来源跨域
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World12211!')
})

app.use('/tang', tangRouter)

app.listen(port, () => {
  console.error(`Example app listening on port ${port}`)
})

export default app
