const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const orders = []

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.write('<h1>Pizza backend</h1>')
  res.write('<h2>Current orders</h2>')
  for (const order of orders) {
    res.write(`<h3>${order.name} - ${order.price}</h3>`)
  }
  res.end()
})

app.post('/api/kitchen', (req, res) => {
  console.log('request', req.body)
  if (req.body.name === undefined) {
    return res.json({error: 'Brak rodzaju pizzy'})
  }
  if (req.body.amount === undefined) {
    return res.json({error: 'Brak ilości pizzy'})
  }
  const amount = Number(req.body.amount)
  if (isNaN(amount)) {
    return res.json({error: 'Niewłaściwa ilość pizzy'})
  }
  const price = Math.floor(Math.random() * 10 * amount)
  const order = {name: req.body.name, amount, price}
  orders.push(order)
  res.json(order)
})

app.listen(port, () => {
  console.log(`app listening at port ${port}`)
})