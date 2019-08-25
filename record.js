var mongoose=require('mongoose');
 
var RecordSchema=new mongoose.Schema({
    key: String,
    createdAt: Date,
    counts: [Number]
});
 
module.exports=mongoose.model('Record',RecordSchema);