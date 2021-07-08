const coffeeModel = require ('../model/coffee')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')

exports.insertCoffee = (data) =>
  new Promise((resolve, reject) => {
    coffeeModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Input Coffee')))
    .catch(() => reject (requestResponse.serverError))
  })

exports.getAllCoffee = () =>
  new Promise((resolve, reject) => {
    coffeeModel.find({})
    .then(coffee => resolve(requestResponse.suksesWithData(coffee)))
    .catch(error => reject (requestResponse.serverError))
  })

exports.getbyId = (id) =>
  new Promise((resolve, reject) => {
    coffeeModel.findOne({
      _id: objectId(id)
    }).then(coffee => resolve(requestResponse.suksesWithData(coffee)))
    .catch(error => reject (requestResponse.serverError))
  })

exports.edit = (data, id, changeImage) =>
  new Promise(async(resolve, reject) => {
    coffeeModel.updateOne({
      _id: objectId(id)
    }, data)
    .then(() => {
      if (changeImage) {
        deleteImage(data.oldImage)
      }
      resolve(requestResponse.sukses('Berhasil Edit Daftar Coffee'))
    }).catch(() => reject(requestResponse.serverError))
  })
 
exports.delete = (id) =>
  new Promise((resolve, reject) => {
    coffeeModel.findOne({
      _id: objectId(id)
    }).then(coffee => {
      coffeeModel.deleteOne({
      _id: objectId(id)
      }).then(() => {
        deleteImage(coffee.image)
        resolve(requestResponse.sukses('Berhasil Delete Coffe'))
      }).catch(() => reject(requestResponse.serverError))
    })
  })