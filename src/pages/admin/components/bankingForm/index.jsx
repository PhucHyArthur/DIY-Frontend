import React, {useEffect, useState} from 'react';
import { ChakraProvider, Box, Heading, FormControl, FormLabel, Input, Button, VStack } from '@chakra-ui/react';

function BankDetailForm({onSave, onBack, type, onChange,bank}) {
  const [bankData, setBankData] = useState({
    bank_name: '',
    bank_branch: '',
    bank_number: '',
    swift_code: '',
  });

  useEffect(()=>{
    if (bank) {
      setBankData({
        bank_name: bank.bank_name ||'',
        bank_branch: bank.bank_branch ||'',
        bank_number: bank.bank_number ||'',
        swift_code: bank.swift_code ||'',
      });
    }
  },[bank])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...bankData, [name]: value };
    setBankData(updatedData);
    onChange(updatedData); // Truyền dữ liệu lên component cha
  };
  return (
    <ChakraProvider>
      <Box
        maxW="500px"
        mx="auto"
        mt="10"
        p="8"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <VStack spacing="4">
          <FormControl id="account-holder-name" isRequired>
            <FormLabel>Account Holder Name</FormLabel>
            <Input placeholder="Enter your full name"  />
          </FormControl>

          <FormControl id="account-number" isRequired>
            <FormLabel>Account Number</FormLabel>
            <Input type="number" placeholder="Enter your account number" name="bank_number" value={bankData.bank_number} onChange={handleInputChange} />
          </FormControl>

          <FormControl id="bank-name" isRequired>
            <FormLabel>Bank Name</FormLabel>
            <Input placeholder="Enter your bank name" name="bank_name" value={bankData.bank_name} onChange={handleInputChange}/>
          </FormControl>

          <FormControl id="branch-name" isRequired>
            <FormLabel>Branch Name</FormLabel>
            <Input placeholder="Enter your branch name" name="bank_branch" value={bankData.bank_branch} onChange={handleInputChange}  />
          </FormControl>

          <FormControl id="ifsc-code" isRequired>
            <FormLabel>Swift Code</FormLabel>
            <Input placeholder="Enter Swift code" name="swift_code" value={bankData.swift_code} onChange={handleInputChange}/>
          </FormControl>
          <Button
            colorScheme="orange"
            width="full"
            type="submit"
            onClick={onSave}
          >
            Next
          </Button>
          <Button
            variant="outline"
            colorScheme="blue"
            width="full"
            onClick={onBack}
          >
            Back
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default BankDetailForm;
