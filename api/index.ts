import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World12211!')
})

app.listen(port, () => {
  console.error(`Example app listening on port ${port}`)
})

export default app
