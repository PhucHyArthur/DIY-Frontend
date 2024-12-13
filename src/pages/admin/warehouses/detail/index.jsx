import React, { useContext, useEffect, useState } from "react";
import { Text, HStack, Flex, Box, Select } from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

import { LuChevronRight } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../../../../context/Context";
import Zones from "../../components/warehouses/Zones";

import axios from "axios";
import { API,WAREHOUSES } from "../../../../constant/API";
import { TokenContext } from "../../../../context/TokenContext";

const WareshousesDetail = () => {
  const [token] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();
  const toast = useToast();
  const { warehouseId } = useParams();
  const { zones, warehouses, getZones } = useContext(DataContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState({});
  const [selectedRackId, setSelectedRackId] = useState(null);
  const initialZone = {
    warehouse: warehouseId,
    name: "",
    capacity: 0,
    number_of_aisles: 0,
  };
  const [zone, setZone] = useState(initialZone);
  const changeWarehouse = (id) => {
    navigate(`./../${id}`);
  };

  const validate = () => {
    const newErrors = {};
    if (!zone.name.trim()) {
      newErrors.name = "Rack name is required.";
    }
    if (!zone.capacity || zone.capacity < 100 ) {
      newErrors.capacity = "Capacity must be between 100 and 1000.";
    }
    if (
      !zone.number_of_aisles ||
      zone.number_of_aisles < 1 ||
      zone.number_of_aisles > 10
    ) {
      newErrors.number_of_aisles = "Capacity must be between 100 and 1000.";
    }
    return newErrors;
  };

  const createZone = async (data) => {
    try {
      const response = await axios.post(
        `${API}${WAREHOUSES.Zones_Add}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log("Rack created successfully:", response.data);
        return response.data;
      } else {
        throw new Error("Failed to create rack");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await createZone(zone);

        toast({
          title: "Zone Added.",
          description: `Zone "${zone.name}" has been added successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        setZone(initialZone);
        getZones();
        setErrors({});
        onClose();

      } catch (error) {
        toast({
          title: "Error Adding Zone.",
          description:
            error.response?.data?.message ||
            "An error occurred while adding the Zone.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } else {
      console.log("error");
      setErrors(validationErrors);
    }
  };
  return (
    <Box>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">
          Warehouses
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
            Warehouses
          </Text>
          <LuChevronRight />
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>
            List Warehouses
          </Text>
        </HStack>
      </Flex>
      <Flex margin={12} gap={"15px"}>
        <Select
          placeholder="Select Warehouse"
          value={warehouseId}
          onChange={(e) => changeWarehouse(e.target.value)}
        >
          {warehouses.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </Select>
        <Flex gap={3}>
          <Button onClick={onOpen}>Add Zone</Button>
          <Button>Edit Warehouse</Button>
          <Button colorScheme="red">Delete Warehouse</Button>
        </Flex>
      </Flex>
      <Flex>
        <Flex
          width={"60%"}
          gap={4}
          alignItems={"start"}
          flexDirection={"column"}
          marginLeft={"3%"}
          marginRight={"3%"}
        >
          {zones
            .filter((item) => item.warehouse == warehouseId)
            .map((zone) => (
              <Zones zone={zone} setRackId={setSelectedRackId} />
            ))}
        </Flex>
        <Flex width={"40%"} background={"yellow.100"}>
          {selectedRackId}
        </Flex>
      </Flex>

      {/* modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Zone</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Name Input */}
            <FormControl isInvalid={errors.name} mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                placeholder="Enter Zone name"
                value={zone.name || ""}
                onChange={(e) => setZone({ ...zone, name: e.target.value })}
              />
              {errors.name && (
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              )}
            </FormControl>

            {/* Capacity Input */}
            <FormControl mt={4} isInvalid={errors.capacity}>
              <FormLabel>Capacity</FormLabel>
              <NumberInput
                name="capacity"
                placeholder="Enter Capacity"
                min={100}
                value={zone.capacity || 0}
                onChange={(valueAsNumber) =>
                  setZone({ ...zone, capacity: valueAsNumber })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {errors.capacity && (
                <FormErrorMessage>{errors.capacity}</FormErrorMessage>
              )}
            </FormControl>

            {/* Max Aisle Input */}
            <FormControl mt={4} isInvalid={errors.number_of_aisles}>
              <FormLabel>Max Aisle</FormLabel>
              <NumberInput
                name="aislenum"
                placeholder="Enter number of Aisle in Zone"
                value={zone.number_of_aisles || 0}
                onChange={(valueAsNumber) =>
                  setZone({
                    ...zone,
                    number_of_aisles: valueAsNumber,
                  })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {errors.number_of_aisles && (
                <FormErrorMessage>{errors.number_of_aisles}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={() => handleSubmit()}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default WareshousesDetail;
