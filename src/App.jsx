import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="overflow-x-hidden">
        <Suspense fallback={<>loading</>}>
          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={<Navigate replace to="/dashboard" />}
              // element={<Dashboard />}
            />
            {/* Dashboard -> Library/ Courses (First tab) */}
            <Route
              path="/dashboard"
              element={
                // <RequireAuth>
                <div>
                  test
                  {/* <Header />
                      <Dashboard /> */}
                </div>
                // </RequireAuth>
              }
            />
            {/* Profile -> Profile to access settings etc (Second tab) */}
            <Route
              path="/profile"
              element={
                // <RequireAuth>
                <div>
                  profile
                  {/* <Header /> */}
                  {/* <Dashboard /> */}
                </div>
                // </RequireAuth>
              }
            />
            {/* Course Page */}
            <Route
              path="/course/:course_slug"
              element={
                // <RequireAuth>
                <div className="overflow-y-hidden h-screen">
                  {/* <HeaderBlack /> */}
                  {/* <Course /> */}
                </div>
                // </RequireAuth>
              }
            />
            {/* Module Page */}
            <Route
              path="/course/:course_slug/:module_order/:lesson_order"
              element={
                // <RequireAuth>
                <div className="overflow-y-hidden h-screen">
                  {/* <HeaderFocus /> */}
                  {/* <Module /> */}
                </div>
                // </RequireAuth>
              }
            />
            {/* Checkout */}
            <Route
              path="/checkout/:course_slug"
              element={
                <></>
                // If there's no token then go to the checkout page where we login or sign up ... else go to the payment page directly
                // !token ? (
                //   <div className="overflow-y-hidden h-screen">
                //     {/* <CheckoutHeader /> */}
                //     <PaymentHeader />
                //     <Checkout />
                //   </div>
                // ) : (
                //   <div className="overflow-y-hidden h-screen">
                //     <PaymentHeader />

                //     <Payment />
                //   </div>
                // )
              }
            />
            {/* Payment */}
            <Route
              path="/payment/:course_slug"
              element={
                // <CheckoutRequireAuth>
                <div className="overflow-y-hidden h-screen">
                  {/* <PaymentHeader /> */}
                  {/* <Payment /> */}
                </div>
                // </CheckoutRequireAuth>
              }
            />

            {/* Auth */}
            <Route
              path="/login"
              element={
                <></>
                // !token ? (
                //   <Login />
                // ) : (
                //   <div>
                //     <Header />
                //     <Dashboard />
                //   </div>
                // )
              }
            />

            <Route
              path="/signup"
              element={
                <></>
                // !token ? (
                //   <Signup />
                // ) : (
                //   <div>
                //     <Header />
                //     <Dashboard />
                //   </div>
                // )
              }
            />

            <Route
              path="/forgot-password"
              element={
                <></>
                // !token ? (
                //   <ForgotPassword />
                // ) : (
                //   <div>
                //     <Header />
                //     <Dashboard />
                //   </div>
                // )
              }
            />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
