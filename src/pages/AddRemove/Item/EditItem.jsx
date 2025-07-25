import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import myContext from "../../../context/myContext";
import Loader from "../../../components/Loader/Loader";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { fireDb } from "../../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

function EditItem() {
  const context = useContext(myContext);
  const { loading, setLoading, getAllCategory, getAllProductFunction } =
    context;

  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    productCategory: "",
    originalAmount: "",
    saleAmount: "",
    imgUrl: "",
    pieces: "",
  });

  // get gingle category function - for only updating single category
  const getSingleProductFunction = async () => {
    try {
      setLoading(true);
      const productTemp = await getDoc(doc(fireDb, "product", id));
      const product = productTemp.data();

      setProduct({
        name: product.name,
        productCategory: product.productCategory,
        originalAmount: product.originalAmount,
        saleAmount: product.saleAmount,
        imgUrl: product.imgUrl,
        pieces: product.pieces,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message || "Failed to fetch product", {
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, []);

  // updatecategory function ------------
  const updateProduct = async (e) => {
    e.preventDefault();

    setLoading(true);

    let updatedProduct = { ...product };

    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "myupload");
      data.append("cloud_name", "dnwb5u0xn");

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

      updatedProduct = {
        ...updatedProduct,
        imgUrl: UrlImageGet,
      };
    }

    try {
      await setDoc(doc(fireDb, "product", id), updatedProduct);
      toast.success("product updated succesfully");

      getAllProductFunction();
      setLoading(false);
      navigate("/admin");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to update product", {
        duration: 4000,
      });
      setLoading(false);
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
          <Form onSubmit={updateProduct}>
            <h2 className="login-title">Edit Product</h2>
            <Form.Group className="mb-3" controlId="formBasicEditName">
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
            <Form.Group className="mb-3" controlId="formBasicEditType">
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

            <Form.Group className="mb-3" controlId="formBasicEditOAmount">
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

            <Form.Group className="mb-3" controlId="formBasicEditSales">
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

            <Form.Group className="mb-3" controlId="formBasicEditImg">
              <Form.Label>Image url </Form.Label>
              <Form.Control
                type="file"
                name="productImg"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEditPieces">
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
              Cancel
            </Button>
          </Form>
        </Card>
      </section>
    </>
  );
}

export default EditItem;
