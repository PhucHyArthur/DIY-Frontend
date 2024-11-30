import React from 'react';
import { Box, Text, VStack, HStack, Divider, Grid, GridItem, Table, Tbody, Tr, Td, Th, Thead, Tabs, TabList, Tab, Button } from '@chakra-ui/react';

const BillsDetailForm = () => {
  return (
    <Box p={8} maxW="1200px" mx="auto" bg="white" borderRadius="md" boxShadow="md">
      <Text fontSize="2xl" fontWeight="bold" mb={2}>Tên của Bill</Text>

      <HStack justifyContent="end" mb={4}>
        <HStack spacing={3}>
          <Button size="sm" variant="outline">Edit</Button>
          <Button size="sm" variant="outline">PDF</Button>
          <Button size="sm" variant="outline">Print</Button>
          <Button size="sm" variant="outline">Attach</Button>
          <Button size="sm" colorScheme="teal">Record Payment</Button>
          <Button size="sm" variant="outline">More</Button>
        </HStack>
      </HStack>

      <Box p={4} mb={6} border="1px solid" borderColor="gray.200" borderRadius="md">
        <Text fontSize="lg" fontWeight="bold" mb={1}>Record Payment</Text>
        <Text fontSize="sm" color="gray.600">
          This bill is in the open status. You can now record payment for this bill.
        </Text>
        <Button mt={4} colorScheme="teal" size="sm">Record Payment</Button>
      </Box>

      <HStack justifyContent="space-between" mb={8}>
        <VStack align="start" spacing={0}>
          <Text fontSize="lg" fontWeight="bold">Hoang</Text>
          <Text fontSize="sm">01 Le Van Duyet Street</Text>
          <Text fontSize="sm">Quan Son Tra</Text>
          <Text fontSize="sm">Da Nang</Text>
          <Text fontSize="sm">VietNam</Text>
        </VStack>

        <VStack align="end" spacing={0}>
          <Text fontSize="4xl" fontWeight="bold">BILL</Text>
          <Text fontSize="sm">Bill 01</Text>
          <Text fontSize="sm" mt={2}>Balance Due</Text>
          <Text fontSize="lg" fontWeight="bold">€0,00</Text>
        </VStack>
      </HStack>

      <Grid templateColumns="auto auto" gap={4} mb={6}>
        <GridItem>
          <Text fontSize="sm" fontWeight="bold">Order Number :</Text>
          <Text fontSize="sm">PO-00011</Text>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="bold">Bill Date :</Text>
          <Text fontSize="sm">18 Feb 2020</Text>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="bold">Due Date :</Text>
          <Text fontSize="sm">18 Feb 2020</Text>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" fontWeight="bold">Terms :</Text>
          <Text fontSize="sm">Due on Receipt</Text>
        </GridItem>
      </Grid>

      <Box mb={6}>
        <Text fontSize="sm" fontWeight="bold" mb={1}>Bill From</Text>
        <Text color="blue.500" fontSize="sm" fontWeight="bold">Hoang Poker</Text>
      </Box>

      <Table variant="simple" size="sm">
        <Thead bg="gray.100">
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
            <Td>AKs</Td>
            <Td>5,00 box</Td>
            <Td>0,1234</Td>
            <Td>0,00</Td>
          </Tr>
        </Tbody>
      </Table>

      <VStack spacing={2} mt={6} align="stretch">
        <HStack justifyContent="space-between" fontSize="sm">
          <Text>Sub Total</Text>
          <Text>0,00</Text>
        </HStack>
        <HStack justifyContent="space-between" fontSize="sm">
          <Text>Total</Text>
          <Text fontWeight="bold">€0,00</Text>
        </HStack>
        <HStack justifyContent="space-between" fontSize="lg" fontWeight="bold">
          <Text>Balance Due</Text>
          <Text>€0,00</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default BillsDetailForm;
