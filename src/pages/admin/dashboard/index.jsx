import React from "react";
import { Box, Heading, Grid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  // Giả lập dữ liệu tổng quan
  const totalSales = 150000; // Tổng doanh thu
  const productsSold = 300; // Số lượng sản phẩm đã bán
  const customersCount = 1200; // Số lượng khách hàng
  const ordersCount = 500; // Số lượng đơn hàng

  // Tạo các giá trị tăng trưởng giả lập
  const salesGrowth = 0.05; // Tăng trưởng doanh thu 5%
  const productsGrowth = 0.02; // Tăng trưởng số lượng sản phẩm 2%
  const customersGrowth = 0.03; // Tăng trưởng khách hàng 3%
  const ordersGrowth = 0.04; // Tăng trưởng đơn hàng 4%

  // Dữ liệu giả lập cho biểu đồ
  const data = [
    { name: 'Tháng 1', sales: 120000, orders: 300 },
    { name: 'Tháng 2', sales: 130000, orders: 350 },
    { name: 'Tháng 3', sales: 140000, orders: 400 },
    { name: 'Tháng 4', sales: 150000, orders: 450 },
    { name: 'Tháng 5', sales: 160000, orders: 500 },
  ];

  return (
    <Box p={5}>
      <Heading size="lg" mb={5}>Dashboard - Tổng Quan</Heading>

      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={5}>
        {/* Tổng Doanh Thu */}
        <Stat>
          <StatLabel>Tổng Doanh Thu</StatLabel>
          <StatNumber>${totalSales.toLocaleString()}</StatNumber>
          <StatHelpText>
            <StatArrow type={salesGrowth >= 0 ? "increase" : "decrease"} />
            {`${(salesGrowth * 100).toFixed(2)}% từ tháng trước`}
          </StatHelpText>
        </Stat>

        {/* Số Lượng Sản Phẩm Bán Được */}
        <Stat>
          <StatLabel>Số Lượng Sản Phẩm Bán Được</StatLabel>
          <StatNumber>{productsSold}</StatNumber>
          <StatHelpText>
            <StatArrow type={productsGrowth >= 0 ? "increase" : "decrease"} />
            {`${(productsGrowth * 100).toFixed(2)}% từ tháng trước`}
          </StatHelpText>
        </Stat>

        {/* Số Lượng Khách Hàng */}
        <Stat>
          <StatLabel>Số Lượng Khách Hàng</StatLabel>
          <StatNumber>{customersCount}</StatNumber>
          <StatHelpText>
            <StatArrow type={customersGrowth >= 0 ? "increase" : "decrease"} />
            {`${(customersGrowth * 100).toFixed(2)}% từ tháng trước`}
          </StatHelpText>
        </Stat>

        {/* Số Lượng Đơn Hàng */}
        <Stat>
          <StatLabel>Số Lượng Đơn Hàng</StatLabel>
          <StatNumber>{ordersCount}</StatNumber>
          <StatHelpText>
            <StatArrow type={ordersGrowth >= 0 ? "increase" : "decrease"} />
            {`${(ordersGrowth * 100).toFixed(2)}% từ tháng trước`}
          </StatHelpText>
        </Stat>
      </Grid>

      {/* Biểu đồ doanh thu và đơn hàng */}
      <Box mt={8}>
        <Heading size="md" mb={4}>Biểu Đồ Doanh Thu & Đơn Hàng</Heading>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Bảng thống kê */}
      <Box mt={8}>
        <Heading size="md" mb={4}>Bảng Thống Kê Chi Tiết</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Tháng</Th>
              <Th>Tổng Doanh Thu</Th>
              <Th>Số Lượng Đơn Hàng</Th>
              <Th>Số Lượng Sản Phẩm</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((entry, index) => (
              <Tr key={index}>
                <Td>{entry.name}</Td>
                <Td>${entry.sales.toLocaleString()}</Td>
                <Td>{entry.orders}</Td>
                <Td>{(entry.sales / 500).toFixed(0)} sản phẩm</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box mt={8}>
        <Heading size="md" mb={4}>Thống kê thêm</Heading>
        <Text fontSize="lg">Bạn có thể thêm các biểu đồ, thống kê chi tiết về doanh thu, sản phẩm, đơn hàng, hoặc các chỉ số khác.</Text>
      </Box>
    </Box>
  );
};

export default Dashboard;
