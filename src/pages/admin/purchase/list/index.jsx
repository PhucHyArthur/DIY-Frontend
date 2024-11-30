import React, { useState, useEffect } from 'react';
import { Box, HStack, Text, Table, Thead, Tbody, Tr, Th, Td, Checkbox, Button, Menu, MenuButton, MenuList, MenuItem, Switch, Flex, Input } from '@chakra-ui/react';
import { LuMoveDown, LuChevronRight } from "react-icons/lu";
import { Link } from 'react-router-dom';
const PurchaseList = () => {
  const initialData = [
    { date: '26/10/2024', poNumber: 'xxx', vendorName: 'AKsuited', status: 'ISSUED', received: false, billed: true, amount: '$1tr', expectedDate: '' },
    { date: '27/10/2024', poNumber: 'yyy', vendorName: 'PocketJ', status: 'ISSUED', received: true, billed: false, amount: '€2tr', expectedDate: '' }
  ];

  const [data, setData] = useState(initialData);

  const handleStatusChange = (index, newStatus) => {
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].status = newStatus;
      localStorage.setItem('purchaseData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleToggle = (index, field) => {
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData[index][field] = !updatedData[index][field];
      localStorage.setItem('purchaseData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  return (
      <Box p={6}>

      <Flex justifyContent={"space-between"}>
        <Text fontSize="xl" fontWeight="medium">Purchase Order List</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium"  _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Purchase Order</Text>
          <LuChevronRight></LuChevronRight>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Purchase Order List</Text>
        </HStack>
      </Flex>

      <Flex justify="space-between" m={10} align="center">
        <Input placeholder="Search" w="sm"/>
            <Flex align="center" gap={2}>
              <Menu>
                <MenuButton as={Button} rightIcon={<LuMoveDown/>}>
                  Actions
                </MenuButton>
                <MenuList>
                  <MenuItem>Sample Action 1</MenuItem>
                  <MenuItem>Sample Action 2</MenuItem>
                </MenuList>
              </Menu>
              <Button>
              <Link to="../add">
                <Text>Add Purchase Order</Text>
              </Link>
              </Button>
            </Flex>
      </Flex>

        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" borderTop={"none"} m={10}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th><Checkbox /></Th>
                <Th>Date</Th>
                <Th>Purchase Order</Th>
                <Th>Reference</Th>
                <Th>Vendor Name</Th>
                <Th>Status</Th>
                <Th>Received</Th>
                <Th>Billed</Th>
                <Th>Amount</Th>
                <Th>Expected Delivery Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            <Tbody>
              {data.map((order, index) => (
                <Tr key={index}>
                  <Td><Checkbox /></Td>
                  <Td>{order.date}</Td>
                  <Td><Link color="blue.500">{order.poNumber}</Link></Td>
                  <Td>{order.reference || '-'}</Td>
                  <Td>{order.vendorName}</Td>
                  <Td>
                    <Menu>
                      <MenuButton as={Button} size="xs" colorScheme={order.status === 'DRAFT' ? 'gray' : order.status === 'ISSUED' ? 'green' : 'blue'} className="status-button">
                        {order.status.toUpperCase()}
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => handleStatusChange(index, 'ISSUED')}>Issued</MenuItem>
                        <MenuItem onClick={() => handleStatusChange(index, 'DRAFT')}>Draft</MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                  <Td>
                    <Flex justifyContent={"center"}>
                      <Switch
                        isChecked={order.received}
                        onChange={() => handleToggle(index, 'received')}
                      />
                    </Flex>
                  </Td>
                  <Td>
                    <Flex justifyContent={"center"}>
                      <Switch
                        isChecked={order.billed}
                        onChange={() => handleToggle(index, 'billed')}
                      />
                    </Flex>
                  </Td>
                  <Td>{order.amount}</Td>
                  <Td>{order.expectedDate || '-'}</Td>
                  <Td>
                    <HStack spacing={2}>
                    <Link to={`../edit/${order.poNumber}`}>
                      <Button size="sm" colorScheme="green">Edit</Button>
                    </Link>

                    <Link to={`../detail/${order.poNumber}`}>
                      <Button size="sm" colorScheme="blue">View</Button>
                    </Link>

                      <Button size="sm" colorScheme="red">Delete</Button>
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

export default PurchaseList;
