import React, { Component } from "react";
import PropTypes from "prop-types";

class RentForm extends Component {
  render() {
    return (
      <React.Fragment>
        <main>
          <div className="container mt-5">
            <div className="row">
              <div className="col-sm">
                <img
                  className="card-img-top"
                  src="images/audia4.png"
                  alt="Card image cap"
                />
              </div>
              <div className="col-md">
                <div>
                  <div>
                    <h1>
                      <strong>Teran</strong>
                    </h1>
                  </div>
                  <div>
                    <h5>
                      <span className="badge badge-secondary">
                        Nemški ovčar
                      </span>
                    </h5>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col">
                    <i
                      className="fas"
                      fa-hourglass-start
                      pr-2
                      aria-hidden="true"
                    />
                    Starost
                  </div>
                  <div className="col">4</div>
                </div>
                <div className="row">
                  <div className="col">
                    <i className="fas" fa-weight pr-2 aria-hidden="true" />
                    Teža
                  </div>
                  <div className="col">19</div>
                </div>
                <div className="row">
                  <div className="col">
                    <i
                      className="fas"
                      fa-ruler-vertical
                      pr-2
                      aria-hidden="true"
                    />
                    Višina
                  </div>
                  <div className="col">170</div>
                </div>
                <div className="row">
                  <div className="col">
                    <i className="fas" fa-tint pr-2 aria-hidden="true" />
                    Čistokrvnost
                  </div>
                  <div className="col">Da</div>
                </div>
                <div className="row">
                  <div className="col">
                    <i className="fas" fa-book pr-2 aria-hidden="true" />
                    Rodovnik
                  </div>
                  <div className="col">Da</div>
                </div>
                <div className="row">
                  <div className="col">
                    <i
                      className="fas"
                      fa-map-marker-alt
                      pr-2
                      aria-hidden="true"
                    />
                    Lokacija
                  </div>
                  <div className="col">Maribor</div>
                </div>
                <hr />
                <form method="post" action role="form">
                  <input type="text" name="vzgi" defaultValue="true" hidden />
                  <input
                    name="matchedWith"
                    defaultValue="5fc965db8343f9001751af9a"
                    hidden
                  />
                  <input
                    name="postedBy"
                    defaultValue="5fc965db8343f9001751af99"
                    hidden
                  />
                  <input
                    name="oglasId"
                    defaultValue="5fc965db8343f9001751af9c"
                    hidden
                  />
                  <button type="submit" className="btn btn-primary">
                    Vžgi
                  </button>
                </form>
              </div>
            </div>
            <div className="row pt-4">
              <div className="col-sm">
                <div
                  className="container border"
                  style={{ paddingTop: "10px", paddingBottom: "10px" }}
                >
                  <h5>Stopi v kontakt z oglaševalcem</h5>
                  <form id="posljiSporocilo" action method="POST">
                    <div className="form-group">
                      <input
                        type="text"
                        name="posljiSporocilo"
                        defaultValue="true"
                        hidden
                      />
                      <input
                        type="text"
                        name="oglasId"
                        defaultValue="5fc965db8343f9001751af9c"
                        hidden
                      />
                      <input
                        type="text"
                        name="userId"
                        defaultValue="5fc965db8343f9001751af99"
                        hidden
                      />
                      <textarea
                        id="sporocilo"
                        name="sporocilo"
                        className="form-control"
                        rows={3}
                        defaultValue={""}
                      />
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
        <div className="col-12 main">
          <form onSubmit={this.props.onSubmit}>
            <input type="text" name="name" />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default RentForm;
