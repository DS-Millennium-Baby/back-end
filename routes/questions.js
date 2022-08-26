const express = require('express');
const router = express.Router();
const { Question } = require('../models/question');

// 질문 작성: post
router.post("/addQuestion", (req, res) => {
  let addQue = new Question(req.body)
  addQue.save(
      (err, question) => {
          if(err) return res.status(400).json({ success: false, err })
          return res.status(200).json({
              success: true, message: "질문이 등록되었습니다.", question
          })
      }
  )
});


// 전체 질문 목록 불러오기: get
router.get("/getQuestion", (req, res) => {
  Question.find({})
  .sort({createdAt: -1}) 
  .exec((err, question) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, message:"질문 목록을 불러왔습니다."});
  });
});

// 최근 질문 3개 불러오기: get
router.get("/getQuestionThree", (req, res) => {
  Question.find({})
  .sort({createdAt: -1}) 
  .limit(3)
  .exec((err, question) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, message:"질문 목록을 불러왔습니다."});
  });
});

// 전공별 질문 목록 3개 불러오기: get
router.get("/getQuestionThree/:major", (req, res) => {
  const major = req.params.major
  Question.find({major: major})
  .sort({createdAt: -1}) 
  .limit(3)
  .exec((err, question) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, message:"질문 목록을 불러왔습니다.", 
      question });
  });
});

// 전공별 질문 목록 불러오기: get
router.get("/getQuestion/:major", (req, res) => {
  const major = req.params.major
  Question.find({major: major})
  .exec((err, question) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, message:"질문 목록을 불러왔습니다.",
      question
    });
  });
});

// 상세 질문 불러오기: get
router.get("/:questionID", (req, res) => {
  const questionID = req.params.questionID
  console.log(questionID)
  Question.findOne({_id: questionID})
  .exec((err, question) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, message:"질문 목록을 불러왔습니다.", 
      question });
  });
});

module.exports = router;