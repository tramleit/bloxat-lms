import DemoCopy from "@/components/ui/demo-copy";
import { useState } from "react";

const DemoUser = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  // Function to copy text to clipboard and reset copied state after 2 seconds
  const copyToClipboardAndResetState = (text, setCopiedState) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  return (
    <div className="flex flex-col items-start rounded-md border border-[#eae475] bg-[#fffcc5] dark:text-black w-full px-4 py-2 ">
      <p className="font-bold mb-3">👇 Demo user 👇</p>
      <div className="flex flex-row items-center  mb-3 w-full ">
        <span className="mr-2">Email:</span>
        <span>seif@bloxat.com</span>
        <DemoCopy
          onClick={() =>
            copyToClipboardAndResetState("seif@bloxat.com", setCopiedEmail)
          }
          copied={copiedEmail}
        />
      </div>

      <div className="flex flex-row items-center  mb-2 w-full ">
        <span className="mr-2">Password:</span>
        <span>123456</span>
        <DemoCopy
          onClick={() =>
            copyToClipboardAndResetState("123456", setCopiedPassword)
          }
          copied={copiedPassword}
        />
      </div>
    </div>
  );
};

export default DemoUser;
