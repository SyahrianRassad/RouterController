const db=(require('../db'))
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')

const secret = '#$*&%^&@#($(@'

function hasPassword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports ={
    getAllUser : (req, res) =>{
        let sql = 'SELECT * FROM user'
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'All user',
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No user found'
                    })
                }
            }
        })
    },

    getUser : (req, res) =>{
        const id = req.params.id
        let sql = `SELECT * FROM user WHERE id= ${id}`
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'user by ID' + id,
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No user found'
                    })
                }
            }
        })
    },

    postUser:(req,res)=>{
        const{
            nama,
            username,
            password,
            role
        } = req.body
        if(!nama, !username, !role || !password) res.status(402).json({message: 'nama,username,role,password harus diisi'})
        return db.query(`insert into user set ?`, {nama, username, password:hasPassword(password), role}, (err,result)=>{
            if(err)return res.status(500).json({err})
            return res.json({message:'registrasi berhasil',data:result})
        })
    },

    putUser : (req, res) => {
        const { id } = req.params
        const { nama, username, password, role } = req.body

        password = password.hasPassword(password)
    
        let sql = `UPDATE user SET nama = '${nama}', username = '${username}', password = '${password}', role = '${role}' WHERE id = ${id}`
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json({
                    message: 'Internal server error'
                })
            } else {
                res.status(200).json({
                    message: 'member has been updated',
                    data: {
                        nama, 
                        username, 
                        password, 
                        role
                    }
                })
            }
        })
    },

    deleteUser : (req, res) =>{
        const id = req.params.id

        let sql = `DELETE FROM user where id = ${id}`
        db.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({
                    message: 'Internal server error'
                })
            }else{
                if(result.length>0){
                    res.status(200).json({
                        message: 'user dengan ID '+id+' telah terhapus',
                        data: result
                    })
                }else{
                    res.status(404).json({
                        message: 'No user found'
                    })
                }
            }
        })
    }
}