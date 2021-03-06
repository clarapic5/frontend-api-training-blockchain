const express = require('express');
const multer = require('multer');
const cors = require('cors');


const app = express();

app.use(express.static('public'))

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage })

app.use(cors());

app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file)
        res.json({
            fileUrl: `/uploads/${req.file.filename}`
        });
    else
        res.status("409").json("No Files to Upload.")
});


app.get('/', (req, res) => {
    res.render('index');
});

/*
// GET method route
app.get('/', function(req, res) {
    res.send('GET request to the homepage');
});

// POST method route
app.post('/', function(req, res) {
    res.send('POST request to the homepage');
});

*/


const PORT = 5000;

app.listen(PORT);
console.log('api runnging on port: ' + PORT);