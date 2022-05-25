const grpc = require('grpc')
const calcProto = grpc.load('./client/static/calc.proto')

function calc(call, callback) {
    console.log('server request: ',call.request);
    const result = "0";
    callback(null, {result});
}

const server = new grpc.Server();

server.addService(calcProto.CalcService.service, {calc: calc})
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()

