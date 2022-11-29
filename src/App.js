import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import SourceCode from './Pages/SourceCode'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import {
  Route,
  Routes
} from "react-router-dom";
import Tweet from './Components/Tweet'
import User from './Components/User'
import Feedback from './Components/Feedback'
function App() {
  return (
    <div className='h-full'>
      <NavBar/>
      <Routes>
      <Route exact path="/" element={<HomePage/>} />
      <Route path="/us" element={<AboutUs/>} />
      <Route path="/product" element={<SourceCode/>} />
      <Route path="/tweet" element={<Tweet/>} />
      <Route path="/user" element={<User/>} />
      <Route path="/feedback" element={<Feedback/>} />


      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
