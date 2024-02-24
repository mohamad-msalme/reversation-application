import { axiosInstance } from 'client/axiosInstance'

type TCoord = {
  lat: number
  lng: number
}

export const LocationQuery = ({ lat, lng }: TCoord) => ({
  queryKey: ['LocationQuery', lat, lng],
  queryFn: async () => fetchLocation({ lat, lng })
})

const fetchLocation = async ({ lat, lng }: TCoord) => {
  try {
    const data = await axiosInstance.get<{ display_name: string }>(
      `reverse?lat=${lat}&lon=${lng}&api_key=${process.env.REACT_API_KEY}`,
      {
        baseURL: process.env.REACT_GEO_URL,
        withCredentials: false
      }
    )
    return data.data.display_name
  } catch (error) {
    //
    console.log(error)
  }
}
