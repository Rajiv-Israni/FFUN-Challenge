import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Cars = React.lazy(() => import("./user/pages/Cars"));
const AddCar = React.lazy(() => import("./user/pages/AddCar"));
const UpdateCar = React.lazy(() => import("./user/pages/UpdateCar"));
const SearchCar = React.lazy(() => import("./user/pages/SearchCar"));

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          <Switch>
            <Route path="/" exact>
              <Cars />
            </Route>
            <Route path="/cars/:cid" exact>
              <UpdateCar />
            </Route>
            <Route path="/add">
              <AddCar />
            </Route>
            <Route path="/search">
              <SearchCar />
            </Route>
          </Switch>
        </Suspense>
      </main>
    </Router>
  );
};

export default App;
