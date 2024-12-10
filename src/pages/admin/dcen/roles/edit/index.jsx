import React, { useState, useEffect, useContext } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RoleForm from "../components/RoleForm";
import { TokenContext } from "../../../../../context/TokenContext";
import { API, EMPLOYEE } from "../../../../../constant/API";

const RolesEdit = () => {
  const { id } = useParams();
  const [initialRole, setInitialRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [token] = useContext(TokenContext);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get(`${API}${EMPLOYEE.Role_Detail}${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { name, description, scopes } = response.data;

        const permissionsData = [
          { id: "user_management", permissions: [{ name: "Users" }] },
          { id: "contact_management", permissions: [{ name: "Clients" }, { name: "Suppliers" }] },
          // Add other permission groups here...
        ];

        const updatedPermissions = {};
        permissionsData.forEach((group) => {
          const groupPermissions = group.permissions.map((perm) => {
            const baseName = perm.name.toLowerCase().replace(/\s+/g, "_");
            return {
              name: perm.name,
              view: scopes.includes(`${baseName}_read`),
              create: scopes.includes(`${baseName}_create`),
              edit: scopes.includes(`${baseName}_update`),
              delete: scopes.includes(`${baseName}_delete`),
            };
          });
          updatedPermissions[group.id] = groupPermissions;
        });

        setInitialRole({ name, description, scopes: updatedPermissions });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch role details.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("../list");
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [id, token, navigate, toast]);

  const handleEditRole = async (roleData) => {
    setSaving(true);
    try {
      await axios.put(`${API}${EMPLOYEE.Role_Edit}${id}/`, roleData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Success",
        description: "Role updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("../list");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update role.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Box>Loading...</Box>;

  return (
    <RoleForm
      initialRole={initialRole}
      onSubmit={handleEditRole}
      isLoading={saving}
      isEdit
    />
  );
};

export default RolesEdit;
