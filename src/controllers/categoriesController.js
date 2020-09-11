const Category = require("../models/category");


module.exports = {
    async list(req, res) {
        console.log("Listando categorias")
        const companies = await Category.find()
        return res.status(200).json(companies)
    },

    async store(req, res) {
        const { name: username, lastname } = res.locals.user;
        const {
            name,
        } = req.body

        const createdBy = username + ' ' + lastname

        const category = await Category.create({
            name,
            createdBy
        })

        if(!category){
            return res.status(500).json({})
        }
        return res.status(201).json({})
    },

    async index(req, res) {
        const { id } = req.params;
        const company = await Category.findById(id)
        return res.status(200).json(company)
    },

    async update(req, res) {
        const { id } = req.params;
        const {
            name,
        } = req.body
        // const category = await Category.findByIdAndUpdate(id, {
        //     name
        // })

        const category = await Category.updateOne({
            _id: id
          }, { $set: 
            { 
                name,
            } 
          });

        return res.status(200).json(category)
    },
    
    async delete(req, res) {
        const { id } = req.params;
        return await Category.findByIdAndDelete(id)
            .then((result)=> {
                return res.status(204).json({
                    message: "Categoria deletado com sucesso"
                })
            })
            .catch((err) => {
                return res.status(400).json({
                    message: "Categoria não encontrada"
                })
            })
    },
};
