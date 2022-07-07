import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import { memo } from 'react';
const { Component } = require('react');

class Searchbar extends Component {
  state = {
    nameImage: '',
    page: 1,
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ nameImage: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { nameImage, page } = this.state;
    if (nameImage.trim() !== '') {
      this.props.onSubmit(nameImage.toLocaleLowerCase().trim(), page);
      this.setState({ nameImage: '' });
    }
  };

  render() {
    const { nameImage } = this.state;
    const { handleChange, handleSubmit } = this;
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
}

export default memo(Searchbar);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
