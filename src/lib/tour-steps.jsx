const steps = [
  {
    selector: '[data-tour="1"]',
    content: (
      <div className="flex flex-col space-y-2 text-black">
        <h1 className="text-xl font-bold tracking-tight">Course switcher 👆</h1>
        <p className="">
          You can switch through your courses by clicking here.
          <ol className="space-y-2 mt-4 font-semibold">
            <li className="flex flex-row items-center ">
              {" "}
              <div
                className={"w-3 h-3 rounded-full mr-4 p-2 bg-yellowBloxDark"}
              />
              The yellow dot means that the course is not published yet.
            </li>
            <li className="flex flex-row items-center ">
              {" "}
              <div
                className={"w-3 h-3 rounded-full p-2 mr-4 bg-lemonBloxDark"}
              />
              The green dot means that the course is published.
            </li>
          </ol>
        </p>
      </div>
    ),
    highlightedSelectors: [".ReactModal__Content"],
    mutationObservables: [".ReactModal__Overlay"],
  },
  {
    selector: '[data-tour="2"]',
    content: (
      <div className="flex flex-col space-y-2 text-black">
        <h1 className="text-xl font-bold tracking-tight">Quick ✨</h1>
        <p className="">
          Here you can quickly access what you need
          <ol className="space-y-2 font-semibold mt-4">
            <li className="flex flex-row items-center space-x-2">
              1. Add a <span className="font-bold  mx-1">new course</span> 📦
            </li>
            <li className="flex flex-row items-center space-x-2">
              2. Manage your{" "}
              <span className="font-bold  mx-1">course content</span>
              👨‍💻
            </li>
            <li className="flex flex-row items-center space-x-2">
              3. Change your{" "}
              <span className="font-bold  mx-1">payment method</span> 💳
            </li>
            <li className="flex flex-row items-center space-x-2">
              4. <span className="font-bold  mx-1">View</span> your portal 👀
            </li>
          </ol>
        </p>
      </div>
    ),
  },
  {
    selector: '[data-tour="3"]',
    content: (
      <div className="flex flex-col space-y-2 text-black">
        <h1 className="text-xl font-bold tracking-tight">Sales 💸</h1>
        <p className="">
          See your course sales.
          <ol className="space-y-2 font-semibold mt-4">
            <li className="flex flex-row items-center space-x-2">
              1. View your{" "}
              <span className="font-bold underline mx-1">current</span> course
              sales
            </li>
            <li className="flex flex-row items-center space-x-2">
              2. View sales of{" "}
              <span className="font-bold underline mx-1">all</span> courses
            </li>
            <li className="flex flex-row items-center space-x-2">
              3. Graph to compare your sales performance 📊
            </li>
          </ol>
        </p>
      </div>
    ),
  },
  {
    selector: '[data-tour="4"]',
    content: (
      <div className="flex flex-col space-y-2 text-black">
        <h1 className="text-xl font-bold tracking-tight">Students 👨‍💻</h1>
        <p className="">
          View the students who enrolled in your current course.
          <ol className="space-y-2 font-semibold mt-4">
            <li>
              1. View their details &{" "}
              <span className="font-bold mx-[0.5px]">progress</span> in your
              course 🔍
            </li>
            <li>
              2. Copy your{" "}
              <span className="font-bold mx-[0.5px]">payment link </span> &
              share 💵
            </li>
            <li>
              3. <span className="font-bold mx-[0.5px]">Add a new student</span>{" "}
              manually ✏️
            </li>
            <li>
              4. <span className="font-bold mx-[0.5px]">Delete</span> students
              if you need to 🤷‍♂️
            </li>
          </ol>
        </p>
      </div>
    ),
  },
  {
    selector: '[data-tour="5"]',
    content: (
      <div className="flex flex-col space-y-2 text-black">
        <h1 className="text-xl font-bold tracking-tight">Settings ⚙️</h1>
        <p className="">
          Manage your portal settings
          <ol className="space-y-2 font-semibold mt-4">
            <li>
              1. Change your{" "}
              <span className="font-bold mx-[0.5px]">account information</span>{" "}
              🔑
            </li>
            <li>
              2. Change the <span className="font-bold mx-[0.5px]">logo</span>{" "}
              and branding of your portal 🖼️
            </li>
            <li>
              3. Change the{" "}
              <span className="font-bold mx-[0.5px]">payment method</span> of
              your portal 💳
            </li>
            <li>
              4. Check your{" "}
              <span className="font-bold mx-[0.5px]">Bloxat plan</span> 🚀
            </li>
          </ol>
        </p>
      </div>
    ),
  },
  {
    selector: '[data-tour="6"]',
    content: (
      <div className="flex flex-col space-y-2 text-black">
        <h1 className="text-xl font-bold tracking-tight">
          {"It's that simple! 🙌💎"}
        </h1>
        <p className="font-semibold">
          Now we need to make sure that your portal is ready to be used!
        </p>
        <p>In three easy steps — takes 3 minutes</p>
        <ol className="space-y-1 font-semibold">
          <li>1. Setup your payment method 💳</li>
          <li>2. Add your course content 🧠</li>
          <li>3. Share your portal and get paid! 💵</li>
        </ol>
      </div>
    ),
  },
];

export default steps;
