import React from 'react'
import {Text,HStack,Flex} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import ProductForm from '../../../components/productForm';
import {LuChevronRight } from "react-icons/lu";
const ProductsDetail = () => {
  const productId = useParams()
  return (
    <div>
      <Flex justifyContent={"space-between"} p={6}>
      <Text fontSize="xl" fontWeight="medium">Product Detail</Text>

      <HStack>
        <Text fontSize="l" fontWeight="medium"  _hover={{color: "orange.500", cursor: "pointer", transition:"all, 0.5s"}}>Products</Text>
        <LuChevronRight/>
        <Text fontSize="l" fontWeight="medium" color={"orange.400"}>Product Detail</Text>
      </HStack>
    </Flex>
    <ProductForm id={productId} mode="detail"/>
    </div>

  )
}

export default ProductsDetail