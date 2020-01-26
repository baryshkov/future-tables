import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import './SearchField.css';

const SearchField = ({ setGlobalFilter, gotoPage }) => {
  const [searchString, setSearchString] = useState('');
  return (
    <form className="search-field">
      <InputGroup>
        <Input
          type="text"
          value={searchString}
          onChange={e => {
            setSearchString(e.target.value);
          }}
          placeholder="Искать по таблице"
        />
        <InputGroupAddon addonType="append">
          <Button
            type="submit"
            onClick={event => {
              event.preventDefault();
              setGlobalFilter(searchString);
              gotoPage(0);
            }}
            color="primary"
          >
            Поиск
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};

SearchField.propTypes = {
  setGlobalFilter: PropTypes.func.isRequired,
  gotoPage: PropTypes.func.isRequired,
};

export default SearchField;
