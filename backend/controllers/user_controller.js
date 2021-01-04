import User from "../models/user_model.js";

const getUsers = async (req, res) => {
  const users = await User.find()
    .then((user) => res.status(200).json({user}))
    .catch((err) => res.status(500).send({
      message: err.message || "Erro"
    }));

  res.json({users})
}

const register = async (req, res) => {
  try {
    let {username, email, password} = req.body;
    if(!username || !email || !password) {
      res.status(400).json({message: "Preencha os campos."})
    }

    if(username.length < 5) {
      res.status(400).json({message: "Usuário precisa mais de cinco chars."})
    }

    const existingUser = await User.findOne({email})
    if(existingUser)
      res.status(400).json({message: "Email já registrado."})

    const newUser = new User({
      username, email, password
    })
    const savedUser = await newUser.save()
    res.json(savedUser)
  
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar." });
  }
}




export {
  register, getUsers
}