const { AssertionError } = require("assert");
const assert = require("assert");
const ganache = require("ganache-cli");
const { Interface } = require("readline");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const {interface, bytecode} =require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    //get list of accounts in Ganache local network
    accounts = await web3.eth.getAccounts();
    //use one of the account to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data : bytecode, arguments : ['Hi There!']})
    .send({ from : accounts[0], gas : '1000000'});
})

describe('inbox',() =>{
    it('deploy a contract' , () =>{
        console.log(inbox.options.address);
    })
    it('checking the truthy value', () => {
        assert.ok(inbox.options.address);
    })
    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message,'Hi There!');
    })
    it('can change message', async () => {
        await inbox.methods.setMessage('bye').send({ from : accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message,'bye');
    })
})

// beforeEach(() => {
//     web3.eth.getAccounts().then( fetchedAccounts => {
//         console.log(fetchedAccounts);
//     })
// })

// describe('inbox', () => {
//     it('deploys a contract',() => {})
// })



// class Car{
//     park(){
//         return 'stopped';
//     }
//     drive(){
//         return 'vroom';
//     }
// }
// // const car = new Car();
// let car;
// beforeEach(() => {
//     car = new Car();
// })
// describe('car',() => {
//     it('can park',() => {
//         assert.equal(car.park(), 'stopped');
//     })
//     it('can drive',() => {
//         assert.equal(car.drive(),'vroom');
//     })
// })