import React from 'react';
import { useParams } from 'react-router-dom';
import PersonForm from '../../../components/personForm';

const UsersEdit = () => {
  const { id } = useParams(); // Lấy id từ URL

  return (
    <div>
      <h1 className="text-4xl mt-4 ml-4 pb-4 border-b-2">Edit User</h1>
      <PersonForm 
        type="user"  // Loại đối tượng là user
        action="edit" // Chế độ chỉnh sửa thông tin
        id={id} // Truyền ID để load dữ liệu
      />
    </div>
  );
};

export default UsersEdit;
