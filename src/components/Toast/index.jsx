import { useToast } from "@chakra-ui/react";

const CustomToast = () => {
    const toast = useToast()

    const showToast = (status, title, description) => {
        toast({
            title: title,
            description: description,
            status: status,
            duration: 2000,
            isClosable: true,
        })
    }

    return showToast
}

export default CustomToast