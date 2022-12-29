import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AddIcon from '@mui/icons-material/Add';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import GroupIcon from '@mui/icons-material/Group';
import FlagIcon from '@mui/icons-material/Flag';
import AnnouncementIcon from '@mui/icons-material/Announcement';

import AddStory from "../Components/story/AddStory";
import UserStory from '../Components/story/UserStory';
import User from '../Components/User';
import Users from '../Components/Users';
import Report from '../Components/Report';
import ChatRoom from '../Components/ChatRoom';

const drawers = ['New Story', 'Story', 'User information', 'Users', 'Report', 'Chat room'];
const drawersComponent = [<AddStory />, <UserStory />, <User />, <Users />, <Report />, <ChatRoom />]
const drawersIcon = [<AddIcon />, <AutoStoriesIcon />, <PersonPinIcon />, <GroupIcon />, <FlagIcon />, <AnnouncementIcon />]

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {drawersComponent[index]}
        </Box>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" centered>
          {drawers.map((text, index) => (
            <Tab icon={drawersIcon[index]} label={text} key={index} />
          )
          )}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item 0
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item 1
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item 2
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item 3
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item 4
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item 5
      </TabPanel>
    </Box>
  );
}


