// deploy code will go here
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
require("dotenv").config();
const { MNEMONIC_VARIABLE, RINKEBY_ENDPOINT } = process.env;

const provider = new HDWalletProvider(MNEMONIC_VARIABLE, RINKEBY_ENDPOINT);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log(interface);

  console.log("Contract deployed to", result.options.address);
};

deploy();
