import React, { useContext, useEffect, useState } from 'react';
import {Text,HStack,Flex,Divider} from '@chakra-ui/react';
import {LuChevronRight } from "react-icons/lu";
import { useParams } from 'react-router-dom';
import WarehouseTable from '../../components/warehouses/WarehouseTable';

import { DataContext } from '../../../../context/Context';

const WarehousesList = () => {
  const{warehouses} = useContext(DataContext)

  useEffect(()=>{

  },[])

  return (
    <div>
    <Flex justifyContent={"space-between"} p={6}>
      <Text fontSize="xl" fontWeight="medium">Warehouses</Text>

      <HStack>
        <Text fontSize="l" fontWeight="medium"  _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Warehouses</Text>
        <LuChevronRight/>
        <Text fontSize="l" fontWeight="medium" color={"orange.400"}>List Warehouses</Text>
      </HStack>
    </Flex>
    <WarehouseTable warehouses={warehouses}/>
    </div>
  )
}

export default WarehousesList