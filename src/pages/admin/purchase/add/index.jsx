import React, { useState } from 'react';
import {Text,HStack,Flex} from '@chakra-ui/react';
import {LuChevronRight } from "react-icons/lu";
import PurchaseForm from '../../components/purchaseForm/add-edit';
const PurchaseAdd = () => {

  return (
  <div>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Add New Purchase Order</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium"  _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Purchase Order</Text>
          <LuChevronRight></LuChevronRight>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Add Purchase Order</Text>
        </HStack>
      </Flex>
    <PurchaseForm></PurchaseForm>
  </div>
  );
};

export default PurchaseAdd;
