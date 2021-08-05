import React, { useEffect, useState } from "react";

import CarsList from "../components/CarsList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./SearchCar.css";

const SearchCar = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCars, setLoadedCars] = useState();
  const [filteredCars, setFilteredCars] = useState([]);
  const [enteredInput, setEnteredInput] = useState();
  const [selectedCriteria, setSelectedCriteria] = useState("No");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/cars"
        );

        setLoadedCars(responseData.cars);
      } catch (err) {}
    };
    const generateBar = () => {};
    fetchCars();
    generateBar();
  }, [sendRequest]);

  const inputChangeHandler = (event) => {
    event.preventDefault();

    setEnteredInput(event.target.value);
  };

  const selectChangeHandler = (event) => {
    event.preventDefault();

    setSelectedCriteria(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (selectedCriteria === "No") {
      setFilteredCars(
        loadedCars.filter((car, index) => index === enteredInput - 1)
      );
    } else if (selectedCriteria === "Make") {
      setFilteredCars(
        loadedCars.filter((car, index) => car.make === enteredInput)
      );
    } else if (selectedCriteria === "Model") {
      setFilteredCars(
        loadedCars.filter((car, index) => car.make_model === enteredInput)
      );
    } else {
      setFilteredCars(
        loadedCars.filter((car, index) => car.year === enteredInput)
      );
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <form className="form-control" onSubmit={onSubmitHandler}>
        <input id="search" type="text" onChange={inputChangeHandler} />
        <select
          name="queryselector"
          id="queryselector"
          onChange={selectChangeHandler}
          value={selectedCriteria}
        >
          <option value="No.">No.</option>
          <option value="Make">Make</option>
          <option value="Model">Model</option>
          <option value="Year">Year</option>
        </select>
        <div>
          <Button type="submit">SEARCH</Button>
        </div>
      </form>
      {!isLoading && loadedCars && <CarsList items={filteredCars} />}
    </React.Fragment>
  );
};

export default SearchCar;
