import React from 'react';
import { Text, HStack, Flex } from '@chakra-ui/react';
import { LuChevronRight } from "react-icons/lu";
import ProductForm from '../../../components/productForm';

const ProductsAdd = () => {
  return (
    <div>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">Add New Product</Text>

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
            Products
          </Text>
          <LuChevronRight />
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>
            Add Product
          </Text>
        </HStack>
      </Flex>
      <ProductForm id={null} mode="add" />
    </div>
  );
};

export default ProductsAdd;
