import React from "react";
import RoutingPage from "./pages/RoutingPage/RoutingPage";
import {
  BrowserRouter as Router,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <RoutingPage />
    </Router>
  );
}
export default App;