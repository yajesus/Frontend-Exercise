import React, { useEffect, useState } from "react";
import "../css/home.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const man = require("../asset/man.png");
const img = require("../asset/img.png");

interface User {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  profilePic?: string;
  isBuyer: boolean;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const location = useLocation();
  const [display, setDisplay] = useState<object>({});
  const navigate = useNavigate();
  const userData: User = location.state?.userData || {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
  };

  console.log("hello", userData);
  function handleclick() {
    const profile: any = document.querySelector(".profile_show");
    if (profile.style.display == "none") {
      profile.style.display = "block";
    } else profile.style.display = "none";
  }
  function editprofile() {
    navigate("/User", { state: { userData } });
  }
  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://143.198.168.244:3000/api/users/fetch/dummy/user-v2?page=${page}`
      );
      setUsers(response.data.data);
      setTotalUsers(response.data.total);
      setLoading(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      setError(errorMessage);
      setTimeout(() => {
        setError("");
      }, 4000);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
    setDisplay(userData);
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalUsers / 10); // Assuming 10 users per page
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="home_contain">
      <div className="header_contain">
        <h1 className="header">welcome {userData.firstName}</h1>
        <div className="profile_contain">
          <div className="profile_show">
            <h1>profile</h1>
            <p>edit profile</p>
            <button onClick={editprofile} className="btn_edit">
              edit
            </button>
          </div>
          <div className="profile" onClick={handleclick}>
            <img src={man} className="man_profile" />
          </div>
        </div>
      </div>

      {loading && (
        <div className="loding">
          <p className="load">Loading...</p>
        </div>
      )}
      {error && (
        <div className="errorhome_contain">
          <p style={{ color: "red" }}>{error}</p>
        </div>
      )}
      <p className="users_para">Total users: {totalUsers}</p>
      <div className="homemiddle_contain">
        {users.length > 0 ? (
          users.map((user: User) => (
            <div key={user._id} className="card_contain">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                width="100"
                className="image"
              />
              <p className="user_name">
                Name: {user.firstName} {user.lastName}
              </p>
              <p className="email_para">Email: {user.email}</p>
              <p>Username: {user.userName}</p>
              <p>Address: {user.address}</p>
              <div className="img_uppercontain">
                {user.isBuyer && (
                  <div className="img_contain">
                    <img src={img} alt="buyer" className="img" />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no_users">No users available</p>
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1} className="btn">
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page * 10 >= totalUsers}
          className="btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
