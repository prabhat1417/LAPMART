import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    < >
    < Header/>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h4> Admin Name : {auth?.user?.name}</h4>
              <h4> Admin Email : {auth?.user?.email}</h4>
              <h4> Admin Contact : {auth?.user?.phone}</h4>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
};

export default AdminDashboard;
