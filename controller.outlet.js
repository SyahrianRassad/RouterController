const db=(require('../db'))

module.exports ={
    getAllOutlet : (req, res) =>{
        let sql = 'SELECT * FROM outlet'
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'All outlet',
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No outlet found'
                    })
                }
            }
        })
    },

    getOutlet : (req, res) =>{
        const id = req.params.id
        let sql = `SELECT * FROM outlet WHERE id= ${id}`
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'outlet by ID' + id,
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No outlet found'
                    })
                }
            }
        })
    },

    postOutlet : (req, res) =>{
        const{nama, alamat, tlp} = req.body
        const dataNew = {
            nama,
            alamat,
            tlp
        }
        
        let sql = `INSERT INTO outlet SET ?`
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

    putOutlet : (req, res) => {
        const { id } = req.params
        const{nama, alamat, tlp} = req.body
    
        let sql = `UPDATE outlet SET nama = '${nama}', alamat = '${alamat}', tlp = '${tlp}' WHERE id = ${id}`
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal server error'
                })
            } else {
                res.status(200).json({
                    message: 'data has been updated',
                    data: {
                        nama,
                        alamat,
                        tlp
                    }
                })
            }
        })
    },

    deleteOutlet : (req, res) =>{
        const id = req.params.id

        let sql = `DELETE FROM outlet where id = ${id}`
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'outlet dengan ID '+id+' telah terhapus',
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No outlet found'
                    })
                }
            }
        })
    }
}