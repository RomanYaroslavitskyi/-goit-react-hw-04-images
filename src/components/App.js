import s from './styles.module.css';
import FetchImages from 'service/FetchImages';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from 'components/Modal/Modal';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [nameImage, setNameImage] = useState('');
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState(null);
  const [total, setTotal] = useState(null);

  const firstState = useRef(true);

  useEffect(() => {
    if (firstState.current) {
      firstState.current = false;
      return;
    }

    setTimeout(() => {
      FetchImages(nameImage, page)
        .then(res => {
          setContent(prev => {
           return page === 1 ? res.data.hits : [...prev, ...res.data.hits];
          });
          setStatus('resolved');
          setTotal(res.data.total);
        })
        .catch(error => console.log(error))
        .finally(() => {
          if (page === 1) window.scrollTo(0, 0);
        });
    }, 1000);
  }, [nameImage, page]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClick = () => {
    setPage(prev => prev + 1);
    setStatus('pending');
  };

  const getSubmitName = (name, page) => {
    setNameImage(name);
    setPage(page);
    setStatus('pending');
  };

  const getFind = idName => {
    const URL = content.find(({ id }) => id === idName);
    setUrl(URL?.largeImageURL);
  };

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


export default App;
