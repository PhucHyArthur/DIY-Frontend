import React from 'react';
import {
  Box, Input, Textarea, Switch, Button, Select, FormControl, FormLabel, Stack, HStack,
  Flex,
} from '@chakra-ui/react';
import SelectWithAddOption from '../selectWithAdd';
import { LuSearch, LuImagePlus } from "react-icons/lu";
import { Link } from 'react-router-dom';

const ProductForm = ({ id }) => {
  return (
    <Box p={8} bg="white" borderRadius="md" borderWidth="1px" shadow="md" maxWidth="1200px" maxHeight="1200px" mx="auto" marginTop={10}>
      <Stack direction={["column", "row"]} spacing={8}>
        {/* Left Column for Image Upload */}
        <Box flex="1">

        <FormControl mb={4} isRequired>
          <FormLabel>Upload Image</FormLabel>
            <Flex
              justify="center"
              align="center"
              width="100%"
              height="400px" // Optional: set the height for vertical centering
            >

              <Box
                border="2px dashed gray"
                borderRadius="md"
                p={4}
                alignContent="center"
                textAlign="center"
                className="hover:cursor-pointer"
                width="30vh"
                height="30vh"
              >

                <LuImagePlus size={48} className="mx-auto text-orange-500" />
                <p>Upload a cover image for your product.</p>
                <p>File Format jpeg, png. Recommended Size 600x600 (1:1)</p>

              </Box>

            </Flex>
          </FormControl>

          <FormControl>
            <FormLabel>Additional Images</FormLabel>
            <Flex gap={4} justifyContent={'space-between'}>
              
              <Box
                border="2px dashed gray"
                borderRadius="md"
                p={4}
                textAlign="center"
                className="hover:cursor-pointer"
                width="100px"
                height="100px"
              >
                <LuImagePlus size={24} className="mx-auto text-orange-500" />
              </Box>

              <Box
                border="2px dashed gray"
                borderRadius="md"
                p={4}
                textAlign="center"
                className="hover:cursor-pointer"
                width="100px"
                height="100px"
              >
                <LuImagePlus size={24} className="mx-auto text-orange-500" />
              </Box>

              <Box
                border="2px dashed gray"
                borderRadius="md"
                p={4}
                textAlign="center"
                className="hover:cursor-pointer"
                width="100px"
                height="100px"
              >
                <LuImagePlus size={24} className="mx-auto text-orange-500" />
              </Box>
              
            </Flex>
          </FormControl>
        
        </Box>

        {/* Right Column for Form Inputs */}
        
        <Box flex="2">
          <Stack spacing={4}>

            <FormControl isRequired>

              <FormLabel>Product Infomation</FormLabel>
                <HStack spacing={4}>
                  <Input placeholder="Product Id" />
                  <Input placeholder="Product Name" />
                </HStack>
              </FormControl>

            <FormControl isRequired>
              <SelectWithAddOption 
                type="Product"
              />
            </FormControl>
           
              <Input placeholder="Selling Price" />
            
            <FormControl isRequired>   
              <HStack spacing={4}>
                <Input placeholder="Quantity in Stock" />
                <Select placeholder="Select Unit Count">
                  <option value="piece">Piece</option>
                  <option value="box">Box</option>
                  <option value="dozen">Dozen</option>
                </Select>
              </HStack>
            </FormControl>

            <FormControl isRequired>
            <FormLabel>Location</FormLabel>
              <HStack>
                <Select placeholder="Zones">
                  <option value="rm1">RM1</option>
                  <option value="rm2">RM2</option>
                  <option value="fd1">FD1</option>
                  <option value="fd2">FD2</option>
                </Select>

                <Select placeholder="Aisles">
                  <option value="a1">A1</option>
                  <option value="a2">A2</option>
                </Select>

                <Select placeholder="Racks">
                  <option value="r1">R1</option>
                  <option value="r2">R2</option>
                </Select>

              </HStack>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Ingredients</FormLabel>
              
              <div className="relative">
                    <input type="text" placeholder="Search materials..."
                        className="bg-transparent outline-none border-[1px] border-[#ccc] rounded-full px-5 py-2 w-full" />
                    <div className="absolute right-2 top-1/2 translate-y-[-50%] border-[1px] border-[#ccc] p-[6px] rounded-full cursor-pointer bg-gray-300 hover:bg-gray-500">
                        <LuSearch />
                    </div>
                </div>

              <HStack marginTop={4}>
                <Button colorScheme="blue" borderRadius={40}>Ingredient 1</Button>
                <Button colorScheme="blue" borderRadius={40}>Ingredient 2</Button>
                <Button colorScheme="blue" borderRadius={40}>Ingredient 3</Button>
              </HStack>
              
            </FormControl>
            
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Description" />
            </FormControl>

            <FormControl display="flex" alignItems="center" isRequired gap={4} justifyContent={"space-between"}>
                
                <FormLabel mb="0" width={"auto"}>Add Expiry Date</FormLabel>
                
                <HStack>
                  <Select width={"20vw"} placeholder="Expiry time">
                    <option value="r2">3 months from the date</option>
                    <option value="r2">6 months from the date</option>
                    <option value="r2">1 year from the date</option>
                  </Select>
                </HStack>
                <Input type="date" defaultValue="2024-10-26" w={"auto"}/>
            </FormControl>
          </Stack>
        
        </Box>
      
      </Stack>

      {/* Save and Draft Buttons */}
      <HStack mt={8} justify="flex-end">
      <Link to={"../list"}>
        <Button variant="outline" colorScheme="blue">Close</Button>
      </Link>
        
        <Button colorScheme="orange">Save</Button>
      
      </HStack>
    </Box>
    
  );
};

export default ProductForm;
