import "./App.css";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "providers/AuthProvider";

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
