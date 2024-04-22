import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../css/userprofile.css";
// Define the User type
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const UserProfile: React.FC = () => {
  const location = useLocation();
  // Extract userData from location.state or provide a default value
  const userData: User = location.state?.userData || {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
  };
  console.log(userData);
  console.log(userData.id);
  //  initial state of editedUser to userData
  const [editedUser, setEditedUser] = useState<User>({ ...userData });
  const [checkusername, setCheckusername] = useState<string>("");
  const [checkuserlast, setCheckuserlast] = useState<string>("");
  const [checkuseremail, setCheckuseremail] = useState<string>("");
  const handleuserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    setCheckusername(e.target.value);
  };
  const handlelastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    setCheckuserlast(e.target.value);
  };
  const handleemailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    setCheckuseremail(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkusername == "") {
      alert("please enter user name");
    } else if (checkuserlast == "") {
      alert("please enter last name");
    } else if (checkuseremail == "") {
      alert("please enter email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkuseremail)) {
      alert("please enter valid email");
    } else
      try {
        // a PUT request to update the user profile
        await axios.put(`/profile?id=${editedUser.id}`, editedUser);
        alert("User information updated successfully!");
      } catch (error) {
        console.error("Error updating user information:", error);
        alert("Failed to update user information. Please try again later.");
      }
  };

  return (
    <div className="userpro_contain">
      <div className="userheader_contain">
        <h2 className="headrpro">User Profile</h2>
      </div>
      <div className="usedata_contain">
        <h1>First Name: {userData.firstName}</h1>
        <p>Last Name: {userData.lastName}</p>
        <p>Email: {userData.email}</p>
      </div>
      <div className="form_containn">
        <div className="from_middle">
          <form onSubmit={handleSubmit} className="form">
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleuserChange}
                className="firstinput"
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={handlelastChange}
                className="firstinput"
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleemailChange}
                className="firstinput"
              />
            </div>
            <button type="submit" className="btn probtn">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
