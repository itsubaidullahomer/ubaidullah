import { BrowserRouter } from "react-router-dom";
import ReactRoute from "./app/routes/ReactRoute";

function App() {
  return (
    <BrowserRouter>
      <ReactRoute />
    </BrowserRouter>
  );
}

export default App;
