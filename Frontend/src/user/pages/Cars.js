import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import CarsList from "../components/CarsList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Cars = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCars, setLoadedCars] = useState();
  const [barData, setBarData] = useState({});

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/cars"
        );

        setLoadedCars(responseData.cars);
        var liveCount = 0;
        var soldCount = 0;
        responseData.cars.forEach((car) => {
          car.status === "live" ? ++liveCount : ++soldCount;
        });
        setBarData({
          labels: ["Live", "Sold"],
          datasets: [
            {
              label: "Histogram",
              backgroundColor: ["rgba(75,192,192,1)", "rgba(45,78,22,1)"],
              borderColor: ["rgba(0,0,0,1)", "rgba(0,0,0,1)"],
              borderWidth: 2,
              data: [liveCount, soldCount],
            },
          ],
        });
      } catch (err) {}
    };
    const generateBar = () => {};
    fetchCars();
    generateBar();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedCars && (
        <Bar
          data={barData}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
          width={20}
          height={5}
        />
      )}
      {!isLoading && loadedCars && <CarsList items={loadedCars} />}
    </React.Fragment>
  );
};

export default Cars;
