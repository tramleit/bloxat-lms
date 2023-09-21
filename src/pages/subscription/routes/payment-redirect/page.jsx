import SuccessCard from "./components/success-card";
import { useCurrentUser } from "@/hooks/use-current-user";
import Loading from "@/components/loading/loading";
import TryAgainCard from "./components/try-again-card";
import Logo from "@/assets/images/logo/bloxat-colored.webp";

const PaymentRedirect = () => {
  const currentUser = useCurrentUser();

  //   Get the search params that paymob sent in the url
  // Get the URL search parameters
  const searchParams = new URLSearchParams(window.location.search);

  // Get the values of "success" and "pending" parameters
  const success = searchParams.get("success");
  const pending = searchParams.get("pending");

  if (!currentUser) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="flex w-full items-center justify-center absolute left-0 right-0 top-10">
        <img
          src={Logo}
          className="w-[110px] h-auto "
          alt="Bloxat"
          draggable={false}
        />
      </div>

      {/* If paymob sent that success = true .. and pending = false */}
      {success == "true" && pending == "false" && (
        <SuccessCard endDate={currentUser?.subscription_end} />
      )}
      {success == "false" && pending == "true" && <TryAgainCard />}

      {/* if the router query has success = true */}
      {/* Success */}
      {/* {success == true && (
        <SuccessCard endDate={currentUser?.subscription_end} />
      )}
      {success != true && <TryAgainCard />} */}
    </div>
  );
};

export default PaymentRedirect;
