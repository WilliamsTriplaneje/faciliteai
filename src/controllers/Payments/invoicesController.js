const User = require("../../models/user");
const Company = require("../../models/company");
const { APP_URL, PUBLIC_URL } = require("../../config/Constants");
const iugu = require('../../services/iugu')

function handleException(err){
    console.log(err)
    return {
        message: "Ocorreu um erro",
        errorMessage: err.message
    }
}
module.exports = {
    async list(req, res) {
        const invoices = await iugu.invoices.list()
        .then((res) => res.data).catch((err) => handleException(err))

        return res.status(200).json(invoices)
    },

    async store(req, res) {
        const {
            email, 
            due_date,
            items
        } = req.body

        const payment = await iugu.invoices.store(email, due_date, items)

        return res.status(200).json(invoices)
    },

    async index(req, res) {
        const { id } = req.params;
    },

    async update(req, res) {
        const { id } = req.params;
    },
    
    async delete(req, res) {
        const { id } = req.params;
    },
};
