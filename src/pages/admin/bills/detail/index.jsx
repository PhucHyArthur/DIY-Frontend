import React from "react";
import { Text, HStack, Flex } from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";
import BillsDetailForm from "../../components/billForm/detail";
import { useParams } from "react-router-dom";
import ExportForm from "../../components/billForm/export";

const BillsDetail = () => {
  const { billId } = useParams();
  const id = billId.match(/\d+/g).join("");
  const type = billId.replace(/\d+/g, "");
  return (
    <div>
      <Flex justifyContent={"space-between"} p={6}>
        <Text fontSize="xl" fontWeight="medium">
          Bill Detail
        </Text>

        <HStack>
          <Text
            fontSize="l"
            fontWeight="medium"
            _hover={{
              color: "orange.500",
              cursor: "pointer",
              transition: "all, 0.5s",
            }}
          >
            Bills
          </Text>
          <LuChevronRight></LuChevronRight>
          <Text fontSize="l" fontWeight="medium" color={"orange.400"}>
            Bill Detail
          </Text>
        </HStack>
      </Flex>
      {type === "Export" ? (
        <ExportForm OId={id} OType={type} />
      ) : (
        <BillsDetailForm OId={id} OType={type} />
      )}
    </div>
  );
};

export default BillsDetail;
