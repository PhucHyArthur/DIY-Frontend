import React from 'react'
import {
  Text,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { LuChevronRight } from "react-icons/lu";
import { useParams } from 'react-router-dom';
import PersonForm from '../../../components/personForm';
const ClientsDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Client Detail</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium"   _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Clients</Text>
          <LuChevronRight/>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Client Detail</Text>
        </HStack>
      </Flex>
      <PersonForm id={id} type={"client"}/>
    </div>
  )
}

export default ClientsDetail