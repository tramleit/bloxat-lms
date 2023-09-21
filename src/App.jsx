import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Open_Sans } from "google-fonts";
import { ToasterProvider } from "@/providers/toast-provider";
import ModalProvider from "@/providers/modal-provider";

// LOADING
const Loading = lazy(() => import("@/components/loading/loading"));
// ROOT
const SetupLayout = lazy(() => import("@/pages/root/layout"));
const SetupPage = lazy(() => import("@/pages/root/routes/page"));
const Branding = lazy(() => import("@/pages/root/routes/branding/page"));
const CreateFirstCourse = lazy(() =>
  import("@/pages/root/routes/create-first-course/page")
);
// AUTH
const AuthLayout = lazy(() => import("@/pages/auth/layout"));
const Login = lazy(() => import("@/pages/auth/routes/login/page"));
const Signup = lazy(() => import("@/pages/auth/routes/signup/page"));
// DASHBOARD
const DashboardLayout = lazy(() => import("@/pages/dashboard/layout"));
const DashboardPage = lazy(() => import("@/pages/dashboard/routes/page"));
const StudentsPage = lazy(() =>
  import("@/pages/dashboard/routes/students/page")
);
const EditCoursePage = lazy(() => import("@/pages/dashboard/routes/edit/page"));
const SettingsPage = lazy(() =>
  import("@/pages/dashboard/routes/settings/page")
);
// SETTINGS ROUTES
const AccountPage = lazy(() =>
  import("@/pages/dashboard/routes/settings/_routes/account/page")
);
const PlanPage = lazy(() =>
  import("@/pages/dashboard/routes/settings/_routes/plan/page")
);
const BrandingPage = lazy(() =>
  import("@/pages/dashboard/routes/settings/_routes/branding/page")
);
const PaymentPage = lazy(() =>
  import("@/pages/dashboard/routes/settings/_routes/payment/page")
);
// PAYMENT PAGE ROUTES
// PAYMOB
const PaymobSetupPage = lazy(() =>
  import(
    "@/pages/dashboard/routes/settings/_routes/payment/routes/paymob/routes/setup/page"
  )
);
const PaymobIntegrationPage = lazy(() =>
  import(
    "@/pages/dashboard/routes/settings/_routes/payment/routes/paymob/routes/integration/page"
  )
);
const PaymobCallbackPage = lazy(() =>
  import(
    "@/pages/dashboard/routes/settings/_routes/payment/routes/paymob/routes/callback/page"
  )
);
const PaymobPage = lazy(() =>
  import("@/pages/dashboard/routes/settings/_routes/payment/routes/paymob/page")
);
// INSTAPAY
const InstapaySetupPage = lazy(() =>
  import(
    "@/pages/dashboard/routes/settings/_routes/payment/routes/instapay/routes/setup/page"
  )
);
const InstapayPage = lazy(() =>
  import(
    "@/pages/dashboard/routes/settings/_routes/payment/routes/instapay/page"
  )
);
// SUBSCRIPTION
const SubscriptionLayout = lazy(() => import("@/pages/subscription/layout"));
const TrialEnded = lazy(() =>
  import("@/pages/subscription/routes/trial-ended/page")
);
const SubscriptionEndedPage = lazy(() =>
  import("@/pages/subscription/routes/subscription-ended/page")
);
const PaymentRedirect = lazy(() =>
  import("@/pages/subscription/routes/payment-redirect/page")
);

