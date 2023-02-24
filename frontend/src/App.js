import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Header from "./components/common/Header";
import AdminArticles from "./pages/admin/article/AdminArticles";

function App() {
    return (
        <>
            <Header />
            <AdminArticles />
        </>
    );
}

export default App;
