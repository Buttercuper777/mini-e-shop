import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import CategoryPage from "./pages/categoryPage";
import HelloPage from "./pages/helloPage";
import SomethingWentWrong from "./pages/errorPage";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HelloPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/error" element={<SomethingWentWrong />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
