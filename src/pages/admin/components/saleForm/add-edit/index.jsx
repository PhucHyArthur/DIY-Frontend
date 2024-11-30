import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SalesForm = ({id, type, action},order) => {
  return (
    <Box maxW="1200px" w="100%" mx="auto" p="8" bg="white" boxShadow="md" borderRadius="md" mt={8}>
      <Stack spacing="4">
        <FormControl isRequired>
          <FormLabel>Customer Name {id}</FormLabel>
            <Input placeholder="Select or Add Customer" />
        </FormControl>

        <FormControl>
          <FormLabel>Sales Order#</FormLabel>
          <Input placeholder="SO-00015" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Sales Order Date</FormLabel>
          <Input type="date" />
        </FormControl>

        <FormControl>
          <FormLabel>Payment Terms</FormLabel>
          <Select placeholder="Due on Receipt">
            <option value="net30">Net 30</option>
            <option value="net60">Net 60</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Salesperson</FormLabel>
          <Select placeholder="Select or Add Salesperson">
          </Select>
        </FormControl>
      </Stack>

      <Box mt="8">
        <Heading as="h2" size="md" mb="4">
          Item Table
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Item Details</Th>
              <Th>Quantity</Th>
              <Th>Rate</Th>
              <Th>Tax</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Input placeholder="Type or click to select an item" />
              </Td>
              <Td>
                <Input defaultValue="1.00" />
              </Td>
              <Td>
                <Input defaultValue="0.00" />
              </Td>
              <Td>
                <Select placeholder="Select a Tax">
                </Select>
              </Td>
              <Td>
                <Text>0.00</Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Button mt="4" colorScheme="blue" variant="outline">
          Add another line
        </Button>
      </Box>

      <Flex mt="8" justify="space-between" align="start">
        <Box flex="1" mr="4">
          <FormControl>
            <FormLabel>Price List</FormLabel>
            <Select placeholder="None">
            </Select>
          </FormControl>
        </Box>
        <Box flex="1.5" p="4" bg="gray.50" borderRadius="md" boxShadow="sm">
          <Text fontWeight="bold">Sub Total</Text>
          <Text mb="4">0.00</Text>

          <FormControl mt="4">
            <FormLabel>Discount</FormLabel>
            <Flex align="center">
              <Input placeholder="0" maxW="60px" mr="2" />
              <Select placeholder="PHP">
                <option value="php">PHP</option>
                <option value="usd">USD</option>
              </Select>
            </Flex>
          </FormControl>
          <Text mt="2">0.00</Text>

          <Divider my="4" />
          <Text fontWeight="bold" fontSize="lg">
            Total
          </Text>
          <Text fontSize="lg">0.00</Text>
        </Box>
      </Flex>

      <Flex mt="8" justify="flex-end" gap="4">
    <Link to="../list">
      <Button colorScheme="red" variant="outline">
          Cancel
        </Button>
    </Link>
        <Button colorScheme="blue">
          Save
        </Button>
      </Flex>
    </Box>
  );
};

export default SalesForm;
