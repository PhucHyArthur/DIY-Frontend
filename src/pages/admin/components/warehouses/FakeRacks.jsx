import React, { useState, useContext } from "react";
import {
  Box,
  useDisclosure,
  Button,
  Input,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import { API, WAREHOUSES } from "../../../../constant/API"; // Ensure EMPLOYEE is imported
import { TokenContext } from "../../../../context/TokenContext";
import { DataContext } from "../../../../context/Context";

const FakeRacks = ({ aisleId }) => {
  const { getRacks } = useContext(DataContext);
  const [token] = useContext(TokenContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRackState = {
    name: "",
    capacity: 100,
  };
  const [rack, setRack] = useState(initialRackState);
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRack((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (value) => {
    setRack((prev) => ({
      ...prev,
      capacity: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!rack.name.trim()) {
      newErrors.name = "Rack name is required.";
    }
    if (!rack.capacity || rack.capacity < 100 || rack.capacity > 1000) {
      newErrors.capacity = "Capacity must be between 100 and 1000.";
    }
    return newErrors;
  };

  const createRack = async (rackData) => {
    try {
      const response = await axios.post(
        `${API}${WAREHOUSES.Rack_Add}`,
        rackData,
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
      console.error("Error creating rack:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const newRack = {
        aisle: aisleId,
        name: rack.name.trim(),
        capacity: Number(rack.capacity),
      };

      try {
        await createRack(newRack);

        toast({
          title: "Rack Added.",
          description: `Rack "${newRack.name}" has been added successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        setRack(initialRackState);
        getRacks();
        setErrors({});
        onClose();

      } catch (error) {
        toast({
          title: "Error Adding Rack.",
          description:
            error.response?.data?.message ||
            "An error occurred while adding the rack.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <Box
        padding={"8"}
        borderRadius={"6"}
        background={"#d8e0ea"}
        width={"7%"}
        _hover={{
          cursor: "pointer",
          background: "#b0c4de",
        }}
        onClick={onOpen}
      ></Box>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setErrors({});
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Rack</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={errors.name} mb={4}>
              <FormLabel>Name of Rack</FormLabel>
              <Input
                name="name"
                placeholder="Enter rack name"
                value={rack.name}
                onChange={handleChange}
              />
              {errors.name ? (
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              ) : (
                <FormHelperText>Provide a unique rack name.</FormHelperText>
              )}
            </FormControl>

            <FormControl isInvalid={errors.capacity}>
              <FormLabel>Max Capacity</FormLabel>
              <NumberInput
                max={1000}
                min={100}
                value={rack.capacity}
                onChange={handleNumberChange}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {errors.capacity ? (
                <FormErrorMessage>{errors.capacity}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  Capacity must be between 100 and 1000.
                </FormHelperText>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                setErrors({});
                onClose();
              }}
            >
              Close
            </Button>
            <Button colorScheme="green" onClick={handleSubmit}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FakeRacks;
