import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from "react";
import Cars from "./components/cars/Cars";
import Profil from "./components/Profil";
import MyCars from "./components/MyCars";
import RentedCars from "./components/RentedCars";
import NavMenu from "./components/NavMenu";
import RentForm from "./components/RentForm";
import axios from "axios";
import Message from "./contracts/Message.json";
import getWeb3 from "./getWeb3";

import "./styles/App.css";

class App extends Component {
  state = {
    message: "",
    web3: null,
    accounts: null,
    contract: null,
    newValue: "",
    booking: "",
    cars: [null],
    users: [null],
    userData: null
  };

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
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }

    axios.get("/cars").then((res) => this.setState({ cars: res.data }));
    axios.get("/users").then((res) => this.setState({ users: res.data }));
    axios.get("/users/" + this.state.accounts[0]).then((res) => this.setState({ userData: res.data }));
    console.log(this.state.accounts[0]);
  };

  handleChange(event) {
    this.setState({ newValue: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { accounts, contract } = this.state;
    await contract.methods
      .setMessage(event.target.name.value)
      .send({ from: accounts[0] });
    const response = await contract.methods.getMessage().call();
    this.setState({ message: response });
  }

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getMessage().call();

    this.setState({ message: response });

    // Update state with the result.
    //this.setState({ message: response });
  };

  setBooking(name) {
    this.setState({ booking: name });
  }

  getReservation() {
    var current_car = localStorage.getItem("reservation") || 1;

    return {
      car: current_car,
    };
  }

  onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
  };

  render() {
    if (!this.state.web3) {
      return <div>Nalagam Web3, račune, pogodbe...</div>;
    }
    return (
      <Router>
        <div className="App">
          <div className="container-fluid">
            <NavMenu />
            <Route
              exact
              path="/"
              render={(props) => (
                <div className="row">
                  <div className="col-12 main">
                    <h1>Dobrodošli na Car FRI-lancer!</h1>
                  </div>
                  <div className="col-12 main">
                    <Cars cars={this.state.cars} />
                  </div>
                </div>
              )}
            />
            <Route path="/profile" 
            render={(props) => (
                <div>
                    <div className="row main">
                        <div className="col-12 main">
                            <h1>Profil</h1>
                        </div>
                        <div className="card main">
                            <Profil
                                userData={this.state.userData}
                            />
                        </div>
                    </div>
                </div>
            )}
            />
            <Route path="/cars" 
            render={(props) => (
                <div>
                    <div className="row main">
                        <div className="col-12 main">
                            <h1>Profil</h1>
                        </div>
                        <div className="card main">
                            <MyCars
                                userData={this.state.userData}
                            />
                        </div>
                    </div>
                </div>
            )}
            />
            <Route path="/rents" 
            render={(props) => (
                <div>
                    <div className="row main">
                        <div className="col-12 main">
                            <h1>Profil</h1>
                        </div>
                        <div className="card main">
                            <RentedCars
                                userData={this.state.userData}
                            />
                        </div>
                    </div>
                </div>
            )}
            />
            <Route path="/rentform" component={RentForm} />
            <Route
              path="/rent-form"
              render={(props) => <RentForm onSubmit={this.handleSubmit} />}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
