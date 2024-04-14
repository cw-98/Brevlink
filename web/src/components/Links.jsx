import { useState } from 'react'
import '../style/links.css'; // Make sure to create this CSS file

function LinksTable() {
  // Sample data, replace with your actual data source
  const links = [
    { id: 1, shortLink: 'pZcDE', createdAt: '2024-03-02 18:18' }
    // ... more links
  ];

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
              <td>{link.shortLink}</td>
              <td>https://example.com/very-long-url-that-needs-to-be-shortened</td>
              <td>{link.createdAt}</td>
              <td>
                    {/* Icons or buttons for actions */}
                    {/* <image></image> */}
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