// [ Node.js & Sequelize ]

// EXPRESS
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json()); 


// SEQUELIZE
const db = require('../models/index.js');
const { Todos } = db;

Todos.sync({froce : false})
  .then(() => {
    console.log('Database Connected!');
  })
  .catch((error) => {
    console.log(error);
  })

// API
// --------  GET 조회 -------- 
// 모든 Todos 조회
app.get('/todos', async (req, res) => {
  let response = await Todos.findAll();
  res.send(response);
  console.log('All todo');
});
// 특정 Todos 조회

// -------- POST 등록 -------- 
// [참고] https://fe-flower.tistory.com/32
// 새로운 Todo 추가

// ------ PUT 수정 -------- 

// -------- DELETE 삭제 -------- 




// LISTEN
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});