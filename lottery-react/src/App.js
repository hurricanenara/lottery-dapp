import React from "react";
import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: "",
    };
  }
  // web3.eth.getAccounts().then(console.log);

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();

    this.setState({ manager });
  }

  render() {
    return (
      <div>
        <h3>Lotter Contract</h3>
        <p>This contract is managed by {this.state.manager}</p>
      </div>
    );
  }
}

export default App;
