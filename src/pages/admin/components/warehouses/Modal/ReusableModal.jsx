import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";

const ReusableModal = ({
  isOpen,
  onClose,
  data,
  setData,
  type,
  errors,
  handleSubmit,
}) => {
  const [newData, setNewData] = useState({ ...data });

  useEffect(() => {
    if (isOpen) {
      setNewData({ ...data });
    }
  }, [isOpen]);

  const submit = () => {
    setData({ ...newData });
    handleSubmit()
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{type === "addZone" && "Add Zone"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {type === "addZone" && (
            <>
              {/* Name Input */}
              <FormControl isInvalid={errors.name} mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  placeholder="Enter Zone name"
                  value={newData.name || ""}
                  onChange={(e) =>
                    setNewData({ ...newData, name: e.target.value })
                  }
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
                  value={newData.capacity || 0}
                  onChange={(valueAsNumber) =>
                    setNewData({ ...newData, capacity: valueAsNumber })
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
                  value={newData.number_of_aisles || 0}
                  onChange={(valueAsNumber) =>
                    setNewData({
                      ...newData,
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
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="green" onClick={() => submit()}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReusableModal;
