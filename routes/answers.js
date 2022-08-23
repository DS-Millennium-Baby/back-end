const express = require('express');
const router = express.Router();
const { Answer } = require('../models/answer');

// 상세 글에 해당하는 답변 불러오기: get
router.get("/getAnswers/:questionID", (req, res) => {
  const questionID = req.params.questionID
  Answer.find({questionID: questionID})
  .exec((err, answer) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, message:"답변 목록을 불러왔습니다.", answer});
  });
});

// 답변 작성하기: post
router.post("/addAnswer", (req, res) => {
  let addAns = new Answer(req.body)
  addAns.save(
      (err, answer) => {
          if(err) return res.status(400).json({ success: false, err })
          return res.status(200).json({
              success: true, message: "답변이 등록되었습니다.", answer
          })
      }
  )
});

module.exports = router;