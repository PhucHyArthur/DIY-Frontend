import React from "react";
import {
  Text,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { LuChevronRight } from "react-icons/lu";
import SalesForm from "../../components/saleForm/add-edit";

const SalesAdd = () => {
  return (
   <div>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Add New Sale Order</Text>
        <HStack>
          <Text fontSize="l" fontWeight="medium"   _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Sale Order</Text>
          <LuChevronRight></LuChevronRight>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Add Sale Order</Text>
        </HStack>
      </Flex>
    <SalesForm></SalesForm>
   </div>
  );
};

export default SalesAdd;
