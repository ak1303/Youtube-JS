
const baseUrl = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyDzJb_0sCY3wvUPlTLV44YkUUhG2aUhnUg";

async function fetchVideo(searchQuery,maxResult){
    try {
        const url = baseUrl+ 
                "/search"+
                `?key=${API_KEY}`+
                `&part=snippet`+
                `&q=${searchQuery}`+
                `&maxResults=${maxResult}`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        renderVideos(data);
    } catch (error) {
        console.error(error);
    }
}
fetchVideo('AI',200);

async function getChannelThumbnail(channelId) {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      const thumbnailUrl = data.items[0].snippet.thumbnails.default.url;
      return thumbnailUrl;
    } catch (error) {
      console.error('Error fetching channel dp:', error);
      return null;
    }
  }
 const videosDiv = document.querySelector('.videos');

 const today = new Date();
 function getDate(videoDate){
    videoDate = new Date(videoDate.split('T')[0]); // YYYY-MM-DD
    const differenceInMilliseconds = today.getTime() - videoDate.getTime();
    const days = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    const month = days/30;
    const hours = days/24;
    const minute = hours/60;
    const years = days/365;
    if(years >= 1)return Math.floor(years) + " years ago";
    if(month >= 1)return Math.floor(month) + " months ago";
    if(days >= 1 )return Math.floor(days) + " days ago";
    return Math.ceil(minute) + " minutes ago";
 }
function renderVideos(data){
    const {items} = data;//array of video object
    console.log(items);
    items.forEach(async item=>{
        const {snippet} = item;
        const {title,channelTitle,channelId,description,liveBroadcastContent,publishTime,thumbnails}=snippet;
        let imageUrl = thumbnails.high.url;
        let profilePic = await getChannelThumbnail(channelId);
        let date = getDate(publishTime);
        let videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
                <div class="thumbnail">
                    <img src="${imageUrl}" alt="loading..." class="thumbnailImg">
                </div>
                <div class="details">
                    <div style="padding:5px;">
                        <div class="profile"><img src="${profilePic}" alt="${channelTitle[0]}" class="thumbnailImg"></div>
                    </div>
                    <div class="videoDetails">
                        <p class="titleText">${title.substring(0,Math.min(50,title.length))} ${title.length>50?"...":""}</p>
                        <p class="channelName">${channelTitle}</p>
                        <p class="time">${date}</p>
                    </div>
                </div>
        `
        videoDiv.classList.add('video');
        videosDiv.append(videoDiv);
    });
}
// renderVideos(data);
  let searchInput = document.querySelector('.input');
  searchInput.addEventListener('click',()=>{
    if(searchInput.textContent==='Search...')
        searchInput.textContent='';
  })