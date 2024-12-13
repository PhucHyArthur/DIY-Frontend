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
} from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import axios from "axios";
import { API, INVENTORY } from "../../../../constant/API";
import { TokenContext } from "../../../../context/TokenContext";

const MaterialForm = ({ id = null, mode = "add" }) => {
  const {token} = useContext(TokenContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([null, null, null]);
  const [isLoading, setIsLoading] = useState(mode !== "add");

  useEffect(() => {
    if (mode === "edit" || mode === "detail") {
      const fetchMaterial = async () => {
        try {
          const response = await axios.get(`${API}${INVENTORY.Material_Detail}${id}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data;
          setName(data.name);
          setCategory(data.category);
          setDescription(data.description);
          setMainImage(data.images[0]?.url || null);
          setAdditionalImages(data.images.slice(1) || []);
        } catch (error) {
          console.error("Error fetching material details:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchMaterial();
    }
  }, [id, mode, token]);

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
    }
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
    formData.append("description", description);

    if (mainImage instanceof File) {
      formData.append("images", mainImage);
    }

    additionalImages.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
    });

    try {
      if (mode === "add") {
        await axios.post(`${API}${INVENTORY.Material_Create}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Material created successfully!");
      } else if (mode === "edit") {
        await axios.put(`${API}${INVENTORY.Material_Update}${id}/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Material updated successfully!");
      }
    } catch (error) {
      console.error("Error submitting material:", error);
      alert("Failed to submit material!");
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
        {/* Left Column for Image Upload */}
        <Box flex="1">
          <FormControl mb={4}>
            <FormLabel>Upload Main Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={handleMainImageUpload}
              style={{ display: "none" }}
              id="main-image-upload"
              disabled={mode === "detail"}
            />
            <Flex justify="center" align="center" height="250px">
              <label htmlFor="main-image-upload">
                <Box
                  border="2px dashed gray"
                  borderRadius="md"
                  p={4}
                  textAlign="center"
                  className="hover:cursor-pointer"
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
                  {!mainImage && mode !== "detail" && (
                    <>
                      <LuImagePlus size={48} className="mx-auto text-orange-500" />
                      <p>Upload a cover image for your material.</p>
                      <p>File Format jpeg, png. Recommended Size 600x600 (1:1)</p>
                    </>
                  )}
                </Box>
              </label>
            </Flex>
          </FormControl>

          <FormControl>
            <FormLabel>Additional Images</FormLabel>
            <Flex gap={4} mt={2}>
              {additionalImages.map((image, index) => (
                <Box key={index}>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleAdditionalImageUpload(e, index)}
                    style={{ display: "none" }}
                    id={`additional-image-upload-${index}`}
                    disabled={mode === "detail"}
                  />
                  <label htmlFor={`additional-image-upload-${index}`}>
                    <Box
                      border="2px dashed gray"
                      borderRadius="md"
                      p={4}
                      textAlign="center"
                      className="hover:cursor-pointer"
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
                      {!image && mode !== "detail" && (
                        <LuImagePlus size={24} className="mx-auto text-orange-500" />
                      )}
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
              <FormLabel>Material Name</FormLabel>
              <Input
                placeholder="Material Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isReadOnly={mode === "detail"}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input
                placeholder="Add Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                isReadOnly={mode === "detail"}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isReadOnly={mode === "detail"}
              />
            </FormControl>
          </Stack>

          {mode !== "detail" && (
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
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default MaterialForm;
