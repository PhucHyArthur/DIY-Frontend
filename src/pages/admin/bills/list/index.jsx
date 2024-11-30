import React from 'react';
import {LuChevronRight, LuMoveDown } from "react-icons/lu";
import { Box, Button, Checkbox, Table, Thead, Tbody, Tr, Th, Td, Text, Flex, HStack, MenuList, Menu, MenuItem, MenuButton, Input} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const billsData = [
  { date: '1 Nov 2024', bill: 'B12345', refNumber: 'PO-00005', vendor: 'AKS', status: 'Open', dueDate: '1 Nov 2024', amount: '€100.00', balance: '€100.00' },
  { date: '1 Nov 2024', bill: 'B123', refNumber: 'PO-00006', vendor: 'AQs', status: 'Open', dueDate: '1 Nov 2024', amount: '$80.00', balance: '$80.00' },
  { date: '1 Nov 2024', bill: 'B1', refNumber: 'PO-00005', vendor: 'JJ', status: 'Open', dueDate: '1 Nov 2024', amount: '€60.00', balance: '€60.00' },
  { date: '1 Nov 2024', bill: '123456', refNumber: 'PO-00007', vendor: 'AA', status: 'Open', dueDate: '1 Nov 2024', amount: '$2.55', balance: '$2.55' },
];

const BillsList = () => {
  return (
    <Box p={6}>

    <Flex justifyContent={"space-between"}>
        <Text fontSize="xl" fontWeight="medium">Bill List</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium"  _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Bills</Text>
          <LuChevronRight></LuChevronRight>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Bill List</Text>
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
              <Link to={"../add"}>
                <Text>Add Bill</Text>
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
              <Th>Bill</Th>
              <Th>Reference Number</Th>
              <Th>Vendor Name</Th>
              <Th>Status</Th>
              <Th>Due Date</Th>
              <Th>Amount</Th>
              <Th>Balance Due</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {billsData.map((bill, index) => (
              <Tr key={index}>
                <Td><Checkbox /></Td>
                <Td>{bill.date}</Td>
                <Td color="blue.500" fontWeight="bold" cursor="pointer">{bill.bill}</Td>
                <Td>{bill.refNumber}</Td>
                <Td>{bill.vendor}</Td>
                <Td color="blue.500" fontWeight="bold">{bill.status}</Td>
                <Td>{bill.dueDate}</Td>
                <Td>{bill.amount}</Td>
                <Td>{bill.balance}</Td>
                <Td>
                <HStack spacing={1}>
                  <Link to={'../edit/'+bill.refNumber}>
                      <Button size="sm" colorScheme="green">Edit</Button>
                  </Link>

                  <Link to={'../detail/'+bill.refNumber}>
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

export default BillsList;
