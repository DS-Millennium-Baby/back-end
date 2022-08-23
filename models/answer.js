const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = mongoose.Schema({
  content: { // 내용
      type: String,
      trim: true,
      unique: 1
  },
  major:{ // 전공
      type: String,
  },
  writer:{ //답변자
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

const Question = mongoose.model('Answer', answerSchema)

module.exports = { Question }