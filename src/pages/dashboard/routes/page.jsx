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
import { RecentSales } from "../_components/recent-sales";
import { getGraphRevenue } from "@/actions/get-graph-revenue";

const DashboardPage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  //  Get the graph data
  // State to store the graph data
  const [graphRevenue, setGraphRevenue] = useState(null);

  const { enrollments, fetchEnrollments } = useStudentsStore();

  useEffect(() => {
    // Call the fetchEnrollments method when the component mounts or whenever needed
    fetchEnrollments(course_id, "", 0, "");
  }, []); // Add any dependencies if needed

  // Fetch the graph data when the component mounts
  useEffect(() => {
    async function fetchGraphRevenue() {
      try {
        // const rowsArray = Array.from(enrollments?.rows || []);

        const data = await getGraphRevenue(enrollments?.rows);
        setGraphRevenue(data);
        console.log("data passed", enrollments?.rows);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    }

    fetchGraphRevenue();
  }, [enrollments]);

  // console.log("enrollments", enrollments?.count);
  // console.log("enrollments", enrollme  nts?.rows);

  // Loading
  if (!enrollments) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Dashboard" description="Overview of your course." />
          <div className="flex flex-row items-center space-x-3">
            <Button
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
                // window.open(
                //   `${PORTAL_URL}/${currentUser?.brand_slug}`,
                //   "_blank"
                // );
              }}
            >
              <ExternalLink className="h-4 w-4" />
              <span>View</span>
            </Button>
          </div>
        </div>

        <Separator />
        <div className="grid gap-4 grid-cols-3">
          {/* Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            {/* Card Content */}
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(enrollments?.totalSum)}
              </div>
              <p className="text-sm text-muted-foreground mt-2">Lifetime</p>
            </CardContent>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>

              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            {/* Card Content */}
            <CardContent>
              <div className="text-2xl font-bold">+{enrollments?.count}</div>
              <p className="text-sm text-muted-foreground mt-2">Lifetime</p>
            </CardContent>
          </Card>
          {/* End Card */}
          {/* Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Enrolled Students
              </CardTitle>

              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            {/* Card Content */}
            <CardContent>
              <div className="text-2xl font-bold">{enrollments?.count}</div>
              <p className="text-sm text-muted-foreground mt-2">Lifetime</p>
            </CardContent>
          </Card>
          {/* End Card */}
        </div>
        {/* Chart */}
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7 w-full">
          {/* Graph */}
          <div className="flex-1 col-span-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-md font-medium">Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <SalesChart data={graphRevenue} />
              </CardContent>
            </Card>
          </div>
          {/* recent sales */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="text-md font-medium">
                Recent Sales
              </CardTitle>
              {/* <CardDescription>You made 265 sales this month.</CardDescription> */}
              <CardDescription>
                You made {enrollments?.count} sales.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales recentData={enrollments?.rows} />
            </CardContent>
          </Card>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default DashboardPage;
