import React from 'react'
import {
  Text,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { LuChevronRight } from "react-icons/lu";
import { useParams } from 'react-router-dom';
import SupplierTabs from '../../../components/supplierTabs'
const SuppliersDetail = () => {
  return (
    <div>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Supplier Detail</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium"   _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Suppliers</Text>
          <LuChevronRight/>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Supplier Detail</Text>
        </HStack>
      </Flex>
      <SupplierTabs action = 'detail'/>
      </div>
  )
}

export default SuppliersDetail