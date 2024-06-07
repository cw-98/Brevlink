import { useState } from 'react'
import config from '../../config/config';
import '../style/App.css'
import { fetchWithToken } from '../utils/api';

function App() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  
  const shortenUrl = async () => {
    try {
      const res = await fetchWithToken(config.shortenURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ original_url: url }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setShortenedUrl(data.shortened_id);
    } catch (error) {
      console.error(error);
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
            {shortenedUrl && <div className="shortened-url-result">
              <a href={shortenedUrl}>{shortenedUrl}</a>
            </div>}
        </div>
      </main>
    </>
  )
}

export default App
