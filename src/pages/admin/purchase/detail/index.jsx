import React, { useState } from 'react';
import {Text,HStack,Flex} from '@chakra-ui/react';
import {LuChevronRight } from "react-icons/lu";
import PurchaseDetailForm from '../../components/purchaseForm/detail';
import { useParams } from 'react-router-dom';

const PurchaseDetail = () => {
  const { purchaseId } = useParams();
  return (
    <div>
     <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Purchase Order Detail</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium"  _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Purchase Order</Text>
          <LuChevronRight></LuChevronRight>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Purchase Order Detail</Text>
        </HStack>
      </Flex>
    <PurchaseDetailForm id={purchaseId}></PurchaseDetailForm>
    </div>
  );
};

export default PurchaseDetail;
