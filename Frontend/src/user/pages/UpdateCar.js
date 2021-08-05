import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./CarForm.css";


const UpdateCar = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const [flag, setFlag] = useState();
  const [status, setStatus] = useState(false);

  const history = useHistory();

  const carId = useParams().cid;

  const [formState, inputHandler, setFormData] = useForm(
    {
      make: {
        value: "",
        isValid: false,
      },
      model: {
        value: "",
        isValid: false,
      },
      year: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      status: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/${carId}`
        );

        setLoadedPlace(responseData.car);
        setFlag(responseData.car.status === 'live' ? false : true);

        setFormData(
          {
            make: {
              value: responseData.car.make,
              isValid: true,
            },
            model: {
              value: responseData.car.make_model,
              isValid: true,
            },
            year: {
              value: responseData.car.year,
              isValid: true,
            },
            price: {
              value: responseData.car.price,
              isValid: true,
            },
            status: {
              value: status ? 'sold' : responseData.car.status,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };

    fetchPlace();
  }, [sendRequest, status, carId, setFormData]);

  const changeHandler = (event) => {
    event.preventDefault();

    setStatus(true);
  };

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/${carId}`,
        "PATCH",
        JSON.stringify({
          make: formState.inputs.make.value,
          model: formState.inputs.model.value,
          year: formState.inputs.year.value,
          price: formState.inputs.price.value,
          status: formState.inputs.status.value,
        }),
        { "Content-Type": "application/json" }
      );
      history.push(`/`);
    } catch {}
  };

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="make"
            element="input"
            type="text"
            label="Make"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPlace.make}
            initialValid={true}
          />
          <Input
            id="model"
            element="input"
            type="text"
            label="Model"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPlace.make_model}
            initialValid={true}
          />
          <Input
            id="year"
            element="input"
            type="text"
            label="Year"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPlace.year}
            initialValid={true}
          />
          <Input
            id="price"
            element="input"
            type="text"
            label="Price"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPlace.price}
            initialValid={true}
          />
          {!status && (
            <Button onClick={changeHandler} disabled={flag}>
              MARK AS SOLD
            </Button>
          )}

          <Button type="submit" disabled={!formState.isValid}>
            UPDATE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateCar;
