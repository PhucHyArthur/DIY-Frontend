import React from 'react';
import {
  Box, Input, Textarea, Switch, Button, Select, FormControl, FormLabel, Stack, HStack, Flex, RadioGroup, Radio, VStack,
} from '@chakra-ui/react';
import { LuImagePlus } from "react-icons/lu";
import { Link } from 'react-router-dom';
import VietnamLocationSelector from '../locationSelector';

const CompanyForm = ({ id, type }) => {
  return (
    <Box p={8} bg="white" borderRadius="md" shadow="md" borderWidth="1px" maxWidth="1200px" maxHeight="1200px" mx="auto" marginTop={10}>
      
      <Stack direction={["column", "row"]} spacing={8}>
        
        <Box flex="2">
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Company Name</FormLabel>
              <Input placeholder="Company Name" />
            </FormControl>        

            <HStack spacing={8}>
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="Phone Number" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Company Email</FormLabel>
                <Input placeholder="Company Email" type='email'/>
              </FormControl>
            </HStack>

            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Company Location</FormLabel>
                <Input placeholder="Company Location" />
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
        <Button colorScheme="orange">Save</Button>
      </HStack>
    </Box>
  );
};

export default CompanyForm;
