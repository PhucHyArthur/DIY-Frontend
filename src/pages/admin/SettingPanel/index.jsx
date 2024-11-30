import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import DefaultHeader from "../../../layout/components/header/default";
import FooterDefault from "../../../layout/components/footer/default";
import NavSetting from "../../../components/NavSetting";


const SettingPanel = () => {

  return (
    <div className="bg-white">
      <DefaultHeader /> 
      <Box>
        <NavSetting/>
        <Box className="pl-[260px] h-full">
          <Box pb={'500px'}>
            <Outlet /> 
          </Box>
          <FooterDefault/>
        </Box>
      </Box>
    </div>
  );
};

export default SettingPanel;
