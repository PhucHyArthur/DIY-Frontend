import React, { useState } from "react";
import { Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Switch, Box, Text, Input, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, Checkbox, HStack } from "@chakra-ui/react";
import { LuEye, LuMoveDown, LuPencil, LuTrash, LuChevronRight } from "react-icons/lu";
import CustomModal from "../../../../../components/Modal/default";
import { Link } from "react-router-dom";

const MaterialsList = () => {
  const [products, setProducts] = useState([
    { _id: "1", name: "Sample Product 1", categories: [{ name: "Category 1" }], price: 100, quantity: 200, available: true, image: "https://via.placeholder.com/150" },
    { _id: "2", name: "Sample Product 2", categories: [{ name: "Category 2" }], price: 200, quantity: 300, available: false, image: "https://via.placeholder.com/150" },
  ]);
  const [viewProducts, setViewProducts] = useState(products);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [modalContent, setModalContent] = useState({});
  const [expandedRow, setExpandedRow] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleSearch = (e) => {
    setViewProducts(products.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase())));
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


  const toggleExpandedRow = (productId) => {
    setExpandedRow(expandedRow === productId ? null : productId);
  };

  return (
    <Box p={6}>
      <Flex justifyContent={"space-between"}>
        <Text fontSize="xl" fontWeight="medium">Product List</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium" _hover={{ color: "orange.500", cursor: "pointer", transition: "all, 0.5s" }}>Products</Text>
          <LuChevronRight />
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Product List</Text>
        </HStack>
      </Flex>
      <Flex justify="space-between" m={10} align="center">
        <Input placeholder="Search" w="sm" onChange={handleSearch} />
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
              <Text>Add Product</Text>
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
                  <Checkbox />
                </Flex>
              </Th>
              <Th cursor="pointer" onClick={() => handleSort("name")} width={"25%"}>Name Product</Th>
              <Th cursor="pointer" onClick={() => handleSort("category")} width={"10%"} >Category</Th>
              <Th cursor="pointer" onClick={() => handleSort("price")} width={"10%"} >Price</Th>
              <Th cursor="pointer" onClick={() => handleSort("quantity")} width={"10%"} >Quantity</Th>
              <Th width={"5%"}>Available</Th>
              <Th width={"20%"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedData.map((product) => (
              <React.Fragment key={product._id}>
                <Tr>
                  <Td cursor="pointer">
                    <Flex justifyContent={"center"}>
                      <Checkbox />
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center" gap={3}>
                      <Image src={product.image} alt={product.name} boxSize="50px" />
                      <Text color="gray.500" _hover={{ color: "blue.500" }} cursor="pointer">
                        {product.name}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>{product.categories[0].name}</Td>
                  <Td>{product.price}</Td>
                  <Td>{product.quantity}</Td>
                  <Td>
                    <Flex justifyContent={"center"}>
                      <Switch isChecked={product.available} onChange={() => openModal(product._id, "toggle")} />
                    </Flex>
                  </Td>
                  <Td>
                    <Flex gap={2}>
                      <Link to={`../edit/${product._id}`}>
                        <Button aria-label="Edit " colorScheme="green" size="sm">Edit</Button>
                      </Link>
                      <Link to={`../detail/${product._id}`}>
                        <Button aria-label="View" colorScheme="blue" size="sm" >View</Button>
                      </Link>
                      <Button aria-label="Delete" colorScheme="red" onClick={() => openModal(product._id, "delete")} size="sm">Delete</Button>
                      <Button aria-label="More Info" colorScheme="teal" onClick={() => toggleExpandedRow(product._id)} size="sm">
                        More Info
                      </Button>
                    </Flex>
                  </Td>
                </Tr>

                {expandedRow === product._id && (
                  <Tr>
                    <Td colSpan={7}>
                      <Box p={4} border="1px" borderColor="gray.200">
                        <Text fontSize="md">Additional Information for {product.name}</Text>
                        <Text>Price: ${product.price}</Text>
                        <Text>Quantity: {product.quantity}</Text>
                        <Text>Categories: {product.categories.map(cat => cat.name).join(", ")}</Text>
                      </Box>
                    </Td>
                  </Tr>
                )}
              </React.Fragment>
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
