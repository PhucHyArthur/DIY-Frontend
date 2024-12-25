import { Box, Tooltip } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../../context/Context";

const Racks = ({ rack, setRackId }) => {
  const { locations, materials, products } = useContext(DataContext);
  const [rackItems, setRackItems] = useState(0);
  const [progress, setProgress] = useState(0);
  const [processBgColor, setProcessBgColor] = useState("#3dc4a4");
  const [bgColor, setBgColor] = useState("#b9e5d4");
  const setColor = (num) => {
    if (num >= 90) {
      setProcessBgColor("#d7504d");
      setBgColor("#fec8c6");
    } else if (num >= 60) {
      setProcessBgColor("#fc7303");
      setBgColor("#f5ddc3");
    }
  };

  useEffect(() => {
    let newPList = products.filter((item) => item.rack == rack.id);
    let newMList = [];
    materials.forEach((item) => {
      item.raw_materials_lines
        ? item.raw_materials_lines.forEach((line) => {
            if (line.rack == rack.id) {
              const newM = {
                name: item.name,
                quantity: line.quantity,
                line_total: line.line_total,
                price_per_unit: line.price_per_unit,
              };
              newMList.push(newM);
            }
          })
        : "";
    });

    if ((newPList || newMList) && rack && rack.id) {
      const totalQuantity =
        (newPList.length > 0
          ? newPList.reduce((acc, item) => acc + Number(item.total_quantity), 0)
          : 0) +
        (newMList.length > 0
          ? newMList.reduce((acc, item) => acc + Number(item.quantity), 0)
          : 0);
      console.log("Rack: ", rack.id, totalQuantity);
      setRackItems(totalQuantity);
      setProgress((totalQuantity / rack.capacity) * 100);
      setColor((totalQuantity / rack.capacity) * 100);
    } else {
      setRackItems(0);
    }
  }, [locations, rack.id]);

  return (
    <Tooltip
      label={`${rack.name} | ${progress}% Fillness | Capacity: ${rackItems}/${rack.capacity}`}
    >
      <Box position={"relative"}>
        {" "}
        <Box
          padding={"8"}
          borderRadius={"6px"}
          background={bgColor}
          position={"relative"}
          width={"7%"}
          _hover={{
            cursor: "pointer",
          }}
          overflow={"hidden"}
          onClick={() => setRackId(rack.id)}
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
        </Box>
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
