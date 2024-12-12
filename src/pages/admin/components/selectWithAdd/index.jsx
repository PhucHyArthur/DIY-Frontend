import React, { useState } from 'react';
import {
  Box, Select, Button, Input, FormControl, FormLabel, VStack, HStack, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure,
} from '@chakra-ui/react';

const SelectWithAddOption = ({ type, onCategoryChange  }) => {  // Correctly destructure the 'type' prop
  const [options, setOptions] = useState([
    { value: 'category1', label: 'Category 1' },
    { value: 'category2', label: 'Category 2' },
  ]);

  const [newOption, setNewOption] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState('');

  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      const newCategory = {
        value: newOption.toLowerCase().replace(/\s+/g, '-'),
        label: newOption,
      };
      setOptions([...options, newCategory]);
      setSelectedOption(newCategory.value);
      onCategoryChange(newCategory.value); // Gửi dữ liệu về cha
      setNewOption('');
      onClose();
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    onCategoryChange(value); // Gửi dữ liệu về cha
  };

  return (
    <VStack align="start" spacing={4}>
      <FormControl>
        <HStack>
          <Select 
          placeholder={`Select ${type} Category`}
          value={selectedOption}
          onChange={handleSelectChange} // Gọi hàm khi thay đổi lựa chọn
          >  {/* Use the 'type' prop here */}
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
