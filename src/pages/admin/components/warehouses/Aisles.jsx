import React, { useContext } from 'react'
import { DataContext } from '../../../../context/Context'
import Racks from './Racks'
const Aisles = ({aisle, setRackId}) => {
const{racks} = useContext(DataContext)
  return (
    <div>
        {aisle.name}
        {racks.filter(rack => rack.aisle == aisle.id).map(rack => <Racks rack={rack} setRackId={setRackId}/>)}
    </div>
  )
}

export default Aisles