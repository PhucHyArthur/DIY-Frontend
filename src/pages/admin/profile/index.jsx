import React from 'react';
import PersonForm from '../components/personForm';
import {Text,HStack,Flex} from '@chakra-ui/react';
import {LuChevronRight } from "react-icons/lu";
import ChangePasswordForm from '../components/changePasswordForm';
const UserProfile = () =>  {
  return (
    <div>
        <Flex justifyContent={"space-between"} p={6}>
          <Text fontSize="xl" fontWeight="medium">User profile view/edit</Text>

          <HStack>
            <Text fontSize="l" fontWeight="medium"  _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>User</Text>
            <LuChevronRight></LuChevronRight>
            <Text fontSize="l" fontWeight="medium" color={"orange.400"}>User profile view/edit</Text>
          </HStack>
        </Flex>
        <PersonForm type="user"/>
        <ChangePasswordForm/>
    </div>
  );
};
export default UserProfile