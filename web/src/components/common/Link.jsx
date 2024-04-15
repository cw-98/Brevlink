import { useState, useEffect } from 'react'
import '../../style/links.css'; // Make sure to create this CSS file
import { useUser } from '../../hooks/useAuth';
import { fetchWithToken } from '../../utils/api';
import conifg from '../../../config/config';

function LinksTable() {
  const { user: { id } } = useUser();
  const [links, setLinks] = useState([]); // State to store fetched links
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(''); // State to manage error message
  
  useEffect(() => {
    getUrls();
  }, [id]);

  const getUrls = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchWithToken(conifg.getUrls, { // Assuming `config.api` holds your base API URL
        method: 'GET',
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setLinks(data); // Update state with fetched links
    } catch (err) {
      console.error(err);
      setError('Failed to fetch URLs.'); // Set error message
    } finally {
      setLoading(false); // Ensure loading is set to false after the fetch operation completes
    }
  };

  if (loading) return <p>Loading...</p>; // Show a loading message while fetching data
  if (error) return <p>Error: {error}</p>; // Show an error message if an error occurred

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>url</th>
            <th>Original url</th>
            <th>Create Date</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {links.map(link => (
            <tr key={link.id}>
              <td>{link.shortened_id}</td>
              <td>{link.original_url}</td>
              <td>{link.create_date}</td>
              <td>
                    <button>Edit</button>
                    <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LinksTable;