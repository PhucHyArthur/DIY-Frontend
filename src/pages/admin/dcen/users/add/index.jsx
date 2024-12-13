import React from 'react';
import PersonForm from '../../../components/personForm';

const UsersAdd = () => {
  return (
    <div>
      <h1 className="text-4xl mt-4 ml-4 pb-4 border-b-2">Add User</h1>
      <PersonForm
        type="user" // Loại người dùng
        action="add" // Phương thức thêm mới
      />
    </div>
  );
};

export default UsersAdd;
