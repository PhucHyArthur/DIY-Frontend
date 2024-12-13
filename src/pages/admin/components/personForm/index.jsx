import React from 'react';
import {
  Box, Input, Textarea, Switch, Button, Select, FormControl, FormLabel, Stack, HStack, Flex, RadioGroup, Radio, VStack,
} from '@chakra-ui/react';
import { LuImagePlus } from "react-icons/lu";
import { Link } from 'react-router-dom';
import VietnamLocationSelector from '../locationSelector';

const PersonForm = ({ id, type, action ,onSave,onBack,onChange }) => {
  const handleInputChange = (field, value) => {
    onChange({ [field]: value });
  };
  return (
    <Box p={8} bg="white" borderRadius="md" shadow="md" borderWidth="1px" maxWidth="1200px" maxHeight="1200px" mx="auto" marginTop={10}>
      
      <Stack direction={["column", "row"]} spacing={8}>
        
        <Box flex="2">
          <Stack spacing={4}>
            <HStack spacing={8}>
            <FormControl isRequired> 
              <FormLabel>Full Name</FormLabel>
              <Input placeholder="Full Name" onChange={(e) => handleInputChange('fullName', e.target.value)}/>
            </FormControl>
            {type == "user" && (
                <FormControl isRequired>
                  <FormLabel>Role</FormLabel>
                  <HStack justify="flex-end" >
                  <Select placeholder="Roles">
                    <option value="r2">role 1</option>
                    <option value="r2">role 2</option>
                    <option value="r2">role 3</option>
                  </Select>
                </HStack>
                </FormControl>
              )}
            </HStack>


            <HStack spacing={8}>
              {/* Ẩn cả User Name và Password nếu type là "user" */}
              {(type === "user" && action === "add") || (type !== "user" && type !=="supplier") ? (
                <FormControl isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input placeholder="User Name"/>
                </FormControl>
              ) : null}
              
              {/* Ẩn Password nếu type là "user" hoặc "supplier" */}
              {(type === "user" && action === "add") || (type !== "user" && type !=="supplier") ? (
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input placeholder="Password" type='password'/>
                </FormControl>
              ) : null}
            </HStack>
          
            <HStack spacing={8}>
              <FormControl isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input type='date' />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Gender</FormLabel>
                <RadioGroup>
                  <HStack spacing={8}>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                    <Radio value="other">Other</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </HStack>

            <HStack spacing={8}>
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder="Phone Number" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Email" type='email'/>
              </FormControl>
            </HStack>

            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input placeholder="Location" />
              </FormControl>
              <VietnamLocationSelector />
            </Stack>
          </Stack>
              
        </Box>
      </Stack>

      <HStack mt={8} justify="flex-end">
        <Link to={"../list"}>
          <Button variant="outline" colorScheme="blue" >Close</Button>
        </Link>
        <Button variant="outline" colorScheme="blue" onClick={onBack} isDisabled={true}>Back</Button>
        <Button colorScheme="orange" onClick={onSave}>Next</Button>
      </HStack>
    </Box>
  );
};

export default PersonForm;
