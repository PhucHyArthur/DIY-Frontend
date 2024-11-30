import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
import PermissionTable from '../components/permission';

const RolesEdit = ({ roleData }) => {
  const [roleName, setRoleName] = useState(roleData.name || '');
  const [description, setDescription] = useState(roleData.description || '');

  const contactPermissions = roleData.contactPermissions || [
    { name: 'Clients' },
    { name: 'Vendors' }
  ];

  const itemPermissions = roleData.itemPermissions || [
    { name: 'Item' },
    { name: 'Composite Items' }
  ];

  const handleSave = () => {
    // Implement save logic here, such as API call
    console.log('Role saved:', { roleName, description, contactPermissions, itemPermissions });
  };

  return (
    <Box className="p-8 bg-gray-50">
      <Heading size="lg" mb={6}>Edit Role</Heading>

      <Stack spacing={4} className="bg-white p-6 shadow-lg rounded-lg">
        <FormControl>
          <FormLabel>Role Name</FormLabel>
          <Input 
            placeholder="Enter role name" 
            value={roleName} 
            onChange={(e) => setRoleName(e.target.value)} 
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input 
            placeholder="Max 500 characters" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </FormControl>

        <PermissionTable title="Contacts" permissions={contactPermissions} centerCheckboxes />
        <PermissionTable title="Items" permissions={itemPermissions} centerCheckboxes />

        <Box mt={6} textAlign="right">
          <Button colorScheme="red" onClick={handleSave}>Save Changes</Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default RolesEdit;
