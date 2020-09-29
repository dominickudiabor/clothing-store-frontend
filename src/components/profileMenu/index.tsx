import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import useStyles from '../Navigation/styles'
import './profile.scss'


interface propDefinition {
  handleClose: () => void
  handleSignOut: () => void
  handleProfile: () => void
  handleAdmin: () => void
  anchorEl: HTMLElement | null
}

export default function ProfileMenu({
  handleClose,
  handleSignOut,
  handleProfile,
  handleAdmin,
  anchorEl,
}: propDefinition) {
  const classes = useStyles()
 

  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.profile}
      >
        <MenuItem onClick={handleProfile}>
        Profile
        </MenuItem>
        <MenuItem onClick={handleAdmin}>Admin</MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
