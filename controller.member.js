const db=(require('../db'))

module.exports ={
    getAllMember : (req, res) =>{
        let sql = 'SELECT * FROM member'
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'All member',
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No member found'
                    })
                }
            }
        })
    },

    getMember : (req, res) =>{
        const id = req.params.id
        let sql = `SELECT * FROM member WHERE id= ${id}`
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'member by ID' + id,
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No member found'
                    })
                }
            }
        })
    },

    postMember : (req, res) =>{
        const{nama, alamat, jenis_kelamin, tlp} = req.body
        const dataNewMember = {
            nama,
            alamat,
            jenis_kelamin,
            tlp
        }
        
        let sql = `INSERT INTO member SET ?`
        db.query(sql, dataNewMember, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{  
                res.status(201).json({
                    message: 'Member Baru telah ditambahkan',
                    data: {
                        id: result.insertId,
                        ...dataNewMember
                    }
                })
            }
        })
    },

    putMember : (req, res) => {
        const { id } = req.params
        const { nama, alamat, jenis_kelamin, tlp } = req.body
    
        let sql = `UPDATE member SET nama = '${nama}', alamat = '${alamat}', jenis_kelamin = '${jenis_kelamin}', tlp = '${tlp}' WHERE id = ${id}`
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal server error'
                })
            } else {
                res.status(200).json({
                    message: 'member has been updated',
                    data: {
                        id,
                        nama,
                        alamat,
                        jenis_kelamin,
                        tlp
                    }
                })
            }
        })
    },

    deleteMember : (req, res) =>{
        const id = req.params.id

        let sql = `DELETE FROM member where id = ${id}`
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'member dengan ID '+id+' telah terhapus',
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No member found'
                    })
                }
            }
        })
    }
}