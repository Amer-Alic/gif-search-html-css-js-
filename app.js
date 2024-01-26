const API_KEY = '1n5wrcfgEVtb9rEcntK8iYcgQHdeVGM7';

const searchBtn = document.querySelector('#search-btn');
const searchBar = document.querySelector('#search-bar');

searchBtn.addEventListener('click', () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  let q = searchBar.value;
  const gifCount = 10;

  const FULL_LINK = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;

  fetch(FULL_LINK)
    .then((data) => data.json())
    .then((info) => {
      let giphs = info.data;

      for (giph of giphs) {
        console.log(giph);

        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.setAttribute('src', giph.images.downsized_medium.url);
        img.setAttribute('alt', giph.title);

        const button = document.createElement('button');
        button.innerText = 'copy URL';
        button.setAttribute('type', 'button');

        function copyURL(url) {
          return () => {
            navigator.clipboard.writeText(url);
            alert('Copied to clipboard');
          };
        }

        button.addEventListener('click', copyURL(giph.url));

        card.append(img);
        card.append(button);
        main.append(card);
      }
    })
    .catch((err) => console.log(err));
});
