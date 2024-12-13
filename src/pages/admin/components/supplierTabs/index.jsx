import React, { useState } from 'react';
import { Box, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepTitle, StepDescription, StepSeparator } from '@chakra-ui/react';
import CompanyForm from '../companyForm';
import PersonForm from '../personForm';
import BankDetailForm from '../bankingForm';
import axios from 'axios';

const steps = [
  { title: 'Personal Detail', description: 'Enter personal details' },
  { title: 'Bank Detail', description: 'Enter banking details' },
  { title: 'Business Detail', description: 'Enter company information' },
];

function SupplierStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personal: {},
    bank: {},
    company: {},
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

  const handleFormChange = (step, data) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
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
          <PersonForm
            type="supplier"
            onSave={handleNextStep}
            onBack={handlePreviousStep}
            onChange={(data) => handleFormChange("personal", data)}
          />
        )}
        {currentStep === 1 && (
          <BankDetailForm
            onSave={handleNextStep}
            onBack={handlePreviousStep}
            onChange={(data) => handleFormChange("bank", data)}
          />
        )}
        {currentStep === 2 && (
          <CompanyForm
            onSave={handleNextStep}
            onBack={handlePreviousStep}
            onChange={(data) => handleFormChange("company", data)}
          />
        )}
      </Box>
    </Box>
  );
}

export default SupplierStepper;
