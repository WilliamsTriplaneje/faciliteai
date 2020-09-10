const User = require("../models/user");
const Company = require("../models/company");
const { APP_URL, PUBLIC_URL } = require("../config/Constants");


module.exports = {
    async list(req, res) {
        const { _id } = res.locals.user;
    },

    async store(req, res) {},

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
