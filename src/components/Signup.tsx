import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/allinone.css";
import AddressAutocomplete from "./AddressAutocomplete";
interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  address: string;
  isBuyer: boolean;
  profilePic?: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    address: "",
    isBuyer: false,
    profilePic: "", // optional
  });
  //state to collect user info
  const [error, setError] = useState<boolean>(false);
  const [showerror, setShowerror] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const [firstnameerror, setFirstnameerror] = useState<string>("");
  const [lastnameerror, setLastnameerror] = useState<string>("");
  const [emailerror, setEmailerror] = useState<string>("");
  const [usernameerror, setUsernameerror] = useState<string>("");
  const [passworderror, setPassworderror] = useState<string>("");
  const [confirmpassworderror, setConfirmpassworderror] = useState<string>("");
  const [addresserror, setAddresserror] = useState<string>("");
  const [showfirstnameerror, setShowfirstnameerror] = useState<boolean>(false);
  const [showlastnameerror, setShowlastnameerror] = useState<boolean>(false);
  const [showemailerror, setShowemailerror] = useState<boolean>(false);

  const [showusernameerror, setShowusernameerror] = useState<boolean>(false);
  const [showpassworderror, setShowpassworderror] = useState<boolean>(false);
  const [showconfirmpassworderror, setShowconfirmpassworderror] =
    useState<boolean>(false);
  const [passwordmatch, setPasswordmacth] = useState<boolean>(false);
  const [wrongemail, setWrongemail] = useState<boolean>(false);
  const handleBuyerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      isBuyer: value === "true", // Convert string value to boolean
    });
  };
  const handleAddressSelect = (address: string) => {
    setFormData({
      ...formData,
      address: address,
    });
  };
  const handleChangefirst = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFirstnameerror(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangelast = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLastnameerror(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeemail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEmailerror(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangepassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPassworderror(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeusername = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUsernameerror(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeconfrimpassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setConfirmpassworderror(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeaddress = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAddresserror(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (firstnameerror == "") {
      setShowfirstnameerror(!showfirstnameerror);
      setTimeout(() => {
        setShowfirstnameerror(false);
      }, 1000);
    } else if (lastnameerror == "") {
      setShowlastnameerror(!showlastnameerror);
      setTimeout(() => {
        setShowlastnameerror(false);
      }, 1000);
    } else if (emailerror == "") {
      setShowemailerror(!showemailerror);
      setTimeout(() => {
        setShowemailerror(false);
      }, 1000);
    } else if (usernameerror == "") {
      setShowusernameerror(!showusernameerror);
      setTimeout(() => {
        setShowusernameerror(false);
      }, 1000);
    } else if (passworderror == "") {
      setShowpassworderror(!showpassworderror);
      setTimeout(() => {
        setShowpassworderror(false);
      }, 1000);
    } else if (confirmpassworderror == "") {
      setShowconfirmpassworderror(!showconfirmpassworderror);
      setTimeout(() => {
        setShowconfirmpassworderror(false);
      }, 1000);
      console.log("username empty");
    } else if (passworderror !== confirmpassworderror) {
      setPasswordmacth(!passwordmatch);
      setTimeout(() => {
        setPasswordmacth(false);
      }, 1000);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailerror)) {
      setWrongemail(!wrongemail);
      setTimeout(() => {
        setWrongemail(false);
      }, 1000);
    }
    //api call
    else
      try {
        const response = await axios.post(
          "http://143.198.168.244:3000/api/users/register/v2",
          formData
        );
        setSuccess(!success);
        setTimeout(() => {
          setSuccess(false);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password: "",
            confirmPassword: "",
            address: "",
            isBuyer: false,
            profilePic: "",
          });
        }, 3000);
        console.log("Signup success:", response.data);
        setFirstnameerror("");
        // rediect user to login page
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
        setShowerror(errorMessage);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
        console.log(error);
      }
  };

  return (
    <>
      <div className="signup_contain">
        {error && <p className="errorshow">{showerror}</p>}
        {success && (
          <p className="success">you have been registered successfully</p>
        )}
        <div className="signupcontain_header">
          <h1 className="signup_header">Signup</h1>
        </div>

        <form onSubmit={handleSubmit} className="form_contain">
          <div className="middle_contain">
            <div className="firstname_contain">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChangefirst}
                className="firstname_input"
              />
            </div>
            {showfirstnameerror && (
              <p className="error ">first name must be field</p>
            )}
            <div className="lastname_contain">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChangelast}
                className="lastname_input"
              />
            </div>
            {showlastnameerror && (
              <p className="error ">last name must be field</p>
            )}
            <div className="email_contain">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="email_input"
                onChange={handleChangeemail}
              />
            </div>
            {showemailerror && <p className="error ">email must be field</p>}
            {wrongemail && <p className="error">please enter vaild email</p>}
            <div className="username_contain">
              <label>User Name:</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                className="username_input"
                onChange={handleChangeusername}
              />
            </div>
            {showusernameerror && (
              <p className="error ">user name must be field</p>
            )}
            <div className="password_contain">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                className="password_input"
                onChange={handleChangepassword}
              />
            </div>
            {showpassworderror && (
              <p className="error ">password must be field</p>
            )}
            <div className="confirmpassword_contain">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                className="confirmpassword_input"
                onChange={handleChangeconfrimpassword}
              />
            </div>
            {showconfirmpassworderror && (
              <p className="error ">confirmPassword must be field</p>
            )}
            {passwordmatch && <p className="error">password must be matched</p>}
            <div className="address_contain">
              <label>address:</label>
              <AddressAutocomplete
                onSelect={handleAddressSelect}
                placeholder="Enter your address"
              />
            </div>

            <div className="buyer_contain">
              <label>Buyer:</label>
              <select
                name="isBuyer"
                className="buyer_selector"
                onChange={handleBuyerSelect}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
