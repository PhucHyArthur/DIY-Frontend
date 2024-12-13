import React from 'react';
import { useParams } from 'react-router-dom';
import PersonForm from '../../../components/personForm';

const UsersDetail = () => {
  const { id } = useParams(); // Lấy id từ URL

  return (
    <div>
      <h1 className="text-4xl mt-4 ml-4 pb-4 border-b-2">User Details</h1>
      <PersonForm 
        type="user"
        action="detail"
        id={id}
      />
    </div>
  );
};

export default UsersDetail;
