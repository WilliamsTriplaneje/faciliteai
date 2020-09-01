const mongoose = require('mongoose')

const uploadProviderSchema = new mongoose.Schema({
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registerProvider'
    },
    dataProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dataProvider'
    },
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
uploadProviderSchema.pre('save', function(){
    if (!this.url) {
        this.url = `http://localhost:3333/files/${this.key}`;
      }
})
module.exports = mongoose.model('UploadProvider', uploadProviderSchema)