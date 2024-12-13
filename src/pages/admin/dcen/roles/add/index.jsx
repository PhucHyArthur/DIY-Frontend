import React, { useState, useContext } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RoleForm from "../components/RoleForm";
import { TokenContext } from "../../../../../context/TokenContext";
import { API, EMPLOYEE } from "../../../../../constant/API";

const RolesAdd = () => {
  const {token} = useContext(TokenContext);
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddRole = async (roleData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}${EMPLOYEE.Role_Add}`, roleData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status >= 200 && response.status < 300) {
        toast({
          title: "Success",
          description: "Role created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("../list");
      } else {
        throw new Error("Failed to create role");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create role.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return <RoleForm onSubmit={handleAddRole} isLoading={loading} />;
};

export default RolesAdd;
