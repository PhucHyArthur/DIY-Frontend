import React, { useState, useEffect } from "react";
import { Box, Stack } from "@chakra-ui/react";
import PermissionTable from "./permission";

const RolesPermissions = ({
  initialPermissionsState = {}, // Trạng thái quyền ban đầu
  onPermissionsChange,          // Hàm xử lý khi quyền thay đổi
  readOnly = false,             // Chế độ chỉ đọc
}) => {
  const [permissionsState, setPermissionsState] = useState(initialPermissionsState);

  const permissionsData = [
    {
      id: "user_management",
      title: "User Management",
      permissions: [{ name: "Users" }],
    },
    {
      id: "contact_management",
      title: "Contact Management",
      permissions: [{ name: "Clients" }, { name: "Suppliers" }],
    },
    {
      id: "item_management",
      title: "Item Management",
      permissions: [{ name: "Raw Materials" }, { name: "Finished Products" }],
    },
    {
      id: "warehouse_management",
      title: "Warehouse Management",
      permissions: [{ name: "Warehouse" }],
    },
    {
      id: "order_management",
      title: "Order Management",
      permissions: [{ name: "Purchases Orders" }, { name: "Sales Orders" }],
    },
    {
      id: "import_export_management",
      title: "Import/Export Management",
      permissions: [{ name: "Import" }, { name: "Export" }],
    },
  ];

  useEffect(() => {
    setPermissionsState(initialPermissionsState);
  }, [initialPermissionsState]);

  const handlePermissionsChange = (id, updatedPermissions) => {
    const newState = {
      ...permissionsState,
      [id]: updatedPermissions,
    };
    setPermissionsState(newState);
    if (onPermissionsChange) {
      onPermissionsChange(newState);
    }
  };

  return (
    <Box>
      <Stack spacing={6}>
        {permissionsData.map((group) => (
          <PermissionTable
            key={group.id}
            id={group.id}
            title={group.title}
            permissions={group.permissions}
            initialPermissions={permissionsState[group.id] || []}
            onPermissionsChange={handlePermissionsChange}
            readOnly={readOnly} // Truyền chế độ chỉ đọc xuống PermissionTable
          />
        ))}
      </Stack>
    </Box>
  );
};

export default RolesPermissions;
