import React, { useContext, useEffect, useState } from "react";
import { Text, HStack, Flex, Box, Divider, Image } from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";
import WarehouseTable from "../../components/warehouses/WarehouseTable";
import { DataContext } from "../../../../context/Context";
import "./index.css"
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

import materialImg from "../../../../image/diy.png"
import productImg from "../../../../image/finproduct.png"
const WarehousesList = () => {
  const { warehouses } = useContext(DataContext);
  const initialWarehouse = {
    name: "",
    capacity: 0,
    address: "",
  };
  const [warehouse, setWarehouse] = useState(initialWarehouse);
  useEffect(() => {}, []);

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

      <Flex justifyContent={"space-around"}>
        <Flex className="item-status" >
          <Image height={'15%'} src={materialImg} className="icon"/>
          <Stat>
            <StatLabel>Raw Material</StatLabel>
            <StatNumber>0.00</StatNumber>
            <StatHelpText>Quantity 0.00</StatHelpText>
          </Stat>
        </Flex>

        <Divider orientation="vertical" height={"100"} borderColor={'black'}/>

        <Flex className="item-status">
        <Image height={'15%'} src={productImg} className="icon"/>
          <Stat>
            <StatLabel>Finished Product</StatLabel>
            <StatNumber>0.00</StatNumber>
            <StatHelpText>Quantity 0.00</StatHelpText>
          </Stat>
        </Flex>

        <Divider orientation="vertical" height={"100"} borderColor={'black'}/>

        <Flex className="item-status">
          <Stat>
            <StatLabel>Working...</StatLabel>
            <StatNumber>0.00</StatNumber>
            <StatHelpText>xxx</StatHelpText>
          </Stat>
        </Flex>

        <Divider orientation="vertical" height={"100"} borderColor={'black'}/>

        <Flex className="item-status">
          <Stat>
            <StatLabel>Working...</StatLabel>
            <StatNumber>0.00</StatNumber>
            <StatHelpText>xxx</StatHelpText>
          </Stat>
        </Flex>
      </Flex>

      <WarehouseTable warehouses={warehouses} />
    </Box>
  );
};

export default WarehousesList;
