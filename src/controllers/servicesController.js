const User = require("../models/user");
const Company = require("../models/company");
const Service = require("../models/service");

const { APP_URL, PUBLIC_URL } = require("../config/Constants");


module.exports = {
    async list(req, res) {
        return await Service.find()
    },

    async store(req, res) {
        const {
            category,
            subcategory,
            price,
            description,
            typePay,
            companyId
        } = req.body
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(400).json({
                message: "Empresa não encontrada"
            })
        }

        const service = await Service.create({
            companyId,
            category,
            subcategory,
            price,
            description,
            typePay
        })

        // company.services.push(service)
        // const success = company.save()
        //     .then(() => true)
        //     .catch((err) => {
        //         console.log(err)
        //         return false
        //     })
        if(!service){
            return res.status(500).json({})
        }
        return res.status(201).json({})
    },

    async index(req, res) {
        const { id } = req.params;
        return await Service.findById(id)
    },

    async update(req, res) {
        const { id } = req.params;
        const {
            category,
            subcategory,
            price,
            description,
            typePay,
            companyId
        } = req.body
        
        const service = await Service.findByIdAndUpdate(id, {
            category,
            subcategory,
            price,
            description,
            typePay,
            companyId
        })
        return service
    },

    async delete(req, res) {
        const { id } = req.params;

        return await Service.findByIdAndDelete(id)
            .then((result)=> {
                return res.status(204).json({
                    message: "Serviço deletado com sucesso"
                })
            })
            .catch((err) => {
                return res.status(400).json({
                    message: "Serviço não encontrada"
                })
            })
    },

    async approve(req, res) {
        const { id } = req.params;
        const {
            isApproved
        } = req.body

        const service = await Service.findByIdAndUpdate(id, {
            isActive: isApproved,
            isInAnalysis: isApproved
        })

        if(!service){
            return res.status(500).json({})
        }
        return res.status(201).json({})
    },
};
