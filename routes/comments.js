const express = require('express');
const router = express.Router();
const { Comment } = require('../models/comment');

// 상세 글에 해당하는 댓글 불러오기: get
router.get("/getComments/:tipID", (req, res) => {
  const tipID = req.params.tipID
  console.log(tipID)
  Comment.find({questionID: tipID})
  .exec((err, answer) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, message:"댓글 목록을 불러왔습니다.", answer});
  });
});

// 댓글 작성하기: post
router.post("/addComment", (req, res) => {
  let addComment = new Comment(req.body)
  addComment.save(
      (err, answer) => {
          if(err) return res.status(400).json({ success: false, err })
          return res.status(200).json({
              success: true, message: "댓글이 등록되었습니다.", answer
          })
      }
  )
});

module.exports = router;