import { useAuthState, useSignOut } from "~/components/contexts/UserContext";
import { useAuth } from "~/lib/firebase";

type Props = {};

export const SignOutButton = (props: Props) => {
  const { signOut } = useSignOut();
  const handleClick = () => {
    const auth = useAuth();
    auth.signOut();
    signOut();
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="btn normal-case"
    >
      Sign Out
    </button>
  );
};
