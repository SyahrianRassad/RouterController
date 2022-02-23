const express = require("express")
const router = express.Router()
const {checkToken} = require('../auth/token.validation')

const{
    getAllUser,
    getUser,
    deleteUser,
    postUser,
    putUser
} = require('../controller/controller.user')

router.route('/user/:id').get(getUser).delete(deleteUser).put(putUser)
router.route('/user').get(getAllUser).post(postUser)

const{
    getAllMember,
    getMember,
    deleteMember,
    postMember,
    putMember
    
}= require('../controller/controller.member')

router.route('/member/:id').get(getMember).delete(deleteMember).put(putMember)
router.route('/member').get(getAllMember).post(postMember)

const{
    getAllPaket,
    getPaket,
    deletePaket,
    postPaket,
    putPaket
} = require('../controller/controller.paket')

router.route('/paket/:id').get(getPaket).delete(deletePaket).put(putPaket)
router.route('/paket').get(getAllPaket).post(postPaket)

const{
    getAllDetail_transaksi,
    getDetail_transaksi,
    deleteDetail_transaksi,
    postDetail_transaksi,
    putDetail_transaksi
} = require('../controller/controller.detail_transaksi')

router.route('/detail_transaksi/:id').get(getDetail_transaksi).delete(deleteDetail_transaksi).put(putDetail_transaksi)
router.route('/detail_transaksi').get(getAllDetail_transaksi).post(postDetail_transaksi)

const{
    getAllOutlet,
    getOutlet,
    deleteOutlet,
    postOutlet,
    putOutlet
} = require('../controller/controller.outlet')

router.route('/outlet/:id').get(getOutlet).delete(deleteOutlet).put(putOutlet)
router.route('/outlet').get(getAllOutlet).post(postOutlet)

const{
    getAllTransaksi,
    getTransaksi,
    deleteTransaksi,
    postTransaksi,
    putTransaksi
} = require('../controller/controller.transaksi')

router.route('/transaksi/:id').get(getTransaksi).delete(deleteTransaksi).put(putTransaksi)
router.route('/transaksi').get(getAllTransaksi).post(postTransaksi)


module.exports=router