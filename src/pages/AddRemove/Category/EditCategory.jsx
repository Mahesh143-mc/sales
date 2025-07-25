import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import myContext from "../../../context/myContext";
import Loader from "../../../components/Loader/Loader";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { fireDb } from "../../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

function EditCategory() {
  const context = useContext(myContext);
  const { loading, setLoading, getAllCategoryFunction } = context;

  const navigate = useNavigate();
  const { id } = useParams();

  const [category, setCategory] = useState({
    name: "",
    alpha: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric"
      }
    )
  });

// get gingle category function - for only updating single category
  const getSingleCategoryFunction = async () => {
    try {
      setLoading(true);
      const categoryTemp = await getDoc(doc(fireDb, "category", id));
      const category = categoryTemp.data();

      setCategory({
        name: category.name,
        alpha: category.alpha,
        time: category.time,
        date: category.date,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message || "Failed to fetch category", { duration: 3000 });
    }
  };

  useEffect(()=> {
    getSingleCategoryFunction()
  },[]);

/// end of  the get single category function

// updatecategory function ------------
  const updateCategory = async() => {
    setLoading(true);
    try{

      await setDoc(doc(fireDb, 'category', id), category);
      toast.success("Category updated succesfully");

      getAllCategoryFunction();
      setLoading(false);
      navigate('/admin');
    }
    catch(error){
      console.log(error);
      toast.error( error,{duration: 4000});
    }
  }

  return (
    <>
      <section className="login-page">
        {loading && <Loader />}
        <Card>
          <Form >
            <h2 className="login-title">Edit Category</h2>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={category.name}
                onChange={(e) => {
                  setCategory({
                    ...category,
                    name: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAlpanumber">
              <Form.Label>Alpha Letters</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter alpha letters"
                value={category.alpha}
                onChange={(e) => {
                  setCategory({
                    ...category,
                    alpha: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}
            onClick={updateCategory}>
              Submit
            </Button>
          </Form>
        </Card>
      </section>
    </>
  );
}

export default EditCategory;
