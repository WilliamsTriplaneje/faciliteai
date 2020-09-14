module.exports = { 
    removeAccents(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    },
    toLowerCase(text){
        return text.toLowerCase()
    },
    normalize(text) {
        text = this.removeAccents(text)
        text = this.toLowerCase(text)

        return text
    }
}