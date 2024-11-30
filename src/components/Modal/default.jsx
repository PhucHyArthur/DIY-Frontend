import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomModal = ({ isOpen, onClose, title, bodyContent, onConfirm }) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent className="border-black border-[2px]">
        <ModalHeader className="flex justify-center items-center">
            <Text className="text-red-500 font-bold ">{title}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
            <Text className="font-semibold">{bodyContent}</Text></ModalBody>
        <ModalFooter>
          <Button  colorScheme="red" onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={onConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  bodyContent: PropTypes.node.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default CustomModal;
