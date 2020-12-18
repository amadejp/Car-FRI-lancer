import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

import "../styles/RentForm.css";

class AddCarForm extends Component {
  render() {

    return (
      <Form onSubmit={this.props.onSubmit}>
        <Form.Group>
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="name" placeholder="Ime" required/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Tip avta</Form.Label>
            <Form.Control as="select" name="type" required>
                <option>Limuzina</option>
                <option>Kombilimuzina</option>
                <option>Karavan</option>
                <option>SUV</option>
                <option>Športni terenc</option>
                <option>Crossover</option>
                <option>Kombi</option>
                <option>Kabriolet</option>
                <option>Športni kupe</option>
                <option>Terenec</option>
            </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Moč motorja</Form.Label>
            <Form.Control type="number" name="power" min="30" max="1500" step="1" placeholder="Konjske moči" required/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Pospeški</Form.Label>
            <Form.Control type="number" name="acceleration" min="1.5" max="60" step="0.1" placeholder="s do 100 km/h" required/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Menjalnik</Form.Label>
            <Form.Control as="select" name="gear" required>
                <option>avtomatski</option>
                <option>ročni</option>
            </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Pogon</Form.Label>
            <Form.Control as="select" name="drive" required>
                <option>FWD</option>
                <option>RWD</option>
                <option>AWD</option>
            </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Leto izdelave</Form.Label>
            <Form.Control type="number" name="year" min="1908" max="2020" step="1" placeholder="Leto" required/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Lokacija</Form.Label>
            <Form.Control type="text" name="location" placeholder="Ulica in hišna številka" required/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Cena</Form.Label>
            <Form.Control type="number" name="price" min="0" step="1" placeholder="€ / dan" required/>
        </Form.Group>
        <Button variant="success" type="submit">
            Dodaj avto
        </Button>
      </Form>
    );
  }
}

export default AddCarForm;
