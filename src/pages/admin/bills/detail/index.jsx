import React from 'react';
import {Text,HStack,Flex} from '@chakra-ui/react';
import {LuChevronRight } from "react-icons/lu";
import BillsDetailForm from '../../components/billForm/detail';

const BillsDetail = () => {
  return (
   <div>
    <Flex justifyContent={"space-between"} p={6}>
      <Text fontSize="xl" fontWeight="medium">Bill Detail</Text>

      <HStack>
        <Text fontSize="l" fontWeight="medium"  _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Bills</Text>
        <LuChevronRight></LuChevronRight>
        <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Bill Detail</Text>
      </HStack>
    </Flex>
    <BillsDetailForm/>
   </div>
  );
};

export default BillsDetail;
