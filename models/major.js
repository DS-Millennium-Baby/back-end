const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const majorSchema = mongoose.Schema({
  name: { // 전공이름
      type: String,
  },
  intro: { // 학과 소개
      type: String,
  },
  graduate: { // 졸업 요건
      type: String,
  },
})

const Major = mongoose.model('Major', majorSchema)

module.exports = { Major }