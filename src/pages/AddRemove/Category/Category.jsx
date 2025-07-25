import React, { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import myContext from "../../../context/myContext";
import Loader from "../../../components/Loader/Loader";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { fireDb } from "../../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

function Category() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    alpha: "",
  });

  const addCategoryFunction = async (e) => {
    e.preventDefault();
    if(category.name === "" || category.alpha === ""){
      return toast.error("All fields are required.", { duration: 4000 });
    }

    try {

      const detailsForCategory = {
        name: category.name,
        alpha: category.alpha,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",{
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
      };

      const userReference = collection(fireDb,"category");
      addDoc(userReference, detailsForCategory); 
      
      setCategory({
        name: category.name,
        alpha: category.alpha,
      });

      toast.success("Add Category successfully");

    // Navigate to another page after successful signup
      navigate("../admin");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Falied to add ", { duration: 3000 });
    }
  };

  // go back to previous page

  const goBack = () => {
    navigate(-1);
  }
  return (
    <>
      <section className="login-page">
        {loading && <Loader />}
        <Card>
          <Form onSubmit={addCategoryFunction}>
            <h2 className="login-title">Add Category</h2>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" placeholder="Enter category name"
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
              <Form.Label>Alpa-Letters</Form.Label>
              <Form.Control type="text" placeholder="Enter alph-letter"
              value={category.alpha}
              onChange={(e) => {
                      setCategory({
                        ...category,
                        alpha: e.target.value,
                      });
                    }} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
             <Button variant="secondary" 
             onClick={goBack}>
              Cancle
            </Button>
          </Form>
        </Card>
      </section>
    </>
  );
}

export default Category;
