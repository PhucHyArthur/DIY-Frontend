import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { DataContext } from "../../../../context/Context";
import Aisles from "./Aisles";
const Zones = ({ zone, setRackId }) => {
  const { aisles } = useContext(DataContext);
  return (
    <Box
      background={"#e7ecf2"}
      padding={"30px"}
      width={"100%"}
      position={"relative"}
      borderRadius={8}
    >
      <Box
        position={"absolute"}
        top={0}
        left={0}
        background={"white"}
        padding={2}
        borderRadius={"0 0px 8px 0"}
      >
        {zone.name}
      </Box>
      <Box display={"flex"} gap={4} flexDirection={"column"} marginTop={5}>
        {aisles
          .filter((aisle) => aisle.zone == zone.id)
          .map((aisle) => (
            <Aisles aisle={aisle} setRackId={setRackId} />
          ))}
      </Box>
    </Box>
  );
};

export default Zones;
