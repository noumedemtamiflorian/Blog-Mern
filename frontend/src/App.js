import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./App.css";
import Footer from "./components/common/Footer";
// This line imports the Header component from the Header.js file in the components/common directory
import Header from "./components/common/Header";
import ArticlesByCategorie from "./pages/articlesByCategorie";

function App() {
    // Return a div with the className of "App" and the text "Init Frontend" as its child
    return (
        <>
            <Header />
            <ArticlesByCategorie />
            <Footer />
        </>
    );
}

export default App;
