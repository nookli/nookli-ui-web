import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel, FormControl, Chip, OutlinedInput } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { useTabStore } from '../redux/tabStore.js'
import { 
  AiOutlineTeam, 
  AiOutlineUsergroupAdd 
} from 'react-icons/ai';

import { 
  FaCodeBranch, 
  FaUsers, 
  FaLaptopCode, 
  FaPaintBrush, 
  FaBuilding, 
  FaBriefcase, 
  FaChartLine, 
  FaUserTie 
} from 'react-icons/fa';

import { IconContext } from 'react-icons'

const iconOptions = [
  { name: 'AiOutlineTeam', icon: <AiOutlineTeam /> },
  { name: 'FaCodeBranch', icon: <FaCodeBranch /> },
  { name: 'FaLaptopCode', icon: <FaLaptopCode /> },
  { name: 'FaPaintBrush', icon: <FaPaintBrush /> },
  { name: 'FaUsers', icon: <FaUsers /> },
  { name: 'FaChartLine', icon: <FaChartLine /> },
  { name: 'FaUserTie', icon: <FaUserTie /> },
  { name: 'AiOutlineUsergroupAdd', icon: <AiOutlineUsergroupAdd /> },
  { name: 'FaBriefcase', icon: <FaBriefcase /> },
  { name: 'FaBuilding', icon: <FaBuilding /> },
]

const allMembers = ['Jane', 'John', 'Mike', 'Sara', 'Lily']

const TabCreateModal = () => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('')
  const [type, setType] = useState('')
  const [members, setMembers] = useState([])

  const addTab = useTabStore((state) => state.addTab)

  const handleSubmit = () => {
    if (!name || !icon || !type) return

    const newTab = {
      id: uuidv4(),
      name,
      icon,
      type,
      members,
    }

    addTab(newTab)
    setOpen(false)
    setName('')
    setIcon('')
    setType('')
    setMembers([])
  }

  return (
    <>
      <div className="mt-4">
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          + Add Workspace
        </Button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Workspace</DialogTitle>
        <DialogContent className="space-y-4 mt-2">
          <TextField
            fullWidth
            label="Workspace Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel>Workspace Icon</InputLabel>
            <Select
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              label="Workspace Icon"
              renderValue={(val) => {
  const selectedIcon = iconOptions.find((i) => i.name === val)
  return selectedIcon ? (
    <div className="flex items-center gap-2">
      <IconContext.Provider value={{ size: 20 }}>
        {selectedIcon.icon}
      </IconContext.Provider>
      <span>{val}</span>
    </div>
  ) : <span>Select icon</span>
}}
            >
              {iconOptions.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  <div className="flex items-center gap-2">
                    <IconContext.Provider value={{ size: 20 }}>
                      {option.icon}
                    </IconContext.Provider>
                    {option.name}
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Workspace Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="Workspace Type"
            >
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Team">Team</MenuItem>
              <MenuItem value="Project">Project</MenuItem>
              <MenuItem value="Organization">Organization</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Members</InputLabel>
            <Select
              multiple
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              input={<OutlinedInput label="Members" />}
              renderValue={(selected) => (
                <div className="flex flex-wrap gap-1">
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {allMembers.map((member) => (
                <MenuItem key={member} value={member}>
                  {member}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TabCreateModal