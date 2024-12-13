import React, { useState, useContext } from 'react';
import { Box, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepTitle, StepDescription, StepSeparator } from '@chakra-ui/react';
import CompanyForm from '../companyForm';
import PersonForm from '../personForm';
import BankDetailForm from '../bankingForm';
import axios from 'axios';
import { API,SUPPLIERS} from '../../../../constant/API';
import { DataContext } from '../../../../context/Context';
import CustomToast from '../../../../components/Toast';

const steps = [
  { title: 'Business Detail', description: 'Enter company information' },
  { title: 'Bank Detail', description: 'Enter banking details' },
  { title: 'Personal Detail', description: 'Enter personal details' },
];

function SupplierStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const {getSuppliers} = useContext(DataContext)
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
          
          onSave={handleNextStep}
          onBack={handlePreviousStep}
          onChange={(data) => handleFormChange('supplier', data)}
        />
        )}
        {currentStep === 1 && (
          <BankDetailForm
            type="supplier"
            onSave={handleNextStep}
            onBack={handlePreviousStep}
            onChange={(data) => handleFormChange('bank', data)}
          />
        )}
        {currentStep === 2 && (
          <PersonForm
          type="supplier"
          onSave={handleSubmit}
          onBack={handlePreviousStep}
          onChange={(data) => handleFormChange('representative', data)}
          
        />
        )}
      </Box>
    </Box>
  );
}

export default SupplierStepper;

