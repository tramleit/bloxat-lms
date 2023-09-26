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

  const { fetchEnrollmentById } = useStudentsStore(); // Access the fetchUserById method from your Zustand store

  const [data, setData] = useState(null);

  useEffect(() => {
    if (userId && course_id) {
      // Fetch user details when userId changes
      fetchEnrollmentById(userId, course_id)
        .then((userData) => {
          setData(userData);
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
    const phoneNumber = `+${data?.user?.phone_number}`;

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
  if (!data) {
    return <></>;
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
                  data?.user?.avatar_url == null
                    ? `https://avatar.vercel.sh/${data?.user?.first_name}.png`
                    : data?.user?.avatar_url
                }
                alt={data?.user?.first_name}
              />
              <AvatarFallback>
                {data?.user?.first_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="font-semibold">
                {data?.user?.first_name} {data?.user?.last_name}
              </span>
              <span className="text-muted-foreground">{data?.user?.email}</span>
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
        {/* <Separator />

        <div className="grid grid-cols-2">
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
        </div> */}
        <Separator />
        {/* Payment */}
        <div className="flex flex-row items-center space-x-2 md:text-base text-sm">
          <span className="text-muted-foreground">💵 Paid: </span>
          <span>
            {data?.userEnrollment?.price} {data?.userEnrollment?.currency}
          </span>
          {/* {data?.userEnrollment?.status == 1 && <span>Success</span>} */}
        </div>

        {/* How enrolled */}
        <div className="flex flex-row items-center space-x-1 flex-wrap md:text-base text-sm">
          <span className="text-muted-foreground">📅 Enrolled At: </span>
          <span>{formatDate(data?.userEnrollment.createdAt)} </span>
          <span>via</span>
          <span>{data?.userEnrollment?.enrolled_through}</span>
        </div>
      </div>
      {data?.userEnrollment?.order_id && (
        <>
          {/* Paymob data */}
          <div className="flex flex-row items-center space-x-2">
            <span className="text-muted-foreground">Paymob data: </span>
            <span>{data?.userEnrollment?.order_id}</span>
            <span>{data?.userEnrollment?.transaction_id}</span>
          </div>
        </>
      )}
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
