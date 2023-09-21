import { useState, useEffect } from "react";
import Modal from "@/components/ui/modal";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useStudentsStore from "@/store/students/students-store";
import { Phone } from "lucide-react";
import toast from "react-hot-toast";
import { formatDate } from "@/hooks/use-date-format";
import { useParams } from "react-router-dom";

export const StudentDetailsModal = ({ userId, isOpen, onClose }) => {
  const { course_id } = useParams();

  const { fetchUserById } = useStudentsStore(); // Access the fetchUserById method from your Zustand store

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId && course_id) {
      // Fetch user details when userId changes
      fetchUserById(userId, course_id)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [userId]);

  // For hydration
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  console.log("Modal's user id", userId);

  // Function to copy phone number to clipboard
  const copyPhoneNumberToClipboard = () => {
    const phoneNumber = user?.phone_number;

    if (phoneNumber) {
      navigator.clipboard
        .writeText(phoneNumber)
        .then(() => {
          // Show a success message or handle success as needed
          console.log("Phone number copied to clipboard:", phoneNumber);
          toast.success("Phone number copied to clipboard");
        })
        .catch((error) => {
          // Handle any errors that may occur while copying
          console.error("Error copying phone number:", error);
        });
    }
  };

  //   Loading state
  if (!user || !user?.enrollments[0]) {
    return <>loading</>;
  }

  return (
    <Modal
      title="Details"
      description="View this student's details"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Separator />
      {/* Content */}
      <div className="flex flex-col space-y-6 my-6">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-3">
            <Avatar className="flex h-12 w-12 items-center justify-center space-y-0 border">
              <AvatarImage
                className="object-cover"
                src={
                  user?.avatar_url == null
                    ? `https://avatar.vercel.sh/${user?.first_name}.png`
                    : user?.avatar_url
                }
                alt={user?.first_name}
              />
              <AvatarFallback>{user?.first_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="font-semibold">
                {user?.first_name} {user?.last_name}
              </span>
              <span className="text-muted-foreground">{user?.email}</span>
            </div>
          </div>

          <div className="flex flex-row items-center ">
            {/* <span>{user?.phone_number}</span> */}
            <Button
              onClick={copyPhoneNumberToClipboard}
              size="icon"
              variant="outline"
            >
              <Phone className="h-4 w-4" />
            </Button>
            {/* <Button></Button>
          <span>Launch Whatsapp</span> */}
          </div>
        </div>
        <Separator />

        <div className="grid grid-cols-2">
          {/* <span>Current Topic</span> */}

          <div className="flex flex-row items-center space-x-3">
            <span className="flex items-center justify-center font-semibold border  p-8 rounded-full w-6 h-6 ">
              {" "}
              {user?.enrollments[0]?.level_progress_percentage}%
            </span>
            <div className="flex flex-col items-start space-y-1">
              <span>
                {" "}
                {user?.enrollments[0]?.level_progress_percentage}% Completed
              </span>
              <span className="text-muted-foreground">
                Currently in Topic{" "}
                {user?.enrollments[0]?.last_done_module_order + 1}
              </span>
            </div>
          </div>
        </div>
        <Separator />

        <div className="flex flex-row items-center space-x-2">
          <span className="text-muted-foreground">Enrolled At: </span>
          <span>{formatDate(user?.enrollments[0]?.createdAt)} </span>
        </div>
      </div>
      {/* Bottom Options */}
      <div className="space-x-2 flex items-center justify-end w-full">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        {/* <Button>Save changes</Button> */}
      </div>
    </Modal>
  );
};

// export default student-details-modal
