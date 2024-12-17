import React, { useContext, useState } from 'react';
import { LuChevronRight, LuMoveDown } from "react-icons/lu";
import { Box, Button, Checkbox, Table, Thead, Tbody, Tr, Th, Td, Text, Flex, HStack, MenuList, Menu, MenuItem, MenuButton, Input, Select } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { DataContext } from '../../../../context/Context';

const BillsList = () => {
  const { materials, purchaseOrders, salesOrders } = useContext(DataContext);

  // Tạo dữ liệu lọc
  const filteredPurchases = purchaseOrders.filter(item => item.status === "Arrived");
  const filteredSales = salesOrders.filter(item => item.status === "Pending");

  // Trạng thái để theo dõi danh sách nào được chọn
  const [selectedList, setSelectedList] = useState("purchases"); // Mặc định là "purchases"

  // Lấy dữ liệu theo trạng thái được chọn
  const billsData = selectedList === "purchases" ? filteredPurchases : filteredSales;

  return (
    <Box p={6}>
      <Flex justifyContent={"space-between"}>
        <Text fontSize="xl" fontWeight="medium">Import/Export List</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium" _hover={{ color: "orange.500", cursor: "pointer", transition: "all, 0.5s" }}>Import/Export</Text>
          <LuChevronRight />
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Import/Export List</Text>
        </HStack>
      </Flex>

      <Flex justify="space-between" m={10} align="center">
        <Input placeholder="Search" w="sm" />
        <Flex align="center" gap={2}>
          {/* Dropdown để chọn danh sách */}
          <Select
            placeholder="Select List"
            w="sm"
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
          >
            <option value="purchases">Purchases</option>
            <option value="sales">Sales</option>
          </Select>

        </Flex>
      </Flex>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" borderTop={"none"} m={10}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th><Checkbox /></Th>
              <Th>Reference Number</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {billsData.map((bill, index) => (
              <Tr key={index}>
                <Td><Checkbox /></Td>
                <Td>{bill.order_number}</Td>
                <Td color="blue.500" fontWeight="bold">{bill.status}</Td>
                <Td>
                  <HStack spacing={1}>

                    <Link to={'../detail/' +(selectedList ==="purchases" ? "Import":"Export")+ (bill.id) }>
                      <Button size="sm" colorScheme="green">{selectedList ==="purchases" ? "Import":"Export"}</Button>
                    </Link>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default BillsList;
