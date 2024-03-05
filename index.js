var express = require('express');
var cors = require('cors');
require('dotenv').config()
const { StatusCodes } = require('http-status-codes');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  if (!req.file.originalname) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: 'Invalid file'
    });
    return;
  }
  next();
}, (req, res) => {
  res.status(StatusCodes.CREATED).send({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
