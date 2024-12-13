import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Text, Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import { API, EMPLOYEE } from "../../../../../constant/API";

const ActivateAccount = () => {
  const { uid, token } = useParams(); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const toast = useToast(); 
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        // Gửi yêu cầu kích hoạt tới Backend
        const response = await axios.get(`${API}${EMPLOYEE.Account_Activate}${uid}/${token}/`);
        if (response.status === 200) {
          toast({
            title: "Account Activated",
            description: "Your account has been successfully activated!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });

          // Chuyển hướng đến trang login sau 3 giây
          setTimeout(() => navigate("/"), 3000);
        }
      } catch (error) {
        setError(error.response?.data?.message || "Invalid or expired activation link.");
        toast({
          title: "Activation Failed",
          description: error.response?.data?.message || "Invalid activation link.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    activateAccount();
  }, [uid, token, toast, navigate]);

  return (
    <Box textAlign="center" mt="10">
      {loading ? (
        <>
          <Spinner size="xl" />
          <Text mt="4">Please wait, we are activating your account...</Text>
        </>
      ) : (
        <>
          {error ? (
            <Text fontSize="xl" color="red.500">
              {error}
            </Text>
          ) : (
            <Text fontSize="xl" color="green.500">
              Your account has been successfully activated! You can now login.
            </Text>
          )}
        </>
      )}
    </Box>
  );
};

export default ActivateAccount;
