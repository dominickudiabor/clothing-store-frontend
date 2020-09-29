import React from 'react'
import { Button } from '@material-ui/core';

interface IconProps{
handleClick: () => void,
buttonLabel: string,
key:string
children: React.ReactNode
disabled?: boolean
}


const SideBarIcons = ({handleClick,buttonLabel,children, disabled}:IconProps) => (
    <div className="admin__icons">
 {children}
    <Button className="admin__iconbutton" onClick={handleClick} disabled = {disabled}>
     {buttonLabel}
    </Button>
  </div>
)

export default SideBarIcons;