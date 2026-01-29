import React, { useState, useEffect } from "react";
import api from "../api/axios.js";

import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/dashboard", {
          withCredentials: true,
        });

        // if (!res) {
        //   console.log("no data");
        // }

        setUser(res.data.user);

        // console.log(res.data.user);
        if (res) {
          setLoading(true);
        }
      } catch (error) {
        console.log(error, "not working oo");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);
  return (
    <div>
      {loading ? (
        <>
          <h4>
            Welcome to your Admin Dashboard
            {user.name}
          </h4>
          <h4>{user.role}</h4>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Profile;
