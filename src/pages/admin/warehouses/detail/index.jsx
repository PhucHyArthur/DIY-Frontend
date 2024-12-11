import React, { useContext, useEffect, useState } from "react";
import { Text, HStack, Flex, Box, Select, Button } from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";

import { LuChevronRight } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../../../../context/Context";
import Zones from "../../components/warehouses/Zones";
import ReusableModal from "../../components/warehouses/Modal/ReusableModal";

const WareshousesDetail = () => {
  const navigate = useNavigate();
  const { warehouseId } = useParams();
  const { zones, warehouses } = useContext(DataContext);
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
    if (!zone.capacity || zone.capacity < 100 || zone.capacity > 1000) {
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

  const createZone = () => {};

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log("create", zone);

      setErrors({});
      setZone(initialZone);
      onClose();
    } else {
      console.log("error");
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    
  },[zone])
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
      <ReusableModal
        isOpen={isOpen}
        onClose={onClose}
        data={zone}
        setData={setZone}
        type={"addZone"}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default WareshousesDetail;
