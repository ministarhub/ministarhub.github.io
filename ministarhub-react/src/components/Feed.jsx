import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {Sidebar, Videos} from "./";
import {fetchFromAPI} from '../utils/fetchFromAPI'

const Feed = () => {

  const [selectedCategory, setSelectedCategory]=useState('New')

  const [videos, setVideos]= useState(null);

useEffect(()=>{

  setVideos(null);
  fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
.then((data)=> setVideos(data.items))
}, [selectedCategory] );

return(

  <Stack sx={{ flexDirection: { sx: "colume", md: "row" } }}>
    <Box sx={{
      height: { sx: 'auto', md: '92vh' }, borderRight: '1px solid #3d3d3d',
      px: { sx: 0, md: 2 }
    }} >
      <Sidebar
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      />
      <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: '#fff' }} >
        copyright 2022 Ministarhub
      </Typography>
    </Box>

    <Box p={2} sx={{overflowY: 'auto', hight: '90vh', flex: 2}}>
<Typography variant= "h4" fontWeight='bold' mb={2} sx={{color: '#fff'}}>

  {selectedCategory}
  
  <span style={{color: '#f31503'}}>videos</span>

</Typography>

<Videos videos={[videos]}/>

    </Box>

  </Stack>
)};


export default Feed