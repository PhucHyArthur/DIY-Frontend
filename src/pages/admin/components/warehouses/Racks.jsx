import { Box, Tooltip } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../../context/Context";
import { progress } from "framer-motion";

const Racks = ({ rack, setRackId }) => {

  const { locations } = useContext(DataContext);
  const [rackItems, setRackItems] = useState(0);
  const [progress, setProgress] = useState(0);
  const[processBgColor,setProcessBgColor] = useState("#3dc4a4");
  const[bgColor,setBgColor] = useState("#b9e5d4");
  const setColor = (num) =>{
    if (num >= 90) {
      setProcessBgColor("#d7504d")
      setBgColor("#fec8c6")
    } else if (num >= 60) {
      setProcessBgColor("#fc7303")
      setBgColor("#f5ddc3")
    }
  }

  useEffect(() => {
    if (locations && rack && rack.id) {
      const totalQuantity = locations
        .filter(item => item.rack === rack.id)
        .reduce((acc, item) => acc + Number(item.quantity), 0);
      setRackItems(totalQuantity);
      setProgress((totalQuantity/rack.capacity)*100)
      setColor((totalQuantity/rack.capacity)*100)
    } else {
      setRackItems(0);
    }

  }, [locations, rack.id]);

  return (
    <Tooltip
      label={`${rack.name} | ${progress}% Fillness | Capacity: ${rackItems}/${rack.capacity}`}
    >
      <Box
        padding={"8"}
        borderRadius={"6"}
        background={bgColor}
        position={"relative"}
        width={"7%"} // Adjusted width for better click area
        _hover={{
          cursor: "pointer",
          // background: "#b0c4de",
          // transition: "background 0.3s",
        }}
        onClick={() => setRackId(rack.id)} // Set rack ID on click
      >
        {/* Rack Fillness Indicator */}
        <Box
          borderRadius={"6px"}
          position="absolute"
          bottom="0"
          left={0}
          width={`${progress}%`}
          maxW={"100%"}
          height="100%"
          backgroundColor={processBgColor}
          transition="height 0.3s ease"
        />

        {/* Rack Label */}
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
    </Tooltip>
  );
};

export default Racks;
