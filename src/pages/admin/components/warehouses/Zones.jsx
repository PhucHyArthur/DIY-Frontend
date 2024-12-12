// Zones.js
import React, { useContext, useState } from "react";
import { LuMenu, LuPlus, LuPen, LuTrash2 } from "react-icons/lu";
import {
  IconButton,
  Button,
  Input,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  FormControl,
  FormLabel,
  Box,
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
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

import Aisles from "./Aisles";

import axios from "axios";
import { API, WAREHOUSES } from "../../../../constant/API";
import { TokenContext } from "../../../../context/TokenContext";
import { DataContext } from "../../../../context/Context";

const Zones = ({ zone, setRackId }) => {
  const { getAisles, aisles } = useContext(DataContext);
  const [token] = useContext(TokenContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const [newAisle, setNewAisle] = useState({
    zone: zone.id,
    name: "",
    number_of_racks: 0,
  });

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAisle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes for NumberInput
  const handleNumberChange = (value) => {
    setNewAisle((prev) => ({
      ...prev,
      number_of_racks: Number(value),
    }));
  };

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!newAisle.name.trim()) {
      newErrors.name = "Aisle name is required.";
    }
    if (
      !newAisle.number_of_racks ||
      newAisle.number_of_racks < 1 ||
      newAisle.number_of_racks > 20
    ) {
      newErrors.number_of_racks = "Number of racks must be between 1 and 20.";
    }
    return newErrors;
  };
  // Create Aisle 
  const createAisle = async (Data) => {
    try {
      const response = await axios.post(
        `${API}${WAREHOUSES.Aisle_Add}`,
        Data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast({
          title: "Aisle Added",
          description: `Aisle "${newAisle.name}" has been added successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log("Aisle created successfully:", response.data);
        return response.data;
      } else {
        throw new Error("Failed to create Aisle");
      }
    } catch (error) {
      toast({
        title: "Aisle Add Failed",
        description: `${error.response.request.response}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error creating Aisle:", error.response.request.response);
      throw error;
    }
  };

  // Handle form submission
  const handleAddAisle = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {

      createAisle(newAisle)

      setNewAisle({
        zone: zone.id,
        name: "",
        number_of_racks: 0,
      });

      setErrors({});
      getAisles()
      onClose();
    } else {
      // Set validation errors
      setErrors(validationErrors);
    }
  };

  return (
    <Box
      background={"#e7ecf2"}
      padding={"30px"}
      width={"100%"}
      position={"relative"}
      borderRadius={8}
      _hover={{
        cursor: "pointer",
      }}
      mb={4} // Added margin bottom for spacing between zones
    >
      {/* Options Menu */}
      <Menu>
        <MenuButton
          position={"absolute"}
          top={1}
          right={1}
          as={IconButton}
          aria-label="Options"
          icon={<LuMenu />}
          variant="outline"
        />
        <MenuList>
          <MenuItem icon={<LuPlus />} onClick={onOpen}>
            Add Aisle
          </MenuItem>
          <MenuItem icon={<LuPen />}>Edit Zone Detail</MenuItem>
          <MenuItem color={"red"} icon={<LuTrash2 />}>
            Delete Zone
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Zone Name */}
      <Box
        position={"absolute"}
        top={0}
        left={0}
        background={"white"}
        padding={2}
        borderRadius={"0 0px 8px 0"}
      >
        {zone.name}
      </Box>

      {/* List of Aisles */}
      <Box display={"flex"} gap={4} flexDirection={"column"} marginTop={5}>
        {aisles
          .filter((aisle) => aisle.zone === zone.id)
          .map((aisle) => (
            <Aisles key={aisle.id} aisle={aisle} setRackId={setRackId} />
          ))}
      </Box>

      {/* Add Aisle Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setErrors({});
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Aisle</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Aisle Name */}
            <FormControl mb={4} isRequired isInvalid={errors.name}>
              <FormLabel>Name of Aisle</FormLabel>
              <Input
                name="name"
                placeholder="Enter aisle name"
                value={newAisle.name}
                onChange={handleInputChange}
              />
              {errors.name ? (
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              ) : (
                <FormHelperText>Provide a unique aisle name.</FormHelperText>
              )}
            </FormControl>

            {/* Number of Racks */}
            <FormControl isRequired isInvalid={errors.number_of_racks}>
              <FormLabel>Number of Racks</FormLabel>
              <NumberInput
                min={1}
                max={20}
                value={newAisle.number_of_racks}
                onChange={handleNumberChange}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {errors.number_of_racks ? (
                <FormErrorMessage>{errors.number_of_racks}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  Number of racks must be between 1 and 20.
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
            <Button colorScheme="green" onClick={handleAddAisle}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Zones;
