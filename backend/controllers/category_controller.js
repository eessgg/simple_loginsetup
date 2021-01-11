import Category from "../models/category_model.js";


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

export {
  create
}