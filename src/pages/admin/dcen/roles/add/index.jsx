import React from 'react'
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, HStack, Text, Flex } from '@chakra-ui/react';
import PermissionTable from '../components/permission';
import {LuChevronRight } from "react-icons/lu";
import { Link } from 'react-router-dom';

const RolesAdd = () => {
  const userPermissions = [
    { name: 'Users' }  
  ];

  const contactPermissions = [
    { name: 'Clients' },
    { name: 'Suppliers' }
  ];

  const itemPermissions = [
    { name: 'Materials' },
    { name: 'Products' }
  ];

  const warehousePermissions = [
    { name: 'Stocks' },
    { name: 'Blocks' },
  ];

  const orderPermissions = [
    { name: 'Purchases' },
    { name: 'Sales' },
    { name: 'Bills' }
  ];  

  return (
    <Box>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Add New Role</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium"  _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Roles</Text>
          <LuChevronRight/>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Add Role</Text>
        </HStack>
    </Flex>
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" borderTop={"none"} m={10} marginTop={5} >
      <Stack spacing={4} className="bg-white p-6 shadow-lg rounded-lg">
        <FormControl>
          <FormLabel>Role Name</FormLabel>
          <Input placeholder="Enter role name" />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input placeholder="Max 500 characters" />
        </FormControl>

        <PermissionTable title="Users Management" permissions={userPermissions} centerCheckboxes />
        <PermissionTable title="Contacts Management" permissions={contactPermissions} centerCheckboxes />
        <PermissionTable title="Items Management" permissions={itemPermissions} centerCheckboxes />
        <PermissionTable title="Warehouse Management" permissions={warehousePermissions} centerCheckboxes />
        <PermissionTable title="Orders Management" permissions={orderPermissions} centerCheckboxes />

        <Flex mt={6} justifyContent={"end"} gap={5}>
          <Link to={"../list/"}>
          <Button colorScheme="red">Cancel</Button>
          </Link>
          <Button colorScheme="green">Save Role</Button>
        </Flex>
      </Stack>
    </Box>
    </Box>
  );
}

export default RolesAdd