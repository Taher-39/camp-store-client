import Home from "./pages/Home/Home";
import PageReloadWarning from "./utils/PageReloadWarning";

const App: React.FC = () => {
  
  return (
    <div>
      <PageReloadWarning />
      <Home></Home>
    </div>
  );
};

export default App;
