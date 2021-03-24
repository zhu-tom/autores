import axios from 'axios';
import useSWR from 'swr';

export function useUser() {
  const {data, mutate, error} = useSWR("/api/user", url => axios.get(url).then(res=>res.data));

  return {data, mutate, error};
}