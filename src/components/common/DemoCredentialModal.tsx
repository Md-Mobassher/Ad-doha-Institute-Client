import React from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@mui/material";
import DohaModal from "../shared/DohaModal/DohaModal";

interface DemoCredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success(`${text} Copied to clipboard`);
  });
};

const DemoCredentialModal: React.FC<DemoCredentialModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <DohaModal open={isOpen} setOpen={onClose} title="Demo Credentials">
      <div className="w-[320px] md:w-[450px] flex flex-col gap-4 md:px-5 pb-5 p-0">
        {/* admin credential */}
        <div>
          <h3 className="mb-4 text-xl font-bold underline">Admin:</h3>

          <div className="flex justify-between  items-center gap-3 mb-2">
            <div className="w-[22%]">
              <p className="">Email: </p>
            </div>
            <div className="w-[75%] flex justify-between bg-gray-300 text-primary-400 p-2 rounded-lg">
              <p>admin@gmail.com</p>
              <button
                onClick={() => copyToClipboard("admin@gmail.com")}
                className="focus:outline-none"
              >
                <Copy className="hover:text-green-600 cursor-pointer" />
              </button>
            </div>
          </div>
          <div className="flex justify-between  items-center gap-3">
            <div className="w-[22%]">
              <p className="">Password: </p>
            </div>
            <div className="w-[75%] flex justify-between bg-gray-300 text-primary-400 p-2 rounded-lg">
              <p>Admin@123</p>
              <button
                onClick={() => copyToClipboard("Admin@123")}
                className="focus:outline-none"
              >
                <Copy className="hover:text-green-600 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>

        {/* Faculty credential */}
        <div>
          <h3 className="mb-4 text-xl font-bold underline">Faculty:</h3>

          <div className="flex justify-between  items-center gap-3 mb-2">
            <div className="w-[22%]">
              <p className="">Email: </p>
            </div>
            <div className="w-[75%] flex justify-between bg-gray-300 text-primary-400 p-2 rounded-lg">
              <p>faculty@gmail.com</p>
              <button
                onClick={() => copyToClipboard("faculty@gmail.com")}
                className="focus:outline-none"
              >
                <Copy className="hover:text-green-600 cursor-pointer" />
              </button>
            </div>
          </div>
          <div className="flex justify-between  items-center gap-3">
            <div className="w-[22%]">
              <p className="">Password: </p>
            </div>
            <div className="w-[75%] flex justify-between bg-gray-300 text-primary-400 p-2 rounded-lg">
              <p>Faculty@123</p>
              <button
                onClick={() => copyToClipboard("Faculty@123")}
                className="focus:outline-none"
              >
                <Copy className="hover:text-green-600 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>

        {/* user credential */}
        <div>
          <h3 className="mb-4 text-xl font-bold underline">Student:</h3>

          <div className="flex justify-between  items-center gap-3 mb-2">
            <div className="w-[22%]">
              <p className="">Email: </p>
            </div>
            <div className="w-[75%] flex justify-between bg-gray-300 text-primary-400 p-2 rounded-lg">
              <p>student@gmail.com</p>
              <button
                onClick={() => copyToClipboard("student@gmail.com")}
                className="focus:outline-none"
              >
                <Copy className="hover:text-green-600 cursor-pointer" />
              </button>
            </div>
          </div>
          <div className="flex justify-between  items-center gap-3">
            <div className="w-[22%]">
              <p className="">Password: </p>
            </div>
            <div className="w-[75%] flex justify-between bg-gray-300 text-primary-400 p-2 rounded-lg">
              <p>Student@123</p>
              <button
                onClick={() => copyToClipboard("Student@123")}
                className="focus:outline-none"
              >
                <Copy className="hover:text-green-600 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DohaModal>
  );
};

export default DemoCredentialModal;
