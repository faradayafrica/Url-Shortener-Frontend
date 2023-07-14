import { useState } from "react";
import Footer from "./components/Footer";
import FormField from "./components/FormField";
import Header from "./components/Header";
import Bulb from "./components/Bulb";

function App() {
  const [dark, setDark] = useState(false)

  const handleMode = () =>{
    setDark(() => !dark)
  }
  return (
    <div className={dark ? " bg-[#2a2e32] h-screen" : " bg-[#333B47] h-screen"}>
      <Bulb onMode={handleMode} dark={dark}/>
      <div className="App flex flex-col justify-center items-center mt-3 ">
        <Header />
        <FormField dark={dark}/>
        <Footer />
      </div>
    </div>
  );
}

export default App;
