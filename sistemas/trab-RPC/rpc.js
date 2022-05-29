const grpc = require('grpc')
const calcProto = grpc.load('./protos/calc.proto')

function calc(call, callback) {
    console.log('server request: ',call.request);
    let result = null;
    if(call.request && call.request.operation && call.request.firstNumber && call.request.secondNumber){
        if(call.request.operation === '+'){
            result = Number(call.request.firstNumber) + Number(call.request.secondNumber)
        }else if(call.request.operation === '-'){
            result = Number(call.request.firstNumber) - Number(call.request.secondNumber)
        }else if(call.request.operation === '*'){
            result = Number(call.request.firstNumber) * Number(call.request.secondNumber)
        }else if(call.request.operation === '/'){
            result = Number(call.request.firstNumber) / Number(call.request.secondNumber)
        }
    }
    
    callback(null, {result: `${result}`});
}

const server = new grpc.Server();

server.addService(calcProto.CalcService.service, {calc: calc})
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()

