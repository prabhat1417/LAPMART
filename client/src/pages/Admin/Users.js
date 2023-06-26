import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./../../components/Layout/Header";
import Footer from "./../../components/Layout/Footer";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-users");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/auth/delete-user/${id}`);
      if (data.success) {
        toast.success(`User is deleted`);
        getAllUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
    <Header />
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div style={{ marginTop: "100px" }} className="col-md-3">
            <AdminMenu />
          </div>
          <div style={{ marginTop: "60px" }} className="col-md-9">
            <h1>All Users</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Admin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>{user.role === 1 ? "Yes" : "No"}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
      </>
  );
};

export default Users;
