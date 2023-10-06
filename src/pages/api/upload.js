// pages/api/upload.js
import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {
    const apiKey = '807b79b03a554f95b5980b6b9d688013' // Replace this with your ImgBB API key
    const formData = new FormData()
    formData.append('image', req.body)

    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        key: apiKey,
      },
    })

    if (response.data && response.data.data && response.data.data.url) {
      return res.status(200).json({ url: response.data.data.url })
    } else {
      return res.status(500).json({ error: 'Image upload failed' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Image upload failed' })
  }
}
