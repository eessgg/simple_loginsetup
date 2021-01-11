import Category from "../models/category_model.js";

const categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if(err || !category) {
      return res.status(400).json({
        error: 'Esta categoria não existe.'
      })
    }
    req.category = category;
    next()
  })
}

const create = (req, res) => {  
  const category = new Category(req.body);

  category.save((err, data) => {
    if(err) {
      return res.status(400).json({
        error: err
      })
    }
    res.json({data})
  })

};

const read = (req, res) => {
  return res.json(req.category)
}

const update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, data) => {
    if(err) {
      return res.status(400).json({
        error: err
      })
    }
    res.json({data, message: 'Categoria atualiza com sucesso.'})
  })
}

const remove = (req, res) => {
  const category = req.category;

  category.remove((err, data) => {
    if(err) {
      return res.status(400).json({
        error: err
      })
    }
    res.json({
      message: 'Categoria deletada com sucesso.'
    })
  })
}

const list = (req, res) => {
  Category.find().exec((err, data) => {
    if(err) {
      return res.status(400).json({
        error: err
      })
    }
    res.json(data)
  })
}



export {
  read, create, categoryById, update, remove, list
}