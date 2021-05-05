import React from "react";
import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };
  // web3.eth.getAccounts().then(console.log);

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    // this can be avoided
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "Waiting on transaction to complete" });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });
    this.setState({ message: "You have successfully been entered" });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on trasaction to complete" });

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    this.setState({ message: "Winner has been picked!" });
  };

  render() {
    return (
      <div>
        <h3>Lotter Contract</h3>
        <p>
          This contract is managed by {this.state.manager}
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, "ether")}
          ether.
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h3>Feeling lucky?</h3>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h5>Pick winner</h5>
        <button onClick={this.onClick}>Pick winner</button>
        <hr />
        <h3>{this.state.message}</h3>
      </div>
    );
  }
}

export default App;
