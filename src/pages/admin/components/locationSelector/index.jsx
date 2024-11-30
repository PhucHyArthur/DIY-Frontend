import React, { useState } from 'react';
import { FormControl, FormLabel, Select, Box, HStack } from '@chakra-ui/react';

const vietnamProvinces = {
  "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Tây Hồ"],
  "Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 5"],
  "Đà Nẵng": ["Hải Châu", "Liên Chiểu", "Sơn Trà"]
};

const wardsByDistrict = {
  "Ba Đình": ["Phúc Xá", "Trúc Bạch", "Nguyễn Trung Trực"],
  "Hoàn Kiếm": ["Chương Dương", "Cửa Đông", "Hàng Bạc"],
  "Tây Hồ": ["Bưởi", "Phú Thượng", "Thụy Khuê"],
  "Quận 1": ["Bến Nghé", "Bến Thành", "Phạm Ngũ Lão"],
  "Quận 3": ["Phường 1", "Phường 2", "Phường 3"],
  "Hải Châu": ["Hải Châu 1", "Hải Châu 2", "Hòa Cường Bắc"]
};

const VietnamLocationSelector = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setSelectedDistrict("");  // Reset district and ward when province changes
    setWards([]);
    
    if (vietnamProvinces[province]) {
      setDistricts(vietnamProvinces[province]);
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    
    if (wardsByDistrict[district]) {
      setWards(wardsByDistrict[district]);
    } else {
      setWards([]);
    }
  };

  return (
    <Box>
      <HStack>
      <FormControl mb={4} isRequired>
        <FormLabel>Province/City</FormLabel>
        <Select placeholder="Select Province/City" onChange={handleProvinceChange}>
          {Object.keys(vietnamProvinces).map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={4} isDisabled={!selectedProvince} isRequired>
        <FormLabel>District</FormLabel>
        <Select placeholder="Select District" onChange={handleDistrictChange} value={selectedDistrict}>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={4} isDisabled={!selectedDistrict} isRequired>
        <FormLabel>Ward</FormLabel>
        <Select placeholder="Select Ward" value={selectedDistrict}>
          {wards.map((ward) => (
            <option key={ward} value={ward}>
              {ward}
            </option>
          ))}
        </Select>
      </FormControl>
      </HStack>
    </Box>
  );
};

export default VietnamLocationSelector;
