import axios from 'axios';

async function FetchImages(nameImage, page) {
  const URL = 'https://pixabay.com/api/';
  const BASE_KEY = '26673038-cabd68481316a87c43ed4c613';
  const options = new URLSearchParams({
    key: BASE_KEY,
    q: nameImage,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page,
  });

  return await axios.get(`${URL}?${options}`);
}


export default FetchImages;
