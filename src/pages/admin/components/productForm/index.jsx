import React , { useState, useContext, useEffect } from 'react';
import {
  Box, Input, Textarea, Switch, Button, Select, FormControl, FormLabel, Stack, HStack,
  Flex,
} from '@chakra-ui/react';
import SelectWithAddOption from '../selectWithAdd';
import { LuSearch, LuImagePlus } from "react-icons/lu";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DataContext } from '../../../../context/Context';
import { API,INVENTORY } from '../../../../constant/API';
import CustomToast from '../../../../components/Toast';



const ProductForm = ({ id , type}) => {
  const {getProducts, products, racks}= useContext(DataContext)
  const [token] = useState(localStorage.getItem('authToken'));
  const showToast = CustomToast(); 
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    category: '',
    sellingPrice: '',
    totalQuantity: '',
    unit: '',
    rack: '',
    description: '',
    expiryDate: '',
    expiryTime: '',
    binNumber: '',
  
  });

  // Tự động tìm sản phẩm khi `id` thay đổi
  useEffect(() => {
    if (id?.productId && Array.isArray(products)) {
      const product = products.find((p) => p.id === id.productId || p.id === Number(id.productId));
      if (product) {
        setFormData({
          productId: product.id || "",
          productName: product.name || "",
          category: product.category || "",
          sellingPrice: product.selling_price || "",
          totalQuantity: product.total_quantity || "",
          unit: product.unit || "",
          rack: product.location?.rack || "",
          description: product.description || "",
          expiryDate: product.expired_date || "",
          expiryTime: "",
          binNumber: product.location?.bin_number || "",
        });
      }
    }
  }, [id, products]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      name: formData.productName,
      category: formData.category,
      selling_price: formData.sellingPrice,
      total_quantity: formData.totalQuantity,
      unit: formData.unit,
      location: {
        rack: formData.rack,
        bin_number: formData.binNumber,
      },
      description: formData.description,
      expired_date: formData.expiryDate,
      images: [],
    };
  
    try {
      if (type === "add") {
        // Thực hiện tạo mới sản phẩm
        const response = await axios.post(
          `${API}${INVENTORY.Product_Create}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log('Product created:', response.data);
        showToast("success", "Product Added", "Product created successfully!");
      } else if (type === "edit") {
        // Thực hiện cập nhật sản phẩm
        console.log(`${API}${INVENTORY.Product_Update.replace("<int:pk>", formData.productId)}`)
        const response = await axios.put(
          `${API}${INVENTORY.Product_Update.replace("<int:pk>", formData.productId)}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log('Product updated:', response.data);
        showToast("success", "Product Updated", "Product updated successfully!");
      }
  
      await getProducts(); // Cập nhật danh sách sản phẩm
    } catch (error) {
      console.error('Error submitting product:', error.response || error);
      showToast("error", "Product Error", "Failed to submit product!");
    }
  };  

  const calculateExpiryDate = (expiryTime) => {
    const today = new Date();
    switch (expiryTime) {
      case '15_days' :
        today.setDate(today.getDate() + 15)
      case '3_months':
        today.setMonth(today.getMonth() + 3);
        break;
      case '6_months':
        today.setMonth(today.getMonth() + 6);
        break;
      case '1_year':
        today.setFullYear(today.getFullYear() + 1);
        break;
      default:
        break;
    }
    return today.toISOString().split('T')[0]; // Format YYYY-MM-DD
  };

  const handleExpiryTimeChange = (e) => {
    const selectedExpiryTime = e.target.value;
    const calculatedDate = calculateExpiryDate(selectedExpiryTime);
  
    setFormData((prev) => ({
      ...prev,
      expiryTime: selectedExpiryTime,
      expiryDate: calculatedDate,
    }));
  };
  
  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      category, // Cập nhật giá trị category trong formData
    }));
  };


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
                  <Input 
                  name="productId"
                  value={formData.productId}
                  placeholder="Product Id" 
                  isDisabled={true}/>
                  <Input 
                  name="productName"
                  placeholder="Product Name"
                  value={formData.productName}
                  onChange={handleInputChange} />
                </HStack>
              </FormControl>

            <FormControl isRequired>
              <SelectWithAddOption 
                type="Product"
                onCategoryChange={handleCategoryChange}
              />
            </FormControl>
           
              <Input 
              name="sellingPrice"
              placeholder="Selling Price"
              value={formData.sellingPrice}
              onChange={handleInputChange}
              />
            
            <FormControl isRequired>   
              <HStack spacing={4}>
                <Input 
                name="totalQuantity"
                placeholder="Quantity in Stock"
                value={formData.totalQuantity}
                onChange={handleInputChange} 
                />
                <Select 
                name="unit"
                placeholder="Select Unit Count"
                value={formData.unit}
                onChange={handleInputChange}
                >
                  <option value="1.00">1.00</option>
                  <option value="piece">Piece</option>
                  <option value="box">Box</option>
                  <option value="dozen">Dozen</option>
                </Select>
              </HStack>
            </FormControl>

            <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <HStack>
              <Select
                name="rack"
                placeholder="Racks"
                value={formData.rack}
                onChange={handleInputChange}
              >
                {racks.map((rack) => (
                  <option key={rack.id} value={rack.id}>
                    {rack.name}
                </option>
                ))}
              </Select>
            </HStack>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Bin Number</FormLabel>
              
              <Input 
              name="binNumber"
              placeholder="Bin Number"
              value={formData.binNumber}
              onChange={handleInputChange}
              />
              
            </FormControl>
            
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
              name="description" 
              placeholder="Description" 
              value={formData.description}
              onChange={handleInputChange}
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" isRequired gap={4} justifyContent={"space-between"}>
                
                <FormLabel mb="0" width={"auto"}>Add Expiry Date</FormLabel>
                
                <HStack>
                  <Select 
                   width="20vw"
                   placeholder="Expiry time"
                   value={formData.expiryTime}
                   onChange={handleExpiryTimeChange}
                  >
                    <option value="15_days">15 days from the date</option>
                    <option value="3_months">3 months from the date</option>
                    <option value="6_months">6 months from the date</option>
                    <option value="1_year">1 year from the date</option>
                  </Select>
                </HStack>
                <Input type="date" value={formData.expiryDate} readOnly w={"auto"}/>
            </FormControl>
          </Stack>
        
        </Box>
      
      </Stack>

      {/* Save and Draft Buttons */}
      <HStack mt={8} justify="flex-end">
      <Link to={"../list"}>
        <Button variant="outline" colorScheme="blue">Close</Button>
      </Link>
        
        <Button colorScheme="orange" onClick={handleSubmit}>{type === "add" ? "Add Product" : "Update Product"}</Button>
      
      </HStack>
    </Box>
    
  );
};

export default ProductForm;
