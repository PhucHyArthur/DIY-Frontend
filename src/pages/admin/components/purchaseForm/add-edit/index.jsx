import React, { useContext, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Select,
  FormControl,
  FormLabel,
  Text,
  SimpleGrid,
  GridItem,
  Divider,
  Container,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../../../context/Context";

import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { API, ORDERS } from "../../../../../constant/API";
import { TokenContext } from "../../../../../context/TokenContext";
import { useNavigate } from "react-router-dom";

const PurchaseForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { suppliers, materials, getPurchaseOrders } = useContext(DataContext);
  const { token, responseData } = useContext(TokenContext);
  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [orderNumber, setOrderNumber] = useState("PO-1");
  const [supplier, setSupplier] = useState(null);
  const [orderDate, setOrderDate] = useState(getToday());
  const [dueDate, setDueDate] = useState("");
  const [orderLines, setOrderLines] = useState([
    { material: null, quantity: 1, unit_price: 0 },
  ]);

  const addOrderLine = () => {
    setOrderLines((prevOrderLines) => [
      ...prevOrderLines,
      { material: null, quantity: 1, unit_price: 0 },
    ]);
  };

  const handleOrderLineChange = (index, field, value) => {
    setOrderLines((prevOrderLines) =>
      prevOrderLines.map((line, i) =>
        i === index ? { ...line, [field]: value } : line
      )
    );
  };

  const deleteOrder = async (data) => {
    try {
      const response = await axios.post(`${API}${ORDERS.Purchase_Add}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        toast({
          title: "Purchase created",
          description: `Purchase has been created successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getPurchaseOrders();
        console.log("Purchase created successfully:", response.data);
        navigate("../list");
        return response.data;
      } else {
        throw new Error("Failed to create Purchase");
      }
    } catch (error) {
      toast({
        title: "Purchase create Failed",
        description: `${error}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error creating Purchase:", error);
      throw error;
    }
  };

  const handleSubmit = () => {
    const payload = {
      employee: responseData.user_id,
      order_number: orderNumber,
      supplier: supplier,
      order_date: orderDate,
      due_date: dueDate,
      status: "Pending",
      order_lines: orderLines,
    };

    deleteOrder(payload);
  };

  return (
    <Container maxW="container.xl" p={8}>
      <Box bg="white" p={8} borderRadius="md" shadow="md">
        <FormControl isRequired mb={6}>
          <FormLabel>Supplier</FormLabel>
          <Select
            mb={6}
            placeholder="Select Supplier"
            value={supplier || ""}
            onChange={(e) => setSupplier(Number(e.target.value))}
          >
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <SimpleGrid columns={2} spacing={6} mb={6}>
          <GridItem colSpan={1}>
            <FormControl isRequired>
              <FormLabel>Purchase Order</FormLabel>
              <Input
                placeholder="PO-XXXXX"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel>Order Date</FormLabel>
              <Input
                type="date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
              />
            </FormControl>
          </GridItem>
        </SimpleGrid>

        <FormControl mb={6}>
          <FormLabel>Due Date</FormLabel>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </FormControl>

        <Divider mb={6} />
        <SimpleGrid columns={6} spacing={4} mb={6}>
          {orderLines.map((line, index) => (
            <React.Fragment key={index}>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Item</FormLabel>
                  <Select
                    placeholder="Select Material"
                    value={line.material || ""}
                    onChange={(e) =>
                      handleOrderLineChange(
                        index,
                        "material",
                        Number(e.target.value)
                      )
                    }
                  >
                    {materials.map((material) => (
                      <option key={material.id} value={material.id}>
                        {material.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    type="number"
                    value={line.quantity}
                    onChange={(e) =>
                      handleOrderLineChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Price per Unit</FormLabel>
                  <Input
                    type="number"
                    value={line.unit_price}
                    onChange={(e) =>
                      handleOrderLineChange(
                        index,
                        "unit_price",
                        Number(e.target.value)
                      )
                    }
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    type="number"
                    value={(line.quantity * line.unit_price).toFixed(2)}
                    isReadOnly
                  />
                </FormControl>
              </GridItem>
            </React.Fragment>
          ))}
        </SimpleGrid>

        <Button
          mt="4"
          colorScheme="blue"
          variant="outline"
          onClick={addOrderLine}
        >
          Add another line
        </Button>

        <Flex mt={6} justify="flex-end" gap={3}>
          <Link to="../list">
            <Button colorScheme="red" variant={"outline"}>
              Cancel
            </Button>
          </Link>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};

export default PurchaseForm;
