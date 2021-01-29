const express = require('express');
const bodyParser = require('body-parser');
const mahasiswaController = require('./controllers/controller_mhs');


const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = 3000;

app.get('/', (re, res) => {
    res.json({
        "message": "Welcome to server final project squad mobile"
    })
})

app.get('/mahasiswa', mahasiswaController.findAll);
app.get('/mahasiswa/:idMahasiswa', mahasiswaController.findOne);
app.post('/mahasiswa', mahasiswaController.create);
app.put('/mahasiswa/:idMahasiswa', mahasiswaController.update);
app.delete('/mahasiswa/:idMahasiswa', mahasiswaController.delete);


app.listen(port, () => {
    console.log("berjalan di http://localhost:"+port);
})
