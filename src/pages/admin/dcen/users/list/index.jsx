import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Badge,
  HStack,
  MenuList,
  Menu,
  MenuItem,
  MenuButton,
  Input,
  useToast,
  Switch,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { LuChevronRight, LuMoveDown } from "react-icons/lu";
import { API, EMPLOYEE } from "../../../../../constant/API";
import { TokenContext } from "../../../../../context/TokenContext";
import axios from "axios";

const UsersList = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [token] = useContext(TokenContext);
  const toast = useToast();
  const navigate = useNavigate();

  const fetchRoleList = async () => {
    try {
      const response = await axios.get(`${API}${EMPLOYEE.Employee_List}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setList(response.data);
      } else {
        throw new Error("Failed to fetch Employees");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Unable to fetch Employees.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchRoleList();
  }, []);

  const filteredList = list.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const response = await axios.patch(
        `${API}${EMPLOYEE.Employee_Edit}${id}/`,
        { is_active: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "User status updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setList((prevList) =>
          prevList.map((user) =>
            user.id === id ? { ...user, is_active: !currentStatus } : user
          )
        );
      } else {
        throw new Error("Failed to update user status.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Unable to update user status.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleNavigateToDetail = (id) => {
    navigate(`/admin/settings/users/detail/${id}`);
  };

  const handleNavigateToEdit = (id) => {
    navigate(`/admin/settings/users/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API}${EMPLOYEE.Employee_Delete}${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        toast({
          title: "Success",
          description: "User deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setList((prevList) => prevList.filter((user) => user.id !== id));
      } else {
        throw new Error("Failed to delete user.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Unable to delete user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6}>
      <Flex justifyContent={"space-between"}>
        <Text fontSize="xl" fontWeight="medium">
          User List
        </Text>

        <HStack>
          <Text
            fontSize="l"
            fontWeight="medium"
            _hover={{
              color: "orange.500",
              cursor: "pointer",
              transition: "all, 0.5s",
            }}
          >
            Users
          </Text>
          <LuChevronRight />
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>
            User List
          </Text>
        </HStack>
      </Flex>
      <Flex justify="space-between" m={10} align="center">
        <Input
          placeholder="Search"
          w="sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Flex align="center" gap={2}>
          <Menu>
            <MenuButton as={Button} rightIcon={<LuMoveDown />}>
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem>Sample Action 1</MenuItem>
              <MenuItem>Sample Action 2</MenuItem>
            </MenuList>
          </Menu>
          <Button>
            <Link to={"../add"}>
              <Text>Add User</Text>
            </Link>
          </Button>
        </Flex>
      </Flex>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        borderTop={"none"}
        m={10}
      >
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              <Th>User Details</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredList.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold">{user.username}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {user.email || "No Email"}
                    </Text>
                  </VStack>
                </Td>
                <Td>{user.role}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Badge
                      colorScheme={user.is_active ? "green" : "red"}
                      fontSize="0.8em"
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <Switch
                      isChecked={user.is_active}
                      onChange={() => handleToggleActive(user.id, user.is_active)}
                      size="md"
                    />
                  </HStack>
                </Td>
                <Td>
                  <HStack spacing={3}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => handleNavigateToDetail(user.id)}
                    >
                      Detail
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="yellow"
                      onClick={() => handleNavigateToEdit(user.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default UsersList;
