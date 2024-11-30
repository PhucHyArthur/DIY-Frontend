import React from 'react';
import { ChakraProvider, Box, Heading, FormControl, FormLabel, Input, Button, VStack } from '@chakra-ui/react';

function BankDetailForm() {
  return (
    <ChakraProvider>
      <Box maxW="500px" mx="auto" mt="10" p="8" borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <VStack spacing="4">
          <FormControl id="account-holder-name" isRequired>
            <FormLabel>Account Holder Name</FormLabel>
            <Input placeholder="Enter your full name" />
          </FormControl>

          <FormControl id="account-number" isRequired>
            <FormLabel>Account Number</FormLabel>
            <Input type="number" placeholder="Enter your account number" />
          </FormControl>

          <FormControl id="bank-name" isRequired>
            <FormLabel>Bank Name</FormLabel>
            <Input placeholder="Enter your bank name" />
          </FormControl>

          <FormControl id="branch-name" isRequired>
            <FormLabel>Branch Name</FormLabel>
            <Input placeholder="Enter your branch name" />
          </FormControl>

          <FormControl id="ifsc-code" isRequired>
            <FormLabel>Swift Code</FormLabel>
            <Input placeholder="Enter Swift code" />
          </FormControl>

          <Button colorScheme="orange" width="full" type="submit">
            Save
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default BankDetailForm;
