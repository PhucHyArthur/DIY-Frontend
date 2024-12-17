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
} from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import axios from "axios";
import { API, INVENTORY } from "../../../../constant/API";
import { TokenContext } from "../../../../context/TokenContext";

const ProductForm = ({ id = null, mode = "add" }) => {
  const { token } = useContext(TokenContext);

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

  useEffect(() => {
    if (mode === "edit" || mode === "detail") {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `${API}${INVENTORY.Product_Detail}${id}/`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const data = response.data;

          setName(data.name);
          setCategory(data.category);
          setSellingPrice(data.selling_price);
          setTotalQuantity(data.total_quantity);
          setUnit(data.unit);
          setRack(data.location?.rack || "");
          setBinNumber(data.location?.bin_number || "");
          setDescription(data.description);
          setExpiryDate(data.expired_date);
          setMainImage(data.images[0]?.url || null);
          setAdditionalImages(data.images.slice(1) || []);
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, mode, token]);

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
    formData.append("location", JSON.stringify({ rack, bin_number: binNumber }));

    if (mainImage instanceof File) formData.append("uploaded_images", mainImage);
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
        alert("Product created successfully!");
      } else if (mode === "edit") {
        await axios.put(`${API}${INVENTORY.Product_Update}${id}/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Product updated successfully!");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Failed to submit product!");
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
                  style={{
                    backgroundImage:
                      mainImage && !(mainImage instanceof File)
                        ? `url(${mainImage})`
                        : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!mainImage && <LuImagePlus size={48} />}
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
              <Input value={category} onChange={(e) => setCategory(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Selling Price</FormLabel>
              <Input value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Quantity in Stock</FormLabel>
              <Input value={totalQuantity} onChange={(e) => setTotalQuantity(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Select Unit Count</FormLabel>
              <input value={unit} onChange={(e) => setUnit(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input value={rack} placeholder="Rack" onChange={(e) => setRack(e.target.value)} />
              <Input
                mt={2}
                value={binNumber}
                placeholder="Bin Number"
                onChange={(e) => setBinNumber(e.target.value)}
              />
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
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
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
