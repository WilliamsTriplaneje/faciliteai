const CONTROLLER_NAME = 'PAYMENTS'
module.exports = {
    async webhooks(req, res) {
        console.log(`${CONTROLLER_NAME} Recebendo Webhook`)

        return res.status(200).json([])
    },
}