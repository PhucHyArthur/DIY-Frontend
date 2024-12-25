import React from 'react'
import {
  Text,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { LuChevronRight } from "react-icons/lu";
import { useParams } from 'react-router-dom';
import SupplierTabs from '../../../components/supplierTabs'
const SuppliersEdit = () => {
  return (
    <div>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Edit Supplier</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium"   _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Suppliers</Text>
          <LuChevronRight/>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Edit Supplier</Text>
        </HStack>
      </Flex>
      <SupplierTabs action ='edit'/>
    </div>
  )
}

export default SuppliersEdit