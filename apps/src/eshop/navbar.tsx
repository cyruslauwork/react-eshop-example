import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

export const Navbar: React.FC = function () {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const [lastlogin, setLastlogin] = useState("Not logged in yet");
  const [username, setUsername] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setsuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:4000/signin",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Handle login success, store the JWT, etc.
      localStorage.setItem("token", response.data.token);
      setsuccessMessage("Sign in Successfully");
      window.location.href = "/"; // Redirect to the home page after successful sign in
    } catch (error) {
      console.error("Sign in failed:", error.response?.data || error.message);
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        setErrorMessage("Invalid Username/Password");
      }
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setsuccessMessage("");

    try {
      await axios.post("http://localhost:4000/signup", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setsuccessMessage("Sign up successfully, please sign in");
    } catch (error) {
      console.error("Sign up failed:", error.response?.data || error.message);
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 401)
      ) {
        setErrorMessage("Invalid Username/Password");
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const lastlogin = await axios.post(
          "http://localhost:4000/lastlogin",
          { token },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLastlogin(lastlogin.data);
        const username = await axios.post(
          "http://localhost:4000/username",
          {
            token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setUsername(username.data);
      }
    };
    init();
  }, []);

  const handleSignout = () => {
    localStorage.removeItem("token"); // Remove the auth from localStorage
    window.location.href = "/"; // Redirect to the home page after successful sign out
  };

  return (
    <>
      <table className="table bg-wheat">
        <tbody>
          <tr>
            <th>
              <img
                src="https://unsplash.it/1920/1080?random"
                className="logo"
              />
            </th>
            <th>
              <a href="/">eShop</a>
            </th>
            <th className="form-cell">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-signin">
                  Sign In
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="bg-white">
                    <form onSubmit={handleSignIn}>
                      <div className="mb-3">
                        Username
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={credentials.username}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        Password
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={credentials.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <button type="submit">Sign In</button>
                    </form>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th className="form-cell">
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-signup">
                  Sign Up
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="bg-white">
                    <form onSubmit={handleSignUp}>
                      <div className="mb-3">
                        Username
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={credentials.username}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        Password
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={credentials.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <button type="submit">Sign Up</button>
                    </form>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th>
              {lastlogin !== "Not logged in yet" && "Last login not found" ? (
                <p>
                  Signed in as {username}. Last successful sign in: {lastlogin}
                  <button onClick={handleSignout}>Sign Out</button>
                </p>
              ) : null}
            </th>
          </tr>
          {errorMessage && <div>{errorMessage}</div>}
          {successMessage && <div>{successMessage}</div>}
        </tbody>
      </table>
    </>
  );
};
