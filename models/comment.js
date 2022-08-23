const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
  content: { // 내용
      type: String,
  },
  tipID:{ // 전공
    type: Schema.Types.ObjectId,
    ref:'Tip'
  },
  writer:{ //답변자
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)

module.exports = { Comment }