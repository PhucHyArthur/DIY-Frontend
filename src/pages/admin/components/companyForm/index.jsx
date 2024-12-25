import React, {useState,useEffect} from 'react';
import {
  Box, Input, Textarea, Switch, Button, Select, FormControl, FormLabel, Stack, HStack, Flex, RadioGroup, Radio, VStack,
} from '@chakra-ui/react';
import { LuImagePlus } from "react-icons/lu";
import { Link } from 'react-router-dom';
import VietnamLocationSelector from '../locationSelector';

const CompanyForm = ({ id, type, onSave, onBack, onChange, company,action }) => {
  const [companyData, setCompanyData] = useState({
    name: '',
    address: '',
    tel: '',
    email: '',
    tax_code: '',
  });

  useEffect(() => {
    if (company) {
      setCompanyData({
        name: company.name || '',
        address: company.address || '',
        tel: company.tel || '',
        email: company.email || '',
        tax_code: company.tax_code || '',
      });
    }
  }, [company]); // Lắng nghe sự thay đổi của `company`

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...companyData, [name]: value };
    setCompanyData(updatedData);
    onChange(updatedData); // Truyền dữ liệu lên component cha
  };
  return (
    <Box p={8} bg="white" borderRadius="md" shadow="md" borderWidth="1px" maxWidth="1200px" maxHeight="1200px" mx="auto" marginTop={10}>
      
      <Stack direction={["column", "row"]} spacing={8}>
        
        <Box flex="2">
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Company Name</FormLabel>
              <Input name='name' placeholder="Company Name" value={companyData.name} onChange={handleInputChange}  isReadOnly={action === 'detail'}/>
            </FormControl>

            <HStack spacing={8}>
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input name="tel" placeholder="Phone Number" value={companyData.tel} onChange={handleInputChange} isReadOnly={action === 'detail'}/>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Company Email</FormLabel>
                <Input name='email' placeholder="Company Email" type='email' value={companyData.email} onChange={handleInputChange} isReadOnly={action === 'detail'}/>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Company Tax Code</FormLabel>
                <Input name='tax_code' placeholder="Company Tax Code" value={companyData.tax_code} onChange={handleInputChange} isReadOnly={action === 'detail'}/>
              </FormControl>
            </HStack>

            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Company Location</FormLabel>
                <Input name='address' placeholder="Company Location" value={companyData.address} onChange={handleInputChange} isReadOnly={action === 'detail'}/>
              </FormControl>
              <VietnamLocationSelector />
            </Stack>
          </Stack>
        </Box>
      </Stack>

      <HStack mt={8} justify="flex-end">
        <Link to={"../list"}>
          <Button variant="outline" colorScheme="blue">Close</Button>
        </Link>
        <Button variant="outline" colorScheme="blue" onClick={onBack}>Back</Button>
        <Button colorScheme="orange" onClick={onSave}>Next</Button>
      </HStack>
    </Box>
  );
};

export default CompanyForm;
