const express = require("express")

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const db = require('./db')
db.connect(error => {
    if(error) throw error

    console.log("Mysql Connected")
})

app.get("/",(req,res)=>{
    res.send({
        message: "Berhasil menjalankan GET",
        data:{
            description:
            "Endpoint menampilkan data"
        }
    })
})

app.use("/laundry", require('./router/router'))

const port = 6060
app.listen(port, () => console.log(`App running ${port}`))