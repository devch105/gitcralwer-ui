"use client";

import { ENDPOINTS } from "@/utilities/endpoints";
import { FaGithub } from "react-icons/fa";
import { Button } from "./ui/button";

const GithubSignInButton = () => {
  const handleSignIn = () => {
    window.location.href = ENDPOINTS.GITHUB_LOGIN;
  };

  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={handleSignIn}
        className="cursor-pointer"
      >
        <FaGithub className="mr-2" />
        Sign in with GitHub
      </Button>
    </div>
  );
};

export default GithubSignInButton;