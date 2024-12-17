import { useState ,useContext } from "react";
import { API, EMPLOYEE } from "../../../constant/API";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { TokenContext} from "../../../context/TokenContext";
import { Box, Flex, Text } from "@chakra-ui/react";
import "./index.css"
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
      <Flex className="login-page" justifyContent={'center'} alignItems={'center'}>
        <Flex borderRadius={12} zIndex={1} className="login-container">

        <Flex alignItems={'center'} justifyContent={'center'} padding={20} borderRadius={"12px 0px 0px 12px"}>
          <Text fontSize='xl' color={'white'} as='b'>Welcome to ERP SYSTEM</Text>
        </Flex>

        <Box backgroundColor={'white'} padding={"40px"} borderRadius={"0px 12px 12px 0px"}>
          <form onSubmit={handleSubmit}>
            <div>
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
        </Box>
        </Flex>
      </Flex>
  );
};

export default Login;
