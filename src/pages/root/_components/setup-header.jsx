import Logo from "@/assets/images/logo/bloxat-colored.webp";

const SetupHeader = () => {
  return (
    <>
      <div className="border-b border-black dark:border-[#2f2f2f] flex h-16 items-center px-6">
        <img
          src={Logo}
          // className="w-[26px] h-auto mr-4 mix-blend-difference filter brightness-0 invert"
          className="w-[70px] h-auto mr-4"
          alt="Bloxat"
          draggable={false}
        />
        <p className="font-semibold">Quick Setup</p>
      </div>
    </>
  );
};

export default SetupHeader;