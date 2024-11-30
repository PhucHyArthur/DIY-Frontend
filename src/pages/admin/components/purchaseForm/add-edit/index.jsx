import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
  FormControl,
  FormLabel,
  Text,
  Radio,
  RadioGroup,
  Stack,
  SimpleGrid,
  GridItem,
  Textarea,
  Divider,
  Container,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const PurchaseForm = () => {
  const [deliverTo, setDeliverTo] = useState("Warehouse");
  
  const customerList = ["Hỷ", "Hiếu", "Đông", "Huyền", "Hoàng"];

  return (
    <Container maxW="container.xl" p={8}>
      <Box bg="white" p={8} borderRadius="md" shadow="md">

        <FormControl isRequired mb={6}>
          <FormLabel>Vendor Name</FormLabel>
          <Flex align="center">
            <Input placeholder="Select a vendor" flex="1" mr={2} />
          </Flex>
        </FormControl>

        {/* <FormControl as="fieldset" mb={6} isRequired>
          <FormLabel as="legend">Deliver To</FormLabel>
          <RadioGroup value={deliverTo} onChange={(value) => setDeliverTo(value)}>
            <Stack direction="row" spacing={6}>
              <Radio value="Warehouse">Warehouse</Radio>
              <Radio value="Customer">Customer</Radio>
            </Stack>
          </RadioGroup>

          {deliverTo === "Warehouse" ? (
            <>
              <Select mt={4} placeholder="AK Warehouse">
                <option>QQ Warehouse</option>
                <option>KK Warehouse</option>
              </Select>
              <Text fontSize="sm" mt={2}>
                388 Tran Hung Dao, PokerDream
              </Text>
              <Text color="blue.500" fontSize="sm" mt={1} cursor="pointer">
                Change destination to deliver
              </Text>
            </>
          ) : (
            <FormControl mt={4}>
              <FormLabel>Choose Customer</FormLabel>
              <Select placeholder="Select a customer">
                {customerList.map((customer, index) => (
                  <option key={index} value={customer}>
                    {customer}
                  </option>
                ))}
              </Select>
            </FormControl>
          )}
        </FormControl> */}

        <SimpleGrid columns={2} spacing={6} mb={6}>
          <GridItem colSpan={1}>
            <FormControl isRequired>
              <FormLabel>Purchase Order</FormLabel>
              <Input placeholder="PO-00007" />
            </FormControl>
          </GridItem>

          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input type="date" defaultValue="2020-02-17" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Expected Delivery Date</FormLabel>
              <Input placeholder="dd MMM yyyy" />
            </FormControl>
          </GridItem>
        </SimpleGrid>

        <FormControl mb={6}>
          <FormLabel>Payment Terms</FormLabel>
          <Select placeholder="Due on Receipt">
            <option>Due on Receipt</option>
            <option>Net 30</option>
            <option>Net 60</option>
          </Select>
        </FormControl>

        <FormControl mb={6}>
          <FormLabel>Shipment Preference</FormLabel>
          <Input placeholder="Choose the shipment preference or type to add" />
        </FormControl>

        <Divider mb={6} />
        <Text fontSize="sm" color="gray.500" mb={2}>
          Item Rates Are
        </Text>
        <Select mb={6} placeholder="Tax Exclusive">
          <option>Tax Exclusive</option>
          <option>Tax Inclusive</option>
        </Select>

        <SimpleGrid columns={7} spacing={4} mb={6}>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Item Details</FormLabel>
              <Input placeholder="Type or click to select an item" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Account</FormLabel>
              <Select placeholder="Select">
                <option>Account 1</option>
                <option>Account 2</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <Input type="number" defaultValue="1.00" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Rate</FormLabel>
              <Input type="number" defaultValue="0.00" />
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Tax</FormLabel>
              <Select placeholder="Select a Tax">
                <option>Tax 1</option>
                <option>Tax 2</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input type="number" defaultValue="0.00" isReadOnly />
            </FormControl>
          </GridItem>
        </SimpleGrid>

        <Button mt="4" colorScheme="blue" variant="outline">
          Add another line
        </Button>

        <Box mt={8}>
          <Divider mb={4} />
          <SimpleGrid columns={2} spacing={4} alignItems="center">
            <Text fontSize="md" fontWeight="bold">Sub Total</Text>
            <Text textAlign="right">$0</Text>

            <FormControl>
              <FormLabel>Discount</FormLabel>
              <Input type="number" placeholder="0.00" />
            </FormControl>
            <Text textAlign="right">$0.00</Text>

            <FormControl>
              <FormLabel>Adjustment</FormLabel>
              <Input type="number" placeholder="0.00" />
            </FormControl>
            <Text textAlign="right">$0.00</Text>

            <Text fontSize="lg" fontWeight="bold">Total ($)</Text>
            <Text fontSize="lg" fontWeight="bold" textAlign="right">$0</Text>
          </SimpleGrid>
        </Box>

        <Flex mt={6} justify="flex-end" gap={3}>
        <Link to="../list">
          <Button colorScheme="red" variant={"outline"}>Cancel</Button>
        </Link>
          <Button colorScheme="blue">
            Save
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};

export default PurchaseForm;
