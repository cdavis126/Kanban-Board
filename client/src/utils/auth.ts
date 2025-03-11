import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Decodes the JWT and returns user profile
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  // Returns true if user is logged in (token exists & is not expired)
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  // Checks if the JWT token is expired
  isTokenExpired(token: string): boolean {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      if (!decodedToken.exp) {
        console.warn("Token has no expiry date");
        return false;
      }
      return decodedToken.exp * 1000 < Date.now();
    } catch (error) {
      console.error("Invalid token:", error);
      return true;
    }
  }

  // Retrieves the JWT token from localStorage (with logging)
  getToken(): string {
    const token = localStorage.getItem("id_token") || "";
    console.log("Retrieved token:", token); // Debugging
    return token;
  }

  // Stores token in localStorage & redirects to homepage
  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/dashboard"); // Redirect to dashboard after login
  }
  

  // Removes token & redirects to login page
  logout(navigate?: (path: string) => void) {
    localStorage.removeItem("id_token");
    console.log("Token removed, redirecting to login."); // Debugging
    if (navigate) {
      navigate("/login"); // Use React Router if available
    } else {
      window.location.assign("/login"); // allback for non-router environments
    }
  }
}

export default new AuthService();


