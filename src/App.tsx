import Home from "./pages/Home/Home";
import usePageUnloadWarning from "./utils/usePageUnloadWarning";

const App: React.FC = () => {
  usePageUnloadWarning();
  return (
    <div>
      <Home></Home>
    </div>
  );
};

export default App;









