import React, { useState, useContext, useEffect } from 'react';
import { Box, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepTitle, StepDescription, StepSeparator } from '@chakra-ui/react';
import CompanyForm from '../companyForm';
import PersonForm from '../personForm';
import BankDetailForm from '../bankingForm';
import axios from 'axios';
import { API,SUPPLIERS} from '../../../../constant/API';
import { DataContext } from '../../../../context/Context';
import CustomToast from '../../../../components/Toast';
import { useParams } from 'react-router-dom';

const steps = [
  { title: 'Business Detail', description: 'Enter company information' },
  { title: 'Bank Detail', description: 'Enter banking details' },
  { title: 'Personal Detail', description: 'Enter personal details' },
];

function SupplierStepper({action}) {
  const{supplierId}=useParams()
  const [currentStep, setCurrentStep] = useState(0);
  const {getSuppliers, suppliers, representatives} = useContext(DataContext)
  const [token] = useState(localStorage.getItem('authToken'));
  const showToast = CustomToast(); 
  const [formData, setFormData] = useState({
    supplier: {
      name: '',
      address: '',
      tel: '',
      email: '',
      tax_code: '',
    },
    representative: {
      name: '',
      birth: '',
      gender: '',
      tel: '',
      email: '',
      position: '',
    },
    bank: {
      bank_name: '',
      bank_branch: '',
      bank_number: '',
      swift_code: '',
    }
  });

   // Fetch danh sách suppliers nếu chưa có
   useEffect(() => {
    if (suppliers.length === 0) {
      getSuppliers();
    }
  }, [suppliers, getSuppliers]);
  // Cập nhật dữ liệu khi supplierId thay đổi
  useEffect(() => {
    if (supplierId && suppliers.length > 0) {
      const selectedSupplier = suppliers.find(
        (supplier) => supplier.id === parseInt(supplierId)
      );
  
      if (selectedSupplier) {
        const representative = representatives.find(
          (rep) => rep.id=== parseInt(supplierId)
        );
  
        setFormData({
          supplier: {
            name: selectedSupplier.name || '',
            address: selectedSupplier.address || '',
            tel: selectedSupplier.tel || '',
            email: selectedSupplier.email || '',
            tax_code: selectedSupplier.tax_code || '',
          },
          representative: {
            name: representative?.name || '',
            birth: representative?.birth || '',
            gender: representative?.gender  || '',
            tel: representative?.tel  || '',
            email: representative?.email  || '',
            position: representative?.position  || '',
          },
          bank: {
            bank_name: selectedSupplier.bank_name || '',
            bank_branch: selectedSupplier.bank_branch || '',
            bank_number: selectedSupplier.bank_number || '',
            swift_code: selectedSupplier.swift_code || '',
          },
        });
      }
    }
  }, [supplierId, suppliers, representatives]);
  

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFormChange = (formKey, data) => {
    setFormData((prev) => ({
      ...prev,
      [formKey]: { ...prev[formKey], ...data },
    }));
  };

  const handleSubmit = async () => {
    try {
      const supplierData = { ...formData.supplier, ...formData.bank };
      // Gửi dữ liệu Supplier
      const supplierResponse = await axios.post(
        `${API}${SUPPLIERS.Add}`,
        supplierData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const supplierId = supplierResponse.data.id; // Lấy ID nhà cung cấp vừa tạo

      // Gửi dữ liệu Representative
      const representativeData = { 
        ...formData.representative, 
        ...formData.bank, 
        supplier_id: supplierId 
      };
      await axios.post(
        `${API}${SUPPLIERS.Representative_Add}`,
        representativeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      showToast("success", "Supplier and representative Added", "Supplier and representative created successfully!");
      await getSuppliers()
    } catch (error) {
      console.error('Error creating supplier or representative:', error.response?.data || error.message);
      showToast("error", "Supplier and representative Error", "Failed to submit Supplier and representative!");
    }
  };

  const handleUpdate = async () => {
    try {
      if (!supplierId) {
        showToast("error", "Update Error", "Invalid Supplier ID!");
        return;
      }
  
      // Chuẩn bị dữ liệu cần gửi cho API
      const supplierData = { ...formData.supplier, ...formData.bank };
      const representativeData = { 
        ...formData.representative,
        ...formData.bank, 
        supplier_id: supplierId 
      };
  
      // Cập nhật thông tin Supplier
      await axios.put(
        `${API}${SUPPLIERS.Edit.replace("<int:pk>", supplierId)}`,
        supplierData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      // Cập nhật thông tin Representative
      const representativeId = representatives.find(rep => rep.supplier_id === supplierId)?.id;
      if (representativeId) {
        await axios.put(
          `${API}${SUPPLIERS.Representative_Edit.replace("<int:pk>", supplierId)}`,
          representativeData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
  
      // Thông báo thành công
      showToast("success", "Update Successful", "Supplier and Representative updated successfully!");
      await getSuppliers(); // Làm mới danh sách nhà cung cấp
    } catch (error) {
      console.error('Error updating supplier or representative:', error.response?.data || error.message);
      showToast("error", "Update Error", "Failed to update Supplier and Representative!");
    }
  };  

  return (
    <Box p={5}>
      {/* Stepper */}
      <Stepper index={currentStep} mt={5} mb={10}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            {index < steps.length - 1 && <StepSeparator />}
          </Step>
        ))}
      </Stepper>

      {/* Form Content */}
      <Box>
        {currentStep === 0 && (
          <CompanyForm
          company={formData.supplier}
          onSave={handleNextStep}
          onBack={handlePreviousStep}
          action={action}
          onChange={(data) => handleFormChange('supplier', data)}
        />
        )}
        {currentStep === 1 && (
          <BankDetailForm
            bank={formData.bank}
            action={action}
            onSave={handleNextStep}
            onBack={handlePreviousStep}
            onChange={(data) => handleFormChange('bank', data)}
          />
        )}
        {currentStep === 2 && (
          <PersonForm
          representative={formData.representative}
          type="supplier"
          onSave={handleSubmit}
          onBack={handlePreviousStep}
          onChange={(data) => handleFormChange('representative', data)}
          action={action}
          onUpdate={handleUpdate}
        />
        )}
      </Box>
    </Box>
  );
}

export default SupplierStepper;

