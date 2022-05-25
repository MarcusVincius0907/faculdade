const client = require('./client-rpc')

client.calc({operation: '+', firstNumber: '1', secondNumber: '1'}, (error, notes) => {
    if (!error) {
        console.log('response ',notes)
    } else {
        console.error( 'client error',error)
    }
})