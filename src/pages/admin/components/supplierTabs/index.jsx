import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Tabs, TabList, Tab, TabPanels, TabPanel, Flex } from '@chakra-ui/react';
import CompanyForm from '../companyForm';
import PersonForm from '../personForm';
import BankDetailForm from '../bankingForm';
function supplierTabs() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Box p={5}>
      <Tabs index={currentStep} onChange={(index) => setCurrentStep(index)}>
        <TabList border={"none"} flex={"1"} alignItems={"center"} justifyContent={"center"} gap={10}>
            <Tab sx={{borderRadius:"20", bg: "white.500", color: "black", _selected: { bg: "orange.500" , color:"white"} }}>Business Detail</Tab>
            <Tab sx={{borderRadius:"20", bg: "white.500", color: "black", _selected: { bg: "orange.500" , color:"white"} }}>Personal Detail</Tab>
            <Tab sx={{borderRadius:"20", bg: "white.500", color: "black", _selected: { bg: "orange.500" , color:"white"} }}>Bank Detail</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
          <CompanyForm></CompanyForm>
          </TabPanel>

          <TabPanel>
            <PersonForm type={"supplier"}></PersonForm>
          </TabPanel>

          <TabPanel>
          <BankDetailForm></BankDetailForm>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default supplierTabs;
