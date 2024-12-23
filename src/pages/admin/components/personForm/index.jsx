import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Input,
  Button,
  Select,
  FormControl,
  FormLabel,
  Stack,
  HStack,
  RadioGroup,
  Radio,
  useToast,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API, EMPLOYEE } from '../../../../constant/API';
import { TokenContext } from "../../../../context/TokenContext";

const generateRandomPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const PersonForm = ({ type, action, onSave, onBack, onChange }) => {
  const { id } = useParams();
  const toast = useToast();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role_name: '',
    phone_number: '',
    address: '',
    hire_date: '',
    gender: '',
  });
  const [personData, setPersonData] = useState({
    name: '',
    birth: '',
    gender: '',
    tel: '',
    email: '',
    position: '',
    bank_name: '',
    bank_branch: '',
    bank_number: '',
    swift_code: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]); // State để lưu danh sách roles
  const {token} = useContext(TokenContext);
  const navigate = useNavigate();

  // Fetch danh sách roles
  useEffect(() => {
    axios
      .get(`${API}auth/roles/list/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRoles(response.data); // Lưu danh sách roles vào state
      })
      .catch((error) => {
        console.error('Error fetching roles:', error);
      });
  }, [token]);

  // Fetch data cho chế độ "edit" hoặc "detail"
  useEffect(() => {
    if ((action === 'edit' || action === 'detail') && id) {
      setIsLoading(true);
      axios
        .get(`${API}${EMPLOYEE.Employee_Detail}${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          setFormData({
            username: data.username || '',
            password: '****',
            email: data.email || '',
            role_name: data.role_name || '',
            phone_number: data.phone_number || '',
            address: data.address || '',
            hire_date: data.hire_date || '',
            gender: data.gender || '',
          });
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [action, id, token]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...personData, [name]: value };
    setPersonData(updatedData);
    onChange(updatedData); // Truyền dữ liệu lên component cha
  };

  // Tạo mật khẩu ngẫu nhiên
  const handleGeneratePassword = () => {
    const randomPassword = generateRandomPassword();
    setFormData((prevData) => ({ ...prevData, password: randomPassword }));
  };

  // Xử lý gửi form
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (action === "add") {
        const response = await axios.post(`${API}${EMPLOYEE.Employee_Add}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast({
            title: "User Created",
            description: "Activation email sent to the user.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/admin/settings/users/list");
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      p={8}
      bg="white"
      borderRadius="md"
      shadow="md"
      borderWidth="1px"
      maxWidth="800px"
      mx="auto"
      marginTop={10}
    >
      {type !== "supplier" ? (
        <Stack spacing={4}>
          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                isReadOnly={action === "detail"}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                isReadOnly={action === "detail"}
              />
            </FormControl>
          </HStack>

          <HStack spacing={4}>
            {action === "add" && (
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <HStack>
                  <Input
                    name="password"
                    value={formData.password}
                    readOnly
                    placeholder="Generated Password"
                  />
                  <Button onClick={handleGeneratePassword} colorScheme="teal">
                    Generate Password
                  </Button>
                </HStack>
              </FormControl>
            )}

            {(action === "edit" || action === "detail") && (
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  value="****"
                  readOnly
                  placeholder="****"
                />
              </FormControl>
            )}
          </HStack>

          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Role</FormLabel>
              <Select
                name="role_name"
                value={formData.role_name}
                onChange={handleChange}
                placeholder="Select Role"
                isReadOnly={action === "detail"}
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                isReadOnly={action === "detail"}
              />
            </FormControl>
          </HStack>

          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              isReadOnly={action === "detail"}
            />
          </FormControl>

          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Hire Date</FormLabel>
              <Input
                name="hire_date"
                type="date"
                value={formData.hire_date}
                onChange={handleChange}
                isReadOnly={action === "detail"}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                name="gender"
                value={formData.gender}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, gender: value }))
                }
              >
                <HStack spacing={4}>
                  <Radio value="male" isDisabled={action === "detail"}>
                    Male
                  </Radio>
                  <Radio value="female" isDisabled={action === "detail"}>
                    Female
                  </Radio>
                  <Radio value="other" isDisabled={action === "detail"}>
                    Other
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </HStack>
        </Stack>
      ) : (
        <Stack spacing={4}>
          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                name="name" // Tương ứng với personData.name
                value={personData.name}
                onChange={handleInputChange}
                placeholder="Username"
                isReadOnly={action === "detail"}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email" // Tương ứng với personData.email
                value={personData.email}
                onChange={handleInputChange}
                placeholder="Email"
                type="email"
                isReadOnly={action === "detail"}
              />
            </FormControl>
          </HStack>

          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Position</FormLabel>
              <Input
                name="position" // Tương ứng với personData.position
                value={personData.position}
                onChange={handleInputChange}
                placeholder="Position"
                isReadOnly={action === "detail"}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="tel" // Tương ứng với personData.tel
                value={personData.tel}
                onChange={handleInputChange}
                placeholder="Phone Number"
                isReadOnly={action === "detail"}
              />
            </FormControl>
          </HStack>

          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Birth Day</FormLabel>
              <Input
                name="birth" // Tương ứng với personData.birth
                type="date"
                value={personData.birth}
                onChange={handleInputChange}
                isReadOnly={action === "detail"}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                name="gender" // Tương ứng với personData.gender
                value={personData.gender}
                onChange={(value) => {
                  setPersonData((prevData) => ({ ...prevData, gender: value }));
                  onChange({ ...personData, gender: value }); // Cập nhật khi gender thay đổi
                }}
              >
                <HStack spacing={4}>
                  <Radio value="M" isDisabled={action === "detail"}>
                    Male
                  </Radio>
                  <Radio value="F" isDisabled={action === "detail"}>
                    Female
                  </Radio>
                  <Radio value="other" isDisabled={action === "detail"}>
                    Other
                  </Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </HStack>
        </Stack>
      )}

      {action !== "detail" && (
        <HStack mt={8} justify="flex-end">
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={() => navigate("/users/list")}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={onBack}
            display={type === "supplier" ? "block" : "none"}
          >
            Back
          </Button>
          <Button
            colorScheme="orange"
            isLoading={isLoading}
            onClick={type === "supplier" ? onSave : handleSubmit}
          >
            Save
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default PersonForm;
