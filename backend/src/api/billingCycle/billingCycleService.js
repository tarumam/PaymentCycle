const BillingCycle = require('./billingCycle')
const errorHandler= require('../common/errorHandler')

BillingCycle.methods(['post', 'get', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true })

//Aplicando error hanlder - Interceptar depois de fazer o post e put
BillingCycle.after('post', errorHandler).after('put', errorHandler)

// Faz a contagem de registros que existem na "tabela" do banco
BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate({
            //Para mais infos ver documentação mongodb project (aggregation)
            $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } }
        },{
            // Aqui o atributo credit / debt não é o mesmo de cima (poderia ter outro nome)
            $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } }
        },{
            // os valores 0 e 1 corresopndem a true e false (mostrar ou não)
            $project: { _id: 0, credit: 1, debt: 1 }
        },
        //callback
        (error, result) => {
            if (error) {
                res.status(500).json({ errors: [error] })
            } else {
                // Pega o unico registro, caso esteja nulo retorna objeto
                res.json(result[0] || { credit: 0, debt: 0 })
            }
        }
    )
})

module.exports = BillingCycle