const grpc = require('grpc')
const PROTO_PATH = './calc.proto'
const CalcService = grpc.load(PROTO_PATH).CalcService

const client = new CalcService('localhost:50051', grpc.credentials.createInsecure());

function calculate(operation, firstNumber, secondNumber){

    client.calc({operation, firstNumber, secondNumber}, (error, notes) => {
        if (!error) {
            console.log('response ',notes)
        } else {
            console.error( 'client error',error)
        }
    })
}


module.exports = {calculate}