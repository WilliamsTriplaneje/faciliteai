module.exports = {
    OnlyNotDeleted(state){
        const { isDeleted } = state._conditions
        if(isDeleted === undefined) {
            state.where({ 
                $or: [
                    { isDeleted: false },
                    { isDeleted: { $exists: false } }
                ]
            })
        }
    }
}