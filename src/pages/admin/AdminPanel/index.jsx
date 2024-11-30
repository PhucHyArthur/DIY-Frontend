import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import DefaultHeader from "../../../layout/components/header/default";
import FooterDefault from "../../../layout/components/footer/default";
import NavAdmin from "../../../components/NavAdmin";

const AdminPanel = () => {

  return (
    <div className="bg-white">
      <DefaultHeader /> 

      <Box>
        <NavAdmin /> 

        <Box className="pl-[260px] h-full">
          <Box pb={'500px'}>
            <Outlet/> 
          </Box>
          <FooterDefault/>
        </Box>
      </Box>
    </div>
  );
};

export default AdminPanel;
