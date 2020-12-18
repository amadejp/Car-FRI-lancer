import React, { Component } from "react";

import "../styles/RentForm.css";

class RentForm extends Component {
  render() {
    // date default inputs
    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0, 10);
    curr.setDate(curr.getDate() + 1);
    var date2 = curr.toISOString().substr(0, 10);

    var car = this.props.cars[0];
    if (car === undefined) {
      car = {
        id: 1,
        name: "Audi A4",
        power: 150,
        acc: 8.6,
        drive: "FWD",
        trans: "ročni",
        year: 2019,
        type: "limuzina",
        owner: "0xB8cBD5Cc98eBD7a875808D742379E03993bA8038",
        price: 80,
        pic: "/images/audia4.png",
      };
    }
    return (
      <React.Fragment>
        <main>
          <div className="container mt-5">
            <div className="row">
              <div className="col-sm">
                <img
                  className="card-img-top"
                  src={car.pic}
                  alt="Card cap"
                />
              </div>
              <div className="col-md">
                <div>
                  <div>
                    <h1>
                      <strong>{car.name}</strong>
                    </h1>
                  </div>
                  <div>
                    <h5>
                      <span className="badge badge-secondary">{car.type}</span>
                    </h5>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col">
                    <img
                      className="icon"
                      src="icons/motor.png"
                      alt="motor icon"
                      width="20px"
                      style={{ marginRight: "11px", marginBottom: "7px" }}
                    ></img>
                    Moč motorja
                  </div>
                  <div className="col">{car.power} KM</div>
                </div>
                <div className="row">
                  <div className="col">
                    <img
                        className="icon"
                      src="icons/acc.png"
                      alt="acc icon"
                      width="20px"
                      style={{ marginRight: "10px", marginBottom: "7px" }}
                    ></img>
                    Pospeški
                  </div>
                  <div className="col">{car.acc}s do 100 km/h</div>
                </div>
                <div className="row">
                  <div className="col">
                    <img
                      className="icon"
                      src="icons/trans.png"
                      alt="trans icon"
                      width="18px"
                      style={{ marginRight: "11px", marginBottom: "7px" }}
                    ></img>
                    Menjalnik
                  </div>
                  <div className="col">{car.trans} menjalnik</div>
                </div>
                <div className="row">
                  <div className="col">
                    <img
                      className="icon"
                      src="icons/wheel.png"
                      alt="wheel icon"
                      width="20px"
                      style={{ marginRight: "10px", marginBottom: "7px" }}
                    ></img>
                    Pogon
                  </div>
                  <div className="col">{car.drive}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <img
                      className="icon"
                      src="icons/calendar.png"
                      alt="calendar icon"
                      width="20px"
                      style={{ marginRight: "10px", marginBottom: "7px" }}
                    ></img>
                    Leto izdelave
                  </div>
                  <div className="col">{car.year}</div>
                </div>
                <div className="row">
                  <div className="col">
                    <img
                      className="icon"
                      src="icons/location.png"
                      alt="location icon"
                      width="20px"
                      style={{ marginRight: "9px", marginBottom: "7px" }}
                    ></img>
                    Lokacija
                  </div>
                  <div className="col">{car.location}</div>
                </div>

                <hr />
                <div className="row">
                  <div className="col cena-napis">
                    <img
                      className="icon"
                      src="icons/tag.png"
                      alt="price tag icon"
                      width="30px"
                      style={{ marginRight: "10px" }}
                    ></img>
                    Cena:
                  </div>
                  <div className="col cena-vrednost">{car.price}€ / dan</div>
                </div>
              </div>
            </div>
            <div className="row pt-4">
              <div className="col-sm">
                <div
                  className="container-border"
                  style={{ paddingTop: "10px", paddingBottom: "10px" }}
                >
                  <h5>Izpolnite podrobnosti izposoje</h5>
                  <br></br>
                  <form onSubmit={this.props.onSubmit}>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-2">Začetek izposoje:</div>
                        <div className="col-2">
                          <input
                            type="date"
                            name="startDate"
                            defaultValue={date}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-2">Čas prevzema:</div>
                        <div className="col-2">
                          <input
                            type="time"
                            name="startTime"
                            defaultValue="08:00:00"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-2">Konec Izposoje:</div>
                        <div className="col-2">
                          <input
                            type="date"
                            name="endDate"
                            defaultValue={date2}
                          />
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Pošlji
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default RentForm;
