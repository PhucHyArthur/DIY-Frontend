import React, { useState } from 'react';
import {
  Box, Select, Button, Input, FormControl, FormLabel, VStack, HStack, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure,
} from '@chakra-ui/react';

const SelectWithAddOption = ({ type }) => {  // Correctly destructure the 'type' prop
  const [options, setOptions] = useState([
    { value: 'category1', label: 'Category 1' },
    { value: 'category2', label: 'Category 2' },
  ]);

  const [newOption, setNewOption] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      setOptions([...options, { value: newOption.toLowerCase().replace(/\s+/g, '-'), label: newOption }]);
      setNewOption('');
      onClose();
    }
  };

  return (
    <VStack align="start" spacing={4}>
      <FormControl>
        <HStack>
          <Select placeholder={`Select ${type} Category`}>  {/* Use the 'type' prop here */}
            {options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </Select>
          <Button colorScheme="blue" onClick={onOpen}>Add</Button>
        </HStack>
      </FormControl>

      {/* Modal for Adding New Option */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter new category"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddOption}>
              Add
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default SelectWithAddOption;
