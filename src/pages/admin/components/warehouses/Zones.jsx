import { Box } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { DataContext } from '../../../../context/Context'
import Aisles from './Aisles'
const Zones = ({zone ,setRackId}) => {
    const {aisles} = useContext(DataContext)
  return (
    <Box background={'#e7ecf2'} padding={"40px"} width={"45%"}>
        {zone.name}
        {aisles.filter(aisle => aisle.zone == zone.id).map(aisle => <Aisles aisle={aisle} setRackId={setRackId}/>)}
    </Box>
  )
}

export default Zones