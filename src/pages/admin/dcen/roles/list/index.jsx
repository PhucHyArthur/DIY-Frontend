import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { LuChevronRight, LuMoveDown } from "react-icons/lu";
import { Link } from "react-router-dom";
import axios from "axios";
import { API, EMPLOYEE } from "../../../../../constant/API";
import { TokenContext } from "../../../../../context/TokenContext";

const RolesList = () => {
  const [list, setList] = useState([]);
  const [token] = useContext(TokenContext);
  const toast = useToast();

  const fetchRoleList = async () => {
    try {
      const response = await axios.get(`${API}${EMPLOYEE.Role_List}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setList(response.data);
      } else {
        throw new Error("Failed to fetch roles");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Unable to fetch roles.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchRoleList();
  }, []);

  return (
    <Box p={6}>
      <Flex justifyContent={"space-between"}>
        <Text fontSize="xl" fontWeight="medium">
          Role List
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
            Roles
          </Text>
          <LuChevronRight />
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>
            Role List
          </Text>
        </HStack>
      </Flex>

      <Flex justify="space-between" m={10} align="center">
        <Input placeholder="Search" w="sm" />
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
              <Text>Add Role</Text>
            </Link>
          </Button>
        </Flex>
      </Flex>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m={10}>
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              <Th>Role Name</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.length > 0 ? (
              list.map((role) => (
                <Tr key={role.id}>
                  <Td>{role.name}</Td>
                  <Td>{role.description}</Td>
                  <Td>
                    <Flex gap={2}>
                      <Link to={`../detail/${role.id}`}>
                        <Button size="sm" colorScheme="blue" variant="outline">
                          View
                        </Button>
                      </Link>
                      <Link to={`../edit/${role.id}`}>
                        <Button size="sm" colorScheme="blue" variant="outline">
                          Edit
                        </Button>
                      </Link>
                      <Link
                        to={{
                          pathname: "../add",
                          state: { cloneData: role },
                        }}
                      >
                        <Button size="sm" colorScheme="blue" variant="outline">
                          Clone
                        </Button>
                      </Link>
                    </Flex>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="3" textAlign="center">
                  No roles found.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default RolesList;
