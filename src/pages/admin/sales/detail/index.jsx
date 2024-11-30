import React from 'react';
import SalesDetailForm from '../../components/saleForm/detail';
import { useParams } from 'react-router-dom';
import {
  Text,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { LuChevronRight } from "react-icons/lu";

const SalesDetail = () => {
  
  const { purchaseId } = useParams();

  return (
    <div>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Sale Order Detail</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium"   _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Sale Order</Text>
          <LuChevronRight/>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Sale Order Detail</Text>
        </HStack>
      </Flex>
      <SalesDetailForm id={purchaseId}/>
    </div>
  );
};

export default SalesDetail;
