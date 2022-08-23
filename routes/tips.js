const express = require('express');
const router = express.Router();
const { Tip } = require('../models/tip');

// 팁 작성하기
router.post("/addTip", (req, res) => {
  let addQue = new Tip(req.body)
  addQue.save(
      (err, question) => {
          if(err) return res.status(400).json({ success: false, err })
          return res.status(200).json({
              success: true, message: "팁이 등록되었습니다.", question
          })
      }
  )
});

// 전공별 팁 여러 개 불러오기
router.get("/getTip/:major", (req, res) => {
  const major = req.params.major
  Tip.find({major: major})
  .exec((err, question) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, message:"팁 목록을 불러왔습니다.", question});
  });
});

// 팁 상세 페이지
router.get("/:TipID", (req, res) => {
  const TipID = req.params.TipID
  console.log(TipID)
  Tip.findOne({_id: TipID})
  .exec((err, question) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, message:"팁을 불러왔습니다.", question});
  });
});

module.exports = router;