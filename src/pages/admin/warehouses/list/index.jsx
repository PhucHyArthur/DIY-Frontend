import React, { useContext, useEffect, useState } from 'react';
import {Text,HStack,Flex,Box} from '@chakra-ui/react';
import {LuChevronRight } from "react-icons/lu";
import WarehouseTable from '../../components/warehouses/WarehouseTable';
import { DataContext } from '../../../../context/Context';

const WarehousesList = () => {
  const{warehouses} = useContext(DataContext)

  useEffect(()=>{
  },[])

  return (
    <Box>
    <Flex justifyContent={"space-between"} p={6}>
      <Text fontSize="xl" fontWeight="medium">Warehouses</Text>
      
      <HStack>
        <Text fontSize="l" fontWeight="medium"  _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Warehouses</Text>
        <LuChevronRight/>
        <Text fontSize="l" fontWeight="medium" color={"orange.400"}>List Warehouses</Text>
      </HStack>
    </Flex>
    <WarehouseTable warehouses={warehouses}/>
    </Box>
  )
}

export default WarehousesList