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
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { DataContext } from "../../../../../context/Context";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const BillsDetailForm = () => {
  const { salesOrders, purchaseOrders, suppliers, materials, products, racks } =
    useContext(DataContext);
  const { billId } = useParams();
  const [data, setData] = useState({});
  const [line, setLine] = useState([]);
  const pdfRef = useRef(); // Ref cho Box cần in PDF
  const id = billId.match(/\d+/g).join("");
  const type = billId.replace(/\d+/g, "");

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
    line.map((item) => {
      total += item.quantity * item.unit_price;
    });
    return total;
  };

  const supplierName = () => {
    const foundObject = suppliers.find((item) => item.id == data.supplier);
    if (foundObject) {
      return foundObject.name;
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
    pdf.save("phieu-nhap-kho.pdf");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* Nút xuất PDF */}
      <Flex alignItems={"center"} justifyContent={"center"} margin={"8"}>
        <Button onClick={handleExportPDF}>PDF</Button>
      </Flex>
      <Box p={6} borderWidth={1} borderRadius="md" boxShadow="md">
        <VStack spacing={4} align="stretch">
          {/* Header */}
          <Box>
            <Text fontWeight="bold">DIY COMPANY</Text>
            <Text>Thành phố Đà Nẵng, Việt Nam</Text>
          </Box>
          <Text align="center" fontSize="xl" fontWeight="bold">
            PHIẾU NHẬP KHO
          </Text>
          <Text align="center">{getToday()}</Text>
          <Flex justifyContent="space-between">
            <Text>Số: XXX</Text>
            <Text>Nợ: XXX</Text>
            <Text>Có: XXX</Text>
          </Flex>

          {/* Information Section */}
          <Box>
            <Text>- Họ và tên người giao: {supplierName()}</Text>
          </Box>

          {/* Table */}
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>STT</Th>
                <Th>
                  Tên, nhãn hiệu, quy cách, phẩm chất vật tư, dụng cụ sản phẩm,
                  hàng hóa
                </Th>
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
                  <Td>{item.unit_price * item.quantity + "000 VNĐ"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Box>
            <Text fontWeight="bold">Tổng Cộng: {getTotal()}.000 VNĐ</Text>
          </Box>

          {/* Signatures */}
          <Flex justifyContent="space-between" mt={8}>
            <Box>
              <Text fontWeight="bold">Người lập phiếu</Text>
              <Text>(Ký, họ tên)</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Người giao hàng</Text>
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

      {/* Nội dung cần in PDF */}
      <Box ref={pdfRef} p={6} borderWidth={1} borderRadius="md" boxShadow="md">
        <VStack spacing={4} align="stretch">
          {/* Header */}
          <Box>
            <Text fontWeight="bold">DIY COMPANY</Text>
            <Text>Thành phố Đà Nẵng, Việt Nam</Text>
          </Box>
          <Text align="center" fontSize="xl" fontWeight="bold">
            PHIẾU NHẬP KHO
          </Text>
          <Text align="center">{getToday()}</Text>
          <Flex justifyContent="space-between">
            <Text>Số: XXX</Text>
            <Text>Nợ: XXX</Text>
            <Text>Có: XXX</Text>
          </Flex>

          {/* Information Section */}
          <Box>
            <Text>- Họ và tên người giao: {supplierName()}</Text>
          </Box>

          {/* Table */}
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>STT</Th>
                <Th>
                  Tên, nhãn hiệu, quy cách, phẩm chất vật tư, dụng cụ sản phẩm,
                  hàng hóa
                </Th>
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
                  <Td>{item.unit_price * item.quantity + "000 VNĐ"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Box>
            <Text fontWeight="bold">Tổng Cộng: {getTotal()}.000 VNĐ</Text>
          </Box>

          {/* Signatures */}
          <Flex justifyContent="space-between" mt={8}>
            <Box>
              <Text fontWeight="bold">Người lập phiếu</Text>
              <Text>(Ký, họ tên)</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Người giao hàng</Text>
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

export default BillsDetailForm;
