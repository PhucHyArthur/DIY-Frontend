import { useState, useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Switch, Box, Text, Input, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, Checkbox, HStack } from "@chakra-ui/react";
import { LuEye, LuMoveDown, LuPencil, LuTrash, LuChevronRight} from "react-icons/lu";
import CustomModal from "../../../../../components/Modal/default";
import { Link } from "react-router-dom";
import { DataContext } from "../../../../../context/Context";

const MaterialsList = () => {
  const {materials, purchaseOrders} = useContext(DataContext);
  const [viewProducts, setViewProducts] = useState(materials);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [modalContent, setModalContent] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(materials)
  const handleSort = (column) => {
    const direction = sortedColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortedColumn(column);
    setSortDirection(direction);
  };


  const sortedData = [...viewProducts].sort((a, b) => {
    if (sortedColumn) {
      if (a[sortedColumn] < b[sortedColumn]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortedColumn] > b[sortedColumn]) return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const materialQuantity = ()=> {
    let orders = [...purchaseOrders]
    let quantity = 0 
    console.log(orders)
    return quantity
  }

  const handleSearch = (e) => {
    setViewProducts(materials.filter(material => material.name.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  const openModal = (productId, action) => {
    setModalContent({
      productId,
      action,
      title: action === "delete" ? "Confirm Deletion" : "Confirm Availability",
      bodyContent: action === "delete"
        ? "This product will be removed if you click confirm"
        : "Are you sure you want to change the availability of this product?",
    });
    onOpen();
  };

  return (
    <Box p={6}>
      <Flex justifyContent={"space-between"}>
        <Text fontSize="xl" fontWeight="medium">Material List</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium"  _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Materials</Text>
          <LuChevronRight></LuChevronRight>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Material List</Text>
        </HStack>
      </Flex>
      <Flex justify="space-between" m={10} align="center">
        <Input placeholder="Search" w="sm" onChange={handleSearch} />
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
              <Link to={"../add"}>
                <Text>Add Material</Text>
                </Link>
              </Button>
            </Flex>
      </Flex>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" borderTop={"none"} m={10}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th cursor="pointer" w={"5%"}>
                  <Flex justifyContent={"center"}>
                    <Checkbox/>
                  </Flex>
                </Th>
                <Th cursor="pointer" onClick={() => handleSort("name")} width={"25%"}>Name Product</Th>
                <Th cursor="pointer" onClick={() => handleSort("category")}  width={"10%"} >Category</Th>
                <Th cursor="pointer" onClick={() => handleSort("quantity")}  width={"10%"} >Unit</Th>
                <Th cursor="pointer" onClick={() => handleSort("quantity")}  width={"10%"} >Quantity</Th>
                <Th  width={"5%"}>Available</Th>
                <Th  width={"20%"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {materials.map((material) => (
                <Tr key={material.id}>
                  <Td cursor="pointer">                  
                    <Flex justifyContent={"center"}>
                      <Checkbox/>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center" gap={3}>
                      {/* <Image src={material.image} alt={material.name} boxSize="50px" /> */}
                      <Text color="gray.500" _hover={{ color: "blue.500" }} cursor="pointer">
                        {material.name}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>{material.category}</Td>
                  <Td>{material.unit}</Td>
                  <Td>{materialQuantity()}</Td>
                  <Td>
                    <Flex justifyContent={"center"}>
                      <Switch isChecked={material.available} onChange={() => openModal(material.id, "toggle")} />
                    </Flex>
                  </Td>
                  <Td>
                    <Flex gap={2}>

                    <Link to={`../edit/${material.id}`}>
                      <Button aria-label="Edit" colorScheme="green" size="sm">Edit</Button>
                    </Link>

                    <Link to={`../detail/${material.id}`}>
                      <Button aria-label="View" colorScheme="blue" size="sm" >View</Button>
                    </Link>
                      <Button aria-label="Delete" colorScheme="red" onClick={() => openModal(material.id, "delete")} size="sm">Delete</Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
      </Box>

      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={modalContent.title}
        bodyContent={modalContent.bodyContent}
        onConfirm={onClose}
      />
    </Box>
  );
};

export default MaterialsList;
