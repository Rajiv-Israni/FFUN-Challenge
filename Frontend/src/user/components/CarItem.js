import React from 'react';
import Button from '../../shared/components/FormElements/Button';

import Card from '../../shared/components/UIElements/Card';
import './CarItem.css';

const CarItem = props => {
  const tableData = props.cars.map((car, index) => (
    <tr key={car._id}>
      <td>{index + 1}</td>
      <td>{car.make}</td>
      <td>{car.make_model}</td>
      <td>{car.year}</td>
      <td>{car.price}</td>
      <td>{car.status}</td>
      <td><Button to={`/cars/${car._id}`}>View</Button></td>
    </tr>
  ));

  return (
    <Card>
      <table className="data">
      <tbody>
        <tr>
          <th>No.</th>
          <th>Make</th>
          <th>Model</th>
          <th>Year</th>
          <th>Price</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        {tableData}
      </tbody>
    </table>
    </Card>
  );
};

export default CarItem;
