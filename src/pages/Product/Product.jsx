import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CardItem from "../../components/Card/BillCard";
import "./Product.css";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";

import SampleImage from "../../assets/p-1.webp";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import {
  selectCartItemCount,
  selectCartTotalQuantity,
  selectCartTotalAmount,
} from "../../redux/cardSelector";
import toast from "react-hot-toast";
import { Timestamp } from "firebase/firestore";

import { toggleStatusTab } from "../../redux/cartSlice"
import { useContext, useEffect, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";

function Product() {
  const [showCategory, setShowCategory] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [active, setActive] = useState(false);

  const context = useContext(myContext);
  const {getAllCategory, getAllProduct } = context;

  // get total quantity of the order 

  const [totalQuantity, setTotalQuantity ] = useState(0);
  const carts = useSelector(store => store.cart.cardselectitems);

  useEffect(() => {
    let total = 0;
    carts.forEach(element => {
      total += element.quantityNumber;
    });
  }, [carts]);
// handle open the billing section 

  const statusTab = useSelector((store) => store.cart.statusTab);
  const statusTab2 = useSelector((store) => store.cart.statusTab2);
  const dispatchCart = useDispatch();

  const handleOpenTabCart = () => {
    dispatchCart(toggleStatusTab());
  };

// add item into the card using redux method or package -----------------------
  const cardItems = useSelector((store) => store.cart.cardselectitems);
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const newQuantities = {};
    carts.forEach((item) => {
      newQuantities[item.productId] = item.quantityNumber;
    });
    setQuantities(newQuantities);
  }, [carts]);

  const addCart = (item) => {
    const quantity = quantities[item.id];
    
    if (!quantity || quantity <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }
    const cleanedItem = {
      ...item,
      time: item.time?.toDate()?.toISOString() || null,
    };
    
    dispatch(
      addToCart({
        items: cleanedItem,
        productId: item.id,
        quantityNumber: quantity,
      })
    );

    dispatchCart(toggleStatusTab2());
   
  };
// only for input box after delete the item || its handling only input onchange values

  const handleQuantityChange = (item, value) => {
    if (isNaN(value) || value < 0) {
      setQuantities({
        ...quantities,
        [item.id]: "",
      });
    } else if (value === 0) {
      dispatch(removeFromCart(item.id));
      setQuantities({
        ...quantities,
        [item.id]: 0,
      });
      toast.success("Deleted from cart");
    } else {
      setQuantities({
        ...quantities,
        [item.id]: value,
      });
    }
  };

// get total number of quantity

const selectCart = (state) => state.cart;

const selectCartSize = createSelector(
  [selectCart],
  (cart) => cart.cardselectitems.length
);
const cartSize = useSelector(selectCartSize);

// for fixed rate section show content

const itemCount = useSelector(selectCartItemCount); // total items
const totalQty = useSelector(selectCartTotalQuantity); // total quantity
const totalAmount = useSelector(selectCartTotalAmount); // total price

  return (
    <>
      <Header />

      {/* set bg image -------------------------------------------*/}
      <section className="background-image-section">
        <div className="bg-image-3"></div>
      </section>
      {/** Fixed the rate section ------------------------------------ */}
      <section className="fixed-rate">
        <Row>
          <Col>
            <div className="rate-text">
              <Col>
                <h1>Quantity</h1>
              </Col>
              <Col>
                <p>{itemCount}</p>
              </Col>
            </div>
            <div className="rate-text">
              <Col>
                <h1>Item</h1>
              </Col>
              <Col>
                <p>{totalQty}</p>
              </Col>
            </div>
            <div className="rate-text">
              <Col>
                <h1>Total</h1>
              </Col>
              <Col>
                <p>{totalAmount}</p>
              </Col>
            </div>
          </Col>
        </Row>
      </section>
      {/** product section ------------------------------------ */}
      <section className="product-section">
        {/** search section -------------------------------- */}
        <div
          className="search-product"
          onClick={() => setShowCategory(!showCategory)}
        >
          <h1>
            Filter{" "}
            <span>
              <i className="bi bi-funnel-fill"></i>
            </span>
          </h1>
        </div>

        {showCategory && (
          <div className="list-category">
            <ListGroup>
              <Card>
                <Card.Header as="h5" className="category-list-header">
                  Categories
                  <div
                    className="close-button"
                    role="button"
                    tabIndex={0}
                    onClick={() => setShowCategory(false)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setShowCategory(false);
                      }
                    }}
                    aria-label="Close category list"
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </div>
                </Card.Header>
                {getAllCategory.map((category) => (
                  <ListGroup.Item
                    key={category.id}
                    action
                    className="category-list-item"
                    tabIndex={0}
                    onClick={() => {
                      const element = document.getElementById(category.name);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                      setShowCategory(false);
                    }}
                  >
                    {category.name}
                  </ListGroup.Item>
                ))}
              </Card>
            </ListGroup>
          </div>
        )}
        {/** list out the category and items --------------- */}
        {getAllCategory.map((c, inx) => {
          return (
            <div className="whole-product-details" key={inx}>
              <Row className="category" id={c.name}>
                <h1>
                  {c.alpha} - {c.name}
                </h1>
              </Row>
              <Row className="crackers-item">
                {getAllProduct
                  .filter((Item) => Item.productCategory === c.name)
                  .map((Item, index) => {
                    return (
                      <Col className="list-item" key={index}>
                        <div className="sno-number">
                          <h1>{index + 1}</h1>
                        </div>
                        <div className="image-content text-center">
                          <Card.Img variant="top" src={Item.imgUrl} />
                        </div>
                        <div className="prod-details">
                          <h1 className="pro-name">{Item.name}</h1>
                          <div className="pro-amt">
                            <div className="amount">
                              <h1>
                                <span>
                                  <s>
                                    <i className="bi bi-currency-rupee"></i>{" "}
                                    {Item.originalAmount} / {Item.pieces}
                                  </s>
                                </span>
                              </h1>
                              <h1>
                                <span>
                                  <i className="bi bi-currency-rupee"></i>{" "}
                                  {Item.saleAmount} / {Item.pieces}
                                </span>
                              </h1>
                            </div>
                            <div className="add-pro">
                              <input
                                type="number"
                                placeholder="Qty"
                                min={0}
                                max={999999}
                                value={quantities[Item.id] || ""}
                                onChange={(e) => {
                                  let value = parseInt(e.target.value);
                                  handleQuantityChange(Item, value);
                                }}
                              />
                              <Button
                                variant="success"
                                disabled={
                                  !quantities[Item.id] ||
                                  quantities[Item.id] <= 0
                                }
                                onClick={(e) => addCart(Item)}
                              >
                                Add
                              </Button>
                              <h1>
                                <i className="bi bi-currency-rupee"></i>
                                <span>
                                  {(parseInt(quantities[Item.id]) || 0) * parseInt(Item.saleAmount)}
                                </span>
                              </h1>
                            </div>
                          </div>
                        </div>
                        <CardItem data={Item}/>
                      </Col>
                    );
                  })}
              </Row>
            </div>
          );
        })}
      </section>

      <section className="billing-section">
        <div className="billing-icon" onClick={handleOpenTabCart}>
          <h1>
            <span>
              <i className="bi bi-cart4"></i>
            </span>
          </h1>
          <p className="orderCount">
            {cartSize}
          </p>
        </div>
        <div className={` ${statusTab === true ? "backgroundchange" : ""}`}>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Product;
