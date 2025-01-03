import "./LoginPage.scss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../utils/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postLogin(username, password);
      const token = response;
      console.log(token);
      
      dispatch(setCredentials({ token }));
      // console.log("ya tut");
      
      navigate("/admin")
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };
  return (
    <div className="login">
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Имя пользователя</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
