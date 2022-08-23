const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
  tipID:{ // 팁
    type: Schema.Types.ObjectId,
    ref:'Tip'
  },
  content: { // 내용
      type: String,
  },
  writer:{ //답변자
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)

module.exports = { Comment }