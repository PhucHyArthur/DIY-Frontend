import React, { useState } from 'react';
import {
  Box,
  Text,
  Heading,
  Flex,
  Button,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const PurchaseDetailForm = ({id}) => {
  const [activeTab, setActiveTab] = useState("WHAT'S NEXT");

  return (
    <Flex borderWidth="1px" borderRadius="lg" overflow="hidden" borderTop={"none"} w={"90%"} p={8} m={"auto"} flexDirection={"column"} mt={10}>
      <Flex className="header" justify="space-between" align="center" mb={4}>
        <Heading size="md">PO-00007</Heading>
        <Flex className="header-buttons" gap={2}>
        <Link to={`../edit/${id}`}>
          <Button size="sm" variant="outline" colorScheme="gray">Edit</Button>
        </Link>
          <Button size="sm" variant="outline" colorScheme="gray">PDF</Button>
          <Button size="sm" variant="outline" colorScheme="gray">Print</Button>
          <Button size="sm" variant="outline" colorScheme="gray">Email</Button>
          <Button size="sm" variant="outline" colorScheme="gray">Attach</Button>
          <Button size="sm" colorScheme="blue" variant="outline">Receive All</Button>
          <Button size="sm" colorScheme="blue" variant="outline">More</Button>
        </Flex>
      </Flex>
      <Divider></Divider>

      {/* <Flex className="action-bar">
        <VStack align="start">
          <Heading size="sm" fontWeight="bold">Send the Purchase Order</Heading>
          <Text fontSize="sm">
            Purchase order has been created. You can email the Purchase Order to your vendor
            or mark it as Issued.
          </Text>
        </VStack>
        <Flex className="action-buttons">
          <Button className="action-button" colorScheme="blue" variant="outline">Mark as Issued</Button>
          <Button className="action-button send-button">Send Purchase Order</Button>
        </Flex>
      </Flex> */}

      <Box className="purchase-content" mt={3}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md">PURCHASE ORDER</Heading>
          <Text> PO-00007</Text>
        </Flex>
        
        <Text fontSize="sm" color="gray.500" mb={1}>Hoang Poker</Text>
        <Text fontSize="sm" color="gray.500">388 Tran Hung Dao</Text>
        <Text fontSize="sm" color="gray.500">Da Nang</Text>
        <Text fontSize="sm" color="gray.500">Son Tra district</Text>
        <Text fontSize="sm" color="gray.500">Viet Nam</Text>

        <Box mt={6} mb={4}>
          <Text fontWeight="bold">Vendor Address</Text>
          <Text color="blue.500">Ong trum</Text>
        </Box>

        <Box mb={4}>
          <Text fontWeight="bold">Deliver To</Text>
          <Text>Althea Fletcher</Text>
        </Box>

        <Flex justify="space-between" mb={4}>
          <Box>
            <Text fontWeight="bold">Date:</Text>
            <Text>17 Feb 2020</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Delivery Date:</Text>
            <Text>18 Feb 2020</Text>
          </Box>
        </Flex>

        <Table variant="simple" size="sm" mb={4}>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Item & Description</Th>
              <Th>Qty</Th>
              <Th>Rate</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Badbeat</Td>
              <Td>1.00 pcs</Td>
              <Td>$0</Td>
              <Td>$0</Td>
            </Tr>
          </Tbody>
        </Table>

        <Flex justify="flex-end" mb={4}>
          <Box textAlign="right" width="200px">
            <Flex justify="space-between">
              <Text>Sub Total</Text>
              <Text>$0</Text>
            </Flex>
            <Flex justify="space-between" fontWeight="bold" mt={2}>
              <Text>Total</Text>
              <Text>$0</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PurchaseDetailForm;
