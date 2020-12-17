import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { Component } from "react";
import Geocode from "react-geocode";

import NavMenu from "./components/NavMenu";
import Cars from "./components/cars/Cars";
import Zemljevid from "./components/Zemljevid";
import MyCars from "./components/MyCars";
import RentedCars from "./components/RentedCars";
import RentForm from "./components/RentForm";
import AddCarForm from "./components/AddCarForm";

import Table from "react-bootstrap/Table";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import axios from "axios";
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
    contractBooking: null,
    bookings: null,
    cars: [null],
    users: [null],
    ownedCars: [null],
    rentedCars: [null],
    endRent_car: null,
  };

  componentDidMount = async () => {
    try {
      this.handleSubmit = this.handleSubmit.bind(this);

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the CarBooking contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CarBooking.networks[networkId];
      const instanceBooking = new web3.eth.Contract(
        CarBooking.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3: web3,
        accounts: accounts,
        contractBooking: instanceBooking,
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }

    await this.getRentsByUser();
    // this.setState({rentedCars: user_rentedCars});
    console.log("init", this.state.rentedCars);

    axios.get("/cars").then((res) => this.setState({ cars: res.data }));

    // get cars owned by this account
    axios
      .get("/cars?owner=" + this.state.accounts[0])
      .then((res) => this.setState({ ownedCars: res.data }));
  };

  componentDidUpdate() {
    //console.log(this.getRentsByUser());
    console.log("bookings", this.state.bookings);
    //console.log(this.state.bookings);
    // console.log(this.getCarsById([localStorage.getItem("reservation")]));
  }

  async handleAdd(event) {
    try {
        event.preventDefault();
        Geocode.setApiKey("AIzaSyDeTGhQkbsgRiM7eN8l3pWJ5eWItc_r0Ys");
        Geocode.setRegion("SI");

        const form = event.target;
        const name = form.name.value.toString();
        const type = form.type.value.toString();
        const power = parseInt(form.power.value);
        const acc = parseFloat(form.acceleration.value);
        const gear = form.gear.value.toString();
        const drive = form.drive.value.toString();
        const year = parseInt(form.year.value);
        const location = form.location.value.toString();
        const price = parseInt(form.price.value);
        const owner = this.state.accounts[0];
        var pic = name.toLowerCase();
        pic = pic.replace(/\s+/g, '');
        pic = "/images/" + pic + ".png";

        Geocode.fromAddress(location).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                //console.log(lat, lng);
                axios
                    .post("/cars", {
                        name: name,
                        power: power,
                        acc: acc,
                        drive: drive,
                        trans: gear,
                        year: year,
                        type: type,
                        owner: owner,
                        price: price,
                        pic: pic,
                        lat: lat,
                        lng: lng,
                        available: true
                    })
                    .then((res) => {
                        MySwal.fire(
                            "Uspešna registracija\n" + name,
                            "Na voljo: true",
                            "success"
                        ).then(() => {
                            window.location = "/cars";
                        });
                    });
            },
            error => {
                console.log(error);
            }
        );
    } catch (error) {
        console.log(error);
    }
  }

  async handleSubmit(event) {
    try {
      event.preventDefault();

      const { accounts, contractBooking } = this.state;

      // define needed variables
      const form = event.target;
      const carId = parseInt(this.getReservation().car);
      const car = this.getCarsById([carId])[0];
      const owner = car.owner;
      const user = this.state.accounts[0];
      const time = form.startTime.value.toString();
      const startDate = form.startDate.value.toString();
      const endDate = form.endDate.value.toString();
      // calculate length of rental in days (for cost calculations)
      var lor = this.daysDiff(startDate, endDate);
      var price_eur = lor * car.price;
      var price_eth = await this.convert(price_eur);

      // sign the contract
      await contractBooking.methods
        .confirmBooking(carId, owner, user, startDate, endDate, price_eur)
        .send({ from: accounts[0] });
      const response = await contractBooking.methods.getBookings().call();
      this.setState({ bookings: response });
      await this.getRentsByUser();

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
                "Avto lahko prevzameš\n" +
                  startDate +
                  " ob " +
                  time +
                  "\n na lokaciji: ",
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

  async onCloseBooking(event) {
    console.log("state car rented: ", this.state.endRent_car);
    console.log(event.target);
    const form = event.target;
    const carId = form.endRent.value;
    console.log(carId);
  }

  async onChangePrice(event) {
    const form = event.target;
    const carId = form.id.value;
    const newPrice = form.price.value;
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

  async getRentsByUser() {
    // zaenkrat user == current account
    var rents = [];
    const { contractBooking } = this.state;
    const response = await contractBooking.methods.getBookings().call();
    response.forEach((booking) => {
      if (booking._user === this.state.accounts[0]) {
        rents.push(booking);
      } else {
        console.log("Nisi si izposodil še nobenega avtomobila.");
      }
    });

    this.setState({ rentedCars: rents });
  }

  changeCar_endRent = (id) => {
    this.setState({ endRent_car: id });
  };

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
                <div className="container">
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                    <Cars cars={this.state.cars} />
                  </div>
                </div>
              )}
            />
            <Route
              path="/map"
              render={(props) => (
                <div>
                  <div className="row main">
                    <div className="col-12 main">
                      <h1>Zemljevid</h1>
                    </div>
                    <div className="card main">
                      <Zemljevid cars={this.state.cars} />
                    </div>
                  </div>
                </div>
              )}
            />
            <Route
              path="/cars"
              render={(props) => (
                <div className="container">
                  {" "}
                  <div className="row main">
                    <div className="col-12 main">
                      <h1>Moji avtomobili</h1>
                    </div>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Ime</th>
                          <th>Leto</th>
                          <th>Lokacija</th>
                          <th>Cena</th>
                          <th>Na voljo</th>
                          <th>Končaj izposojo</th>
                        </tr>
                      </thead>{" "}
                      <tbody>
                        <MyCars
                          ownedCars={this.state.ownedCars}
                          onSubmit={this.onCloseBooking}
                        />
                      </tbody>
                    </Table>
                  </div>
                  <a href="/add-form">
                    <button className="btn btn-success">Dodaj avto</button>
                  </a>
                  <div style={{ float: "right" }}>
                    <OverlayTrigger
                      key="bottom"
                      placement="bottom"
                      overlay={
                        <Tooltip id={`tooltip-bottom`}>
                          POZOR! S potrditvijo boste zaključili izposojo in s
                          tem zagotavljate, da je avto vrnjen in je z njim vse v
                          redu.
                        </Tooltip>
                      }
                    >
                      <button type="submit" className="btn btn-secondary">
                        Potrdi
                      </button>
                    </OverlayTrigger>
                  </div>
                </div>
              )}
            />
            <Route
              path="/rents"
              render={(props) => (
                <div className="container">
                  <div className="row main">
                    <div className="col-12 main">
                      <h1>Rented Cars</h1>
                    </div>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Ime</th>
                          <th>Leto</th>
                          <th>Lokacija</th>
                          <th>Cena</th>
                          <th>Izposojen?</th>
                        </tr>
                      </thead>
                      <tbody>
                        <RentedCars rentedCars={this.state.rentedCars} />
                      </tbody>
                    </Table>
                  </div>
                </div>
              )}
            />
            <Route 
              path="/add-form"
              render={(props) => (
                  <div className="container">
                    <div>
                        <h1>Dodaj nov avto</h1>
                    </div>
                    <AddCarForm
                    onSubmit={this.handleAdd.bind(this)}
                    />
                  </div>
              )}
            />
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
