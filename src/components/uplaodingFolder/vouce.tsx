// soundcloudApi.ts
import axios from 'axios';

const CLIENT_ID = 'YOUR_CLIENT_ID';

// Upload a track to SoundCloud
export async function uploadTrack(accessToken: string, file: Buffer, title: string) {
  const response = await axios.post('https://api.soundcloud.com/tracks', file, {
    params: {
      client_id: CLIENT_ID,
      oauth_token: accessToken,
      title,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.permalink_url;
}
