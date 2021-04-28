const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors())

app.get('/api/users', (req, res, next) => {
  console.log('req:', req);

  const { page, pageSize } = req.query;
  const data = [];

  for (let i = (page * pageSize - pageSize); i < (page * pageSize); i++) {
    data.push({
      title: `title_${i + 1}`,
      id: i + 1
    })
  }

  setTimeout(() => {

    res.json({ code: 0, data: data })
  }, 1000);
})

app.listen(8000)