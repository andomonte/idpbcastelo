// Display posts in frontend (in /pages/index.tsx)
import useSWR from 'swr';
import fetch from 'unfetch';

const fetcher = (url) => fetch(url).then((r) => r.json());
export default function igrejas() {
  const { data, error } = useSWR('/api/consultaDados', fetcher);
  if (error) return <div>An error occured.</div>;
  if (!data) return <div>Loading ...</div>;
  return data;
}
