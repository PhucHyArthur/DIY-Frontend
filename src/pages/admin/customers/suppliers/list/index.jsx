import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Button,Input, ButtonGroup,Flex,HStack,Menu,MenuItem,MenuList,MenuButton } from '@chakra-ui/react';
import { LuChevronRight,LuMoveDown } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const suppliers = [
  { id: 1, name: 'Người bán A', company: 'Company A', category: 'Material', itemSupply: 100},
  { id: 2, name: 'Người bán B', company: 'Company B', category: 'Tool', itemSupply: 50 },
  { id: 3, name: 'Người bán C', company: 'Company C', category: 'Material', itemSupply: 200 },
];

const SuppliersList = () => {

  const handleDeleteProduct = (supplierId) => {

  };

  return (
    <Box p={6}>
      <Flex justifyContent={"space-between"}>
      <Text fontSize="xl" fontWeight="medium">Supplier List</Text>

      <HStack>
      <Text fontSize="l" fontWeight="medium"   _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Suppliers</Text>
      <LuChevronRight/>
      <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Supplier List</Text>
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
                  <Text>Add Supplier</Text>
                </Link>
              </Button>
            </Flex>
      </Flex>

      <TableContainer m={10} borderWidth="1px" borderRadius="lg" overflow="hidden" borderTop={"none"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Supplier</Th>
              <Th>Company</Th>
              <Th>Item Supply</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {suppliers.map((supplier) => (
              <Tr key={supplier.id}>
                <Td>{supplier.name}</Td>
                <Td>{supplier.company}</Td>
                <Td>{supplier.itemSupply}</Td>
                <Td>
                  <ButtonGroup spacing={2}>
                    <Link to={`../edit/${supplier.id}`}>
                    <Button colorScheme="blue" size={"sm"}>
                      Edit
                    </Button>
                    </Link>
                    <Link to={`../detail/${supplier.id}`}>
                    <Button colorScheme="green" size={"sm"}>
                      View
                    </Button>
                    </Link>
                    <Button colorScheme="red" size={"sm"} onClick={() => handleDeleteProduct(supplier.id)}>
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

export default SuppliersList;
