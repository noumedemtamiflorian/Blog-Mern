import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./App.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/home";

function App() {
    return (
        <>
            <Header />
            <Home />
            <Footer />
        </>
    );
}

export default App;
