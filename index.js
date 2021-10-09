const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const orders = []

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.write('<h1>Pizza backend</h1>')
  res.write('<h2>Current orders</h2>')
  let i = 0;
  for (const order of orders) {
    res.write(`<h3>${order.name} - ${order.price}PLN (${order.status}... <span class="time" id="time-${i}">${order.time}</span>s left)</h3>`)
    i++;
  }
  res.write(`
    <script>
      let times = document.querySelectorAll('.time')
      times.forEach(time => {
        let timeInt = Number(time.innerText)
        let interval = setInterval(() => {
            if (timeInt > 0) {
                timeInt--
                time.innerText = timeInt
            } else {
              clearInterval(interval)
            }
        }, 1000)
      })
    </script>
  `)
  res.end()
})

app.post('/api/kitchen', (req, res) => {
  console.log('request', req.body)
  if (req.body.name === undefined) {
    return res.json({error: 'Pizza name cannot be empty'})
  }
  if (req.body.amount === undefined) {
    return res.json({error: 'Pizza amount cannot be empty'})
  }
  const amount = Math.floor(Number(req.body.amount))
  if (isNaN(amount)) {
    return res.json({error: 'Incorrect pizza amount'})
  }
  const waitTime = rnd(1, 5) * amount
  const price = Math.floor(Math.random() * 10 * amount)
  const order = {name: req.body.name, amount, price}
  const orderRes = {...order}
  order.status = 'Baking...'
  order.time = waitTime
  orders.push(order)
  let interval = setInterval(() => {
    if (order.time > 0) {
      order.time--
    }
  }, 1000)
  setTimeout(() => {
    order.status = 'Done!'
    clearInterval(interval)
    order.time = 0
    res.json(orderRes)
  }, waitTime * 1000)
})

app.listen(port, () => {
  console.log(`app listening at port ${port}`)
})