import { useEffect, useState } from "react";
import { SalesChart } from "@/components/sales-chart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import {
  Box,
  Boxes,
  Copy,
  CreditCard,
  DollarSign,
  Edit,
  ExternalLink,
  Plus,
  Trash,
  User,
} from "lucide-react";
import useStudentsStore from "@/store/students/students-store";
import Loading from "@/components/loading/loading";
import { useNavigate, useParams } from "react-router-dom";
import { RecentSales } from "./_components/recent-sales";
// import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { useWarnings } from "@/hooks/use-warnings";
import { PORTAL_URL } from "@/config/url-config";
import { CompareChart } from "@/components/compare-chart";
import { useCompareAnalytics } from "@/hooks/use-compare-analytics";
import { formatPrice } from "@/lib/format-price";
import currentMonth from "@/lib/get-current-month";
import { useCurrentUser } from "@/hooks/use-current-user";
import CardBadge from "./_components/card-badge";
import { copyText } from "@/lib/copy-text";
import { useTranslation } from "react-i18next";

const DashboardPage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  //  Get the graph data
  // State to store the graph data
  // const [graphRevenue, setGraphRevenue] = useState(null);

  const currentUser = useCurrentUser();

  const { enrollments, fetchEnrollments } = useStudentsStore();
  // Use the custom hook to fetch warnings
  // const { data: warnings, isLoading, isError } = useWarnings(course_id);

  const {
    data: compareAnalytics,
    isLoading: analyticsLoading,
    isError: error,
  } = useCompareAnalytics();

  const { t } = useTranslation();

  useEffect(() => {
    // Call the fetchEnrollments method when the component mounts or whenever needed
    fetchEnrollments(course_id, "", 0, "");
  }, []); // Add any dependencies if needed

  // Get current month
  // Get the current date and extract the month

  // Fetch the graph data when the component mounts
  // useEffect(() => {
  //   async function fetchGraphRevenue() {
  //     try {
  //       // const rowsArray = Array.from(enrollments?.rows || []);

  //       const data = await getGraphRevenue(enrollments?.rows);
  //       setGraphRevenue(data);
  //       console.log("data passed", enrollments?.rows);
  //     } catch (error) {
  //       console.error("Error fetching graph data:", error);
  //     }
  //   }

  //   fetchGraphRevenue();
  // }, [enrollments]);

  // console.log("enrollments", enrollments?.count);
  // console.log("enrollments", enrollme  nts?.rows);

  // Loading
  if (analyticsLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  console.log("warnings", enrollments);

  return (
    <>
      {/* <WarningsBanners warnings={warnings} courseId={course_id} /> */}
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading
              title={t("Sales")}
              description={t("View your course sales.")}
            />
            <div className="flex flex-row items-center space-x-3">
              <Button
                variant="yellow"
                onClick={() =>
                  copyText(
                    `${PORTAL_URL}/${currentUser?.brand_slug}/${enrollments?.courseSlug}/checkout`
                  )
                }
              >
                <Copy className="mr-2 h-4 w-4" />
                {t("Payment link")}
              </Button>

              {/* <Button
                onClick={() => {
                  navigate(`/${course_id}/edit`);
                }}
              >
                <Box className="mr-2 h-4 w-4" />
                Edit course
              </Button>
              <Button
                // disabled={loading}
                variant="outline"
                className="space-x-2"
                onClick={() => {
                  // Open portal of the brand in a new tab
                  window.open(`${PORTAL_URL}/${warnings?.brandSlug}`, "_blank");
                }}
              >
                <ExternalLink className="h-4 w-4" />
                <span>View</span>
              </Button> */}
            </div>
          </div>

          <Separator />
          <div className="grid gap-4 md:grid-cols-4 grid-cols-1">
            {/* Card */}
            <Card className="dark:bg-[#141414]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("Total Sales")}
                  {/* All Courses Revenue */}
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              {/* Card Content */}
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatPrice(
                    compareAnalytics?.totalRevenue,
                    currentUser?.brand_currency
                  )}
                </div>

                <CardBadge label={t("All courses")} color="bg-[#dae6ff]" />
              </CardContent>
            </Card>
            {/* End Card */}
            {/* Card */}
            <Card className="dark:bg-[#141414]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("Total Sales")}
                  {/* All Courses Revenue */}
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              {/* Card Content */}
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatPrice(
                    enrollments?.totalSum,
                    currentUser?.brand_currency
                  )}
                </div>
                {/* <p className="text-sm text-muted-foreground mt-2">
                  This course
                </p> */}
                <CardBadge label={t("This course")} color="bg-[#fff3cf]" />
              </CardContent>
            </Card>
            {/* End Card */}
            {/* Card */}
            <Card className="dark:bg-[#141414]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("Sales this month")}
                </CardTitle>

                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              {/* Card Content */}
              <CardContent>
                {/* <div className="text-2xl font-bold">+{enrollments?.count}</div> */}
                <div className="text-2xl font-bold">
                  +
                  {formatPrice(
                    enrollments?.totalSumThisMonth,
                    currentUser?.brand_currency
                  )}
                </div>

                {/* <p className="text-sm text-muted-foreground mt-2">
                  This course
                </p> */}

                <CardBadge label={t("This course")} color="bg-[#fff3cf]" />
              </CardContent>
            </Card>
            {/* End Card */}
            {/* Card */}
            <Card className="dark:bg-[#141414]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {/* Enrolled Students */}
                  {t("Students")}
                </CardTitle>

                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              {/* Card Content */}
              <CardContent>
                <div className="text-2xl font-bold">
                  {enrollments?.count - 1}
                  {/* We substract 1 because when the user creates a course he auto enrolls .. so technically he's not a paying student .. so we remove him from the count */}
                </div>
                {/* <p className="text-sm text-muted-foreground mt-2">
                  This course
                </p> */}

                <CardBadge label={t("This course")} color="bg-[#fff3cf] " />
              </CardContent>
            </Card>
            {/* End Card */}
          </div>
          {/* Chart */}
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7 w-full">
            {/* Graph */}
            <div className="flex-1 col-span-4 ">
              <Card className="dark:bg-[#141414]">
                <CardHeader>
                  <CardTitle className="text-md font-medium">
                    {/* Overview */}
                    {t("Compare courses")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  {/* <SalesChart data={graphRevenue} /> */}
                  <CompareChart
                    data={compareAnalytics?.data}
                    currency={currentUser?.brand_currency}
                  />
                </CardContent>
              </Card>
            </div>
            {/* recent sales */}
            <Card className="md:col-span-3 col-span-4 dark:bg-[#141414]">
              <CardHeader>
                <CardTitle className="text-md font-medium">
                  {t("Recent Sales")}
                </CardTitle>
                {/* <CardDescription>You made 265 sales this month.</CardDescription> */}
                <CardDescription>
                  This course made {enrollments?.count - 1} sales.
                </CardDescription>
              </CardHeader>
              {/* <Separator className="mt-[-10px] mb-5" /> */}

              <CardContent>
                <RecentSales recentData={enrollments?.rows} />
              </CardContent>
            </Card>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
