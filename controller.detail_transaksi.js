const db=(require('../db'))

module.exports ={
    getAllDetail_transaksi : (req, res) =>{
        let sql = 'SELECT * FROM detail_transaksi'
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'All detail_transaksi',
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No detail_transaksi found'
                    })
                }
            }
        })
    },

    getDetail_transaksi : (req, res) =>{
        const id = req.params.id
        let sql = `SELECT * FROM detail_transaksi WHERE id= ${id}`
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'detail_transaksi by ID' + id,
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No detail_transaksi found'
                    })
                }
            }
        })
    },

    postDetail_transaksi : (req, res) =>{
        const{id_transaksi, id_paket, qty} = req.body
        const dataNew = {
            id_transaksi,
            id_paket,
            qty
        }
        
        let sql = `INSERT INTO detail_transaksi SET ?`
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

    putDetail_transaksi : (req, res) => {
        const { id } = req.params
        const{id_transaksi, id_paket, qty} = req.body
    
        let sql = `UPDATE detail_transaksi SET id_transaksi = '${id_transaksi}', id_paket = '${id_paket}',  qty = '${qty}' WHERE id = ${id}`
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal server error'
                })
            } else {
                res.status(200).json({
                    message: 'data has been updated',
                    data: {
                        id_transaksi,
                        id_paket,
                        qty
                    }
                })
            }
        })
    },

    deleteDetail_transaksi : (req, res) =>{
        const id = req.params.id

        let sql = `DELETE FROM detail_transaksi where id = ${id}`
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'detail_transaksi dengan ID '+id+' telah terhapus',
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No detail_transaksi found'
                    })
                }
            }
        })
    }
}