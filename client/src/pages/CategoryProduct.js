import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
import Header from "./../components/Layout/Header";
import Footer from "./../components/Layout/Footer";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Header />
      <div style={{ padding: "5%" }} className="container mt-3 category">
        <h4 style={{
            color: "#ffffff",
            fontSize: "24px",
            marginBottom: "10px",
            textAlign: "center",
          }} className="text-center">Category - {category?.name}</h4>
        <h6  className="text-center">{products?.length} result found</h6>
        <div className="d-flex flex-wrap">
          {products?.map((p) => (
            <div
              style={{
                backgroundColor: "#001C30",
                boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.4)",
              }}
              className="card m-2"
              key={p._id}
            >
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 style={{ color: "white" }} className="card-title">
                    {p.name}
                  </h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">{p.description.substring(0, 60)}...</p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      </>
  );
};

export default CategoryProduct;
