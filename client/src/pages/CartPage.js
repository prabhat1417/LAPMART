import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import Header from "./../components/Layout/Header";
import Footer from "./../components/Layout/Footer";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  
  return (
    < >
    <Header />
      <div style={{textAlign: "center", padding: "5%"}} className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h4 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello ${auth?.token && auth?.user?.name}`}
              {cart?.length
                ? `, You Have ${cart.length} items in your cart${
                    auth?.token ? "" : ", please login to checkout!"
                  }`
                : ", Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-7 p-0 m-0">
              <div style={{padding: "5%",}} className="row">
                {cart?.map((p) => (
                  <div style={{backgroundColor: "#001C30",
                boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.4)"}} className="col-md-12 card flex-row" key={p._id}>
                    <div className="col-md-4">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        width="100%"
                        height="130px"
                      />
                    </div>
                    <div style={{marginLeft: "1%",color: "white",textAlign: "left"}} className="col-md-4">
                      <h5  >{p.name}</h5>
                      <p>{p.description}</p>
                      <p>Rs. {p.price}</p>
                    </div>
                    <div className="col-md-4 cart-remove-btn">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{textAlign: "center", padding: "5%", backgroundColor:"#0dcaf0",boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.4)"}}>
              <div className="row">
                <div className="col-md-12">
                  <h2>Cart Summary</h2>
                  <p>Total | Checkout | Payment</p>
                  <hr />
                  <h4>Total: {totalPrice()}</h4>
                  {auth?.user?.address ? (
                    <>
                      <div className="mb-3">
                        <h4>Current Address</h4>
                        <h5>{auth?.user?.address}</h5>
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mb-3">
                      {auth?.token ? (
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-warning"
                          onClick={() =>
                            navigate("/login", {
                              state: "/cart",
                            })
                          }
                        >
                          Please Login to Checkout
                        </button>
                      )}
                    </div>
                  )}
                  <div className="mt-2">
                    {!clientToken || !auth?.token || !cart?.length ? (
                      ""
                    ) : (
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(instance) => setInstance(instance)}
                        />

                        <button
                          className="btn btn-primary"
                          onClick={handlePayment}
                          disabled={
                            loading || !instance || !auth?.user?.address
                          }
                        >
                          {loading ? "Processing ...." : "Make Payment"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
};

export default CartPage;
