import React, { useContext, useEffect, useState } from "react";
import { Text, HStack, Flex, Divider, Box } from "@chakra-ui/react";
import { LuChevronRight,LuMenu } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { DataContext } from "../../../../context/Context";
import Zones from "../../components/warehouses/Zones";

const WareshousesDetail = () => {
  const { zones } = useContext(DataContext);
  const { warehouseId } = useParams();
  const [selectedRackId, setSelectedRackId] = useState(null);

  return (
    <Box>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">
          Warehouses
        </Text>

        <HStack>
          <Text
            fontSize="l"
            fontWeight="medium"
            _hover={{
              color: "orange.500",
              cursor: "pointer",
              transition: "all, 0.5s",
            }}
          >
            Warehouses
          </Text>
          <LuChevronRight />
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>
            List Warehouses
          </Text>
        </HStack>
      </Flex>
      <Flex>
        
      </Flex>
      <Flex>
        <Flex width={"60%"} gap={4} alignItems={'start'} flexDirection={'column'} marginLeft={"3%"} marginRight={"3%"}>
          {zones
            .filter((item) => item.warehouse == warehouseId)
            .map((zone) => (
              <Zones zone={zone} setRackId={setSelectedRackId} />
            ))}
        </Flex>
        <Flex width={"40%"} background={"yellow.100"}>{selectedRackId}</Flex>
      </Flex>
    </Box>
  );
};

export default WareshousesDetail;
