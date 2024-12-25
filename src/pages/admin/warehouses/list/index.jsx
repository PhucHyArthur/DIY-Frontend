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
  const { warehouses,products,materials } = useContext(DataContext);
  const initialWarehouse = {
    name: "",
    capacity: 0,
    address: "",
  };

  const [warehouse, setWarehouse] = useState(initialWarehouse);

  const [material, setMaterial] = useState({
    item: materials.length,
    quantity:materials.reduce((acc,val)=>acc+val.total_quantity,0),
    capacity: materials.reduce((acc, val) => {
      return acc + (val.raw_materials_lines.length > 0 
        ? val.raw_materials_lines.reduce((innerAcc, innerVal) => innerAcc + innerVal.quantity, 0) 
        : 0);
    }, 0)
  })

  const [product, setProduct] = useState({
    item: products.length,
    quantity:products.reduce((acc,val)=>acc+val.total_quantity,0),
    capacity:products.reduce((acc,val)=>acc+val.total_quantity*parseFloat(val.unit),0)
  })

  const [progress,setProgress] = useState(product.capacity+material.capacity)

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
            <StatLabel>Number of items: {material.item}</StatLabel>
            <StatNumber>{material.capacity}</StatNumber>
            <StatHelpText>Quantity {material.quantity}</StatHelpText>
          </Stat>
        </Flex>

        <Divider orientation="vertical" height={"100"} borderColor={'black'}/>

        <Flex className="item-status">
        <Image height={'15%'} src={productImg} className="icon"/>
          <Stat>
            <StatLabel>Finished Product</StatLabel>
            <StatLabel>Number of items: {product.item}</StatLabel>
            <StatNumber>{product.capacity}</StatNumber>
            <StatHelpText>Quantity {product.quantity}</StatHelpText>
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

      <WarehouseTable warehouses={warehouses} progress={progress}/>
    </Box>
  );
};

export default WarehousesList;
