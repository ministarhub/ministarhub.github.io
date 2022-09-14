import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import {  demoVideoUrl, demoVideoTitle, demoChannelUrl,
  demoChannelTitle  } from "../utils/constants";

const VideoCard = ({video: {id: { videoid}, snippet} }) => {
  return (
    <Card sx={{width:{ md: '320px', xs: '100%', boxShadow: 'none', boaderRadius: '0'}}}>
<Link to= {videoid ? `/video/${videoid}` : demoVideoUrl}>
<CardMedia 
image={snippet?.thumbnails?.high?.url}
alt={snippet?.title}
sx={{width: 385, height: 180}}
/>
</Link>

<CardContent sx={{backgroundColor: '#1e1e1e', height: '100px'}}>

  <Link to= {videoid ? `/video/${videoid}` : demoVideoUrl}>
<Typography variant="subtitle" fontWeight='bold' color="#fff">
{snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}

</Typography>
  </Link>
  <Link to= {snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
<Typography variant="subtitle2" fontWeight='bold' color="gray">
{snippet?.channelTitle || demoChannelTitle}
<CheckCircle sx={{fontSize: 12, color: 'gray', ml: '5px'}}/>
</Typography>
  </Link>
</CardContent>
    </Card>
  )
}

export default VideoCard
