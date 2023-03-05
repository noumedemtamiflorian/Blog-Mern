import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./App.css";
import Header from "./components/common/Header";
import AdminArticles from "./pages/admin/article/AdminArticles";
import AdminCategories from "./pages/admin/category/AdminCategories";

function App() {
    return (
        <>
            <Header />
            <AdminCategories />
        </>
    );
}

export default App;
