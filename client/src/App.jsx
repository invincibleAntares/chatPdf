import { useEffect } from "react";
import api from "./utils/api"; 

function App() {
  const fetchapi = async () => {
    try {
    
      const response = await api.get("/hello");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    fetchapi();
  }, []);

  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}

export default App;
