const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { auth } = require("../middleware/auth");


// 사용자 정보 불러오기: get
router.get('/:userID', (req, res) => {
  const userID = req.params.userID
  User.findOne({_id: userID})
  .exec((err, user) => {
    if(err) return res.json({success:false, err})
    if(userID) return res.status(200).json({
      success: true,
      message:"유저를 불러왔습니다.",
      user
    })
  })
})

// 사용자가 작성한 질문 불러오기: get

// 사용자가 작성한 답변의 질문 불러오기: get


// 회원가입 라우트
router.post('/register', (req, res) => {

  // 회원가입 시 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다

  const user = new User(req.body) // json 객체가 들어 있음 (bodyparser 이용)

  user.save((err, userInfo) => {
      if(err) return res.json({ success: false, err })
      return res.status(200).json({
          success: true
      })
  })
})

// 로그인 라우트
router.post('/login', (req, res) => {
// 요청된 이메일이 DB에 있는지 찾는다

User.findOne({ email: req.body.email }, (err, user) => {
  if (!user) {
    return res.json({
      loginSuccess: false,
      message: "제공된 이메일에 해당하는 유저가 없습니다."
    })
  }
  //  이메일이 있다면 비밀번호가 맞는 비밀번호인지 확인
  // comparePassword() 메소드는 User 스키마에 만든다
  user.comparePassword(req.body.password, (err, isMatch) => {

      if(!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
      // 토큰 생성 과정 삭제
      res.status(200).json({ loginSuccess: true, userID: user._id, userName: user.name, familyID: user.familyID })

  })
})
})

module.exports = router;