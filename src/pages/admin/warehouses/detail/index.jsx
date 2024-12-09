import React, { useContext, useEffect, useState } from "react";
import { Text, HStack, Flex, Divider, Box } from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";
import { useParams } from "react-router-dom";
import WarehouseTable from "../../components/warehouses/WarehouseTable";

import { DataContext } from "../../../../context/Context";
import Zones from "../../components/warehouses/Zones";

const WareshousesDetail = () => {
  const { zones } = useContext(DataContext);
  const [rackId, setRackId] = useState(null)
  const { warehouseId } = useParams();

  console.log("rackId : ",rackId)
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
        <Flex width={"60%"} gap={4} alignItems={'center'} justifyContent={'center'}>
          {zones
            .filter((item) => item.warehouse == warehouseId)
            .map((zone) => (
              <Zones zone={zone} setRackId={setRackId}/>
            ))}
        </Flex>
        <Flex width={"40%"} background={"yellow.100"}>{rackId}</Flex>
      </Flex>
    </Box>
  );
};

export default WareshousesDetail;
