import { use, useEffect, useState } from "react";
import MyContext from "./myContext.jsx";
import toast from "react-hot-toast";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDb } from "../firebase/FirebaseConfig.jsx";

function MyState({ children }) {
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("admins"));

  // get categoy into the firebase -------------------------------

  const [getAllCategory, setGetAllCategory] = useState([]);

  const getAllCategoryFunction = async (e) => {
    setLoading(true);

    try {
      const q = query(collection(fireDb, "category"), orderBy("alpha"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let categoryArray = [];

        QuerySnapshot.docs.forEach((doc) => {
          categoryArray.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        setGetAllCategory(categoryArray);

        setLoading(false);
      });

      return () => data;
    } catch (error) {
      console.log(error);
      toast.error("tp find the error on " + error);
    }
  };

  useEffect(() => {
    getAllCategoryFunction();
  }, []);


// get product into the firebase -------------------------------

  const [getAllProduct, setGetAllProduct] = useState([]);

  const getAllProductFunction = async (e) => {
    setLoading(true);

    try {
      const q = query(collection(fireDb, "product"),orderBy("productCategory"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];

        QuerySnapshot.docs.forEach((doc) => {
          productArray.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        setGetAllProduct(productArray);

        setLoading(false);
      });

      return () => data;

    } catch (error) {
      console.log(error);
      toast.error("tp find the error on " + error);
    }
  };

  useEffect(() => {
    getAllProductFunction();
  }, []);

  
// get product into the firebase -------------------------------

  const [getAllOrder, setGetAllOrder] = useState([]);

  const getAllOrderFunction = async (e) => {
    setLoading(true);

    try {
      const q = query(collection(fireDb, "order"),orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let orderArray = [];

        QuerySnapshot.docs.forEach((doc) => {
          orderArray.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        setGetAllOrder(orderArray);

        setLoading(false);
      });

      return () => data;

    } catch (error) {
      console.log(error);
      toast.error("tp find the error on " + error);
    }
  };

   useEffect(() => {
    getAllOrderFunction();
  }, []);



  return (
    <>
      <MyContext.Provider
        value={{
          loading,
          setLoading,
          getAllCategory,
          getAllCategoryFunction,
          getAllProduct,
          getAllProductFunction,
          getAllOrder,
          getAllOrderFunction,
        }}
      >
        {children}
      </MyContext.Provider>
    </>
  );
}

export default MyState;
