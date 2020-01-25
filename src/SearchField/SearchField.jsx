import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchField = ({ setGlobalFilter, gotoPage }) => {
  const [searchString, setSearchString] = useState('');
  return (
    <form className="search-field">
      <span>
        Поиск:{' '}
        <input
          type="text"
          value={searchString}
          onChange={e => {
            setSearchString(e.target.value);
          }}
          placeholder="lol"
        />
      </span>
      <button
        type="submit"
        className="search-field__button"
        onClick={event => {
          event.preventDefault();
          setGlobalFilter(searchString);
          gotoPage(0);
        }}
      >
        Найти
      </button>
    </form>
  );
};

SearchField.propTypes = {
  setGlobalFilter: PropTypes.func.isRequired,
  gotoPage: PropTypes.func.isRequired,
};

export default SearchField;
