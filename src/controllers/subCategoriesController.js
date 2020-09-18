const SubCategory = require("../models/subCategory");
const Category = require("../models/category");



module.exports = {
    async list(req, res) {
        const {
            categoryId,
            includeCategory
        } = req.query

        let where = {}
        
        if(categoryId){
            where['category'] = categoryId
        }
        const subCategories = SubCategory.find(where)

        if(includeCategory){
            subCategories.populate('categoryId').exec()
        }

        return res.status(200).json(await subCategories)
    },

    async store(req, res) {
        const {
            name,
            categoryId
        } = req.body
        const category = await Category.findById(categoryId)

        if(!category){
            return res.status(400).json({
                message: "Categoria não encontrada"
            })
        }

        const subCategory = await SubCategory.create({
            name,
            categoryId: category._id,
        })

        if(!subCategory){
            return res.status(500).json({})
        }
        return res.status(201).json({})
    },

    async index(req, res) {
        const { id } = req.params;
        const category = await Category.findById(id)

        return res.status(200).json(category)
    },

    async update(req, res) {
        const { id } = req.params;
        const {
            name,
            categoryId
        } = req.body
        
        const category = await Category.findById(categoryId)
        if(!category){
            return res.status(400).json({
                message: "SubCategoria não encontrada"
            })
        }

        // const subCategory = await SubCategory.findByIdAndUpdate(id, {
        //     name,
        //     categoryId: category._id,
        // })

        const subCategory = await SubCategory.updateOne({
            _id: id
          }, { $set: 
            { 
                name,
                categoryId: category._id
            } 
          });

        return res.status(200).json(subCategory)
    },
    
    async delete(req, res) {
        const { id } = req.params;
        return await SubCategory.findByIdAndDelete(id)
            .then((result)=> {
                return res.status(204).json({
                    message: "SubCategoria deletada com sucesso"
                })
            })
            .catch((err) => {
                return res.status(400).json({
                    message: "SubCategoria não encontrada"
                })
            })
    },
};
