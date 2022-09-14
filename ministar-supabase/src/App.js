import { BrowserRouter, Routes, Route, Link } from "react-router-dom"




import Create  from "./pages/Create";
import Home from "./pages/Home";
import Update from "./pages/Update";

function App() {
  return (
    <BrowserRouter>

    <nav>
      <h1>Ministar</h1>
      <Link to='/'>Home</Link>
      <Link to='/create'>NEW</Link>
    </nav>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/:id" element={<Update/>}/>


    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
