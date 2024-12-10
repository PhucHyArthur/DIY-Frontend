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

const RoleForm = ({
  initialRole = { name: "", description: "", scopes: {} },
  onSubmit,
  isLoading,
  isEdit = false, // True nếu là RolesEdit, False nếu là RolesAdd
}) => {
  const [roleName, setRoleName] = useState(initialRole.name);
  const [description, setDescription] = useState(initialRole.description);
  const [permissionsState, setPermissionsState] = useState(initialRole.scopes);

  useEffect(() => {
    setRoleName(initialRole.name);
    setDescription(initialRole.description);
    setPermissionsState(initialRole.scopes);
  }, [initialRole]);

  const handleSubmit = () => {
    if (!roleName.trim() || !description.trim()) {
      alert("Role name and description are required.");
      return;
    }

    // Chuyển đổi permissionsState thành danh sách scopes
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

    // Gọi hàm onSubmit với dữ liệu đã chuẩn bị
    onSubmit({ name: roleName, description, scopes: updatedScopes });
  };

  return (
    <Box>
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
