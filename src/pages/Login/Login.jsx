import { useRef } from "react";
import { verifyUser } from "../../data/users";
import Form from "react-bootstrap/Form";
import "./Login.css";

function Login({ setToken, setRole }) {
  const userRef = useRef();
  const passRef = useRef();

  const handleLogin = () => {
    const user = userRef.current.value.trim(); // แก้ไขการเข้าถึง
    const pass = passRef.current.value.trim(); // แก้ไขการเข้าถึง

    userRef.current.value = ""; // ลบค่าของ input
    passRef.current.value = ""; // ลบค่าของ input

    const userInfo = verifyUser(user, pass);
    if (userInfo === null) {
      alert("Wrong username or password");
      userRef.current.focus();
    } else {
      setToken(userInfo.token);
      setRole(userInfo.role);
    }
  };

  return (
    <div className="login-container">
      <Form.Label htmlFor="username">Username</Form.Label>
      <Form.Control
        type="text"
        id="username"
        placeholder="user"
        style={{ textAlign: "center" }}
        ref={userRef}
      />
      <Form.Label htmlFor="password">Password</Form.Label>
      <Form.Control
        type="password"
        id="password"
        placeholder="pass"
        style={{ textAlign: "center" }}
        ref={passRef}
      />
      <button className="btn btn-success mt-3" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
