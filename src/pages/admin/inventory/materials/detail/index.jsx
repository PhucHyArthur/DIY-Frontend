import React from 'react';
import { Text, HStack, Flex } from '@chakra-ui/react';
import { LuChevronRight } from "react-icons/lu";
import MaterialForm from "../../../components/materialForm"; 
import { useParams } from 'react-router-dom';

const MaterialsDetail = () => {
  const { materialId } = useParams();

  return (
    <div>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Material Detail</Text>

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
            Material Detail
          </Text>
        </HStack>
      </Flex>
      <MaterialForm id={materialId} mode="detail" />
    </div>
  );
};

export default MaterialsDetail;
