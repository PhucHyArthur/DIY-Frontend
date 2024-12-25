import React, { useState, useContext } from "react";
import {
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Box,
  Text,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import {
  LuChevronRight,
  LuChevronDown,
  LuChevronUp,
} from "react-icons/lu";
import CustomModal from "../../../../../components/Modal/default";
import { Link } from "react-router-dom";
import { DataContext } from "../../../../../context/Context";

const MaterialsList = () => {
  const { materials } = useContext(DataContext);
  const [viewProducts, setViewProducts] = useState(materials);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [modalContent, setModalContent] = useState({});
  const [expandedRow, setExpandedRow] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSort = (column) => {
    const direction =
      sortedColumn === column && sortDirection === "asc" ? "desc" : "asc";
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
    setViewProducts(
      materials.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const openModal = (productId, action) => {
    setModalContent({
      productId,
      action,
      title:
        action === "delete" ? "Confirm Deletion" : "Confirm Availability",
      bodyContent:
        action === "delete"
          ? "This raw material will be removed if you click confirm"
          : "Are you sure you want to change the availability of this raw material?",
    });
    onOpen();
  };

  const toggleExpandedRow = (productId) => {
    setExpandedRow(expandedRow === productId ? null : productId);
  };

  return (
    <Box p={6}>
      <Flex justifyContent={"space-between"}>
        <Text fontSize="xl" fontWeight="medium">Raw Material List</Text>

        <HStack>
          <Text
            fontSize="l"
            fontWeight="medium"
            _hover={{ color: "orange.500", cursor: "pointer", transition: "all, 0.5s" }}
          >
            Raw Material
          </Text>
          <LuChevronRight />
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>
            Raw Material List
          </Text>
        </HStack>
      </Flex>
      <Flex justify="space-between" m={10} align="center">
        <Input placeholder="Search" w="sm" onChange={handleSearch} />
        <Flex align="center" gap={2}>
          <Menu>
            <MenuButton as={Button} rightIcon={<LuChevronDown />}>
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem>Sample Action 1</MenuItem>
              <MenuItem>Sample Action 2</MenuItem>
            </MenuList>
          </Menu>
          <Button>
            <Link to={"../add"}>
              <Text>Add Raw Material</Text>
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
              <Th cursor="pointer" onClick={() => handleSort("name")} width={"25%"}>
                Name Raw Material
              </Th>
              <Th cursor="pointer" onClick={() => handleSort("category")} width={"10%"}>
                Category
              </Th>
              <Th cursor="pointer" onClick={() => handleSort("quantity")} width={"10%"}>
                Quantity
              </Th>
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
                      {material.images && material.images.length > 0 ? (
                        <Image src={material.images[0].url} alt={material.name} boxSize="50px" />
                      ) : (
                        <Box boxSize="50px" bg="gray.100" borderRadius="md" />
                      )}
                      <Text
                        color="gray.500"
                        _hover={{ color: "blue.500" }}
                        cursor="pointer"
                      >
                        {material.name}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>{material.category}</Td>
                  <Td>{material.total_quantity}</Td>
                  <Td>
                    <Flex justifyContent={"center"}>
                      <Switch
                        isChecked={material.is_available}
                        onChange={() => openModal(material.id, "toggle")}
                      />
                    </Flex>
                  </Td>
                  <Td>
                    <Flex gap={2}>
                      <Link to={`../edit/${material.id}`}>
                        <Button
                          aria-label="Edit "
                          colorScheme="green"
                          size="sm"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Link to={`../detail/${material.id}`}>
                        <Button
                          aria-label="View"
                          colorScheme="blue"
                          size="sm"
                        >
                          View
                        </Button>
                      </Link>
                      <Button
                        aria-label="Delete"
                        colorScheme="red"
                        onClick={() => openModal(material.id, "delete")}
                        size="sm"
                      >
                        Delete
                      </Button>
                      <Button
                        aria-label="More Info"
                        colorScheme="teal"
                        variant="ghost"
                        onClick={() => toggleExpandedRow(material.id)}
                        size="sm"
                      >
                        {expandedRow === material.id ? (
                          <LuChevronUp />
                        ) : (
                          <LuChevronDown />
                        )}
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
                              <Th>Location</Th>
                              <Th>Line Total</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {material.raw_materials_lines.map((line) => (
                              <Tr key={line.id}>
                                <Td>{line.supplier_name}</Td>
                                <Td>{line.price_per_unit}</Td>
                                <Td>{line.quantity}</Td>
                                <Td>{line.bin_number}</Td>
                                <Td>{line.line_total}</Td>
                              </Tr>
                            ))}
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
