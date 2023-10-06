// components/ImageUploader.js

import axios from 'axios'

const handleFileUpload = async (event) => {
  try {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    console.log(formData)

    const response = await axios.post('https://api.imgbb.com/1/upload', formData)
    if (response.data && response.data.url) {
      return response.data.url
    } else {
      return 'Image upload failed'
    }
  } catch (error) {
    return `Image upload failed ${error}`
  }
}

export default handleFileUpload
