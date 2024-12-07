import React, { useState, useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Switch, Box, Text, Input, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, Checkbox, HStack } from "@chakra-ui/react";
import { LuEye, LuMoveDown, LuPencil, LuTrash, LuChevronRight, LuChevronDown,LuChevronUp } from "react-icons/lu";
import CustomModal from "../../../../../components/Modal/default";
import { Link } from "react-router-dom";
import { DataContext } from "../../../../../context/Context";

const MaterialsList = () => {
  const { materials } = useContext(DataContext);
  console.log(materials[0].raw_materials_lines, "page")
  const [viewProducts, setViewProducts] = useState(materials);
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
    setViewProducts(materials.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase())));
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
              <Th cursor="pointer" onClick={() => handleSort("quantity")} width={"10%"} >Quantity</Th>
              <Th width={"5%"}>Available</Th>
              <Th width={"20%"}>Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {sortedData.map((material) => (
              <React.Fragment key={material.id}>
                <Tr>
                  <Td cursor="pointer">
                    <Flex justifyContent={"center"}>
                      <Checkbox />
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center" gap={3}>
                      <Image src={material.image} alt={material.name} boxSize="50px" />
                      <Text color="gray.500" _hover={{ color: "blue.500" }} cursor="pointer">
                        {material.name}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>{material.category}</Td>
                  <Td>{material.total_quantity}</Td>
                  <Td>
                    <Flex justifyContent={"center"}>
                      <Switch isChecked={material.available} onChange={() => openModal(materials.id, "toggle")} />
                    </Flex>
                  </Td>
                  <Td>
                    <Flex gap={2}>
                      <Link to={`../edit/${material.id}`}>
                        <Button aria-label="Edit " colorScheme="green" size="sm">Edit</Button>
                      </Link>
                      <Link to={`../detail/${material._id}`}>
                        <Button aria-label="View" colorScheme="blue" size="sm" >View</Button>
                      </Link>
                      <Button aria-label="Delete" colorScheme="red" onClick={() => openModal(material.id, "delete")} size="sm">Delete</Button>
                      <Button aria-label="More Info" colorScheme="teal" variant='ghost' onClick={() => toggleExpandedRow(material.id)} size="sm">
                        {expandedRow ? <LuChevronUp/>:<LuChevronDown/>}
                      </Button>
                    </Flex>
                  </Td>
                </Tr>

                {expandedRow === material.id && (
                  <Tr>
                    <Td colSpan={7}>
                      <Box p={4} border="1px" borderColor="gray.200">
                        <Table>
                          <Thead>
                            <Tr>
                              <Th>Suppliers</Th>
                              <Th>Price Each</Th>
                              <Th>Quantity</Th>
                              <Th>Loaction</Th>
                              <Th>Line Total</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                          {material.raw_materials_lines.map((line) =>
                            <Tr>
                              <Td>{line.supplier_name}</Td>
                              <Td>{line.price_per_unit}</Td>
                              <Td>{line.quantity}</Td>
                              <Td>{line.location.bin_number}</Td>
                              <Td>{line.line_total}</Td>
                            </Tr>
                          )}
                          </Tbody>
                        </Table>
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
