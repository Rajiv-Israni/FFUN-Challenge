import React from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./AddCar.css";
//import { react } from "@babel/types";

const AddCar = () => {
  const { sendRequest, isLoading, clearError, error } = useHttpClient();
  const [formState, inputHandler] = useForm(
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
        value: "live",
        isValid: true,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/",
        "POST",
        JSON.stringify({
          make: formState.inputs.make.value,
          model: formState.inputs.model.value,
          year: formState.inputs.year.value,
          price: formState.inputs.price.value,
          status: formState.inputs.status.value,
        }),
        { "Content-Type": "application/json" }
      );
      history.push("/");
    } catch {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="make"
          element="input"
          type="text"
          label="Make"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="model"
          element="input"
          type="text"
          label="Model"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="year"
          element="input"
          type="text"
          label="Year"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="price"
          element="input"
          type="text"
          label="Price"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        
        <Button type="submit" disabled={!formState.isValid}>
          ADD CAR
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AddCar;
