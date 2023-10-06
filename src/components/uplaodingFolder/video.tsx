import axios from 'axios'

const deleteFile = async (url: string) => {
  try {
    const data = ''
    const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url,
      headers: {
        AccessKey: 'b1368e67-d29c-498a-a9df14f6cdd5-c5f8-43de',
        'content-type': 'application/octet-stream',
      },
      data: data,
    }

    const response = await axios.request(config)
    return response
  } catch (error) {
    console.log(error)
  }
}

export default deleteFile
