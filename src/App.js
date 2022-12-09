import "styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import Layout from "layout";
import Waiters from "pages/Waiters";
import Meals from "pages/Meals";
import Orders from "pages/Orders";

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/orders" exact element={<Orders />} />
            <Route path="/waiters" exact element={<Waiters />} />
            <Route path="/meals" exact element={<Meals />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
