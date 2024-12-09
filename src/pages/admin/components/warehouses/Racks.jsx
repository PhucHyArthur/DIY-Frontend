import { Box, Button } from "@chakra-ui/react";
import React from "react";

const Racks = ({ rack, setRackId }) => {
  return (
    <Box
      padding={"8"}
      borderRadius={"6"}
      background={"#d8e0ea"}
      onClick={setRackId(rack.name)}
      position={"relative"}
      width={"7%"}
    >
      <Box
        borderRadius={"6px 0px 0px 6px"}
        position="absolute"
        bottom="0"
        left={0}
        width="30%"
        height="100%"
        backgroundColor="#b4c1d2"
        transition="height 0.3s ease"
      />
      <Box
        position="absolute"
        backgroundColor="white"
        borderRadius={"3"}
        padding={1}
        bottom={-3}
        left={0}
        right={0}
        margin={1}
        marginBottom={0}
        boxShadow="dark-lg"
        textAlign={"center"}
      >
        R{rack.id}
      </Box>
    </Box>
  );
};

export default Racks;
