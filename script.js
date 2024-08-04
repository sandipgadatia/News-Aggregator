const apiKey = '5d7906e45aa8466b8da82e094db0d840'; // Replace with your NewsAPI key
const apiUrl = 'https://newsapi.org/v2/everything';

document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('search-input').value;
  if (query) {
    searchNews(query);
  }
});

async function searchNews(query) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '<div class="loading-spinner"></div>';
  try {
    const response = await fetch(`${apiUrl}?apiKey=${apiKey}&q=${query}`);
    const data = await response.json();
    if (data.articles.length === 0) {
      newsContainer.innerHTML = '<p>No news articles found.</p>';
    } else {
      displayNews(data.articles);
    }
  } catch (error) {
    console.error('Error fetching news data:', error);
    newsContainer.innerHTML = '<p>Failed to fetch news articles. Please try again later.</p>';
  }
}

function displayNews(articles) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';
  articles.forEach(article => {
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card';
    newsCard.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="${article.title}">
      <div class="news-title">${article.title}</div>
      <div class="news-info">${new Date(article.publishedAt).toLocaleDateString()}</div>
      <div class="news-info">${article.source.name}</div>
      <div class="news-description">${article.description}</div>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(newsCard);
  });
}
