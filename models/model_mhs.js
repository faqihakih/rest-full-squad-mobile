const conn = require('../connection/connection');

const Mahasiswa = function(mahasiswa){
    this.nama = mahasiswa.nama;
    this.kelas = mahasiswa.kelas;
    this.email = mahasiswa.email;
    this.alamat = mahasiswa.alamat;
}

Mahasiswa.getAll = (result) => {
    conn.query("Select * from Mahasiswa", (err, res) => {
        if (err) {
            console.log("Error : ", err);
            result(null, err);
            return;
        }

        console.log("Mahasiswa : ", res);
        result(null, res);
    })
}

Mahasiswa.getById = (idMahasiswa, result) => {
    conn.query("Select * from Mahasiswa Where id = ?", idMahasiswa, (err, res) => {
        if (err) {
            console.log("Error : ", err);
            result(null, err);
            return
        }

        if (res.length) {
            console.log("Mahasiswa : ", res);
            result(null, res);
            return;
        }

        result({message : "not found"}, null)

    })
}

Mahasiswa.create = (newMahasiswa, result) => {
    conn.query("insert into Mahasiswa set ?", newMahasiswa, (err, res) => {
        if (err) {
            console.log("error : ", err);
            result(null, err);
            return;
        }

        console.log("create mahasiswa : ", {id : res.insertId, ...newMahasiswa});
        result(null, {id : res.insertId, newMahasiswa});
    })
}

Mahasiswa.update = (idMahasiswa, newMahasiswa, result) => {
    conn.query("Update Mahasiswa Set nama = ?, kelas = ?, email = ?, alamat = ? Where id = ?", [newMahasiswa.nama, newMahasiswa.kelas, newMahasiswa.email, newMahasiswa.alamat, idMahasiswa], (err, res) => {
        if (err) {
            console.log("Error : ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind : "not found"}, null);
            return;
        }

        console.log("update mahasiswa", {id : idMahasiswa, ...newMahasiswa});
        result(null, {id : idMahasiswa, ...newMahasiswa})
    })
}

Mahasiswa.delete = (idMahasiswa, result) => {
    conn.query("delete from Mahasiswa where id = ?", idMahasiswa, (err, res) => {
        if (err) {
            console.log("Error : ", err);
            result(null, err);
            return
        }

        if (res.affectedRows == 0) {
            result({kind : "not found"}, null)
            return;
        }

        console.log("delete mahasiswa dangan id "+idMahasiswa);
        result(null, res);
    })
}

module.exports = Mahasiswa;