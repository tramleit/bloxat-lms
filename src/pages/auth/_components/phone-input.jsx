import PhoneInput from "react-phone-input-2";

const PhoneInputComponent = ({ phoneNumber, onChange, disabled }) => {
  return (
    <div
    //   className={`phone-input-container ${
    //     theme === "dark" ? "text-white" : "text-black"
    //   }`}
    >
      <PhoneInput
        className="flex"
        country={"eg"}
        countryCodeEditable={false}
        inputProps={{
          required: true,
        }}
        inputStyle={{
          width: "100%",
          height: "50px",
          //   background: "transparent",
          background: "#fff",

          //   color: theme === "dark" ? "#fff" : "#000", // Adjust text color based on theme
          color: "#000",
        }}
        value={phoneNumber}
        enableSearch={true}
        specialLabel=""
        // onlyCountries={["eg", "sa", "om", "kw", "qa"]}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default PhoneInputComponent;
