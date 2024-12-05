import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  HStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import PermissionTable from "../components/permission";
import { LuChevronRight } from "react-icons/lu";
import { Link } from "react-router-dom";

import axios from "axios";
import { API, EMPLOYEE } from "../../../../../constant/API";
import { useContext, useEffect } from "react";
import { TokenContext } from "../../../../../context/TokenContext";

const RolesAdd = () => {
  const [token] = useContext(TokenContext);
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [permissionsState, setPermissionsState] = useState({});

  const createRole = async (roleData) => {
    try {
      const response = await axios.post(`${API}${EMPLOYEE.Role_Add}`, roleData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status >= 200 && response.status < 300) {
        console.log("Role created successfully:", response.data);
      } else {
        throw new Error("Failed to create role");
      }
    } catch (error) {
      console.error("Error creating role:", error.message);
    }
  };

  const handlePermissionsChange = (title, updatedPermissions) => {
    setPermissionsState((prevState) => ({
      ...prevState,
      [title]: updatedPermissions,
    }));
  };

  const handleSaveRole = () => {
    const scopes = [];
  
    // Flatten the permissions state into scopes
    Object.values(permissionsState).forEach((permissions) => {
      permissions.forEach((perm) => {
        const formattedName = perm.name.toLowerCase().replace(/\s+/g, "_"); // Replace spaces with underscores
        if (perm.view) scopes.push(`${formattedName}_read`);
        if (perm.create) scopes.push(`${formattedName}_create`);
        if (perm.edit) scopes.push(`${formattedName}_update`);
        if (perm.delete) scopes.push(`${formattedName}_delete`);
      });
    });
  
    const roleData = {
      name: roleName,
      description: description,
      scopes: scopes,
    };
  
    console.log("Role Data:", roleData);

    createRole(roleData);
  };

  const userPermissions = [{ name: "Users" }];
  const contactPermissions = [{ name: "Clients" }, { name: "Suppliers" }];
  const itemPermissions = [{ name: "Raw Materials" }, { name: "Finished Products" }];
  const warehousePermissions = [{ name: "Warehouse" }];
  const orderPermissions = [{ name: "Purchases Orders" }, { name: "Sales Orders" }];
  const importPermissions = [{ name: "Import" }, { name: "Export" }];

  return (
    <Box>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Add New Role</Text>

        <HStack>
          <Text
            fontSize="l"
            fontWeight="medium"
            _hover={{ color: "orange.500", cursor: "pointer", transition: "all, 0.5s" }}
          >
            Roles
          </Text>
          <LuChevronRight />
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>
            Add Role
          </Text>
        </HStack>
      </Flex>

      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        borderTop={"none"}
        m={10}
        marginTop={5}
      >
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

          <PermissionTable
            title="Users Management"
            permissions={userPermissions}
            centerCheckboxes
            onPermissionsChange={handlePermissionsChange}
          />
          <PermissionTable
            title="Contacts Management"
            permissions={contactPermissions}
            centerCheckboxes
            onPermissionsChange={handlePermissionsChange}
          />
          <PermissionTable
            title="Items Management"
            permissions={itemPermissions}
            centerCheckboxes
            onPermissionsChange={handlePermissionsChange}
          />
          <PermissionTable
            title="Warehouse Management"
            permissions={warehousePermissions}
            centerCheckboxes
            onPermissionsChange={handlePermissionsChange}
          />
          <PermissionTable
            title="Orders Management"
            permissions={orderPermissions}
            centerCheckboxes
            onPermissionsChange={handlePermissionsChange}
          />
          <PermissionTable
            title="Import/Export Management"
            permissions={importPermissions}
            centerCheckboxes
            onPermissionsChange={handlePermissionsChange}
          />

          <Flex mt={6} justifyContent={"end"} gap={5}>
            <Link to={"../list/"}>
              <Button colorScheme="red">Cancel</Button>
            </Link>
            <Button colorScheme="green" onClick={handleSaveRole}>
              Save Role
            </Button>
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
};

export default RolesAdd;
