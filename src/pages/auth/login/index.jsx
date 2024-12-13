import { useState ,useContext } from "react";
import { API, EMPLOYEE } from "../../../constant/API";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { TokenContext} from "../../../context/TokenContext";

const Login = () => {
  const {token, setToken, setResponseData} = useContext(TokenContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${API}${EMPLOYEE.login}`, {
        username,
        password,
      });
  
      const token = response.data.access_token;
      const fullResponse = response.data;
  
      localStorage.setItem('authToken', token);
      localStorage.setItem('authResponse', JSON.stringify(fullResponse));
  
      setToken(token);
      setResponseData(fullResponse);

      navigate("/admin/dashboard");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        console.error("Email hoặc mật khẩu không đúng");
      } else {
        console.error("Đã xảy ra lỗi khi đăng nhập");
      }
    }
  };
  
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://gssoftware.in/images/b2.jpg')`,
      }}
    >
      {/* Overlay để làm mờ hình nền */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Nội dung chính */}
      <div className="items-center flex justify-center">
        <div className="relative py-10 px-12 mt-20 bg-white rounded-xl shadow-xl z-10 max-w-lg">
          <form onSubmit={handleSubmit}>
            <div>
              <h1 className="text-4xl font-bold text-indigo-600 mb-6 animate-bounce">
                Welcome to ERP
              </h1>
              <label
                htmlFor="username"
                className="block text-gray-800 font-bold mt-4"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                placeholder="username"
                className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-gray-800 font-bold"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                placeholder="password"
                className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a
                href="#"
                className="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600"
              >
                Forget Password?
              </a>
            </div>
            <button
              className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
