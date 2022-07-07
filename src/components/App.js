import s from './styles.module.css';
import { Component } from 'react';
import FetchImages from 'service/FetchImages';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    nameImage: '',
    content: [],
    page: 1,
    status: 'idle',
    showModal: false,
    url: null,
    total: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const name = this.state.nameImage;
    const page = this.state.page;
    if (prevState.nameImage !== name || prevState.page !== page) {
      setTimeout(() => {
        FetchImages(name, page)
          .then(res => {
            this.setState(prev => ({
              content:
                page === 1
                  ? res.data.hits
                  : [...prev.content, ...res.data.hits],
              status: 'resolved',
              total: res.data.total,
            }));
          })
          .catch(error => console.log(error))
          .finally(() => {
            if (page === 1) window.scrollTo(0, 0);
          });
      }, 1000);
    }
  }

  toggleModal = () => {
    return this.setState(prev => ({
      showModal: !prev.showModal,
    }));
  };

  handleClick = () => {
    const page = this.state.page + 1;
    this.setState({ status: 'pending', page });
  };

  getSubmitName = (name, page) => {
    this.setState({ nameImage: name, page: page, status: 'pending' });
  };

  getFind = idName => {
    const { content } = this.state;
    const URL = content.find(({ id }) => id === idName);
    this.setState({ url: URL?.largeImageURL });
  };

  render() {
    const { content, status, showModal, url, total } = this.state;
    const { getSubmitName, handleClick, toggleModal, getFind } = this;
    return (
      <div className={s.Container}>
        <Searchbar onSubmit={getSubmitName} />
        {total === 0 && <p className={s.text}>Enter the correct name</p>}
        <ImageGallery>
          <ImageGalleryItem
            content={content}
            toggle={toggleModal}
            getFind={getFind}
          />
        </ImageGallery>
        {content.length > 0 && status === 'resolved' && (
          <Button onClick={handleClick} />
        )}

        {status === 'pending' && <Loader />}
        {showModal && <Modal getFind={url} onClose={toggleModal} />}
      </div>
    );
  }
}

export default App;
