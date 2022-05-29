const grpc = require('grpc')
const PROTO_PATH = './protos/calc.proto'
const CalcService = grpc.load(PROTO_PATH).CalcService

const client = new CalcService('localhost:50051', grpc.credentials.createInsecure());

async function calculate(param){

    try{
        return await bringResult(param).then(e => e);
    }catch(e){
        console.log('Erro no lado do cliente: ', e);
        return null
    }

    
}

async function bringResult({operation, firstNumber, secondNumber}){
    return new Promise((res, rej) => {
        client.calc({operation, firstNumber, secondNumber}, (error, data) => {
            if (!error) {
                res(data.result);
            } else {
                console.error( 'client error',error)
                res(null);
            }
        })
    })
}




module.exports = {calculate}