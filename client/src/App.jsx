import { useEffect } from "react";
import axios from "axios";

function App() {
  const fetchapi = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api");
      console.log(response);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  useEffect(() => {
    fetchapi();
  }, []);

  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

export default App;
