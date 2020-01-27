import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row, Button, Form, FormGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types';

const AddRow = ({ addRow }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [newRow, setNewRow] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    description: 'Unknown',
    address: {
      city: 'Unknown',
      streetAddress: 'Unknown',
      state: 'Unknown',
      zip: 'Unknown',
    },
  });

  const updateState = (name, value) => {
    setNewRow({ ...newRow, [name]: value });
  };

  const validate = useCallback(() => {
    const validation = Object.values(newRow).every(elem => elem !== '');
    setIsValid(validation);
  }, [newRow]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    updateState(name, value);
  };

  const onSubmit = e => {
    e.preventDefault();
    addRow(newRow);
  };

  useEffect(() => {
    validate();
  }, [newRow, validate]);

  if (!isVisible)
    return (
      <Button color="info" onClick={() => setIsVisible(true)}>
        Добавить
      </Button>
    );

  return (
    <Form onSubmit={onSubmit}>
      <Row form>
        <Col md={1}>
          <FormGroup>
            <Input type="number" name="id" placeholder="id" onChange={handleInputChange} />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleInputChange}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Input type="phone" name="phone" placeholder="Phone" onChange={handleInputChange} />
          </FormGroup>
        </Col>
        <Col md={3}>
          <Button disabled={!isValid}>Добавить в таблицу</Button>
        </Col>
      </Row>
    </Form>
  );
};

AddRow.propTypes = {
  addRow: PropTypes.func.isRequired,
};

export default AddRow;
