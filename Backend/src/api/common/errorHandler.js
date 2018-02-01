const _ = require('lodash')

module.exports = (req, res, next) =>{
    const bundle = res.locals.bundle

    if(bundle.errors){
        const errors = parseErrors(bundle.errors)
        res.status(500).json({errors})
    } else{
        // necessário chamar o next para ele não interromper a requisição neste ponto
        // Com next ele vai para o próximo middleware
        next()
    }
}

const parseErrors = (nodeRestfulErrors) =>{
    const errors =[]
    _.forIn(nodeRestfulErrors, error => errors.push(error.message))
    return errors
}