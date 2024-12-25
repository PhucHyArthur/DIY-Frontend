import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Stack,
  HStack,
  Flex,
  Select,
  useToast,

} from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API, INVENTORY } from "../../../../constant/API";
import { TokenContext } from "../../../../context/TokenContext";
import { DataContext } from "../../../../context/Context";


const ProductForm = ({ id, mode}) => {
  const { token } = useContext(TokenContext);
  const { racks,getProducts,products } = useContext(DataContext);
  // State chung cho form
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [rack, setRack] = useState("");
  const [binNumber, setBinNumber] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // State cho ảnh
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([null, null, null]);
  const [isLoading, setIsLoading] = useState(mode !== "add");

  const toast = useToast()
  const naviagte = useNavigate()



  useEffect(() => {
    if (mode === "edit" || mode === "detail") {
      if (!products || products.length === 0) {
        console.error("Products are empty or not loaded");
        return;
      }
  
      const product = products.find((p) => p.id === Number(id.productId) || p.id === id.productId);
      console.log("Found product:", product);
  
      if (product) {
        setName(product.name);
        setCategory(product.category);
        setSellingPrice(product.selling_price);
        setTotalQuantity(product.total_quantity);
        setUnit(product.unit);
        setRack(product.rack || "");
        setBinNumber(product.bin_number || "");
        setDescription(product.description);
        setExpiryDate(product.expired_date);
        setMainImage(product.images[0]?.url || null);
        setAdditionalImages(product.images.slice(1) || []);
      } else {
        console.error("Product not found in context");
      }
      setIsLoading(false);
    }
  }, [id, mode, products]);
  
  

  // Xử lý upload ảnh
  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setMainImage(file);
  };

  const handleAdditionalImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...additionalImages];
      updatedImages[index] = file;
      setAdditionalImages(updatedImages);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("selling_price", sellingPrice);
    formData.append("total_quantity", totalQuantity);
    formData.append("unit", unit);
    formData.append("description", description);
    formData.append("expired_date", expiryDate);
    formData.append("rack", rack);
    formData.append("bin_number", binNumber);
  
    if (mainImage instanceof File)
      formData.append("uploaded_images", mainImage);
    additionalImages.forEach((image) => {
      if (image instanceof File) formData.append("uploaded_images", image);
    });
  
    try {
      if (mode === "add") {
        await axios.post(`${API}${INVENTORY.Product_Create}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
  
        toast({
          title: "Product Created",
          description: "The product has been created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        getProducts()
        naviagte("../list")
      } else if (mode === "edit") {
        console.log('update')
        await axios.put(`${API}${INVENTORY.Product_Update}`.replace("<int:pk>", id.productId), formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
  
        toast({
          title: "Product Updated",
          description: "The product has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true
        });
      }
    } catch (error) {
      console.error("Error submitting product:", error);
  
      toast({
        title: "Submission Failed",
        description: {error},
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };
  

  return (
    <Box
      p={8}
      bg="white"
      borderRadius="md"
      shadow="md"
      borderWidth="1px"
      maxWidth="1200px"
      mx="auto"
      mt={10}
    >
      <Stack direction={["column", "row"]} spacing={8}>
        {/* Left Column for Images */}
        <Box flex="1">
          <FormControl mb={4}>
            <FormLabel>Upload Main Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={handleMainImageUpload}
              id="main-image-upload"
              style={{ display: "none" }}
            />
            <Flex justify="center" align="center" height="250px">
              <label htmlFor="main-image-upload">
                <Box
                  border="2px dashed gray"
                  borderRadius="md"
                  width="30vh"
                  height="30vh"
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  style={{
                    backgroundImage:
                      mainImage && !(mainImage instanceof File)
                        ? `url(${mainImage})`
                        : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!mainImage && <LuImagePlus size={48}/>}
                </Box>
              </label>
            </Flex>
          </FormControl>

          <FormControl>
            <FormLabel>Additional Images</FormLabel>
            <Flex gap={4}>
              {additionalImages.map((image, index) => (
                <Box key={index}>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleAdditionalImageUpload(e, index)}
                    id={`additional-image-upload-${index}`}
                    style={{ display: "none" }}
                  />
                  <label htmlFor={`additional-image-upload-${index}`}>
                    <Box
                      border="2px dashed gray"
                      borderRadius="md"
                      width="100px"
                      height="100px"
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      style={{
                        backgroundImage:
                          image && !(image instanceof File)
                            ? `url(${image})`
                            : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {!image && <LuImagePlus size={24} />}
                    </Box>
                  </label>
                </Box>
              ))}
            </Flex>
          </FormControl>
        </Box>

        {/* Right Column for Form Inputs */}
        <Box flex="2">
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Selling Price</FormLabel>
              <Input
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Quantity in Stock</FormLabel>
              <Input
                value={totalQuantity}
                onChange={(e) => setTotalQuantity(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Unit Count</FormLabel>
              <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Location</FormLabel>
              <Flex gap={3}>
              <Select
                value={rack}
                onChange={(e) => setRack(e.target.value)}
              >
                {racks.map((rack) => (
                  <option value={rack.id} key={rack.id}>
                    {rack.name}
                  </option>
                ))}
              </Select>
              <Input
                value={binNumber}
                placeholder="Bin Number"
                onChange={(e) => setBinNumber(e.target.value)}
              />
              </Flex>
            </FormControl>

            <FormControl>
              <FormLabel>Expiry Date</FormLabel>
              <Input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </Stack>

          <HStack mt={8} justify="flex-end">
            <Link to="../list">
              <Button variant="outline" colorScheme="blue">
                Close
              </Button>
            </Link>
            <Button colorScheme="orange" onClick={handleSubmit}>
              {mode === "add" ? "Save" : "Update"}
            </Button>
          </HStack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductForm;
