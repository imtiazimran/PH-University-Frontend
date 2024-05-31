import MainLayout from "./components/layout/MainLayout";
import PrivetRoute from "./components/layout/PrivetRoute";

const App = () => {
    return (
        <PrivetRoute>
           <MainLayout/>
        </PrivetRoute>
    );
};

export default App;
