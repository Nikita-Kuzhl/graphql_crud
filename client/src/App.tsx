import { BrowserRouter, Route, Routes } from "react-router-dom";
import Item from "./pages/Item";
import Main from "./pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/item/:id" element={<Item />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
