import { useState } from 'react'
import config from '../../config/config';
import '../style/App.css'

const { baseUrl } = config;

function App() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  
  const shortenUrl = async () => {
    try {
      const response = await fetch(`${baseUrl}/shorten`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url }),
      });
      const data = await response.json();
      setShortenedUrl(data.shortenedUrl); // Assuming 'data.shortenedUrl' is the shortened URL returned by the API
    } catch (error) {
      console.error('Error shortening URL:', error);
      setShortenedUrl('Error shortening URL');
    }
  };

  return (
    <>
      <main>
        <div class="url-input-section">
            <h2>URL Shortener</h2>
            <input
            type="text" 
            placeholder="Enter your URL here" 
            class="url-input" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick = {shortenUrl} class="submit-btn">Shorten</button>
            {shortenedUrl && <div className="shortened-url-result">{shortenedUrl}</div>}
        </div>
      </main>
    </>
  )
}

export default App
