import { useRouter } from 'next/router';

export default function callbackGoogle() {
  const router = useRouter();
  return router.push(`${window.location.origin}/pefil`);
}
