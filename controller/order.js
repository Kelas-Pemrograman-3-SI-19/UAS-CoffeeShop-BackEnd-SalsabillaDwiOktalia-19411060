const orderModel = require('../model/order')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId

exports.insert = (data) =>
 new Promise((resolve, reject) => {
   try {
     orderModel.create(data)
      .then(() => resolve(requestResponse.sukses('Berhasil Memproses Transaksi')))
      .catch(() => reject(requestResponse.serverError))
   } catch (error) {
     console.log(error)
   }
 })

exports.getAllOrder = () =>
 new Promise((resolve, reject) => {
   orderModel.aggregate([
     {
       $lookup: {
         from: "coffees",
         localField: "idCoffee",
         foreignField: "_id",
         as: "dataCoffee"
       }
     },
     {
       $lookup: {
         from: "users",
         localField: "idUser",
         foreignField: "_id",
         as: "dataUser"
       }
     }
   ]).then(res => {
     resolve(requestResponse.suksesWithData(res))
   }).catch(() => reject(requestResponse.serverError))
 })

 exports.getOrderByUser = (id) =>
 new Promise((resolve, reject) => {
   orderModel.aggregate([
    {
      $match: {
        idUser: objectId(id)
      }
    },
     {
       $lookup: {
         from: "coffees",
         localField: "idCoffee",
         foreignField: "_id",
         as: "dataCoffee"
       }
     },
   ]).then(res => {
     resolve(requestResponse.suksesWithData(res))
   }).catch(() => reject(requestResponse.serverError))
 })

exports.konfirmasiOrder = (id) =>
 new Promise((resolve, reject) => {
  try {
    orderModel.updateOne({
     _id: objectId(id)
   },
   {
     status: 2
   }).then(() => resolve(requestResponse.sukses('Berhasil Konfirmasi Berkas')))
   .catch(() => reject(requestResponse.serverError))
  } catch (error) {
    console.log(error)
  }
 })

exports.terimaBarang = (id) =>
 new Promise((resolve, reject) => {
  try {
    orderModel.updateOne({
     _id: objectId(id)
   },
   {
     status: 3
   }).then(() => resolve(requestResponse.sukses('Berhasil Menerima Pesanan')))
   .catch(() => reject(requestResponse.serverError))
  } catch (error) {
    console.log(error)
  }
 })