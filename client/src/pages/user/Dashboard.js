import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <>
    <Header />
      <div className="container-flui m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h4>Name : {auth?.user?.name}</h4>
              <h4>Email: {auth?.user?.email}</h4>
              <h4>Address: {auth?.user?.address}</h4>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
};

export default Dashboard;
