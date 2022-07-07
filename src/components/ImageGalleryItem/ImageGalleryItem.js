import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ content, toggle, getFind }) {
  return (
    <>
      {content.map(({ id, webformatURL, user }) => (
        <li
          className={s.ImageGalleryItem}
          key={id}
          onClick={() => {
            getFind(id);
            toggle();
          }}
        >
          <img
            src={webformatURL}
            alt={user}
            className={s.ImageGalleryItemImage}
          />
        </li>
      ))}
    </>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggle: PropTypes.func.isRequired,
  getFind: PropTypes.func.isRequired,
};
