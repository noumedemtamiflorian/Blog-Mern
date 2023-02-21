// Import Bootstrap's CSS file and the custom CSS file for the App component
import "../node_modules/bootstrap/dist/css/bootstrap.css";

// Import the custom CSS file for the App component
import "./App.css";
// This line imports the Header component from the Header.js file in the components/common directory
import Header from "./components/common/Header";
import AdminCategories from "./pages/admin/adminCategories";

// Define the App function component
function App() {
    // Return a div with the className of "App" and the text "Init Frontend" as its child
    return (
        <>
            <Header />
            <AdminCategories />
        </>
    );
}

// Export the App component as the default export of this module
export default App;
