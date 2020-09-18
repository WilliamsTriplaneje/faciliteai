module.exports = {
    getNotEmpty(body){
        const out = {}

        Object.keys(body).forEach(key => {
            const value = body[key]
            
            if(typeof value !== 'boolean' && !value) return;
            if(typeof value === 'object' && Object.keys(value) <= 1) return;

            out[key] = value
        });

        return out
    }
}