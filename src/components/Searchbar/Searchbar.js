import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import { memo } from 'react';
import { useState } from 'react';

function Searchbar({ onSubmit }) {
  const [nameImage, setNameImage] = useState('');
  const page = 1;

  const handleChange = ({ target: { value } }) => {
    setNameImage(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (nameImage.trim() !== '') {
      onSubmit(nameImage.toLocaleLowerCase().trim(), page);
      setNameImage('');
    }
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>
            <ImSearch />
          </span>
        </button>

        <input
          className={s.SearchFormInput}
          value={nameImage}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

export default memo(Searchbar);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
