import React from "react";
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
} from "@chakra-ui/react";

const BillsDetailForm = () => {
  return (
    <Box p={6} borderWidth={1} borderRadius="md" boxShadow="md">
      <VStack spacing={4} align="stretch">
        {/* Header */}
        <Box>
          <Text fontWeight="bold">DIY COMPANY</Text>
          <Text>Address</Text>
          <Text>Thành phố Đà Nẵng, Việt Nam</Text>
        </Box>
        <Text align="center" fontSize="xl" fontWeight="bold">
          PHIẾU NHẬP KHO
        </Text>
        <Text align="center">Ngày 14 tháng 07 năm 2022</Text>
        <Flex justifyContent="space-between">
          <Text>Số: NK00012</Text>
          <Text>Nợ: 156</Text>
          <Text>Có: 331</Text>
        </Flex>

        {/* Information Section */}
        <Box>
          <Text>- Họ và tên người giao: CÔNG TY TNHH THIẾT BỊ TÂN AN PHÁT</Text>
          <Text>- Theo hóa đơn số 1379 ngày 14 tháng 07 năm 2022 của CÔNG TY TNHH THIẾT BỊ TÂN AN PHÁT</Text>
          <Text>- Nhập tại kho: Kho NVL</Text>
        </Box>

        {/* Table */}
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>Tên, nhãn hiệu, quy cách, phẩm chất vật tư, dụng cụ sản phẩm, hàng hóa</Th>
              <Th>Mã số</Th>
              <Th>Đơn vị tính</Th>
              <Th>Số lượng theo chứng từ</Th>
              <Th>Thực nhập</Th>
              <Th>Đơn giá</Th>
              <Th>Thành tiền</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>1 bu lông liên kết M6x20</Td>
              <Td>BULONG</Td>
              <Td>Cái</Td>
              <Td>200.00</Td>
              <Td>165.00</Td>
              <Td>33,000</Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>Dây điện Cadivi 4.0 (1 cuộn 100m)</Td>
              <Td>DAYDIEN</Td>
              <Td>Cuộn</Td>
              <Td>5.00</Td>
              <Td>1,507,000.00</Td>
              <Td>7,535,000</Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>Đèn báo CHINT</Td>
              <Td>DENBAOCHINT</Td>
              <Td>Cái</Td>
              <Td>70.00</Td>
              <Td>20,500.00</Td>
              <Td>1,435,000</Td>
            </Tr>
            <Tr>
              <Td>4</Td>
              <Td>Đèn báo pha phi 22 ND16-22A/2</Td>
              <Td>DENBAOPHA22</Td>
              <Td>Cái</Td>
              <Td>80.00</Td>
              <Td>20,400.00</Td>
              <Td>1,632,000</Td>
            </Tr>
            <Tr>
              <Td>5</Td>
              <Td>
                Đèn báo nguồn hiển thị điện áp AC 80-500V OX-AD16 22mm 50+
              </Td>
              <Td>DENBAONGUON</Td>
              <Td>Cái</Td>
              <Td>45.00</Td>
              <Td>50,000.00</Td>
              <Td>2,250,000</Td>
            </Tr>
          </Tbody>
        </Table>

        <Box>
          <Text fontWeight="bold">Cộng: 12,885,000</Text>
          <Text>- Tổng số tiền (Viết bằng chữ): Mười hai triệu tám trăm tám mươi lăm nghìn đồng chẵn.</Text>
        </Box>

        {/* Signatures */}
        <Flex justifyContent="space-between" mt={8}>
          <Box>
            <Text>Người lập phiếu</Text>
            <Text>(Ký, họ tên)</Text>
          </Box>
          <Box>
            <Text>Người giao hàng</Text>
            <Text>(Ký, họ tên)</Text>
          </Box>
          <Box>
            <Text>Thủ kho</Text>
            <Text>(Ký, họ tên)</Text>
          </Box>
          <Box>
            <Text>Kế toán trưởng</Text>
            <Text>(Hoặc bộ phận có nhu cầu nhập)</Text>
            <Text>(Ký, họ tên)</Text>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export default BillsDetailForm;

