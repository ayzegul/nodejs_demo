var moment=require('moment');
const expectedDateFormat = 'YYYY-MM-DD';

exports.checkValues = function (startDateStr, endDateStr, minCountStr, maxCountStr){
   if(!startDateStr)
  {
	  return {
      code: 1,
      msg: 'startDate is required'
    };
  }
  if(!endDateStr)
  {
	  return {
      code: 2,
      msg: 'endDate is required'
    };
  }
  if(!minCountStr)
  {
	  return {
      code: 3,
      msg: 'minCount is required'
    };
  }
  if(!maxCountStr)
  {
	  return {
      code: 4,
      msg: 'maxCount is required'
    };
  }
  if(!moment(startDateStr, expectedDateFormat, true).isValid())
  {
	  return {
      code: 5,
      msg: 'startDate(' + startDateStr + ') value is invalid, specify a valid date in format : ' + expectedDateFormat
    };	  
  }
  if(!moment(endDateStr, expectedDateFormat, true).isValid())
  {
	  return {
      code: 6,
      msg: 'endDate(' + endDateStr + ') value is invalid, specify a valid date in format : ' + expectedDateFormat
    };	  
  }
  var startDate;
  var endDate;
  try{
  startDate = new Date(startDateStr);
  }
  catch(err)
  {
	 return {
      code: 100,
      msg: 'Exception parsing startDate value "' + startDateStr + '": ' + err.message
    }; 
  }
  try{
  endDate = new Date(endDateStr);
  }
  catch(err)
  {
	 return {
      code: 100,
      msg: 'Exception parsing endDate value "' + endDateStr + '": ' + err.message
    }; 
  }
  if(startDate > endDate)
  {
	 return {
      code: 7,
      msg: 'startDate(' + startDateStr + ') should be before endDate(' + endDateStr + ')'
    }; 	  
  }
  if(isNaN(minCountStr))
	  return {
      code: 8,
      msg: 'minCount(' + minCountStr + ') value is invalid, specify a valid integer'
    }; 
  if(isNaN(maxCountStr))
	  return {
      code: 9,
      msg: 'maxCount(' + maxCountStr + ') value is invalid, specify a valid integer'
    }; 

  var minCount;
  var maxCount;
  try{
	  minCount = parseInt(minCountStr);
  }
  catch(err)
  {
	 return {
      code: 100,
      msg: 'Exception parsing minCount value "' + minCountStr + '": ' + err.message
    }; 
  }
  try{
	  maxCount = parseInt(maxCountStr);
  }
  catch(err)
  {
	 return {
      code: 100,
      msg: 'Exception parsing maxCount value "' + maxCountStr + '": ' + err.message
    }; 
  }
  
  if(minCount > maxCount)
  {
	 return {
      code: 10,
      msg: 'minCount"(' + minCountStr + ')" should be less than maxCount"(' + maxCountStr + ')"'
    }; 	  
  }
  
  return {
      code: 0,
      msg: 'No validation error',
	  startDate: startDate,
	  endDate: endDate,
	  minCount: minCount,
	  maxCount: maxCount
    }; 
};

