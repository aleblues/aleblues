function dataReader (filePath)
{
const fs = require('fs');

fs.readFile(filePath + '000002017', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return log.console(err);
  }
  resolve(data);
});
};