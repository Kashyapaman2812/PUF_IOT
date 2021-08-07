const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'lumber ill danger ride rare brisk trick clarify front rely vacant fan',
    'https://rinkeby.infura.io/v3/12f28f9eb42049b7acd99a85fade2283'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Addres of account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({ data : bytecode , arguments : ['Hi There!']})
     .send({gas : '1000000' , from : accounts[0]});

     console.log('Contract deployed at', result.options.address);
}
deploy();