import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useSearch } from "../context/search";
import toast from "react-hot-toast";
import Header from "./../components/Layout/Header";
import Footer from "./../components/Layout/Footer";

const Search = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [values, setValues] = useSearch();
  return (
    <>
    <Header />
      <div style={{ marginTop: "5%" }} className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div  className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div  className="card m-2" style={{ width: "18rem",backgroundColor:"#001c30", minheight:"24rem",boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.4)" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 style={{ color: "white" }} className="card-title">{p.name}</h5>
                  <p className="card-text" style={{ color: "grey" }}>
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text" style={{ color: "grey" }}> $ {p.price}</p>
                  <button class="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button class="btn btn-secondary ms-1"
                   onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                  >ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
};

export default Search;
