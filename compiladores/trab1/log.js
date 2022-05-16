const fs = require('fs');

function log(status, msg){
  let formatMessage = `- ${status} => ${msg}  (${new Date()}) \n`;

  const logger = fs.createWriteStream('result.log', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })
  
  logger.write(formatMessage) 

  logger.end() 
}

module.exports = {
  log
}