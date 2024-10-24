import Home from "./pages/Home/Home";
import Todo from "./pages/Todo/Todo";
import Components from "./pages/Components/Components";
import Layout from "./layouts/Layout/Layout";
import Animation from "./pages/Animation/Animation";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { fetchProducts } from "./data/products";

import { useEffect, useState } from "react";
import Calculator from "./pages/Calculator/Calculator"; // นำเข้า Calculator component
import Products from "./pages/Products/Products";
import Carts from "./pages/Carts/Carts";
import Login from "./pages/Login/Login";

const initTab = "home";

function App() {
  const [token, setToken] = useState("x");
  const [role, setRole] = useState("");
  const [tab, setTab] = useState("");
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    setTab(initTab);
  }, []);

  useEffect(() => setProducts(fetchProducts()), []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  if (token === "") {
    return <Login setToken={setToken} setRole={setRole} />;
  } else {
    return (
      <div className="app-container">
        <HashRouter>
          <Routes>
            <Route
              element={
                <Layout
                  tab={tab}
                  setTab={setTab}
                  products={products}
                  carts={carts}
                  setToken={setToken}
                />
              }
            >
              <Route path={"/"} element={<Home />} />
              <Route path={"/home"} element={<Home />} />
              <Route path={"/components"} element={<Components />} />
              <Route path={"/todo"} element={<Todo />} />
              <Route path={"/animation"} element={<Animation />} />
              <Route path={"/calculator"} element={<Calculator />} />{" "}
              {/* เพิ่มเส้นทางของ Calculator */}
              <Route
                path={"/products"}
                element={
                  <Products
                    products={products}
                    carts={carts}
                    setCarts={setCarts}
                  />
                }
              />
              <Route
                path={"/carts"}
                element={<Carts carts={carts} setCarts={setCarts} />}
              />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

export default App;
