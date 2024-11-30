import React from 'react';
import {
  Box, Input, Textarea, Switch, Button, Select, FormControl, FormLabel, Stack, HStack,
  Flex,
  RadioGroup,
  Radio,
  VStack,
} from '@chakra-ui/react';
import { LuImagePlus } from "react-icons/lu";
import { Link } from 'react-router-dom';
import VietnamLocationSelector from '../locationSelector';


const ChangePasswordForm = ({ id, type }) => {
  return (
    <Box p={8} bg="white" borderRadius="md" shadow="md" borderWidth="1px" maxWidth="1200px" maxHeight="1200px" mx="auto" marginTop={10}>
      
      <Stack spacing={4}>
        
      <FormControl isRequired>
              <FormLabel>Current Password</FormLabel>
              <Input placeholder="Current Password" type='password'/>
      </FormControl>

      <FormControl isRequired>
              <FormLabel>New Password</FormLabel>
              <Input placeholder="New Password" type='password'/>
      </FormControl>
      
      <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input placeholder="Enter New Password" type='password'/>
      </FormControl>

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

export default ChangePasswordForm;
