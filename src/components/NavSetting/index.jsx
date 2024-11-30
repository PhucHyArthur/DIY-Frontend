import { Box, Flex, Text } from "@chakra-ui/react";
import {
  LuArrowLeft,
  LuSettings,
  LuUserCog2,
  LuUsers,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import "./styles.css";

const NavSetting = () => {
  return (
    <Box
      className="fixed top-0 left-0 flex flex-col pt-[60px] justify-between bg-white"
      w={260}
      h={"100%"}
      borderRight={"1px solid #ccc"}
    >
      <div className="px-50 mt-5">
        <div className="p-2">
          <Link to={"/admin"}>
            <Flex className="items-center gap-4 px-4 py-2 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md">
              <Box className="text-[24px] text-[#991b1b]">
                <LuArrowLeft />
              </Box>
              <Text className="text-[18px] text-[#991b1b] font-semibold">
                Return
              </Text>
            </Flex>
          </Link>
          <Flex className="items-center gap-5">
            <Box className="text-[25px]">
              <LuSettings />
            </Box>
            <Text className="text-[25px] font-bold text-slate-600">
              Settings
            </Text>
          </Flex>
        </div>
        <Link to={"/admin/settings/users/list"}>
          <Flex className="items-center gap-5 px-5 py-2 hover:bg-[#f5f5f5] cursor-pointer rounded-lg">
            <Box className="text-[24px]">
              <LuUsers />
            </Box>
            <Text className="text-[18px]">Users</Text>
          </Flex>
        </Link>
        <Link to={"/admin/settings/roles/list"}>
          <Flex className="items-center gap-5 px-5 py-2 hover:bg-[#f5f5f5] cursor-pointer rounded-lg">
            <Box className="text-[24px]">
              <LuUserCog2 />
            </Box>
            <Text className="text-[18px]">Roles</Text>
          </Flex>
        </Link>
      </div>
    </Box>
  );
};

export default NavSetting;
