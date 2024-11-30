import React from 'react'
import {
  Text,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { LuChevronRight } from "react-icons/lu";
import { useParams } from 'react-router-dom';
import PersonForm from '../../../components/personForm';
const ClientsAdd = () => {
  return (
    <div>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Add New Client</Text>

        <HStack>
          <Text fontSize="l" fontWeight="medium"   _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Clients</Text>
          <LuChevronRight/>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Add Client</Text>
        </HStack>
      </Flex>
      <PersonForm type={"client"}/>
    </div>
  )
}
export default ClientsAdd