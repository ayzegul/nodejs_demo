// required libraries
var express=require('express');
var mongoose=require('mongoose');
var Record=require('./record');
const util = require ('./util');

const port=5000;

// connect to mongodb 
mongoose.connect('mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study', {useNewUrlParser: true});
 
var app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.post('/records', (req, res) => {
  
  // do validations on values
  var validationResult = util.checkValues(req.body.startDate, req.body.endDate, req.body.minCount, req.body.maxCount);
  if(validationResult.code > 0)
	  return res.status(400).send({
      code: validationResult.code,
      msg: validationResult.msg
    });
	
	var startDate = validationResult.startDate;
	var endDate = validationResult.endDate;
	var minCount = validationResult.minCount;
	var maxCount = validationResult.maxCount;

  Record.aggregate([ 
  { $match: { 
		"createdAt" : { 
			$gte : startDate, 
			$lte:  endDate
			} 
		}
	},{
		$unwind: "$counts"
	},
	{ $group: {
             "_id": { key: "$key", createdAt: "$createdAt" }, 
             "totalCount": {
                 $sum: "$counts"
             }
	}},{ $match: { 
		"totalCount" : { 
			$gt : minCount, 
			$lt:  maxCount
			}		
		}
	},
     {
         $project: {
            "_id": 0,
            "key": "$_id.key",
			"createdAt": "$_id.createdAt",
            "totalCount": 1
        }
     }
  
], function(err,recs) {
    if(err)
      return res.send(err);
   
	return res.status(200).send({
      code: 0,
      msg: 'Success',
	  records: recs
    });
  });
  
});

 
app.listen(port);
console.log('Server is running on port : ' + port);