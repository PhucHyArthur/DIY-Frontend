import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Tabs,
  TabList,
  Tab,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  MenuList,
  Menu,
  MenuItem,
  MenuButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { LuChevronRight, LuMoveDown } from "react-icons/lu";
import { Link } from "react-router-dom";

import axios from "axios";
import { API, EMPLOYEE } from "../../../../../constant/API";
import { useContext, useEffect } from "react";
import { TokenContext } from "../../../../../context/TokenContext";

const RolesList = () => {
  const [list, SetList] = useState(null);
  const [token] = useContext(TokenContext);

  const fetchRoleList = async () => {
    try {
      const response = await axios.get(`${API}${EMPLOYEE.Role_List}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        SetList(data);
      } else {
        throw new Error("Failed to fetch roles");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // You can use useEffect to fetch data on component mount
  useEffect(() => {
    fetchRoleList();
  }, []); // Empty dependency array to only run once when the component mounts
  console.log(list)
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
              <Th>Role Name</Th>
              <Th>Description</Th>
              <Th>Scopes</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {list &&
              list.map((role) => (
                <Tr key={role.id}>
                  <Td>{role.name}</Td>
                  <Td>{role.description}</Td>
                  <Td>
                    <Flex gap={2}>
                    <Link to={`../edit/${role.id}`}>
                      <Button size="sm" colorScheme="blue" variant="outline">
                        Edit
                      </Button>
                    </Link>

                    <Link to={"../add"}>
                      <Button size="sm" colorScheme="blue" variant="outline">
                        Clone
                      </Button>
                      </Link>

                    </Flex>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default RolesList;
