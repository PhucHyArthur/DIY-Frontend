import React, { useState } from 'react';
import {Text,HStack,Flex} from '@chakra-ui/react';
import {LuChevronRight } from "react-icons/lu";
import PurchaseForm from '../../components/purchaseForm/add-edit';
import { useParams } from 'react-router-dom';
const PurchaseEdit = () => {
  const { purchaseId } = useParams();
  console.log(purchaseId)
  return (
   <div>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Edit Purchase Order</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium"  _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Purchase Order</Text>
          <LuChevronRight/>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Edit Purchase Order</Text>
        </HStack>
      </Flex>
    <PurchaseForm id={purchaseId}/>
   </div>
  );
};

export default PurchaseEdit;
