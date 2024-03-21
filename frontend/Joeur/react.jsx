import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const TableComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      
      const response = await fetch('/api/statistique/joueur/1');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>NbButs</th>
            <th>NbPasses</th>
            <th>NbCartonJaune</th>
            <th>NbCartonRouge</th>
            
          </tr>
        </thead>
        <tbody>
          
          {data.map((item) => (
            <tr key={item.nbButs}>
              <td>{item.nbButs}</td>
              <td>{item.nbPasses}</td>
              <td>{item.nbCartonJaune}</td>
              <td>{item.nbCartonRouge}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


ReactDOM.render(<TableComponent />, document.getElementById('root'));