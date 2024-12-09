import React from 'react';
import { Text, HStack, Flex } from '@chakra-ui/react';
import { LuChevronRight } from "react-icons/lu";
import MaterialForm from "../../../components/materialForm"; 

const MaterialsAdd = () => {
  return (
    <div>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Add New Material</Text>

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
            Materials
          </Text>
          <LuChevronRight />
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>
            Add Material
          </Text>
        </HStack>
      </Flex>
      <MaterialForm mode="add" />
    </div>
  );
};

export default MaterialsAdd;
