import { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {

    axios
      .post("http://127.0.0.1:8000/login", {

        email,
        password,

      })

      .then((response) => {

        if (
          response.data.message ===
          "Login successful"
        ) {

          localStorage.setItem(
            "isLoggedIn",
            "true"
          );

          setIsLoggedIn(true);

        } else {

          alert("Invalid Credentials");

        }

      })

      .catch((error) => {

        console.log(error);

      });

  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-900">

      <div className="bg-white p-10 rounded-xl w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full mb-4"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-4"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={login}
          className="bg-black text-white w-full py-3 rounded-lg"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;