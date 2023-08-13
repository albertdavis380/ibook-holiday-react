import {
  BrowserRouter,
  Route,
  Routes as BrowserRoutes,
} from "react-router-dom";

const Routess = () => {
  return (
    <BrowserRouter>
      <BrowserRoutes>
        <Route path="/" element={<Index />} />
        {routes}
        <Route path={"/*"} element={<Navigate to={"/"} />} />
      </BrowserRoutes>
    </BrowserRouter>
  );
};

export default Routess;
