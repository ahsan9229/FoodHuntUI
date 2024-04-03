import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const AuthProviderNavigator = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_DOMAIN_ID;
  const redirectUrl = import.meta.env.VITE_AUTH0_DOMAIN_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIANCE;

  if (!domain || !clientId || !redirectUrl || !audience) {
    throw new Error("Unable to Initialese Auth");
  }

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || "/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUrl,
        audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProviderNavigator;
