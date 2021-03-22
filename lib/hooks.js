import axios from 'axios';
import useSWR from 'swr';

export function useUser() {
  const {data, mutate} = useSWR("/api/user", url => axios.get(url));

  const user = data && data.data;

  return [user, { mutate }];
}