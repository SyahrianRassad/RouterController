const db=(require('../db'))

module.exports ={
    getAllPaket : (req, res) =>{
        let sql = 'SELECT * FROM paket'
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'All paket',
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No paket found'
                    })
                }
            }
        })
    },

    getPaket : (req, res) =>{
        const id = req.params.id
        let sql = `SELECT * FROM paket WHERE id= ${id}`
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'paket by ID' + id,
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No paket found'
                    })
                }
            }
        })
    },

    postPaket : (req, res) =>{
        const{jenis, harga} = req.body
        const dataNew = {
            jenis,
            harga
        }
        
        let sql = `INSERT INTO paket SET ?`
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

    putPaket : (req, res) => {
        const { id } = req.params
        const{jenis, harga} = req.body
    
        let sql = `UPDATE paket SET jenis = '${jenis}', harga = '${harga}' WHERE id = ${id}`
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal server error'
                })
            } else {
                res.status(200).json({
                    message: 'data has been updated',
                    data: {
                        jenis,
                        harga
                    }
                })
            }
        })
    },

    deletePaket : (req, res) =>{
        const id = req.params.id

        let sql = `DELETE FROM paket where id = ${id}`
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'paket dengan ID '+id+' telah terhapus',
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No paket found'
                    })
                }
            }
        })
    }
}