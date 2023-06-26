import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./../components/Layout/Header";
import Footer from "./../components/Layout/Footer";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!radio.length) getAllProducts();
  }, [radio.length]);

  useEffect(() => {
    if (radio.length) filterProduct();
  }, [radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div >
    < Header />
      <img
        src="https://i.pinimg.com/originals/ef/80/83/ef8083bfe79088dc00bd8eca9c821cd5.jpg"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">

          <h4 className="text-center mt-4" style={{ fontFamily: "Arial", color: "black" }}>
            Filter By Price
          </h4>
          <div className="d-flex flex-column">
            <Radio.Group
              onChange={(e) => setRadio(e.target.value)}
              style={{ marginTop: "10px", marginBottom: "10px" }}
              
            >
              {Prices?.map((p) => (
                <div key={p._id} style={{ margin: "5px" }} >
                  <Radio
                    value={p.array}
                    style={{
                      color: "#fff",
                      backgroundColor: "black",
                      borderRadius: "4px",
                      padding: "8px 12px",
                    }}
                    
                  >
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>

          </div>
          <div className="d-flex flex-column">
            <button style={{
              width: "200px",
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              transition: "background-color 0.3s ease",
              marginLeft: "2%"
            }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#00b3e6")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "black")}
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>

        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div style={{
                backgroundColor: "#001C30",
                boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.4)",
                width: "20rem", minheight: "24rem"
              }} className="card m-2" key={p._id} >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 style={{ color: "white" }} className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
