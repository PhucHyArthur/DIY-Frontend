import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Button,Input, ButtonGroup,Flex,HStack,Menu,MenuItem,MenuList,MenuButton } from '@chakra-ui/react';
import { LuChevronRight,LuMoveDown } from 'react-icons/lu';
import { Link } from 'react-router-dom';
const clients = [
  { id: 1, name: 'Hiếu', email: 'hieu@gmail.com', phone: '123456789', recentPurchase: 'Sản phẩm A' },
  { id: 2, name: 'Đông', email: 'dong@gmail.com', phone: '987654-21', recentPurchase: 'Sản phẩm B' },
  { id: 3, name: 'Hoàng', email: 'hoang@gmail.com', phone: '456789123', recentPurchase: 'Sản phẩm C' },

];

const ClientsList = () => {
  return (
    <Box p={6}>
<Flex justifyContent={"space-between"}>
      <Text fontSize="xl" fontWeight="medium">Client List</Text>

      <HStack>
      <Text fontSize="l" fontWeight="medium"   _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Clients</Text>
      <LuChevronRight/>
      <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Client List</Text>
      </HStack>
      </Flex>
      <Flex justify="space-between" m={10} align="center">
        <Input placeholder="Search" w="sm"/>
            <Flex align="center" gap={2}>
              <Menu>
                <MenuButton as={Button} rightIcon={<LuMoveDown/>}>
                  Actions
                </MenuButton>
                <MenuList>
                  <MenuItem>Sample Action 1</MenuItem>
                  <MenuItem>Sample Action 2</MenuItem>
                </MenuList>
              </Menu>
              <Button>
                <Link to={'../add'}>
                  <Text>Add Client</Text>
                </Link>
              </Button>
            </Flex>
      </Flex>
      <TableContainer m={10} borderWidth="1px" borderRadius="lg" overflow="hidden" borderTop={"none"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Recent Purchase</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clients.map((client) => (
              <Tr key={client.id}>
                <Td>{client.name}</Td>
                <Td>{client.email}</Td>
                <Td>{client.phone}</Td>
                <Td>{client.recentPurchase}</Td>
                <Td>
                  <ButtonGroup spacing={2}>

                    <Link to={`../edit/${client.id}`}>
                    <Button colorScheme="blue" size={"sm"}>
                      Edit
                    </Button>
                    </Link>

                    <Link to={`../detail/${client.id}`}>
                    <Button colorScheme="green" size={"sm"}>
                      View
                    </Button>
                    </Link>

                    <Button colorScheme="red" size={"sm"}>
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
