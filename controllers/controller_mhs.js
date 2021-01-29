const Mahasiswa = require('../models/model_mhs');
const Model_mahasiswa = require('../models/model_mhs');

exports.findAll = (req, res) => {
    Model_mahasiswa.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : "Cant get data from server" || err.message
            })
        } else {
            console.log(data);
            res.status(200).send(data)
        }
    })
}

exports.findOne = (req, res) => {
    Mahasiswa.getById(req.params.idMahasiswa, (err, data) => {
        if (err) {
            if (err.message == "not found") {
                res.status(404).send({
                    message : `data dengan id ${req.params.idMahasiswa} tidak ada`
                })
            } else {
                res.status(500).send({
                    message : `gagal menerima data dari id ${req.params.idMahasiswa}`
                })
            }
        } else {
            res.send(data)
        }
    })
}

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message : "Isi semua form"
        })
    }

    const dataMahasiswa = new Mahasiswa({
        nama : req.body.nama,
        kelas : req.body.kelas,
        email : req.body.email,
        alamat: req.body.alamat
    })

    Mahasiswa.create(dataMahasiswa, (err, data) => {
        if (err) {
            res.status(500).send({
                message : "ada yang error saat memasukan data ke server"
            })
        }else{
            res.status(200).send(data)
        }
    })
}