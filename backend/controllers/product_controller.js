import Product from "../models/product_model.js";
import formidable from 'formidable';
import _ from 'lodash';
import fs from 'fs';

const producBytId = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if(err || !product) {
      return res.status(400).json({
        error: "Produto não encontrado"
      })
    }
    req.product = product;
    next()
  })
}

const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {

    if (err) {
      return res.status(400).json({
        error: 'Imagem não pode ser upada.'
      })
    }

    const { name, description, price, category } = fields

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        error: "Preencha todos os campos!"
      })
    }

    let product = new Product(fields)

    if (files.photo) {
      if(files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Imagem muito grande.'
        })
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      console.log(result)
      if(err) {
        return res.status(400).json({
          error: 'Ocorreu um erro ao salvar o produto.'
        })
      }
      return res.json(result);
    })

  })
};

const read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product)
}

const remove = (req, res) => {  
  let product = req.product;
  product.remove((err, removedProduct) => {
    if(err) {
      return res.status(400).json({
        error: 'Erro ao deletar produto.'
      })
    }
    res.json({
      message: 'Produto deletado com sucesso!'
    })
  })
}

const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {

    if (err) {
      return res.status(400).json({
        error: 'Imagem não pode ser upada.'
      })
    }

    const { name, description, price, category } = fields

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        error: "Preencha todos os campos!"
      })
    }

    let product = req.product
    product = _.extend(product, fields)

    if (files.photo) {
      if(files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Imagem muito grande.'
        })
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      console.log(result)
      if(err) {
        return res.status(400).json({
          error: 'Ocorreu um erro ao salvar o produto.'
        })
      }
      return res.json(result);
    })

  })
};



export {
  read, create, producBytId, remove, update
}