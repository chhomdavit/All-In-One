const {isEmptyOrNull} = require("../util/service");
const db = require('../models')
const DB = db.products

const getList = (req, res) => {
  var Select = 'SELECT * FROM `products`'
  DB.sequelize.query(Select, { type: DB.sequelize.QueryTypes.SELECT })
    .then(result => {
      res.json({
        list_product: result
      })
    })
    .catch(error => {
      res.json({
        error: true,
        message: error
      })
    })
};

const create = (req,res)=>{
  var {title, price, description, published, createdAt, updatedAt} = req.body
  var message = {}
  if(isEmptyOrNull(title)){
      message.title = "please fill in title!"
  }
  if(Object.keys(message).length > 0){
      res.json({
          error : true,
          message : message
      })
      return 
  }
  var image = null
  if(req.file){
    image = req.file.filename
  }
  DB.create({
    image: image,
    title: title,
    price: price,
    description: description,
    published: published,
    createdAt: createdAt,
    updatedAt: updatedAt
  }).then(results => {
    res.json({
      message : "Insert success!",
    })
  }).catch(error => {
    res.json({
      error : true,
      message : error
    })
  })
};

const update = (req, res) => {
  var {title, price, description, published, createdAt, updatedAt} = req.body
  var message = {}
  if(isEmptyOrNull(title)){
      message.title = "please fill in title!"
  }
  if(Object.keys(message).length > 0){
      res.json({
          error : true,
          message : message
      })
      return 
  }
  var image = null
  if(req.file){
    image = req.file.filename
  }

  DB.update({
    image: image,
    title: title,
    price: price,
    description: description,
    published: published,
    createdAt: createdAt,
    updatedAt: updatedAt
  }, {where: {id: req.params.id}
  }).then(results => {
    res.json({
      message : "update success!",
    })
  }).catch(error => {
    res.json({
      error : true,
      message : error
    })
  })
};

const remove = (req,res)=>{
  var id = req.params.id
  DB.destroy({
    where: {
      id: id
    }
  }).then(results => {
    if(results != 0){
      res.json({
        message : "Product Deleted!",
      })
    }else{
      res.json({
        message : "Delete not complete",
      })
    }
  }).catch(error => {
    res.json({
      error:true,
      message : error
    })
  })
};

module.exports = {
    getList,
    create,
    update,
    remove,
}