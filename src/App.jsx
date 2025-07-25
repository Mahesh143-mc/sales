import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Product from "./pages/Product/Product";
import Tips from "./pages/Tips/Tips";
import Contact from "./pages/Contact/Contact";

import Login from "./pages/Login/Login";

import Admin from "./pages/Admin/Admin";
import AddCategory from "./pages/AddRemove/Category/Category";
import EditCategory from "./pages/AddRemove/Category/EditCategory";

import AddItem from "./pages/AddRemove/Item/AddItem"
import EditItem from "./pages/AddRemove/Item/EditItem"

import MyState from "./context/myState";

import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin/ProtectedRouteAdmin";

import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <MyState>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRouteAdmin>
                <Admin />
              </ProtectedRouteAdmin>
            }
          ></Route>
          <Route
            path="/admin/addcategory"
            element={
              <ProtectedRouteAdmin>
                <AddCategory />
              </ProtectedRouteAdmin>
            }
          ></Route>
          <Route
            path="admin/editcategory/:id"
            element={
              <ProtectedRouteAdmin>
                <EditCategory />
              </ProtectedRouteAdmin>
            }
          ></Route>
          <Route
            path="/admin/additem"
            element={
              <ProtectedRouteAdmin>
                <AddItem />
              </ProtectedRouteAdmin>
            }
          ></Route>

           <Route
            path="admin/edititem/:id"
            element={
              <ProtectedRouteAdmin>
                <EditItem />
              </ProtectedRouteAdmin>
            }
          ></Route>
        </Routes>
        <Toaster />
      </MyState>
    </>
  );
}

export default App;
