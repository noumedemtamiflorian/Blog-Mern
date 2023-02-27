import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Header from "./components/common/Header";
import AdminArticles from "./pages/admin/article/AdminArticles";

function App() {
    const categories = [1, 2, 3, "63f9032918cdaba810754f84", 4, 5];
    return (
        <>
            <Header />
            <AdminArticles />

            {/* <form>
                <div className="form-group mb-4">
                    <label htmlFor="category">Catégorie</label>
                    <select
                        className={`form-control`}
                        id="category"
                        name="category"
                        defaultValue="2"
                    >
                                                <option value="">Sélectionnez une catégorie</option>

                        {
                            categories.map(categorie=>{
                                return                         <option value={`${categorie}`}>{categorie}</option>
                            })
                        }

                    </select>
                </div>
            </form> */}
        </>
    );
}

export default App;
