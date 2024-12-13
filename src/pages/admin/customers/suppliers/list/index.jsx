import React, {useContext, useState} from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, Button,Input, ButtonGroup,Flex,HStack,Menu,MenuItem,MenuList,MenuButton } from '@chakra-ui/react';
import { LuChevronRight,LuMoveDown } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { DataContext } from '../../../../../context/Context';
import axios from 'axios';
import { API,SUPPLIERS } from '../../../../../constant/API';
import CustomToast from "../../../../../components/Toast";

// const suppliers = [
//   { id: 1, name: 'Người bán A', company: 'Company A', category: 'Material', itemSupply: 100},
//   { id: 2, name: 'Người bán B', company: 'Company B', category: 'Tool', itemSupply: 50 },
//   { id: 3, name: 'Người bán C', company: 'Company C', category: 'Material', itemSupply: 200 },
// ];

const SuppliersList = () => {
  const{suppliers,representatives,setSuppliers}=useContext(DataContext);
  const [token] = useState(localStorage.getItem('authToken'));
  console.log(suppliers)
  console.log(representatives)
  const showToast = CustomToast();

  const handleDelete = async (supplierId, representativeId) => {
    try {
      // Xóa representative trước
      await axios.delete(`${API}${SUPPLIERS.Representative_Delete.replace('<int:pk>', representativeId)}`,{
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Sau đó xóa supplier
      await axios.delete(`${API}${SUPPLIERS.Delete.replace('<int:pk>', supplierId)}`,{
        headers: { Authorization: `Bearer ${token}` },
      });
  
      showToast("success", "Supplier and Representative Deleted", "The Supplier and Representative has been successfully deleted.");
  
      // Cập nhật danh sách nhà cung cấp sau khi xóa thành công
      const updatedSuppliers = suppliers.filter((supplier) => supplier.id !== supplierId);
      setSuppliers(updatedSuppliers); // Nếu dùng state cục bộ, cập nhật tại đây
    } catch (error) {
      console.error('Error deleting supplier or representative:', error.response?.data || error.message);
      showToast("error", "Delete Failed", "An error occurred while deleting the product.");
    }
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
                    <Button colorScheme="red" size={"sm"} onClick={() => handleDelete(supplier.id, supplier.representative)}>
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
