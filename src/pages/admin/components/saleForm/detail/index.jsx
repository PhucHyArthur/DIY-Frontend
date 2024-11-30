import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
  VStack,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const SalesDetailForm = ({id}) => {
  console.log(id)
  
  return (
    <VStack spacing={4}>
      <Flex justifyContent="space-between" width="100%" p={4}>
        <Heading size="lg">Sales Order {id}</Heading>
        <ButtonGroup spacing={2}>
          <Link to={`../edit/${id}`}>
            <Button size="sm" colorScheme="gray" variant="outline">Edit</Button>
          </Link>
          <Button size="sm" colorScheme="gray" variant="outline">PDF</Button>
          <Button size="sm" colorScheme="gray" variant="outline">Print</Button>
          <Button size="sm" colorScheme="gray" variant="outline">Email</Button>
          <Button size="sm" colorScheme="gray" variant="outline">Attach</Button>
          <Button size="sm" colorScheme="blue">Mark as Confirmed</Button>
          <Button size="sm" colorScheme="blackAlpha">Create</Button>
          <Menu>
            <MenuButton as={Button} size="sm" colorScheme="gray" variant="outline">More</MenuButton>
            <MenuList>
              <MenuItem>Option 1</MenuItem>
              <MenuItem>Option 2</MenuItem>
            </MenuList>
          </Menu>
        </ButtonGroup>
      </Flex>

      <Flex width="60%" alignItems={"center"} justifyContent={"center"} p={4} gap={4} bg={"gray.100"} borderRadius={10}>
        <Box>
          <Text fontWeight="bold">Send the Sales Order</Text>
          <Text>
            Sales order has been created. You can email the Sales Order to your customer or
            mark it as Confirmed.
          </Text>
        </Box>
        <ButtonGroup spacing={2}>
          <Button size="sm" colorScheme="blue">Mark as Confirmed</Button>
          <Button size="sm" colorScheme="green">Send Sales Order</Button>
        </ButtonGroup>
      </Flex>

      <Box w="full" pl={8}>
        <Heading size="md" mb={2}>Sales Order</Heading>
        <Text>Sales Order <strong>{id}</strong></Text>
        <Button size="sm" mt={2} disabled>DRAFT</Button>
      </Box>

      <VStack align="start" spacing={1} w={"100%"} pl={8}>
        <Text>Order Date: <span>17 Feb 2020</span></Text>
        <Text>Payment Terms: <span>Due on Receipt</span></Text>
        <Text>Sales Person: <span>Hoangpoker</span></Text>
      </VStack>


      <Divider width={"98%"}/>

      <Table variant="simple" width={"98%"}>
        <Tbody>
          <Tr>
            <Th>Items & Description</Th>
            <Th>Ordered</Th>
            <Th>Warehouse Name</Th>
            <Th>Status</Th>
            <Th>Rate</Th>
            <Th>Amount</Th>
          </Tr>
          <Tr>
            <Td><Text color="blue.500">AKs</Text></Td>
            <Td>10</Td>
            <Td>Straight Flush</Td>
            <Td>Packed</Td>
            <Td>1</Td>
            <Td>10.00</Td>
          </Tr>
        </Tbody>
      </Table>

      <VStack w={"full"} pl={8} fontWeight={"bold"} fontSize={"xl"} spacing={4} align={"flex-start"}>
        <Text><span>Sub Total:</span><span className="amount">£10.00</span></Text>
        <Text><span>Discount:</span><span className="amount">£0.00</span></Text>
        <Text><span>GST (7%):</span><span className="amount">£0.70</span></Text>
        <Text><span>Total:</span><span className="amount">£10.70</span></Text>
      </VStack>
    </VStack>
  );
};

export default SalesDetailForm;
