import { Box, Center } from "@chakra-ui/react";
import { LuBell, LuGlobe, LuScan, LuSearch, LuSettings } from "react-icons/lu";
import CustomToast from "../../../components/Toast";
import MenuAvatar from "./components/menuAvatar";

const DefaultHeader = () => {
    const showToast = CustomToast()

    const handleShowToast = () => {
        showToast('success', '', 'vui lòng thử lại sau')
    }

    return (
        <Box className="flex items-center sticky top-0 z-10 bg-white" borderBottom={'1px solid #ccc'}>
            <Box className="header-logo flex justify-center items-center min-w-[260px]" borderRight={'1px solid #ccc'}>
                <img
                    className="w-[70px]"
                    src="https://cdn-icons-png.freepik.com/512/10112/10112531.png"
                    alt="logo"
                />
                <p>ERP Systems</p>
            </Box>

            <div className="header-nav flex items-center justify-between w-full mx-5">
                <div className="w-1/3 relative">
                    <input type="text" placeholder="Search something..."
                        className="bg-transparent outline-none border-[1px] border-[#ccc] rounded-md px-5 py-2 w-full" />
                    <div className="absolute right-2 top-1/2 translate-y-[-50%] border-[1px] border-[#ccc] p-[6px] rounded-md cursor-pointer bg-gray-300 hover:bg-gray-500">
                        <LuSearch />
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    {/* <Center onClick={handleShowToast} className="text-[24px] w-12 h-12 rounded-full bg-[#f1f5f9] hover:text-[#f58220] cursor-pointer">
                        <LuGlobe />
                    </Center>

                    <Center onClick={handleShowToast} className="text-[24px] w-12 h-12 rounded-full bg-[#f1f5f9] hover:text-[#f58220] cursor-pointer">
                        <LuScan />
                    </Center>

                    <Center onClick={handleShowToast} className="text-[24px] w-12 h-12 rounded-full bg-[#f1f5f9] hover:text-[#f58220] cursor-pointer">
                        <LuSettings />
                    </Center> */}

                    <Center onClick={handleShowToast} className="text-[24px] w-12 h-12 rounded-full bg-[#f1f5f9] hover:text-[#f58220] cursor-pointer">
                        <LuBell />
                    </Center>

                    <MenuAvatar/>
                </div>
            </div>
        </Box>
    );
};

export default DefaultHeader;
