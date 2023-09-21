import { useEffect, useState } from "react";
// import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";
import useCreateUserStore from "@/store/auth/create-user-store";
import useStudentsStore from "@/store/students/students-store";
import { useParams } from "react-router-dom";
import PhoneInputComponent from "@/pages/auth/_components/phone-input";

export const AddStudentModal = ({ isOpen, onClose, coursePrice, currency }) => {
  // Param to get courseId
  // const param = useParams();
  // const courseId = param.courseId;
  const { course_id } = useParams();

  //   Create user store
  const createUserStore = useCreateUserStore();
  //   To Enroll the created user afterwards
  const enrollUserStore = useStudentsStore();

  const [isLoading, setIsLoading] = useState(false); // Track loading state

  //   For inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLasttName] = useState("");
  const [email, setEmail] = useState("");

  //   For phone input
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isMounted, setIsMounted] = useState(false);

  // For generating a random password
  const [password, setPassword] = useState("");

  // console.log("course", course?.price);

  const generateRandomPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newPassword = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters.charAt(randomIndex);
    }
    setPassword(newPassword);
  };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //   };

  //   Form Validation
  const isFormValid = () => {
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      toast.error("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleCreateUserAndEnroll = async () => {
    // Check if any of the fields are empty
    if (!isFormValid()) {
      return;
    }

    try {
      setIsLoading(true); // Set loading state to true

      // Step 1: Create a user
      //   console.log("Creating user...");
      const userResponse = await createUserStore.createUser({
        first_name: firstName,
        last_name: lastName,
        email: email,
        hash: password,
        phone_number: phoneNumber,
      });

      console.log("User response:", userResponse?.user_id); // Log the user response

      // Check if userResponse contains the user_id
      if (userResponse) {
        const userId = userResponse?.user_id;

        // Step 2: Enroll the user in a course
        console.log("Enrolling user with ID:", userId, parseInt(course_id));

        const enrollmentResult = await enrollUserStore.enrollUser(
          userId,
          parseInt(course_id),
          coursePrice,
          currency
        );

        if (enrollmentResult) {
          // Enrollment successful
          console.log("User enrolled successfully.");
          toast.success("Student Added!");
          // Reload the current page
          window.location.reload();
        } else {
          // Handle enrollment error
          toast.error("Error enrolling user");
          console.error("Error enrolling user.");
        }
      } else {
        // Handle user creation error
        toast.error("Error creating user");
        console.error("Error creating user.");
      }
    } catch (error) {
      // Handle any unexpected errors
      toast.error("User Already Exists");
      console.error("An unexpected error occurred:", error);
    } finally {
      setIsLoading(false); // Set loading state to false when the operation completes
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Add Student"
      description="Enroll a student in your course"
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* Content */}
      <div className="flex flex-col space-y-6 my-6">
        {/* <form
        // onSubmit={handleSubmit}
        > */}
        <div className="grid gap-6">
          <div className="flex flex-row items-center space-x-5 ">
            {/* First Name */}
            <div className="grid gap-1 w-full">
              <Label htmlFor="firstName" className="mb-1 ">
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="Seif"
                type="name"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                // value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {/* Last Name */}
            <div className="grid gap-1 w-full">
              <Label htmlFor="lastName" className="mb-1 ">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Radwane"
                type="name"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                // value={lastName}
                onChange={(e) => setLasttName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <Label htmlFor="email" className="mb-1">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              //   value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {/* Phone Input */}
          <PhoneInputComponent
            phoneNumber={phoneNumber}
            onChange={(e) => setPhoneNumber(e)}
            disabled={isLoading}
          />

          {/* Password + Generate */}
          <div className="grid gap-1">
            <Label htmlFor="password" className="mb-1">
              Password
            </Label>
            <div className="flex flex-row items-center space-x-3">
              <Input
                id="password"
                placeholder="*********"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              {/* Generate */}
              <Button
                type="button" // Set the button type to "button"
                size="icon"
                variant="outline"
                onClick={generateRandomPassword}
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Forgot Password */}

          {/* Button */}
          {/* <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Continue
            </Button> */}
        </div>
        {/* </form> */}
      </div>

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={isLoading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          //   onClick={onConfirm}
          onClick={handleCreateUserAndEnroll}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Add
        </Button>
      </div>
    </Modal>
  );
};
