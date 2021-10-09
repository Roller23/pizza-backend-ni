const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.end('<h1>Pizza backend</h1>')
})

app.post('/api/kitchen', (req, res) => {
  console.log(req.body)
  if (req.body.name === undefined) {
    return res.json({error: 'Brak rodzaju pizzy'})
  }
  if (req.body.amount === undefined) {
    return res.json({error: 'Brak ilości pizzy'})
  }
  res.json({
    "name": "Capriciosa", 
    "amount": 3,
    "price": 3.14
  })
})

app.listen(port, () => {
  console.log(`app listening at port ${port}`)
})