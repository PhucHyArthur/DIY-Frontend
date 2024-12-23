import React, { useState } from 'react';
import {Text,HStack,Flex} from '@chakra-ui/react';
import {LuChevronRight } from "react-icons/lu";
import BillsAddForm from '../../components/billForm/add-edit';

const BillsEdit = () => {
  
  return (
    <div>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Edit Bill</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium"  _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Bills</Text>
          <LuChevronRight></LuChevronRight>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Edit Bill </Text>
        </HStack>
      </Flex>
    <BillsAddForm/>
    </div>
  );
};

export default BillsEdit;
