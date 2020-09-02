const dataProvider = require('../../models/Provider/dataProvider')

module.exports = {
    async index(req, res){
        const listProvider = await dataProvider.find()
        return res.json(listProvider)
    }
}