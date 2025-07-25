import React, { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import myContext from "../../../context/myContext";
import Loader from "../../../components/Loader/Loader";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { fireDb } from "../../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

function AddItem() {
  const context = useContext(myContext);
  const { loading, setLoading, getAllCategory } = context;

  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    productCategory: "",
    originalAmount: "",
    saleAmount: "",
    imgUrl: "",
    pieces: "",
  });

  const addProductFunction = async (e) => {
    e.preventDefault();
    if (product.name === "" || product.productCategory === "" || product.originalAmount === "" || product.saleAmount === "" ) {
      return toast.error("All fields are required.", { duration: 4000 });
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "myupload");
    data.append("cloud_name", "dnwb5u0xn");

    setLoading(true);
    //upload image into the cloudinary website and get the url
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dnwb5u0xn/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const cloudData = await res.json();
    const UrlImageGet = cloudData.url;

    try {
      const detailsForProduct = {
        name: product.name,
        productCategory: product.productCategory,
        originalAmount: product.originalAmount,
        saleAmount: product.saleAmount,
        imgUrl: UrlImageGet,
        pieces: product.pieces,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userReferenceProduct = collection(fireDb, "product");

      addDoc(userReferenceProduct, detailsForProduct);

      setProduct({
        name: "",
        productCategory: "",
        originalAmount: "",
        saleAmount: "",
        imgUrl: "",
        pieces: "",
      });

      toast.success("Add Product successfully");
      setLoading(false);
      // Navigate to another page after successful signup
      navigate("../admin");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message || "Falied to add ", { duration: 3000 });
    }
  };

  // go back to previous page

  const goBack = () => {
    navigate(-1);
    setLoading(false);
  };
  return (
    <>
      <section className="login-page">
        {loading && <Loader />}
        <Card>
          <Form onSubmit={addProductFunction}>
            <h2 className="login-title">Add Category</h2>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={product.name}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    name: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAlpanumber">
              <Form.Label>Category Type </Form.Label>

              <Form.Select
                value={product.productCategory}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    productCategory: e.target.value,
                  });
                }}
              >
                <option value="">Select any one </option>
                {getAllCategory.map((category, inx) => (
                  <option key={inx} value={category.name}>
                    {category.name}
                  </option>
                ))}
                
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicOAmount">
              <Form.Label>Orignal Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter orignal amount"
                value={product.originalAmount}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    originalAmount: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAlpanumber">
              <Form.Label> Sales Amount </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter sales amount"
                value={product.saleAmount}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    saleAmount: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAlpanumber">
              <Form.Label>Image url </Form.Label>
              <Form.Control
                  type="file"
                  name="productImg"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddPieces">
              <Form.Label> Box / Pieces </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pieces per box"
                value={product.pieces}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    pieces: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={goBack}>
              Cancle
            </Button>
          </Form>
        </Card>
      </section>
    </>
  );
}

export default AddItem;
