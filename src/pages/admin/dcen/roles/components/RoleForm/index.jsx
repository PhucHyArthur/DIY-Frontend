import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Flex,
} from "@chakra-ui/react";
import RolePermissions from "../RolesPermissions";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

const RoleForm = ({
  initialRole = { name: "", description: "", scopes: {} },
  onSubmit,
  isLoading,
  isEdit = false,
}) => {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [permissionsState, setPermissionsState] = useState({});

  useEffect(() => {
    if (initialRole) {
      setRoleName((prev) => (prev === "" ? initialRole.name || "" : prev));
      setDescription((prev) =>
        prev === "" ? initialRole.description || "" : prev
      );
      setPermissionsState((prev) =>
        Object.keys(prev).length === 0 ? initialRole.scopes || {} : prev
      );
    }
  }, [initialRole]);

  const handleSubmit = () => {
    if (!roleName.trim() || !description.trim()) {
      alert("Role name and description are required.");
      return;
    }

    const updatedScopes = [];
    Object.values(permissionsState).forEach((groupPermissions) => {
      groupPermissions.forEach((perm) => {
        const baseName = perm.name.toLowerCase().replace(/\s+/g, "_");
        if (perm.view) updatedScopes.push(`${baseName}_read`);
        if (perm.create) updatedScopes.push(`${baseName}_create`);
        if (perm.edit) updatedScopes.push(`${baseName}_update`);
        if (perm.delete) updatedScopes.push(`${baseName}_delete`);
      });
    });

    onSubmit({ name: roleName, description, scopes: updatedScopes });
  };

  return (
    <Box marginLeft={"10%"} marginRight={"10%"} marginTop={"80px"}>
      <Stack spacing={4}>
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
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <RolePermissions
          initialPermissionsState={permissionsState}
          onPermissionsChange={(updatedPermissions) =>
            setPermissionsState(updatedPermissions)
          }
        />

        <Flex justifyContent="end" mt={6}>
          <Button
            colorScheme="red"
            onClick={() => window.history.back()}
            isDisabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            colorScheme="green"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            {isEdit ? "Save Changes" : "Save Role"}
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default RoleForm;
