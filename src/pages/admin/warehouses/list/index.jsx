import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  VStack,
  Text,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';

const WarehousesList = () => {
  const [zones, setZones] = useState([]); // Danh sách các zone
  const [selectedZone, setSelectedZone] = useState(null); // Zone được chọn
  const [selectedAisle, setSelectedAisle] = useState(null); // Aisle được chọn
  const [selectedRack, setSelectedRack] = useState(null); // Rack được chọn
  const [newZone, setNewZone] = useState({ name: '', capacity: '', description: '', aisle: [] }); // Thông tin zone mới
  const [newAisle, setNewAisle] = useState({ name: '', capacity: '', description: '', rack: [] }); // Thông tin aisle mới
  const [newRack, setNewRack] = useState({ name: '', capacity: '', description: '' }); // Thông tin rack mới
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal cho zone
  const {
    isOpen: isAisleOpen,
    onOpen: onAisleOpen,
    onClose: onAisleClose,
  } = useDisclosure(); // Modal cho aisle
  const {
    isOpen: isRackOpen,
    onOpen: onRackOpen,
    onClose: onRackClose,
  } = useDisclosure(); // Modal cho rack

  // Khi component mount, load danh sách zone từ localStorage
  useEffect(() => {
    const savedZones = localStorage.getItem('zones');
    if (savedZones) {
      setZones(JSON.parse(savedZones)); // Set danh sách zones từ localStorage
    }
  }, []);

  // Khi danh sách zones thay đổi, lưu vào localStorage
  useEffect(() => {
    if (zones.length > 0) {
      localStorage.setItem('zones', JSON.stringify(zones)); // Lưu danh sách zones vào localStorage
    }
  }, [zones]);

  // Hàm xử lý khi bấm Confirm trong modal zone
  const handleConfirmZone = () => {
    if (newZone.name && newZone.capacity) {
      const updatedZones = [...zones, { ...newZone }];
      setZones(updatedZones); // Thêm zone mới
      setNewZone({ name: '', capacity: '', description: '', aisle: [] }); // Reset thông tin zone
      onClose(); // Đóng modal
    } else {
      alert('Please fill in at least the Name and Capacity fields.');
    }
  };

  // Hàm xử lý khi bấm Confirm trong modal aisle
  const handleConfirmAisle = () => {
    if (newAisle.name && newAisle.capacity && selectedZone) {
      const updatedZones = zones.map((zone) => {
        if (zone === selectedZone) {
          // Thêm aisle mới vào danh sách aisle của zone được chọn
          const updatedAisles = [...(zone.aisle || []), { ...newAisle }];
          return { ...zone, aisle: updatedAisles };
        }
        return zone;
      });
      setZones(updatedZones); // Cập nhật danh sách zones với aisle mới
      setNewAisle({ name: '', capacity: '', description: '', rack: [] }); // Reset thông tin aisle
      onAisleClose(); // Đóng modal
    } else {
      alert('Please fill in all fields and select a zone.');
    }
  };

  // Hàm xử lý khi bấm Confirm trong modal rack
  const handleConfirmRack = () => {
    if (newRack.name && newRack.capacity && selectedAisle) {
      const updatedZones = zones.map((zone) => {
        if (zone === selectedZone) {
          const updatedAisles = zone.aisle.map((aisle) => {
            if (aisle === selectedAisle) {
              const updatedRacks = [...(aisle.rack || []), { ...newRack }];
              return { ...aisle, rack: updatedRacks };
            }
            return aisle;
          });
          return { ...zone, aisle: updatedAisles };
        }
        return zone;
      });
      setZones(updatedZones); // Cập nhật danh sách zones với rack mới
      setNewRack({ name: '', capacity: '', description: '' }); // Reset thông tin rack
      onRackClose(); // Đóng modal
    } else {
      alert('Please fill in all fields and select an aisle.');
    }
  };

  // Hàm xử lý khi thay đổi input
  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'zone') {
      setNewZone((prev) => ({ ...prev, [name]: value }));
    } else if (type === 'aisle') {
      setNewAisle((prev) => ({ ...prev, [name]: value }));
    } else if (type === 'rack') {
      setNewRack((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Hàm để chọn Zone khi bấm vào
  const handleZoneClick = (zone) => {
    setSelectedZone(zone); // Cập nhật Zone được chọn
    setSelectedAisle(null); // Xóa thông tin aisle khi chọn zone khác
    setSelectedRack(null); // Xóa thông tin rack khi chọn zone khác
  };

  // Hàm để chọn Aisle
  const handleAisleClick = (aisle) => {
    setSelectedAisle(aisle); // Cập nhật Aisle được chọn
    setSelectedRack(null); // Xóa thông tin rack khi chọn aisle khác
  };

  // Hàm để chọn Rack
  const handleRackClick = (rack) => {
    setSelectedRack(rack); // Cập nhật Rack được chọn
  };

  return (
    <Flex w="100%" p={4} flexDirection="row" height="auto">
      {/* Left Grid Section */}
      <Grid
        templateColumns="repeat(2, 1fr)"
        columnGap={4}
        rowGap={4}
        flex="3"
        p={4}
      >
        {zones.map((zone, index) => (
          <Box
            key={index}
            bg="blue.700"
            height="200px"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={() => handleZoneClick(zone)}
          >
            <VStack>
              <Text fontSize="xl" fontWeight="bold" color="white">
                {zone.name}
              </Text>
              <Text fontSize="md" fontWeight="medium" color="white">
                Capacity: {zone.capacity}
              </Text>
              <Text fontSize="sm" color="white">
                Aisles: {zone.aisle ? zone.aisle.length : 0}
              </Text>
              {zone.description && (
                <Text fontSize="sm" color="white">
                  {zone.description}
                </Text>
              )}
            </VStack>
          </Box>
        ))}
      </Grid>

      {/* Right Section */}
      <VStack
        flex="1"
        borderColor="gray.300"
        p={4}
        spacing={4}
        align="stretch"
        position={'relative'}
        border="1px solid gray"
        borderRadius="md"
      >
        <Flex justifyContent="center" gap={4} mb={4}>
          <Button colorScheme="blue" onClick={onOpen}>
            Add Zone
          </Button>
          <Button
            colorScheme="teal"
            onClick={onAisleOpen}
            isDisabled={!selectedZone}
          >
            Add Aisle
          </Button>
          <Button
            colorScheme="orange"
            onClick={onRackOpen}
            isDisabled={!selectedAisle}
          >
            Add Rack
          </Button>
        </Flex>

        <Box
          bg="gray.100"
          flex="1"
          borderRadius="md"
          borderColor="gray.300"
          p={4}
        >
          {selectedRack ? (
            <>
              <Text fontSize="2xl" fontWeight="bold">
                {selectedRack.name}
              </Text>
              <Text fontSize="lg">Capacity: {selectedRack.capacity}</Text>
              {selectedRack.description && (
                <Text fontSize="md">{selectedRack.description}</Text>
              )}
            </>
          ) : selectedAisle ? (
            <>
              <Text fontSize="2xl" fontWeight="bold">
                {selectedAisle.name}
              </Text>
              <Text fontSize="lg">Capacity: {selectedAisle.capacity}</Text>
              {selectedAisle.description && (
                <Text fontSize="md">{selectedAisle.description}</Text>
              )}

              {/* Danh sách Rack */}
              {selectedAisle.rack?.length > 0 && (
                <Box mt={4}>
                  <Text fontSize="lg" fontWeight="bold">
                    Racks:
                  </Text>
                  {selectedAisle.rack.map((rack, index) => (
                    <Box
                      key={index}
                      p={2}
                      bg="gray.200"
                      borderRadius="md"
                      mb={2}
                      cursor="pointer"
                      onClick={() => handleRackClick(rack)}
                    >
                      {rack.name}
                    </Box>
                  ))}
                </Box>
              )}
            </>
          ) : selectedZone ? (
            <>
              <Text fontSize="2xl" fontWeight="bold">
                {selectedZone.name}
              </Text>
              <Text fontSize="lg">Capacity: {selectedZone.capacity}</Text>
              <Text fontSize="md">Aisles: {selectedZone.aisle?.length || 0}</Text>
              {selectedZone.description && (
                <Text fontSize="md">{selectedZone.description}</Text>
              )}

              {/* Danh sách Aisle */}
              {selectedZone.aisle?.length > 0 && (
                <Box mt={4}>
                  <Text fontSize="lg" fontWeight="bold">
                    Aisles:
                  </Text>
                  {selectedZone.aisle.map((aisle, index) => (
                    <Box
                      key={index}
                      p={2}
                      bg="gray.200"
                      borderRadius="md"
                      mb={2}
                      cursor="pointer"
                      onClick={() => handleAisleClick(aisle)}
                    >
                      {aisle.name}
                    </Box>
                  ))}
                </Box>
              )}
            </>
          ) : (
            <Text fontSize="lg" color="gray.500">
              Click on a Zone, Aisle, or Rack to see details
            </Text>
          )}
        </Box>

        {/* Modal for Adding Zone */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Zone</ModalHeader>
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter zone name"
                  name="name"
                  value={newZone.name}
                  onChange={(e) => handleInputChange(e, 'zone')}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Capacity</FormLabel>
                <Input
                  placeholder="Enter capacity"
                  name="capacity"
                  type="number"
                  value={newZone.capacity}
                  onChange={(e) => handleInputChange(e, 'zone')}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Enter description"
                  name="description"
                  value={newZone.description}
                  onChange={(e) => handleInputChange(e, 'zone')}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleConfirmZone}>
                Confirm
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal for Adding Aisle */}
        <Modal isOpen={isAisleOpen} onClose={onAisleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Aisle</ModalHeader>
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter aisle name"
                  name="name"
                  value={newAisle.name}
                  onChange={(e) => handleInputChange(e, 'aisle')}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Capacity</FormLabel>
                <Input
                  placeholder="Enter capacity"
                  name="capacity"
                  type="number"
                  value={newAisle.capacity}
                  onChange={(e) => handleInputChange(e, 'aisle')}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Enter description"
                  name="description"
                  value={newAisle.description}
                  onChange={(e) => handleInputChange(e, 'aisle')}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleConfirmAisle}>
                Confirm
              </Button>
              <Button variant="ghost" onClick={onAisleClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal for Adding Rack */}
        <Modal isOpen={isRackOpen} onClose={onRackClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Rack</ModalHeader>
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter rack name"
                  name="name"
                  value={newRack.name}
                  onChange={(e) => handleInputChange(e, 'rack')}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Capacity</FormLabel>
                <Input
                  placeholder="Enter capacity"
                  name="capacity"
                  type="number"
                  value={newRack.capacity}
                  onChange={(e) => handleInputChange(e, 'rack')}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Enter description"
                  name="description"
                  value={newRack.description}
                  onChange={(e) => handleInputChange(e, 'rack')}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleConfirmRack}>
                Confirm
              </Button>
              <Button variant="ghost" onClick={onRackClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Flex>
  );
};

export default WarehousesList;
