const express = require('express');
const router = express.Router();
const { Major } = require('../models/major');
const { User } = require('../models/user');


// 전공 정보 불러오기: get
router.get("/getMajor/:major", (req, res) => {
  const major = req.params.major
  Major.findOne({majorName: major})
  .exec((err, majorInfo) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, message:"전공 정보를 불러왔습니다.",
       majorName: majorInfo.majorName, intro: majorInfo.intro, graduate: majorInfo.graduate});
  });
});


// 작업용
// 전공 정보 추가하기: post
router.post("/addMajor", (req, res) => {
  let addMajor = new Major(req.body)
  addMajor.save(
      (err, majorInfo) => {
          if(err) return res.status(400).json({ success: false, err })
          return res.status(200).json({
              success: true, message: "질문이 등록되었습니다.", majorInfo
          })
      }
  )
});

module.exports = router;
