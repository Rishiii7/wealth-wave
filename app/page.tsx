import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      Landing Page
      <SignInButton>
        <Button>
          Sign In
        </Button>
      </SignInButton>
      <SignUpButton>
        <Button>
          Sign Up
        </Button>
      </SignUpButton>
    </>
  );
}
