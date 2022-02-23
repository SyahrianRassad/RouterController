const db=(require('../db'))

module.exports ={
    getAllTransaksi : (req, res) =>{
        let sql = 'SELECT * FROM transaksi'
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'All transaksi',
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No transaksi found'
                    })
                }
            }
        })
    },

    getTransaksi : (req, res) =>{
        const id = req.params.id
        let sql = `SELECT * FROM transaksi WHERE id= ${id}`
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'transaksi by ID' + id,
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No transaksi found'
                    })
                }
            }
        })
    },

    postTransaksi : (req, res) =>{
        const{id_member, tgl, batas_waktu, tgl_bayar, status, dibayar, id_user} = req.body
        const dataNew = {
            id_member, 
            tgl, 
            batas_waktu, 
            tgl_bayar, 
            status, 
            dibayar, 
            id_user
        }
        
        let sql = `INSERT INTO transaksi SET ?`
        db.query(sql, dataNew, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{  
                res.status(201).json({
                    message: 'Data Baru telah ditambahkan',
                    data: {
                        id: result.insertId,
                        ...dataNew
                    }
                })
            }
        })
    },

    putTransaksi : (req, res) => {
        const { id } = req.params
        const{id_member, tgl, batas_waktu, tgl_bayar, status, dibayar, id_user} = req.body
    
        let sql = `UPDATE transaksi SET id_member = '${id_member}', tgl = '${tgl}', batas_waktu = '${batas_waktu}',
        tgl_bayar = '${tgl_bayar}', status = '${status}', dibayar = '${dibayar}', id_user = '${id_user}' WHERE id = ${id}`
        
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal server error'
                })
            } else {
                res.status(200).json({
                    message: 'data has been updated',
                    data: {
                        id_member, 
                        tgl, 
                        batas_waktu, 
                        tgl_bayar, 
                        status, 
                        dibayar, 
                        id_user
                    }
                })
            }
        })
    },

    deleteTransaksi : (req, res) =>{
        const id = req.params.id

        let sql = `DELETE FROM transaksi where id = ${id}`
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'transaksi dengan ID '+id+' telah terhapus',
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No transaksi found'
                    })
                }
            }
        })
    }
}