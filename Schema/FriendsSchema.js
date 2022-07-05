const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const Friend = new Schema({
    name : String,
    age : Number,
  });
  const Friends= mongoose.model("Friends", Friend);
  module.exports = Friends;