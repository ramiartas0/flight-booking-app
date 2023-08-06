import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import UcakBileti from "./pages/UcakBileti";
import UcusBilgileri from "./pages/UcusBilgileri";
import Odeme from "./pages/Odeme";

function App(){
     return<>
     <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/ucak-bileti" element={<UcakBileti/>}></Route>
        <Route path="/ucus-bilgileri" element={<UcusBilgileri/>}></Route>
        <Route path="/odeme-islemleri" element={<Odeme/>}></Route>
     </Routes>
     </>
}
export default App;