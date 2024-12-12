import React, { useContext } from "react";
import { DataContext } from "../../../../context/Context";
import { Box } from "@chakra-ui/react";
import Racks from "./Racks";
import FakeRacks from "./FakeRacks";

const Aisles = ({ aisle, setRackId }) => {
  const { racks } = useContext(DataContext);
  const filteredRacks = racks.filter((rack) => rack.aisle === aisle.id);
  const count = filteredRacks.length;

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      background={"gray"}
      borderRadius={"4px"}
      position={"relative"}
    >
      <Box
        width={5}
        background={"#e7ecf2"}
        position={"absolute"}
        top={4}
        bottom={4}
        left={0}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"0 4px 4px 0"}
        height={"auto"}
      >
        <p
          style={{
            transform: "rotate(-90deg)",
            whiteSpace: "nowrap",
            transformOrigin: "center",
            margin: 0,
            padding: 0,
          }}
        >
          Aisle {aisle.id}
        </p>
      </Box>

      <Box
        marginLeft={"33px"}
        display={"flex"}
        gap={"20px"}
        flexWrap={"wrap"}
        padding={"15px"}
      >
        {filteredRacks.map((rack) => (
          <Racks key={rack.id} rack={rack} setRackId={setRackId} />
        ))}

        {[...Array(aisle.number_of_racks - count)].map((_, index) => (
          <FakeRacks key={index} aisleId={aisle.id} />
        ))}
      </Box>
    </Box>
  );
};

export default Aisles;
