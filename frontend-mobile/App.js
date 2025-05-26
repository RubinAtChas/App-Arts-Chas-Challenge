import Navigation from "./navigation/Navigation";
import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}
