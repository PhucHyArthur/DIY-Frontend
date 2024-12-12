import React, { memo, useState, useEffect } from "react";
import { Box, Checkbox, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

const PermissionTable = ({
  id,
  title,
  permissions,
  initialPermissions = [],
  onPermissionsChange,
  columns = [
    { key: "view", label: "View" },
    { key: "create", label: "Create" },
    { key: "edit", label: "Edit" },
    { key: "delete", label: "Delete" },
  ],
}) => {
  const [checkedPermissions, setCheckedPermissions] = useState([]);

  useEffect(() => {
    if (initialPermissions.length > 0) {
      setCheckedPermissions(initialPermissions);
    } else {
      setCheckedPermissions(
        permissions.map((perm) => ({
          ...perm,
          fullAccess: false,
          view: false,
          create: false,
          edit: false,
          delete: false,
        }))
      );
    }
  }, [permissions, initialPermissions]);

  const handlePermissionChange = (index, field) => {
    setCheckedPermissions((prevState) => {
      const newPermissions = [...prevState];
      newPermissions[index][field] = !newPermissions[index][field];
      newPermissions[index].fullAccess = Object.values(newPermissions[index])
        .slice(1)
        .every((val) => val);
      onPermissionsChange(id, newPermissions);
      return newPermissions;
    });
  };

  const handleFullAccessChange = (index) => {
    setCheckedPermissions((prevState) => {
      const newPermissions = [...prevState];
      const isFullAccess = !newPermissions[index].fullAccess;
      newPermissions[index] = {
        ...newPermissions[index],
        fullAccess: isFullAccess,
        view: isFullAccess,
        create: isFullAccess,
        edit: isFullAccess,
        delete: isFullAccess,
      };
      onPermissionsChange(id, newPermissions);
      return newPermissions;
    });
  };

  return (
    <Box>
      <Text fontWeight="semibold" mb={4}>
        {title}
      </Text>
      <Box overflowX="auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th>Permission</th>
              <th>Full Access</th>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {checkedPermissions.map((perm, index) => (
              <tr key={index}>
                <td>{perm.name}</td>
                <td>
                  <Checkbox
                    isChecked={perm.fullAccess}
                    onChange={() => handleFullAccessChange(index)}
                  />
                </td>
                {columns.map((col) => (
                  <td key={col.key}>
                    <Checkbox
                      isChecked={perm[col.key]}
                      onChange={() => handlePermissionChange(index, col.key)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

PermissionTable.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  permissions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  initialPermissions: PropTypes.array,
  onPermissionsChange: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default memo(PermissionTable);
