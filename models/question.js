const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = mongoose.Schema({
  title: { // 제목
      type: String,
      maxlength: 50
  },
  content: { // 내용
      type: String,
      trim: true,
      unique: 1
  },
  category: [{ // 카테고리
      type: String,
  }],
  major:{ // 전공
      type: String,
  },
  writer:{ //작성자
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

const Question = mongoose.model('Question', questionSchema)

module.exports = { Question }