import React from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuChevronRight, LuMoveDown } from "react-icons/lu";

const UsersList = () => {
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
          <LuChevronRight/>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>
            User List
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
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold">Hieu</Text>
                  <Badge colorScheme="green" fontSize="0.8em">
                    Active
                  </Badge>
                  <Text fontSize="sm" color="gray.500">
                    hieu@gmail.com
                  </Text>
                </VStack>
              </Td>
              <Td>Admin</Td>
            </Tr>
            <Tr>
              <Td>
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold">Hoang</Text>
                  <Badge colorScheme="green" fontSize="0.8em">
                    Active
                  </Badge>
                  <Text fontSize="sm" color="gray.500">
                    hoang@gmail.com
                  </Text>
                </VStack>
              </Td>
              <Td>Admin</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default UsersList;
