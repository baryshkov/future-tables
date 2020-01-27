import React from 'react';
import PropTypes from 'prop-types';
import { Table as TableElement } from 'reactstrap';

const FullInfo = ({ contact }) => {
  const {
    firstName,
    lastName,
    description,
    address: { city, streetAddress, state, zip },
  } = contact;
  return (
    <TableElement bordered>
      <tbody>
        <tr>
          <td>Выбран пользователь:</td>
          <td>{`${firstName} ${lastName}`}</td>
        </tr>
        <tr>
          <td>Описание:</td>
          <td>
            <textarea value={description} readOnly />
          </td>
        </tr>
        <tr>
          <td>Адрес проживания:</td>
          <td>{streetAddress}</td>
        </tr>
        <tr>
          <td>Город:</td>
          <td>{city}</td>
        </tr>
        <tr>
          <td>Провинция/штат:</td>
          <td>{state}</td>
        </tr>
        <tr>
          <td>Индекс:</td>
          <td>{zip}</td>
        </tr>
      </tbody>
    </TableElement>
  );
};

FullInfo.propTypes = {
  contact: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      streetAddress: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FullInfo;
