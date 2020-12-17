import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

import "../styles/RentForm.css";

class AddCarForm extends Component {
  render() {

    return (
      <Form>
        <Form.Group>
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" placeholder="Ime"/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Tip avta</Form.Label>
            <Form.Control as="select">
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
            <Form.Control type="number" min="30" max="1500" placeholder="Konjske moči"/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Pospeški</Form.Label>
            <Form.Control type="number" min="1.5" max="60" placeholder="s do 100 km/h"/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Menjalnik</Form.Label>
            <Form.Control as="select">
                <option>avtomatski menjalnik</option>
                <option>ročni menjalnik</option>
            </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Pogon</Form.Label>
            <Form.Control as="select">
                <option>FWD</option>
                <option>RWD</option>
                <option>AWD</option>
            </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>Leto izdelave</Form.Label>
            <Form.Control type="number" min="1908" max="2020" placeholder="Leto"/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Lokacija</Form.Label>
            <Form.Control type="text" placeholder="Ulica in hišna številka"/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Cena</Form.Label>
            <Form.Control type="number" min="0" placeholder="€ / dan"/>
        </Form.Group>
        <Button variant="success" type="submit">
            Dodaj avto
        </Button>
      </Form>
    );
  }
}

export default AddCarForm;
