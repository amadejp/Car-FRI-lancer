import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from "react";

import NavMenu from "./components/NavMenu";
import Cars from "./components/cars/Cars";
import Profil from "./components/Profil";
import MyCars from "./components/MyCars";
import RentedCars from "./components/RentedCars";
import RentForm from "./components/RentForm";

import axios from "axios";
import Message from "./contracts/Message.json";
import CarBooking from "./contracts/CarBooking.json";
import getWeb3 from "./getWeb3";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "./styles/App.css";

const MySwal = withReactContent(Swal);

// start local db with: npx json-server db.json --port 3003

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contractMessage: null,
    contractBooking: null,
    bookings: null,
    cars: [null],
    users: [null],
    userData: null,
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
      const instanceMessage = new web3.eth.Contract(
        Message.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Get the CarBooking contract instance.
      const deployedNetwork2 = CarBooking.networks[networkId];
      const instanceBooking = new web3.eth.Contract(
        CarBooking.abi,
        deployedNetwork2 && deployedNetwork2.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3: web3,
        accounts: accounts,
        contractMessage: instanceMessage,
        contractBooking: instanceBooking,
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }

    axios.get("/cars").then((res) => this.setState({ cars: res.data }));
    axios.get("/users").then((res) => this.setState({ users: res.data }));

    // trenutno kar hardcodan ta uporabnik (moji avti + izposoja naj bo od zdaj naprej prek web3 vse)
    this.setState({
      userData: {
        id: "0xE6FeD2aC60647aF1249d19761957859F10c7a65d",
        name: "Janez Novak haha",
        ownedCars: [2],
        rentedCars: [3],
      },
    });
    /*
    axios
      .get("/users/" + this.state.accounts[0])
      .then((res) => this.setState({ userData: res.data }));
      */
  };

  // najboljše da se tukaj console loga
  componentDidUpdate() {
    //console.log(this.state.contractMessage);
    console.log(this.state.bookings);
    // console.log(this.getCarsById([localStorage.getItem("reservation")]));
  }

  handleChange(event) {
    this.setState({ newValue: event.target.value });
  }

  async handleSubmit(event) {
    try {
      event.preventDefault();

      const { accounts, contractBooking } = this.state;

      const form = event.target;
      const carId = parseInt(this.getReservation().car);
      const car = this.getCarsById([carId])[0];
      const owner = car.owner;
      const user = this.state.accounts[0];
      const startDate = form.startDate.value.toString();
      const endDate = form.endDate.value.toString();
      // calculate length of rental in days (for cost calculations)
      var lor = this.daysDiff(startDate, endDate);
      var price_eur = lor * car.price;
      var price_eth = await this.convert(price_eur);

      await contractBooking.methods
        .confirmBooking(owner, user, startDate, endDate, price_eur)
        .send({ from: accounts[0] });
      const response = await contractBooking.methods.getBookings().call();
      this.setState({ bookings: response });

      // send eth
      const web3 = this.state.web3;
      if (web3) {
        web3.eth.sendTransaction(
          {
            from: user,
            to: owner,
            value: web3.utils.toWei(price_eth.toString(), "ether"),
            gasLimit: 21000,
            gasPrice: 20000000000,
          },
          async function (err, transactionHash) {
            if (!err) {
              var receipt = await web3.eth.getTransactionReceipt(
                transactionHash
              );
              MySwal.fire(
                "Uspešno oddano naročilo.",
                "transaction hash: " + transactionHash.toString(),
                "success"
              );
            }
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  setBooking(name) {
    this.setState({ booking: name });
  }

  getReservation() {
    var current_car = localStorage.getItem("reservation") || 1;

    return {
      car: current_car,
    };
  }

  // get difference between two dates in days
  daysDiff(date1_str, date2_str) {
    var date1 = new Date(date1_str);
    var date2 = new Date(date2_str);

    var difference = Math.abs(date1.getTime() - date2.getTime());
    var days = Math.ceil(difference / (1000 * 3600 * 24));

    return days;
  }

  // convert EUR to ETH
  async convert(price_eur) {
    var exc;
    var price_eth;

    // API for current echange rate
    await axios
      .get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR")
      .then((res) => {
        exc = res.data;
        console.log(exc.EUR);
        price_eth = price_eur * (1 / exc.EUR);
      });

    return price_eth;
  }

  getCarsById(id_array) {
    var id_cars = [];
    if (this.state.cars[0] !== null && id_array > 0) {
      var ids = id_array.map(Number);
      for (let i = 0; i < this.state.cars.length; i++) {
        if (ids.includes(this.state.cars[i].id)) {
          id_cars.push(this.state.cars[i]);
        }
      }
    }
    return id_cars;
  }

  // GET /cars?owner.name=acc_hash - to bi mogl delat (some tweaks probably needed tho)
  //getCarsByOwner() {}

  render() {
    if (!this.state.web3) {
      /*
      MySwal.fire(
        "Si prijavljen v svoj metamask račun?",
        "Nalagam Web3, račune, pogodbe...",
        "question"
      );
      */
      return <div>Nalagam Web3, račune, pogodbe...</div>;
    } else {
      MySwal.close();
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
            <Route
              path="/profile"
              render={(props) => (
                <div>
                  <div className="row main">
                    <div className="col-12 main">
                      <h1>Profil</h1>
                    </div>
                    <div className="card main">
                      <Profil userData={this.state.userData} />
                    </div>
                  </div>
                </div>
              )}
            />
            <Route
              path="/cars"
              render={(props) => (
                <div>
                  <div className="row main">
                    <div className="col-12 main">
                      <h1>Profil</h1>
                    </div>
                    <div className="card main">
                      <MyCars userData={this.state.userData} />
                    </div>
                  </div>
                </div>
              )}
            />
            <Route
              path="/rents"
              render={(props) => (
                <div>
                  <div className="row main">
                    <div className="col-12 main">
                      <h1>Profil</h1>
                    </div>
                    <div className="card main">
                      <RentedCars userData={this.state.userData} />
                    </div>
                  </div>
                </div>
              )}
            />
            <Route path="/rentform" component={RentForm} />
            <Route
              path="/rent-form"
              render={(props) => (
                <RentForm
                  onSubmit={this.handleSubmit}
                  cars={this.getCarsById([localStorage.getItem("reservation")])}
                />
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
