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
  LuEye,
  LuMoveDown,
  LuPencil,
  LuTrash,
  LuChevronRight,
} from "react-icons/lu";
import CustomModal from "../../../../../components/Modal/default";
import { Link } from "react-router-dom";
import { DataContext } from "../../../../../context/Context";
import axios from "axios";
import { API, INVENTORY } from "../../../../../constant/API";
import CustomToast from "../../../../../components/Toast";

const MaterialsList = () => {
  const { products } = useContext(DataContext);
  const [token] = useState(localStorage.getItem("authToken"));
  const [viewProduct, setViewProduct] = useState(products);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [modalContent, setModalContent] = useState({});
  const [expandedRow, setExpandedRow] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = CustomToast();

  const handleSort = (column) => {
    const direction =
      sortedColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortedColumn(column);
    setSortDirection(direction);
  };

  const sortedData = [...viewProduct].sort((a, b) => {
    if (sortedColumn) {
      if (a[sortedColumn] < b[sortedColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortedColumn] > b[sortedColumn])
        return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSearch = (e) => {
    setViewProduct(
      products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const openModal = (productId, action, currentAvailability) => {
    const actionHandler =
      action === "delete"
        ? () => deleteProduct(productId)
        : () => updateAvailability(productId, currentAvailability);

    setModalContent({
      productId,
      action,
      title: action === "delete" ? "Confirm Deletion" : "Confirm Availability",
      bodyContent:
        action === "delete"
          ? "This product will be removed if you click confirm"
          : "Are you sure you want to change the availability of this product?",
      onConfirm: actionHandler,
    });
    onOpen();
  };

  const toggleExpandedRow = (productId) => {
    setExpandedRow(expandedRow === productId ? null : productId);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `${API}${INVENTORY.Product_Delete}`.replace("<int:pk>", productId),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showToast(
        "success",
        "Product Deleted",
        "The product has been successfully deleted."
      );

      // Cập nhật lại danh sách sản phẩm sau khi xóa
      setViewProduct(viewProduct.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast(
        "error",
        "Delete Failed",
        "An error occurred while deleting the product."
      );
    }
  };

  const updateAvailability = async (productId, currentAvailability) => {
    try {
      const updatedAvailability = !currentAvailability;
      await axios.patch(
        `${API}${INVENTORY.Product_Update}`.replace("<int:pk>", productId),
        { is_available: updatedAvailability },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast(
        "success",
        "Availability Updated",
        "The product availability has been updated."
      );

      // Cập nhật danh sách tại chỗ
      setViewProduct((prev) =>
        prev.map((product) =>
          product.id === productId
            ? { ...product, is_available: updatedAvailability }
            : product
        )
      );
    } catch (error) {
      console.error("Error updating availability:", error);
      showToast(
        "error",
        "Update Failed",
        "An error occurred while updating the product availability."
      );
    }
  };

  return (
    <Box p={6}>
      <Flex justifyContent={"space-between"}>
        <Text fontSize="xl" fontWeight="medium">
          Product List
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
            Product
          </Text>
          <LuChevronRight />
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>
            Product List
          </Text>
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

      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        borderTop={"none"}
        m={10}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th cursor="pointer" w={"5%"}>
                <Flex justifyContent={"center"}>
                  <Checkbox />
                </Flex>
              </Th>
              <Th
                cursor="pointer"
                onClick={() => handleSort("name")}
                width={"25%"}
              >
                Name Product
              </Th>
              <Th
                cursor="pointer"
                onClick={() => handleSort("category")}
                width={"10%"}
              >
                Category
              </Th>
              <Th
                cursor="pointer"
                onClick={() => handleSort("price")}
                width={"10%"}
              >
                Price
              </Th>
              <Th
                cursor="pointer"
                onClick={() => handleSort("quantity")}
                width={"10%"}
              >
                Quantity
              </Th>
              <Th width={"5%"}>Available</Th>
              <Th width={"20%"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedData.map((product) => (
              <React.Fragment key={product.id}>
                <Tr>
                  <Td cursor="pointer">
                    <Flex justifyContent={"center"}>
                      <Checkbox />
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center" gap={3}>
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          boxSize="50px"
                        />
                      ) : (
                        <Box boxSize="50px" bg="gray.100" borderRadius="md" />
                      )}
                      <Text
                        color="gray.500"
                        _hover={{ color: "blue.500" }}
                        cursor="pointer"
                      >
                        {product.name}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>{product.category}</Td>
                  <Td>{product.selling_price}</Td>
                  <Td>{product.total_quantity}</Td>
                  <Td>
                    <Flex justifyContent={"center"}>
                      <Switch
                        isChecked={product.is_available}
                        onChange={() =>
                          openModal(product.id, "toggle", product.is_available)
                        }
                      />
                    </Flex>
                  </Td>
                  <Td>
                    <Flex gap={2}>
                      <Link to={`../edit/${product.id}`}>
                        <Button
                          aria-label="Edit "
                          colorScheme="green"
                          size="sm"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Link to={`../detail/${product.id}`}>
                        <Button aria-label="View" colorScheme="blue" size="sm">
                          View
                        </Button>
                      </Link>
                      <Button
                        aria-label="Delete"
                        colorScheme="red"
                        onClick={() => openModal(product.id, "delete")}
                        size="sm"
                      >
                        Delete
                      </Button>
                      <Button
                        aria-label="More Info"
                        colorScheme="teal"
                        onClick={() => toggleExpandedRow(product.id)}
                        size="sm"
                      >
                        More Info
                      </Button>
                    </Flex>
                  </Td>
                </Tr>

                {expandedRow === product.id && (
                  <Tr>
                    <Td colSpan={7}>
                      <Box p={4} border="1px" borderColor="gray.200">
                        <Text fontSize="md">
                          Additional Information for {product.name}
                        </Text>
                        <Text>Price: ${product.selling_price}</Text>
                        <Text>Quantity: {product.total_quantity}</Text>
                        <Text>
                          Categories:{" "}
                          {product.categories.map((cat) => cat.name).join(", ")}
                        </Text>
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
        onConfirm={modalContent.onConfirm}
      />
    </Box>
  );
};

export default MaterialsList;
