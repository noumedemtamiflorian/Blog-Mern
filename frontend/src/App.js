import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./App.css";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import DetailPost from "./pages/detailPost";

function App() {
    return (
        <>
            <Header />
            <DetailPost />
            <Footer />
        </>
    );
}

export default App;
