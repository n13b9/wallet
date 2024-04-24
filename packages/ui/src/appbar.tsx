import { useRouter } from "next/navigation";
import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // TODO: can u figure out what the type should be here?
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  const router = useRouter();
  const handleRegister = () => {
    console.log("cliced");
    router.push("/register");
  };
  return (
    <div className="flex justify-between border-b px-10 py-3 mx-7">
      <div className="flex flex-col justify-center p-3 rounded">
        <img src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logo.svg" />
      </div>
      <div className="flex flex-row items-center gap-10 pr-2 pl-5">
        <ul className="text-xl font-serif "> For Customer </ul>
        <ul className="text-xl font-serif"> For Business </ul>
        <ul className="text-xl font-serif"> Investor Relations </ul>
        <ul className="text-xl font-serif"> Careers </ul>
      </div>
      <div className="flex flex-row">
        {!user && (
          <div className="flex flex-col justify-center pt-2">
            <Button onClick={handleRegister}>Register</Button>
          </div>
        )}
        <div className="flex flex-col justify-center pt-2">
          <Button onClick={user ? onSignout : onSignin}>
            {user ? "Logout" : "Sign In"}
          </Button>
        </div>
      </div>
    </div>
  );
};
