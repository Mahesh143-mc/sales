import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../../components/Loader/Loader";
import "./Login.css";

import {signInWithEmailAndPassword } from 'firebase/auth';
import {collection, query,  getDocs, where} from 'firebase/firestore';
import toast, {Toaster} from "react-hot-toast";
import {auth, fireDb} from '../../firebase/FirebaseConfig';

function Login() {
  const context = useContext(myContext);
  const {loading, setLoading} = context;

  const navigate = useNavigate();

  const [adminLogin, setAdminLogin] = useState({
    name:"",
    email: "",
    password: "",
  });

  const adminSignupFunction = async (e) => {
    e.preventDefault();
    if (adminLogin.email === "" || adminLogin.password === "" || adminLogin.name === "") {
      return toast.error('All fields are required.',{duration: 40000});
    }
    setLoading(true);
    try{
      
      const admins = await signInWithEmailAndPassword(auth, adminLogin.email, adminLogin.password);

      const q = query(collection(fireDb, "admin"), where("uid", "==", admins?.user?.uid));
      
      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          toast.error("No admin user found with this account.");
          return;
        }

        let user;
        querySnapshot.forEach((doc) => {
          user = doc.data();
        });

        localStorage.setItem("admins", JSON.stringify(user));
        setAdminLogin({
          name: "",
          email: "",
          password: "",
        });

        toast.success("Successfully Logged In");
        setLoading(false);

        if (user.role === "admin" && user.password === "MAHIDEV1634" && user.name === "Mahesh") {
          navigate("/admin");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast.error("Failed to fetch admin data. Please try again.");
      }
      setLoading(false);
    }
    catch(error){
      console.log(error)
      toast.error("error");
      setLoading(false);
    }
    // Additional signup logic can be added here
  };

  const autoNavigate = () => {
    const adminData = JSON.parse(localStorage.getItem("admins")); // parse it
  if (adminData?.role === "admin" && adminData?.password === "MAHIDEV1634" && adminData?.name === "Mahesh") {
    navigate("/admin");
  }
  }

  useEffect(()=>{
    autoNavigate()
  }, [])

  return (
    <>
      <section className="login-page">
        {loading && <Loader/> }
        <Card>
          <Form onSubmit={adminSignupFunction}>
            <h2 className="login-title">Login</h2>
             <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Admin name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter admin name"
                value={adminLogin.name}
                onChange={(e) => {
                  setAdminLogin({
                    ...adminLogin,
                    name: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={adminLogin.email}
                onChange={(e) => {
                  setAdminLogin({
                    ...adminLogin,
                    email: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={adminLogin.password}
                onChange={(e) => {
                  setAdminLogin({
                    ...adminLogin,
                    password: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </Form>
        </Card>
      </section>
    </>
  );
}

export default Login;
