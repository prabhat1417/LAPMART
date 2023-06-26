import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Header from "./../components/Layout/Header";
import Footer from "./../components/Layout/Footer";
const Categories = () => {
  const categories = useCategory();
  return (
    <>
    <Header />
      <div className="container" style={{ padding: "5%" }}>
        <div className="row container">
          {categories.map((c) => (
            <div  className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <div style={{
                backgroundColor: "#001C30",
                boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.4)",
              }} className="card">
                <Link to={`/category/${c.slug}`} style={{
                color: "white",
              }}  className="btn cat-btn">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      </>
  );
};

export default Categories;
