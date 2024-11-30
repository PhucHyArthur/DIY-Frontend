import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  LuAlignVerticalDistributeCenter,
  LuCodesandbox,
  LuContainer,
  LuFileSpreadsheet,
  LuLogOut,
  LuSettings,
  LuShapes,
  LuShoppingBag,
  LuShoppingCart,
  LuTrash,
  LuUsers,
  LuWarehouse,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { API, EMPLOYEE } from "../../constant/API";
import { useContext } from "react";
import { TokenContext } from "../../context/TokenContext";
import { LuArrowRightToLine } from "react-icons/lu";
import { LuArrowLeftToLine } from "react-icons/lu";

const NavAdmin = () => {
  const navigate = useNavigate();
  let n_token = localStorage.getItem('authToken');
  const [page, setPage] = useState("");
  const [token, setToken] = useContext(TokenContext);

  const handleLogout = async () => {
    try {
      
      // await axios.post(
      //   `${API}${EMPLOYEE.logout}`,
      //   {},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${jwt}`,
      //     },
      //   }
      // );

      setToken(null);
      localStorage.removeItem("authToken");
      navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        console.error("Email hoặc mật khẩu không đúng");
      } else {
        console.error("Đã xảy ra lỗi khi đăng xuất");
      }
    }
  }

  return (
    <Box
      className="fixed top-0 left-0 flex flex-col pt-[60px] justify-between bg-white"
      w={260}
      h={"100%"}
      borderRight={"1px solid #ccc"}
    >
      <Accordion
        allowMultiple
        defaultIndex={0}
        className="navAdmin p-5 flex flex-col gap-1 max-h-[700px] overflow-y-scroll"
      >
        <AccordionItem className="border-none">
          <AccordionButton
            onClick={() => setPage("dashboard")}
            className={`rounded-lg ${
              page === "dashboard" ? "bg-[#fef2e8]" : "transparent"
            }`}
          >
            <Link to={"/admin/dashboard"}>
              <Flex
                className={`items-center  w-full gap-2  rounded-lg ${
                  page === "dashboard" ? "text-[#f58220]" : "text-black"
                }`}
              >
                <LuAlignVerticalDistributeCenter />
                <Text>Dashboard</Text>
              </Flex>
            </Link>
          </AccordionButton>
        </AccordionItem>
        <div className="mt-7">
          <AccordionItem className="border-none">
            <AccordionButton
              onClick={() => setPage("inventory")}
              className={`rounded-lg ${
                page === "inventory" ? "bg-[#fef2e8]" : "transparent"
              }`}
            >
              <Flex
                className={`items-center  w-full gap-2  rounded-lg ${
                  page === "inventory" ? "text-[#f58220]" : "text-black"
                }`}
              >
                <LuShoppingBag />
                <Text>Inventory</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Link to={"inventory/materials/list"}>
                <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                  <Box className="text-[20px]">
                    <LuShapes />
                  </Box>
                  <Text>Raw Materials</Text>
                </Flex>
              </Link>
              <Link to={"inventory/products/list"}>
                <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                  <Box className="text-[20px]">
                    <LuCodesandbox />
                  </Box>
                  <Text>Finished Products</Text>
                </Flex>
              </Link>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem className="border-none">
            <AccordionButton
              onClick={() => setPage("customers")}
              className={`rounded-lg ${
                page === "customers" ? "bg-[#fef2e8]" : "transparent"
              }`}
            >
              <Flex
                className={`items-center  w-full gap-2  rounded-lg${
                  page === "customers" ? "text-[#f58220]" : "text-black"
                }`}
              >
                <LuUsers />
                <Text>Customers</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Link to={"customers/clients/list"}>
                <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                  <Box className="text-[20px]">
                    <LuUsers />
                  </Box>
                  <Text>Clients</Text>
                </Flex>
              </Link>
              <Link to={"customers/suppliers/list"}>
                <Flex className="items-center gap-3 p-2 hover:bg-[#f5f5f5]">
                  <Box className="text-[20px]">
                    <LuContainer />
                  </Box>
                  <Text>Suppliers</Text>
                </Flex>
              </Link>
            </AccordionPanel>
          </AccordionItem>
        </div>
        <div className="mt-7">
          <AccordionItem className="border-none">
            <AccordionButton
              onClick={() => setPage("warehouses")}
              className={`rounded-lg ${
                page === "warehouses" ? "bg-[#fef2e8]" : "transparent"
              }`}
            >
              <Link to={"warehouses/list"}>
                <Flex
                  className={`items-center  w-full gap-2  rounded-lg ${
                    page === "warehouses" ? "text-[#f58220]" : "text-black"
                  }`}
                >
                  <LuWarehouse />
                  <Text>Warehouses</Text>
                </Flex>
              </Link>
            </AccordionButton>
          </AccordionItem>
          <AccordionItem className="border-none">
            <AccordionButton
              onClick={() => setPage("sales")}
              className={`rounded-lg ${
                page === "sales" ? "bg-[#fef2e8]" : "transparent"
              }`}
            >
              <Link to={"/admin/order/sales/list"}>
                <Flex
                  className={`items-center  w-full gap-2  rounded-lg ${
                    page === "sales" ? "text-[#f58220]" : "text-black"
                  }`}
                >
                  <LuShoppingCart />
                  <Text>Sales Orders</Text>
                </Flex>
              </Link>
            </AccordionButton>
          </AccordionItem>
          <AccordionItem className="border-none">
            <AccordionButton
              onClick={() => setPage("purchase")}
              className={`rounded-lg ${
                page === "purchase" ? "bg-[#fef2e8]" : "transparent"
              }`}
            >
              <Link to={"/admin/order/purchase/list"}>
                <Flex
                  className={`items-center  w-full gap-2  rounded-lg ${
                    page === "purchases" ? "text-[#f58220]" : "text-black"
                  }`}
                >
                  <LuShoppingBag />
                  <Text>Purchase Orders</Text>
                </Flex>
              </Link>
            </AccordionButton>
          </AccordionItem>
          <AccordionItem className="border-none">
            <AccordionButton
              onClick={() => setPage("bills")}
              className={`rounded-lg ${
                page === "bills" ? "bg-[#fef2e8]" : "transparent"
              }`}
            >
              <Link to={"/admin/bills/list"}>
                <Flex
                  className={`items-center  w-full gap-2  rounded-lg ${
                    page === "bills" ? "text-[#f58220]" : "text-black"
                  }`}
                >
                  <LuFileSpreadsheet />
                  <Text>Import/Export</Text>
                </Flex>
              </Link>
            </AccordionButton>
          </AccordionItem>
        </div>
      </Accordion>

      <div className="px-10">
        <Link to={"/admin/settings"}>
        <Flex className="items-center gap-5 px-5 py-2 hover:bg-[#f5f5f5] cursor-pointer rounded-lg">
          <Box className="text-[24px]">
            <LuSettings />
          </Box>
          <Text className="text-[18px]">Settings</Text>
        </Flex>
        </Link>
        <Link to={"/admin/remove"}>
        <Flex className="items-center gap-5 px-5 py-2 hover:bg-[#f5f5f5] cursor-pointer rounded-lg">
          <Box className="text-[24px]">
            <LuTrash />
          </Box>
          <Text className="text-[18px]">Remove</Text>
        </Flex>
        </Link>
        <Flex className="items-center gap-5 text-[#991b1b] px-5 py-2 hover:bg-[#f5f5f5] cursor-pointer rounded-lg">
          <Box className="text-[24px]">
            <LuLogOut />
          </Box>
          <Text className="text-[18px]" onClick={()=> handleLogout()}>Logout</Text>
        </Flex>
      </div>
    </Box>
  );
};

export default NavAdmin;
