import React from 'react'
import {
  Text,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { LuChevronRight } from "react-icons/lu";
import { useParams } from 'react-router-dom';
import SupplierTabs from '../../../components/supplierTabs'
const SuppliersAdd = () => {
  return (
    <div>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Add New Supplier</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium"   _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Suppliers</Text>
          <LuChevronRight/>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Add Supplier</Text>
        </HStack>
      </Flex>
      <SupplierTabs/>
    </div>
  )
}

export default SuppliersAdd