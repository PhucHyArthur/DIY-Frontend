import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Switch,
  Flex,
  Input,
  Progress,
  Tooltip 
} from "@chakra-ui/react";
import { LuMoveDown, LuChevronRight } from "react-icons/lu";
import { Link } from "react-router-dom";

const WarehouseTable = ({ warehouses }) => {
  const warehousesList = warehouses.map(warehouse => ({
    ...warehouse,
    progress: 80  
  }));

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderTop={"none"}
      m={10}
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>
              <Checkbox />
            </Th>
            <Th>Warehouse Name</Th>
            <Th>Address</Th>
            <Th>Capacity</Th>
            <Th w={'17%'}>Fill</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {warehousesList.map((Warehouse, index) => (
            <Tr key={index}>
              <Td>
                <Checkbox />
              </Td>
              <Th>{Warehouse.name}</Th>
              <Th>{Warehouse.address}</Th>
              <Th>{Warehouse.capacity}</Th>

              <Th>
              <Tooltip label={Warehouse.progress+"%"}>
              <Progress borderRadius={"4px"} value= {Warehouse.progress}/>
              </Tooltip>
              </Th>

              <Td>
                <HStack spacing={2}>
                  <Link to={`../edit/${Warehouse.id}`}>
                    <Button size="sm" colorScheme="green">
                      Edit
                    </Button>
                  </Link>

                  <Link to={`../detail/${Warehouse.id}`}>
                    <Button size="sm" colorScheme="blue">
                      View
                    </Button>
                  </Link>

                  <Button size="sm" colorScheme="red">
                    Delete
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default WarehouseTable;
