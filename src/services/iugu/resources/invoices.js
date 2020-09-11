const api = require('../lib/api')

const endpoint = 'invoices'
module.exports = {
    async list(limit=50, start=0, created_at_from=null, created_at_to=null, 
        paid_at_from=null, paid_at_to=null, due_date=null, query=null, 
        updated_since=null, customer_id= null, status_filter=null){
            return await api.get(`/${endpoint}`, {
                params: {
                    limit,
                    start,
                    created_at_from,
                    created_at_to,
                    paid_at_from,
                    paid_at_to
                }
            })
    },
    async index(){},
    async store(email, due_date, items){
        return await api.post(`/${endpoint}`, {
            email,
            due_date,
            items
        })
    },
    async cancel(){},
    async refund(){},
    async capture(){},
    async sendByEmail(){},
    async sendCopy(){},
}