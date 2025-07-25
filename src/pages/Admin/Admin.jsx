import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Image,
  Table,
} from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import "./Admin.css";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../../components/Loader/Loader";
import { fireDb } from "../../firebase/FirebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Admin() {
  const context = useContext(myContext);
  const { loading, setLoading, getAllCategory, getAllCategoryFunction, getAllProduct, getAllProductFunction, getAllOrder, getAllOrderFunction } = context;

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("admins"));

  const adminLogout = () => {
    localStorage.removeItem("admins");
    navigate("/login");
  };
// after click add category pages
  const navigateCategory = () => {
    navigate("/admin/addcategory");
  };


// after click add item pages
  const navigateAddItem = () => {
    navigate("/admin/additem");
  };
  // delete order  ----------

  const deleteOrder = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDb, "order", id));
      toast.success("Order deleted successfully");
      getAllOrderFunction();
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete order");
      setLoading(false);
    }
  }


  //delete category function 
  const deleteCategory = async(id) => {
    setLoading(true);
    try{
      await deleteDoc(doc(fireDb, 'category', id));
      toast.success("Category successfully deleted");
      getAllCategoryFunction();
      setLoading(false);
    }
    catch(error){
      console.log(error);
      setLoading(false);
      toast.error(error);
    }
  }

  
  //delete product function 
  const deleteProduct = async(id) => {
    setLoading(true);
    try{
      await deleteDoc(doc(fireDb, 'product', id));
      toast.success("Product successfully deleted");
      getAllProductFunction();
      setLoading(false);
    }
    catch(error){
      console.log(error);
      setLoading(false);
      toast.error(error);
    }
  }

  return (
    <>
      <section className="admin-dashboard">
        {loading && <Loader />}
        <Tabs>
          <TabList>
            <Tab>Order </Tab>
            <Tab>Category</Tab>
            <Tab>Item</Tab>
            <Tab>Logout</Tab>
          </TabList>
          {/** First content --- order show section----------- */}
          <TabPanel>
            <section className="order-section">
              <Container>
                {getAllOrder.map((orderItem, index) => {
                  const {id} = orderItem;
                  return (
                    <Card key={index}>
                      <CardHeader>
                        <h1>{index+1} - Order</h1>
                      </CardHeader>
                      <CardBody>
                        <div className="adr">
                          <div className="simple-details">
                            <p>
                              <strong>Name:</strong> {orderItem.name}
                            </p>
                            <p>
                              <strong>Mobile Number:</strong> {orderItem.ph}
                            </p>
                            <p>
                              <strong>EMail:</strong> {orderItem.email}
                            </p>
                            <p>
                              <strong>State:</strong> {orderItem.state}
                            </p>
                            <p>
                              <strong>City:</strong> {orderItem.city}
                            </p>
                            <p>
                              <strong>Pin Code:</strong> {orderItem.pincode}
                            </p>
                            <p>
                              <strong>Address:</strong>
                              {orderItem.address}
                            </p>
                          </div>
                        </div>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>S.NO</th>
                              <th>Product Name</th>
                              <th>Quantity</th>
                              <th>Sales Amount</th>
                              <th>Total Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderItem.items &&
                              orderItem.items.map((productDetails, inx) => {
                                return (
                                  <tr key={inx}>
                                    <td>{inx + 1}</td>
                                    <td>{productDetails.name}</td>
                                    <td>{productDetails.quantityNumber}</td>
                                    <td>{productDetails.saleAmount}</td>
                                    <td>
                                      {(productDetails.saleAmount || 0) *
                                        (productDetails.quantityNumber || 0)}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </Table>
                        <div className="amount-details">
                          <div className="amount-row">
                            <span className="label">Total</span>
                            <span className="value">
                              <i className="bi bi-currency-rupee"></i>
                              {orderItem.tamt}
                            </span>
                          </div>
                          <div className="amount-row">
                            <span className="label">
                              Discount Amount - 80%
                            </span>
                            <span className="value">
                              <i className="bi bi-currency-rupee"></i>
                              {orderItem.samt}
                            </span>
                          </div>

                          <div className="amount-row">
                            <span className="label">Packing Charge (3%)</span>
                            <span className="value">
                              <i className="bi bi-currency-rupee"></i>{" "}
                              {orderItem.packing}
                            </span>
                          </div>

                          <div className="amount-row">
                            <span className="label">Overall Total</span>
                            <span className="value">
                              <i className="bi bi-currency-rupee"></i>
                              {orderItem.overalAmount}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                      <CardFooter>
                        <Button variant="success">Accept</Button>
                        <Button variant="danger" onClick={() => deleteOrder(id)}>Delete Database</Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </Container>
            </section>
          </TabPanel>
          {/** Second content --- category add remove section ----- */}
          <TabPanel>
            <section className="cate-section">
              <Container>
                <Card>
                  <CardHeader>
                    <Button variant="success" onClick={navigateCategory}>
                      &#43;Add
                    </Button>
                  </CardHeader>
                  <CardBody>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Category Name </th>
                          <th>Alpha - Letter</th>
                          <th>Edit and Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getAllCategory.map((categoryItem, inx) => {
                          const { id, name, alpha } = categoryItem;

                          return (
                            <tr key={inx}>
                              <td>{inx + 1}</td>
                              <td>{name} - 80 %</td>
                              <td>{alpha}</td>
                              <td>
                                <Button
                                  variant="primary"
                                  onClick={() => navigate(`editcategory/${id}`)}
                                >
                                  Edit{" "}
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() => deleteCategory(id)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Container>
            </section>
          </TabPanel>
          {/** third content ----- item add remove delete secction ----  */}
          <TabPanel>
            <section className="display-item-section">
              <Container>
                <div className="list-item">
                  <Card>
                    <CardHeader>
                      <Button variant="success" onClick={navigateAddItem}>
                        &#43;Add
                      </Button>
                    </CardHeader>
                    <CardBody>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Image</th>
                            <th>Product Name </th>
                            <th>Category</th>
                            <th>Orignal Price</th>
                            <th>Discount Price</th>
                            <th>Pocket / Pieces </th>
                            <th>Delete & Edit </th>
                          </tr>
                        </thead>
                        <tbody>
                          {getAllProduct.map((productItem, inx) => {
                            const {
                              id,
                              name,
                              imgUrl,
                              originalAmount,
                              productCategory,
                              saleAmount,
                              pieces,
                            } = productItem;
                            return (
                              <tr key={inx}>
                                <td>{inx + 1}</td>
                                <td>
                                  <Image src={imgUrl} rounded />
                                </td>
                                <td>{name}</td>
                                <td>{productCategory} 80 %</td>
                                <td>&#8377;{originalAmount}</td>
                                <td>&#8377;{saleAmount}</td>
                                <td>{pieces}</td>
                                <td>
                                  <Button
                                    variant="primary"
                                    onClick={() => navigate(`edititem/${id}`)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="success"
                                    onClick={() => deleteProduct(id)}
                                  >
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </div>
              </Container>
            </section>
          </TabPanel>
          {/**Logout section -------- logout and delete the data from local storage */}
          <TabPanel>
            <section className="logout">
              <Container>
                <Button variant="danger" onClick={adminLogout}>
                  Logout
                </Button>
              </Container>
            </section>
          </TabPanel>
        </Tabs>
      </section>
    </>
  );
}

export default Admin;
