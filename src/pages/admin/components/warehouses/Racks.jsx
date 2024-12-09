import { Box,Button } from '@chakra-ui/react'
import React from 'react'

const Racks = ({rack,setRackId }) => {
  return (
    <Box padding={"8"} borderRadius={"6"} background={"#d8e0ea"} onClick={setRackId(rack.name)} position={'relative'} margin={6} width={'100px'}> 
        <Box
        borderRadius={"6"}
        position="absolute"
        bottom="0"
        left={0} // Start from the bottom
        width="30%"
        height="100%" // Set height dynamically based on progress
        backgroundColor="#b4c1d2" // Progress bar color
        transition="height 0.3s ease" // Smooth animation
         />
        <Box position="absolute" backgroundColor='white' borderRadius={"3"} padding={2} paddingLeft={4} paddingRight={4} bottom={-3} left={"25%"} boxShadow='dark-lg'>
            R{rack.id}
        </Box>
    </Box>
  )
}

export default Racks