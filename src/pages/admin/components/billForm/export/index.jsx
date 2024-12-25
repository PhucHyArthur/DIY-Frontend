import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  VStack,
  Button,
  Select,
  Input,
  useToast,
} from "@chakra-ui/react";
import { LuArrowDownToLine } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { DataContext } from "../../../../../context/Context";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, Link } from "react-router-dom";
import { TokenContext } from "../../../../../context/TokenContext";

import { API, ORDERS, INVENTORY } from "../../../../../constant/API";
import axios from "axios";
import { li } from "framer-motion/client";

const ExportForm = ({OId,OType}) => {
  const { salesOrders, purchaseOrders,getProducts, products, getPurchaseOrders,employees } =
    useContext(DataContext);
  const {token} = useContext(TokenContext)
  const [data, setData] = useState({});
  const [line, setLine] = useState([]);
  const [importData, setImportData] = useState([]); // State to store import data
  const pdfRef = useRef();
  const id = OId
  const type = OType
  const toast = useToast();
  const navigate = useNavigate();

  const exportSO = async (id) =>{
    const { order_lines, ...rest } = data;
    const updatedData = {
      ...rest,
      status: "Packing",
    };
    try {
      const response = await axios.put(
        `${API}${ORDERS.Sales_Edit}${updatedData.id}/`,updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300 || response.status == 500) {
        toast({
          title: "Sales Order is Export",
          description: `Sales Order has been Exported successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getPurchaseOrders()
        console.log("Sales Order Exported successfully:", response.data);
        return response.data;
      } else {
        throw new Error("Failed to Export Purchase");
      }
    } catch (error) {
      toast({
        title: "Sales Order Export Failed",
        description: `${error.response.request.response}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error exporting Purchase:", error);
      throw error;
    }
  }

  const exportLine = async (line) =>{
    try {
      const response = await axios.put(
        `${API}${INVENTORY.Product_Update}${line.id}/`,line,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Product Exported successfully:", response.data);
        return response.data;
      } else {
        throw new Error("Failed to Export Line");
      }
    } catch (error) {
      toast({
        title: "Product Export Failed",
        description: `${error}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error Exporting Line:", error);
      throw error;
    }
  }

  const getData = () => {
    if (type === "Import") {
      const foundObject = purchaseOrders.find((item) => item.id == id);
      if (foundObject) {
        setData(foundObject);
        setLine(foundObject.order_lines);
      } else {
        console.log("No matching purchase order found for ID:", id);
      }
    } else if (type === "Export") {
      const foundObject = salesOrders.find((item) => item.id == id);
      if (foundObject) {
        setData(foundObject);
        setLine(foundObject.order_lines);
      } else {
        console.log("No matching sales order found for ID:", id);
      }
    }
  };

  const getName = (id) => {
    if (type === "Import") {
      const foundObject = materials.find((item) => item.id == id);
      if (foundObject) {
        return foundObject.name;
      }
    } else if (type === "Export") {
      const foundObject = products.find((item) => item.id == id);
      if (foundObject) {
        return foundObject.name;
      }
    }
  };

  const getTotal = () => {
    let total = 0;
    line.forEach((item) => {
      total += item.quantity * item.unit_price;
    });
    return total;
  };

  const clientName = () => {
    const foundObject = employees.find((item) => item.id == data.client);
    if (foundObject) {
      return foundObject.username;
    }
  };

  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `Ngày ${day} Tháng ${month} Năm ${year}`;
  };

  const handleExportPDF = async () => {
    const element = pdfRef.current; // Chỉ tham chiếu đến Box cần in
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${data.order_number}.pdf`);
  };


  const handleExport = async () => {
    let updatedLine ={}
    try {
      try {
        const result = line.map(({ product, quantity }) => {
          const index = products.findIndex((item) => item.id == product);
          if (index !== -1) {
            return {
              ...products[index],
              total_quantity: products[index].total_quantity - quantity,
              id: product,
            };
          } else {
            console.warn(`Product with ID ${product} not found in products list`);
            return null; 
          }
        }).filter(item => item !== null); 
      
        updatedLine = result.map(({ images, ...rest }) => rest);
      
        console.log("Exporting lines without images:", updatedLine);
      } catch (error) {
        console.error("Error processing export lines:", error);
      }

      for (const lineItem of updatedLine) {
        await exportLine(lineItem);
      }
  
      console.log("All lines exported successfully");
  
      await exportSO();
  
      console.log("Order exported successfully");
  
      await getProducts();
  
      await handleExportPDF();

      navigate("../list");
    } catch (error) {
      console.error("Error in export process:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"space-between"} margin={"2"}>
        <Link to="../list">
          <Button>Back</Button>
        </Link>
        <Flex gap={3}>
          <Button onClick={handleExportPDF}>
            <LuArrowDownToLine /> PDF
          </Button>
          <Button colorScheme="green" onClick={()=>handleExport()}>
            Export
          </Button>
        </Flex>
      </Flex>

      <Box p={6} borderWidth={1} borderRadius="md" boxShadow="md">
        <VStack spacing={4} align="stretch">
          <Text align="center" fontSize="xl" fontWeight="bold">
            XUẤT KHO ĐƠN HÀNG {data.order_number}
          </Text>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>STT</Th>
                <Th>Vật phẩm ,vật tư</Th>
                <Th>Số lượng</Th>
                <Th>Đơn giá</Th>
              </Tr>
            </Thead>
            <Tbody>
              {line.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>
                    {getName(
                      type.toLowerCase() === "import"
                        ? item.material
                        : item.product
                    )}
                  </Td>
                  <Td>{item.quantity}</Td>
                  <Td>{item.unit_price}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
      </Box>

      <Text fontSize="xl" fontWeight="bold" marginTop={"12"}>
        Phiếu xuất PDF
      </Text>

      <Box ref={pdfRef} p={6} marginTop={10}>
        <VStack spacing={4} align="stretch">
          <Box>
            <Text fontWeight="bold">DIY COMPANY</Text>
            <Text>Thành phố Đà Nẵng, Việt Nam</Text>
          </Box>
          <Text align="center" fontSize="xl" fontWeight="bold">
            PHIẾU NHẬP XUẤT KHO
          </Text>
          <Text align="center">{getToday()}</Text>
          <Box>
            <Text>Mã đơn hàng: {data.order_number}</Text>
            <Text>Khách hàng: {clientName()}</Text>
          </Box>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>STT</Th>
                <Th>Tên, nhãn hiệu, quy cách, phẩm chất vật tư</Th>
                <Th>Số lượng theo chứng từ</Th>
                <Th>Thực nhập</Th>
                <Th>Đơn giá</Th>
                <Th>Thành tiền</Th>
              </Tr>
            </Thead>
            <Tbody>
              {line.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>
                    {getName(
                      type.toLowerCase() === "import"
                        ? item.material
                        : item.product
                    )}
                  </Td>
                  <Td>{item.quantity}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>{item.unit_price}</Td>
                  <Td>{item.unit_price * item.quantity + " VNĐ"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Box>
            <Text fontWeight="bold">Tổng Cộng: {getTotal()} VNĐ</Text>
          </Box>
          <Flex justifyContent="space-between" mt={8}>
            <Box>
              <Text fontWeight="bold">Người lập phiếu</Text>
              <Text>(Ký, họ tên)</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Thủ kho</Text>
              <Text>(Ký, họ tên)</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Kế toán trưởng</Text>
              <Text>(Hoặc bộ phận có nhu cầu nhập)</Text>
              <Text>(Ký, họ tên)</Text>
            </Box>
          </Flex>
        </VStack>
      </Box>
    </>
  );
};

export default ExportForm;
