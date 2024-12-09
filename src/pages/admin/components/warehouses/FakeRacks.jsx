import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const FakeRacks = () => {
  return (
    <Box
      padding={"8"}
      borderRadius={"6"}
      background={"#d8e0ea"}
      position={'relative'}
      width={'7%'}
      display="flex"
      justifyContent="center"
      alignItems="center"
      _hover={{
        cursor: 'pointer',
        background: '#b0c4de',
      }}
    />
  );
};

export default FakeRacks;
