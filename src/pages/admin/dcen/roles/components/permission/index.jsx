import React, { useState } from 'react';
import { Box, Checkbox } from '@chakra-ui/react';

const PermissionTable = ({ title, permissions, centerCheckboxes }) => {
  const [checkedPermissions, setCheckedPermissions] = useState(
    permissions.map(perm => ({
      ...perm,
      fullAccess: false,
      view: false,
      create: false,
      edit: false,
      delete: false,
    }))
  );

  const handleFullAccessChange = (index) => {
    setCheckedPermissions(prevState => {
      const newPermissions = [...prevState];
      const fullAccessChecked = !newPermissions[index].fullAccess;

      newPermissions[index] = {
        ...newPermissions[index],
        fullAccess: fullAccessChecked,
        view: fullAccessChecked,
        create: fullAccessChecked,
        edit: fullAccessChecked,
        delete: fullAccessChecked,
      };

      return newPermissions;
    });
  };

  const handlePermissionChange = (index, field) => {
    setCheckedPermissions(prevState => {
      const newPermissions = [...prevState];
      newPermissions[index][field] = !newPermissions[index][field];

      if (!newPermissions[index][field]) {
        newPermissions[index].fullAccess = false;
      }

      return newPermissions;
    });
  };

  return (
    <Box className="mb-6">
      <Box className="mb-4 text-lg font-semibold">{title}</Box>
      <Box className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Permission</th>
              <th className="p-3 text-center">Full Access</th>
              <th className="p-3 text-center">View</th>
              <th className="p-3 text-center">Create</th>
              <th className="p-3 text-center">Edit</th>
              <th className="p-3 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {checkedPermissions.map((perm, index) => (
              <tr className="border-b" key={index}>
                <td className="p-3">{perm.name}</td>
                <td className="p-3 text-center">
                  <Checkbox
                    isChecked={perm.fullAccess}
                    onChange={() => handleFullAccessChange(index)}
                  />
                </td>
                <td className="p-3 text-center">
                  <Checkbox
                    isChecked={perm.view}
                    onChange={() => handlePermissionChange(index, 'view')}
                  />
                </td>
                <td className="p-3 text-center">
                  <Checkbox
                    isChecked={perm.create}
                    onChange={() => handlePermissionChange(index, 'create')}
                  />
                </td>
                <td className="p-3 text-center">
                  <Checkbox
                    isChecked={perm.edit}
                    onChange={() => handlePermissionChange(index, 'edit')}
                  />
                </td>
                <td className="p-3 text-center">
                  <Checkbox
                    isChecked={perm.delete}
                    onChange={() => handlePermissionChange(index, 'delete')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default PermissionTable;
