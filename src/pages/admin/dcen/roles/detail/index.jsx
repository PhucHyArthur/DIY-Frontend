import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Text,
  Stack,
  Flex,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "../../../../../context/TokenContext";
import { API, EMPLOYEE } from "../../../../../constant/API";

const RolesDetail = () => {
  const { id } = useParams(); // Lấy ID vai trò từ URL
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [permissionsState, setPermissionsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token} = useContext(TokenContext);
  const toast = useToast();
  const navigate = useNavigate();

  // Fetch dữ liệu vai trò từ API
  useEffect(() => {
    const fetchRoleData = async () => {
      if (!id) {
        toast({
          title: "Error",
          description: "Invalid role ID.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("../list");
        return;
      }
  
      try {
        const response = await axios.get(`${API}${EMPLOYEE.Role_Detail}${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const { name, description, scopes } = response.data;
  
        setRoleName(name);
        setDescription(description);
  
        // Kiểm tra nếu scopes là một mảng
        if (!Array.isArray(scopes)) {
          throw new Error("Invalid data format: 'scopes' is not an array.");
        }
  
        const permissionsData = [
          { id: "user_management", permissions: [{ name: "Users" }] },
          { id: "contact_management", permissions: [{ name: "Clients" }, { name: "Suppliers" }] },
          { id: "item_management", permissions: [{ name: "Raw Materials" }, { name: "Finished Products" }] },
          { id: "warehouse_management", permissions: [{ name: "Warehouse" }] },
          { id: "order_management", permissions: [{ name: "Purchases Orders" }, { name: "Sales Orders" }] },
          { id: "import_export_management", permissions: [{ name: "Import" }, { name: "Export" }] },
        ];
  
        const updatedPermissionsState = [];
        permissionsData.forEach((group) => {
          group.permissions.forEach((perm) => {
            const baseName = perm.name.toLowerCase().replace(/\s+/g, "_");
  
            updatedPermissionsState.push({
              group: group.id,
              name: perm.name,
              view: scopes.includes(`${baseName}_read`),
              create: scopes.includes(`${baseName}_create`),
              edit: scopes.includes(`${baseName}_update`),
              delete: scopes.includes(`${baseName}_delete`),
            });
          });
        });
  
        setPermissionsState(updatedPermissionsState);
      } catch (error) {
        console.error("Failed to fetch role details:", error);
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to fetch role details.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("../list");
      } finally {
        setLoading(false);
      }
    };
  
    fetchRoleData();
  }, [id, token, navigate, toast]);
  
  if (loading) return <Box>Loading...</Box>;

  return (
    <Box>
      <Stack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          View Role
        </Text>

        <Box>
          <Text>
            <strong>Role Name:</strong> {roleName}
          </Text>
          <Text>
            <strong>Description:</strong> {description}
          </Text>
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Permissions
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Permission Group</Th>
                <Th>Permission</Th>
                <Th>View</Th>
                <Th>Create</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {permissionsState.map((perm, index) => (
                <Tr key={index}>
                  <Td>{perm.group}</Td>
                  <Td>{perm.name}</Td>
                  <Td>{perm.view ? "✔️" : "❌"}</Td>
                  <Td>{perm.create ? "✔️" : "❌"}</Td>
                  <Td>{perm.edit ? "✔️" : "❌"}</Td>
                  <Td>{perm.delete ? "✔️" : "❌"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Flex justifyContent="end">
          <Button colorScheme="blue" onClick={() => navigate("../list")}>
            Back to List
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default RolesDetail;