function App() {
  return (
    <BrowserRouter>
      <div
        className="overflow-x-hidden h-screen"
        style={{ fontFamily: Open_Sans }}
      >
        <ToasterProvider />
        <ModalProvider />
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Root -> Setup */}
            {/* Step One */}
            <Route
              exact
              path="/"
              element={
                <SetupLayout>
                  <SetupPage />
                </SetupLayout>
              }
            />
            {/* Dashboard */}
            <Route
              path="/:course_id"
              element={
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              }
            />
            {/* Students */}
            <Route
              path="/:course_id/students"
              element={
                <DashboardLayout>
                  <StudentsPage />
                </DashboardLayout>
              }
            />
            {/* Edit */}
            <Route
              path="/:course_id/edit"
              element={
                <DashboardLayout>
                  <EditCoursePage />
                </DashboardLayout>
              }
            />
            {/* Settings */}
            <Route
              path="/:course_id/settings"
              element={
                <DashboardLayout>
                  <SettingsPage />
                </DashboardLayout>
              }
            />
            {/* Settings routes */}
            {/* Account */}
            <Route
              path="/:course_id/settings/account"
              element={
                <DashboardLayout>
                  <AccountPage />
                </DashboardLayout>
              }
            />
            {/* Plan */}
            <Route
              path="/:course_id/settings/plan"
              element={
                <DashboardLayout>
                  <PlanPage />
                </DashboardLayout>
              }
            />
            {/* Branding */}
            <Route
              path="/:course_id/settings/branding"
              element={
                <DashboardLayout>
                  <BrandingPage />
                </DashboardLayout>
              }
            />
            {/* Payment */}
            <Route
              path="/:course_id/settings/payment"
              element={
                <DashboardLayout>
                  <PaymentPage />
                </DashboardLayout>
              }
            />
            {/* Payment Routes */}
            {/* Paymob */}
            {/* Setup */}
            <Route
              path="/:course_id/settings/payment/paymob/setup"
              element={
                <DashboardLayout>
                  <PaymobSetupPage />
                </DashboardLayout>
              }
            />
            {/* Paymob -> integration */}
            <Route
              path="/:course_id/settings/payment/paymob/integration"
              element={
                <DashboardLayout>
                  <PaymobIntegrationPage />
                </DashboardLayout>
              }
            />
            {/* Paymob -> callback */}
            <Route
              path="/:course_id/settings/payment/paymob/callback"
              element={
                <DashboardLayout>
                  <PaymobCallbackPage />
                </DashboardLayout>
              }
            />
            {/* Paymob Page */}
            <Route
              path="/:course_id/settings/payment/paymob"
              element={
                <DashboardLayout>
                  <PaymobPage />
                </DashboardLayout>
              }
            />
            {/* Instapay */}
            {/* Setup */}
            <Route
              path="/:course_id/settings/payment/instapay/setup"
              element={
                <DashboardLayout>
                  <InstapaySetupPage />
                </DashboardLayout>
              }
            />
            {/* Instapay page */}
            <Route
              path="/:course_id/settings/payment/instapay"
              element={
                <DashboardLayout>
                  <InstapayPage />
                </DashboardLayout>
              }
            />
            {/* SETUP */}
            {/* Step Two */}
            <Route
              exact
              path="/branding"
              element={
                <SetupLayout>
                  <Branding />
                </SetupLayout>
              }
            />
            {/* Step Three */}
            <Route
              exact
              path="/create-first-course"
              element={
                <SetupLayout>
                  <CreateFirstCourse />
                </SetupLayout>
              }
            />
            {/* Auth */}
            <Route
              path="/login"
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthLayout>
                  <Signup />
                </AuthLayout>
              }
            />
            {/* Forgot Password */}
            <Route
              path="/forgot-password"
              element={<div>Forgot Password</div>}
            />

            {/* SUBSCRIPTION */}
            {/* TRIAL ENDED */}
            <Route
              path="/trial-ended"
              element={
                <SubscriptionLayout>
                  <TrialEnded />
                </SubscriptionLayout>
              }
            />
            {/* SUBSCRIPTION ENDED */}
            <Route
              path="/subscription-ended"
              element={
                <SubscriptionLayout>
                  <SubscriptionEndedPage />
                </SubscriptionLayout>
              }
            />
            {/* PAYMENT REDIRECT PAGE */}
            <Route
              path="/payment-redirect"
              element={
                <SubscriptionLayout>
                  <PaymentRedirect />
                </SubscriptionLayout>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
