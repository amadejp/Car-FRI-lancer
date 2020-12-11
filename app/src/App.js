import React, { Component } from "react";
import Message from "./contracts/Message.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { message: "", web3: null, accounts: null, contract: null, newValue: ""};

  componentDidMount = async () => {
    try {

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Message.networks[networkId];
      const instance = new web3.eth.Contract(
        Message.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleChange(event){
    this.setState({newValue: event.target.value});
  }

  async handleSubmit(event){
    event.preventDefault();

    const { accounts, contract } = this.state;
    await contract.methods.setMessage(this.state.newValue).send({from: accounts[0]});
    const response = await contract.methods.getMessage().call();
    this.setState({message: response});
  }

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getMessage().call();

    this.setState({message: response});

    // Update state with the result.
    //this.setState({ message: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Welcome to my first Dapps!</h1>
        <div>The sent message is: {this.state.message}</div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.newValue} onChange={this.handleChange.bind(this)}/>    
          <input type="submit" balue="Submit"/>
        </form>    
      </div>
    );
  }
}

export default App;