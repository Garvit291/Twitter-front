import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import SourceCode from './Pages/SourceCode'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import {
  Route,
  Routes
} from "react-router-dom";
function App() {
  return (
    <>
      <NavBar/>
      <Routes>
      <Route exact path="/" element={<HomePage/>} />
      <Route path="/about" element={<AboutUs/>} />
      <Route path="/product" element={<SourceCode/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
