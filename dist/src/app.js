import express from 'express';
// import tang from './router/tang.ts'
// import test from './router/test.ts'
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World12211!');
});
// app.use('/test', test)
// app.use('/tang', tang)
app.listen(port, () => {
    console.error(`Example app listening on port ${port}`);
});
export default app;
