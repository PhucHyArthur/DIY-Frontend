import React from 'react';
import { Box, Input, FormControl, FormLabel, Button, Select, Grid, GridItem, Text, VStack, HStack, Divider, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const BillsAddForm = () => {
  return (
    <Box p={8} borderRadius="md" boxShadow="md" maxW="1200px" mx="auto" bg="white">
      <VStack spacing={6} align="stretch">
        <HStack spacing={6}>
          <FormControl>
            <FormLabel>Vendor Name</FormLabel>
            <Input placeholder="Enter Name" />
          </FormControl>
          <FormControl>
            <FormLabel>Bill </FormLabel>
            <Input placeholder="Enter Bill Number" />
          </FormControl>
        </HStack>

        <HStack spacing={6}>
          <FormControl>
            <FormLabel>Bill Date</FormLabel>
            <Input type="date" defaultValue="2020-02-18" />
          </FormControl>
          <FormControl>
            <FormLabel>Due Date</FormLabel>
            <Input type="date" defaultValue="2020-02-18" />
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>Payment Terms</FormLabel>
          <Select placeholder="Due on Receipt">
            <option value="due-on-receipt">Due on Receipt</option>
            <option value="net-15">Net 15</option>
            <option value="net-30">Net 30</option>
          </Select>
        </FormControl>

        <Box mt={10}>
          <Text fontSize="lg" fontWeight="bold" mb={3}>Purchase Details</Text>
          <Grid templateColumns="1.5fr 1fr 1fr 1fr 1fr 1fr" gap={4} alignItems="center">
            <GridItem>
              <FormControl>
                <FormLabel>Purchase Order</FormLabel>
                <Input placeholder="Purchase Order" />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel>Account</FormLabel>
                <Input placeholder="Inventory Asset" />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input placeholder="5" />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel>Rate</FormLabel>
                <Input placeholder="Rate number" />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel>Tax</FormLabel>
                <Select placeholder="Select a Tax">
                  <option value="vat">VAT</option>
                  <option value="gst">GST</option>
                </Select>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input placeholder="0.00" isReadOnly />
              </FormControl>
            </GridItem>
          </Grid>
          
          <HStack spacing={6} mt={4}>
            <Link color="blue.500" fontWeight="bold" cursor="pointer">+ Add another line</Link>
            <Link color="blue.500" fontWeight="bold" cursor="pointer">+ Add items in bulk</Link>
          </HStack>
        </Box>

        <Divider mt={8} />

        <VStack spacing={4} align="stretch" mt={6}>
          <HStack justifyContent="space-between">
            <Text>Sub Total</Text>
            <Text>0.00</Text>
          </HStack>
          
          <HStack justifyContent="space-between">
            <FormControl maxW="150px">
              <FormLabel>Discount</FormLabel>
              <HStack>
                <Input placeholder="0" />
                <Select maxW="50px">
                  <option value="currency">€</option>
                  <option value="percentage">%</option>
                </Select>
              </HStack>
            </FormControl>
            <Text>0.00</Text>
          </HStack>

          <HStack justifyContent="space-between">
            <FormControl maxW="150px">
              <FormLabel>Adjustment</FormLabel>
              <Input placeholder="0" />
            </FormControl>
            <Text>0.00</Text>
          </HStack>

          <Divider />

          <HStack justifyContent="end" fontWeight="bold">
            <Text>Total (€)</Text>
            <Text>0.00</Text>
          </HStack>
        </VStack>
      </VStack>

      <Flex mt={8} textAlign="right" justifyContent={"end"}>
        <HStack spacing={4}>
          <Button colorScheme="gray">Save as Draft</Button>
          <Button colorScheme="blue">Save as Open</Button>
          <Link to={"../list/"}>
            <Button colorScheme="red">Cancel</Button>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default BillsAddForm;
