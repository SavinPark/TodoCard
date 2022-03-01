// sequelize 패키지 가져오기
const Sequelize = require('sequelize');

// 데이터베이스 설정 정보 (config.json)
const config = require('../config/config.json');
const { username, password, database, host, dialect } = config.development;

// sequelize 클래스에 데이터베이스에 관한 설정값을 넣고 sequelize 객체 생성
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

// todo.js 안의 함수 가져오기
const Todos = require('./todos.js')(sequelize, Sequelize.DataTypes);

// db라는 객체를 만들어 그 안에 Todo 모델을 넣어 공개
// (나중에 또 다른 테이블이 생기면 새로운 모델이 필요할 수도 있기 때문)
const db = {};
db.Todos = Todos;

module.exports = db;
