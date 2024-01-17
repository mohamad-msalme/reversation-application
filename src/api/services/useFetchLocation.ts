import { useQuery } from 'react-query'
import { axiosInstance } from 'client/axiosInstance'

type TCoord = {
  lat: number
  lng: number
}
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
  }
}

export const useFetchLocation = (coord: TCoord) =>
  useQuery(
    ['useFetchLocation', coord.lat, coord.lng],
    fetchLocation.bind(undefined, coord),
    {
      enabled: Boolean(coord?.lat) && Boolean(coord?.lng)
    }
  )
