import React from "react";

import CarItem from "./CarItem";
import Card from "../../shared/components/UIElements/Card";
import "./CarsList.css";

const CarsList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Cars found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <CarItem
      cars={props.items}
    />
  );
};

export default CarsList;
