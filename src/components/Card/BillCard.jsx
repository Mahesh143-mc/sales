import React, { useContext, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import imageone from "../../assets/Bg-1.jpg";
import "./BillCard.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleStatusTab } from "../../redux/cartSlice";
import { removeFromCart } from "../../redux/cartSlice";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDb } from "../../firebase/FirebaseConfig";

function Card() {

  // user details fill section 
  
  const [isOpen, setIsOpen] = useState(false);
  const [filedValid, setFiledValid] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  

  const cardselectitems = useSelector((store) => store.cart.cardselectitems);
  const statusTab = useSelector((store) => store.cart.statusTab);
  const statusTab2 = useSelector((store) => store.cart.statusTab2);
  const dispatch = useDispatch();

  const CallingTwoFunction = () =>{
    handleTabCloseCart();
    if(isOpen)
    {
      togglePanel();
    }
  }

  const handleTabCloseCart = () => {
    dispatch(toggleStatusTab());
  };

  const deleteCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleOrderSuccessfullPage = () => {
    dispatch(toggleStatusTab());
  };

// display the total amount details

  const totalAmount = cardselectitems.reduce(
    (total, item) =>
      total + (parseFloat(item.originalAmount) || 0) * (item.quantityNumber || 0),
    0
  );

  const salesAmount = cardselectitems.reduce(
    (total, item) =>
      total + (parseFloat(item.saleAmount) || 0) * (item.quantityNumber || 0),
    0
  );

 
  const packingCharge = (salesAmount) * 0.03; // 3% on discounted price
  const overallTotal = salesAmount + packingCharge;

// to insert the from the database 
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const [userDetail, setUSerDetail] = useState({
    name: "",
    email: "",
    ph: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
    tamt:"",
    samt:"",
    packing:"",
    overalAmount:"",
    items: cardselectitems,
});

  const orderPlace = async (e) => {
    
    if (
      userDetail.name === "" ||
      userDetail.email === "" ||
      userDetail.city === "" ||
      userDetail.state === "" ||
      userDetail.address === "" ||
      userDetail.ph === "" || userDetail.pincode === ""
    ) {
      setFiledValid(true);
      return toast.error("All fileds are required", {duration: 3000});
    }
    setFiledValid(false);
    try{
      const orderDetails = {
        name: userDetail.name,
        email: userDetail.email,
        ph: userDetail.ph,
        state: userDetail.state,
        city: userDetail.city,
        address: userDetail.address,
        pincode: userDetail.pincode,
        items: cardselectitems,
        tamt: totalAmount,
        samt: salesAmount,
        packing: packingCharge,
        overalAmount: overallTotal,
        time: Timestamp.now(),
      };

      const orderRef = collection(fireDb, "order");
      addDoc(orderRef, orderDetails);

      setUSerDetail({
        name: "",
        email: "",
        ph: "",
        state: "",
        city: "",
        pincode: "",
        address: "",
        tamt: "",
        samt: "",
        packing: "",
        overalAmount: "",
      });
      toast.success("Order placed successfully", {duration: 3000});
      handleOrderSuccessfullPage();
      navigate("/submit");
      
    }
    catch(error){
      console.log(error);
      toast.error("Order not placed",{duration: 3000});
    }
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            zIndex: 99999999999,
          },
        }}
      />
      <div className={`billing-content ${statusTab ? "show" : ""}`}>
        <i
          className="bi bi-x-circle-fill"
          role="button"
          tabIndex={0}
          onClick={CallingTwoFunction}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleTabCloseCart();
            }
          }}
          aria-label="Close cart"
        ></i>
        <h1 className="shop-name">Online Best Crackers Services</h1>
        <p>Sivakasi</p>
        <div
          className={`get-product-details ${isOpen ? "active" : ""}`}
          onClick={togglePanel}
        >
          {cardselectitems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cardselectitems.map((item, index) => (
              <div className="shop-items" key={item.productId || index}>
                <div className="image-content">
                  <Image src={item.imgUrl} className="bill-image" rounded />
                </div>

                <div className="name-content">
                  <h1>{item.name}</h1>
                </div>

                <div className="rate-content">
                  <h1 className="rate">{item.quantityNumber}</h1>
                  <h1 className="no-item">
                    <span>&#215; &#8377; {item.saleAmount}</span>
                  </h1>
                </div>

                <div className="total-amt-content">
                  <h1>{(item.saleAmount || 0) * (item.quantityNumber || 0)}</h1>
                </div>

                <div
                  className="close-icon"
                  role="button"
                  tabIndex={0}
                  onClick={() => deleteCart(item.productId)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      deleteCart(item.productId);
                    }
                  }}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <i className="bi bi-x-lg"></i>
                </div>
              </div>
            ))
          )}

          <div className="total-amont">
            <h1>Total Amount</h1>
            <h1>{salesAmount}</h1>
          </div>
          <div className="submit-order">
            <Button variant="success">Place Order</Button>
          </div>
        </div>

        <div className={`user-information ${isOpen ? "active" : ""}`}>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name " 
              value={userDetail.name || ""}
              onChange={(e)=>{
                setUSerDetail({
                  ...userDetail,
                  name: e.target.value
                })
              }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" 
              value={userDetail.email || ""}
              onChange={(e)=>{
                setUSerDetail({
                  ...userDetail,
                  email: e.target.value
                })
              }}/>
              <Form.Control.Feedback type="invalid">
                Invalid{" "}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone Number </Form.Label>
              <Form.Control type="number" placeholder="Enter Phone Number" 
              value={userDetail.ph || ""}
              onChange={(e)=>{
                setUSerDetail({
                  ...userDetail,
                  ph: e.target.value
                })
              }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formState">
              <Form.Label>Select State</Form.Label>
              <Form.Select
              value={userDetail.state || ""}
              onChange={(e)=>{
                setUSerDetail({
                  ...userDetail,
                  state: e.target.value
                })
              }}>
                <option >Select State</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Kerala">Kerala</option>
                <option value="Pondichery">Pondichery</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>City </Form.Label>
              <Form.Control type="text" placeholder="Your City" 
              value={userDetail.city || ""}
              onChange={(e)=>{
                setUSerDetail({
                  ...userDetail,
                  city: e.target.value
                })
              }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPin">
              <Form.Label>Pincode </Form.Label>
              <Form.Control type="number" placeholder="Your Pincode" 
              value={userDetail.pincode || ""}
              onChange={(e)=>{
                setUSerDetail({
                  ...userDetail,
                  pincode: e.target.value
                })
              }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "70px" }}
                value={userDetail.address || ""}
              onChange={(e)=>{
                setUSerDetail({
                  ...userDetail,
                  address: e.target.value
                })
              }}
              />
            </Form.Group>
            <div className={` ${filedValid ? "d-block" : "d-none"}`}>
              <span className="text-danger fw-semibold bg-white p-2">Requried all fileds * </span>
            </div>

            <div className="amount-details">
              <div className="amount-row">
                <span className="label">Total</span>
                <span className="value">
                  <i className="bi bi-currency-rupee"></i>
                  {totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="amount-row">
                <span className="label">Discount Amount - 80%</span>
                <span className="value">
                  <i className="bi bi-currency-rupee"></i>
                  {salesAmount.toFixed(2)}
                </span>
              </div>

              <div className="amount-row">
                <span className="label">Packing Charge (3%)</span>
                <span className="value">
                  <i className="bi bi-currency-rupee"></i>{" "}
                  {packingCharge.toFixed(2)}
                </span>
              </div>

              <div className="amount-row">
                <span className="label">Overall Total</span>
                <span className="value">
                  <i className="bi bi-currency-rupee"></i>
                  {overallTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              variant="success"
              className="w-100"
              id="sumbit-btn"
              onClick={orderPlace}
            >
              Submit
            </Button>
            <h1 onClick={togglePanel} className="navigate-back">
              Back
            </h1>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Card;
