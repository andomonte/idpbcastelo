import { providers, signIn } from 'next-auth/client';

export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button type="button" onClick={() => signIn(provider.id)}>
            Entrar com {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

SignIn.getInitialProps = async () => ({
  providers: await providers(),
});
