import { useAuth0 } from "@auth0/auth0-react";

export const LoggingButtons = () => {
  // Deconstruct logging methods from useAuth0
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const buttonText = isAuthenticated ? 'Log Out' : 'Log In';

  const handleLogging = () => {
    if (isAuthenticated) {
      // Logout Method
      logout({logoutParams: {returnTo: window.location.origin}});
    } else {
      // Login with Redirect Method
      loginWithRedirect();
    }
  };

  return (
      <button className='nav-btn  px-4 py-1' onClick={handleLogging}>
        {buttonText}
      </button>
  );
};