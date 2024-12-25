import React, { useContext, useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Button,Input, ButtonGroup,Flex,HStack,Menu,MenuItem,MenuList,MenuButton,useToast, } from '@chakra-ui/react';
import { LuChevronRight,LuMoveDown } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { API, EMPLOYEE } from "../../../../../constant/API";
import axios from "axios";
import { DataContext } from "../../../../../context/Context";


// const clients = [
//   { id: 1, name: 'Hiếu', email: 'hieu@gmail.com', phone: '123456789', recentPurchase: 'Sản phẩm A' },
//   { id: 2, name: 'Đông', email: 'dong@gmail.com', phone: '987654-21', recentPurchase: 'Sản phẩm B' },
//   { id: 3, name: 'Hoàng', email: 'hoang@gmail.com', phone: '456789123', recentPurchase: 'Sản phẩm C' },

// ];

const ClientsList = () => {
  const { employees, setEmployees  } = useContext(DataContext);
  const [token] = useState(localStorage.getItem("authToken"));
  const [endUserList, setEndUserList] = useState([]);
  const toast = useToast();

  const filterEndUser = () => {
    const filterList = employees.filter(
      (item, index) => item.role === "EndUser"
    );
    setEndUserList(filterList);
  };
  // Hàm xóa người dùng
  const handleDelete = async (id) => {
    const endpoint = `${API}${EMPLOYEE.Employee_Delete}`.replace("<int:pk>", id);
    console.log("API Endpoint:", endpoint);

    try {
      const endpoint = `${API}${EMPLOYEE.Employee_Delete}`.replace(
        "<int:pk>",
        id
      );
      await axios.delete(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "Deleted",
        description: "Client has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Cập nhật danh sách sau khi xóa
      const updatedEmployees = employees.filter(
        (employee) => employee.id !== id
      );
      setEmployees(updatedEmployees);
      filterEndUser(); // Cập nhật danh sách endUserList
    } catch (error) {
      console.error("Error deleting client:", error);
      toast({
        title: "Delete Failed",
        description: error.message || "An error occurred while deleting.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    filterEndUser();
  }, [employees]);

  return (
    <Box p={6}>
      <Flex justifyContent={"space-between"}>
        <Text fontSize="xl" fontWeight="medium">
          Client List
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
            Clients
          </Text>
          <LuChevronRight />
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>
            Client List
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
              <Text>Add Client</Text>
            </Link>
          </Button>
        </Flex>
      </Flex>
      <TableContainer
        m={10}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        borderTop={"none"}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {endUserList.map((client) => (
              <Tr key={client.id}>
                <Td>{client.username}</Td>
                <Td>{client.email}</Td>
                <Td>{client.phone}</Td>
                <Td>
                  <ButtonGroup spacing={2}>
                    <Link to={`../detail/${client.id}`}>
                      <Button colorScheme="green" size={"sm"}>
                        View
                      </Button>
                    </Link>

                    <Button onClick={() => handleDelete(client.id)} colorScheme="red" size={"sm"}>
                      Delete
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClientsList;
