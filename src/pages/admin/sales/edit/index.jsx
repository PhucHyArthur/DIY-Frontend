import React, { useEffect, useState } from 'react';
import {
  Text,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { LuChevronRight } from "react-icons/lu";
import SalesForm from '../../components/saleForm/add-edit';
import { useParams } from 'react-router-dom';

const SalesEdit = () => {
  
  const { purchaseId } = useParams();

  return (
   <div>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Edit Sale Order</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium"   _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Sale Order</Text>
          <LuChevronRight/>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Edit Sale Order</Text>
        </HStack>
      </Flex>
      
    <SalesForm id={purchaseId}/>
   </div>
  );
};

export default SalesEdit;
