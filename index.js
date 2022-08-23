const express = require('express') 
const app = express() 
const port = 5000 // 백 서버 포트 설정
const config = require('./config/key')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // 로그인 토큰을 쿠키에 저장하기

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true})); // 바디파서가 클라이언트에서 오는 정보를 분석해서 가져올 수 있도록

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    //  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => { // 루트 디렉토리에 라우트
  res.send('Hello World!~~ from.root') 
})

// 사용할 라우터 정리
app.use('/api/users', require('./routes/users'));


app.listen(port, () => { // port에서 실행
  console.log(`Example app listening on port ${port}`)
})