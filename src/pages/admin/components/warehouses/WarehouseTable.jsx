import React, {useState, useContext, useEffect} from "react";
import {
  Box,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
  Progress,
  Tooltip 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../../context/Context";

const WarehouseTable = ({ warehouses, progress }) => {
  const {loactions } = useContext(DataContext);

  const [warehousesList, setWarehousesList] = useState(
    warehouses.map(warehouse => ({
      ...warehouse,
      progress: progress
    }))
  );
  
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
              <Th>{Warehouse.progress +"/"+Warehouse.capacity}</Th>

              <Th>
              <Tooltip label={(Warehouse.progress/Warehouse.capacity)*100+"%"}>
              <Progress borderRadius={"4px"} value= {(Warehouse.progress/Warehouse.capacity)*100}/>
              </Tooltip>
              </Th>

              <Td>
                <HStack spacing={2}>
                  
                  {/* <Link to={`../edit/${Warehouse.id}`}>
                    <Button size="sm" colorScheme="green">
                      Edit
                    </Button>
                  </Link> */}

                  <Link to={`../detail/${Warehouse.id}`}>
                    <Button size="sm" colorScheme="blue">
                      View
                    </Button>
                  </Link>

                {/* 
                  <Button size="sm" colorScheme="red">
                    Delete
                  </Button> */}
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
