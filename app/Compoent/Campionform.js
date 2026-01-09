"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ContactFormDesign() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const eventFromUrl = searchParams.get("event");

const eventType = searchParams.get("type"); // individual | group
const [otpSent, setOtpSent] = useState(false);
const [otpVerified, setOtpVerified] = useState(false);
const [otp, setOtp] = useState("");

const sendOtp = async () => {
  const mobile = document.querySelector("input[name='mobile']").value;

  if (mobile.length !== 10) {
    showToast("Enter valid 10-digit mobile", "danger");
    return;
  }

  try {
    await fetch("https://paisagram-backend.vercel.app/api/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }),
    });

    setOtpSent(true);
    showToast("OTP sent successfully");
  } catch {
    showToast("Failed to send OTP", "danger");
  }
};
const verifyOtp = async () => {
  const mobile = document.querySelector("input[name='mobile']").value;

  try {
    await fetch("https://your-vercel-domain.vercel.app/api/otp/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ mobile: "1234567890" }),
});


    if (!res.ok) throw new Error();

    setOtpVerified(true);
    showToast("Mobile verified successfully");
  } catch {
    showToast("Invalid OTP", "danger");
  }
};



  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleMobileInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type });
    }, 3000);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ BLOCK submit if individual event & OTP not verified
  if (eventType === "individual" && !otpVerified) {
    showToast("Please verify mobile number", "danger");
    return;
  }

  const formData = new FormData(e.target);

  const data = {
    eventName: formData.get("eventName") || "General",
    eventCategory: eventType,              // ✅ SEND THIS
    name: formData.get("name"),
    email: formData.get("email"),
    mobile: formData.get("mobile"),
    occupation: formData.get("occupation"),
    isMobileVerified: otpVerified,          // ✅ SEND THIS
  };

  // Basic validation
  if (!data.name || !data.mobile || data.mobile.length !== 10) {
    showToast("Name and valid 10-digit mobile number are required", "danger");
    return;
  }

  try {
    const response = await fetch(
      "https://paisagram-backend.vercel.app/api/campaion/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error("Submit failed");

    showToast("Form submitted successfully!", "success");
    e.target.reset();

    setTimeout(() => {
      router.push("/Thankyou");
    }, 1500);
  } catch (error) {
    console.error(error);
    showToast("Failed to submit form", "danger");
  }
};


  return (
    <>
      {/* ================= BOOTSTRAP TOAST ================= */}
      {toast.show && (
        <div
          className="toast-container position-fixed top-0 end-0 p-3"
          style={{ zIndex: 9999 }}
        >
          <div className={`toast show text-bg-${toast.type}`}>
            <div className="d-flex">
              <div className="toast-body">{toast.message}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setToast({ ...toast, show: false })}
              ></button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FORM UI ================= */}
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
        <div className="w-100" style={{ maxWidth: "900px" }}>
          <h3 className="fw-bold text-center mb-4">
            Welcome To{" "}
            <span style={{ color: "#EF7F1A" }}>Paisa</span>
            <span style={{ color: "#0163AB" }}>gram</span>
          </h3>

          <div className="bg-white rounded-4 shadow-lg p-4 p-md-5">
            <div className="row align-items-center g-4">
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  {/* EVENT NAME */}
                  <div className="mb-3 border-bottom">
                    <input
                      type="text"
                      name="eventName"
                      className="form-control border-0 rounded-0 px-0"
                      value={eventFromUrl || ""}
                      readOnly
                    />
                  </div>

                  {/* NAME */}
                  <div className="mb-3 border-bottom">
                    <input
                      type="text"
                      name="name"
                      className="form-control border-0 rounded-0 px-0"
                      placeholder="Enter your name *"
                      required
                    />
                  </div>

                  {/* MOBILE */}
                {/* MOBILE */}
<div className="mb-3 border-bottom">
  <input
    type="text"
    name="mobile"
    className="form-control border-0 rounded-0 px-0"
    placeholder="Mobile number *"
    maxLength={10}
    onInput={handleMobileInput}
    required
    disabled={otpVerified}
  />
</div>

{/* OTP SECTION */}
{eventType === "individual" && !otpVerified && (
  <>
    {!otpSent ? (
      <button
        type="button"
        className="btn btn-outline-primary mb-3"
        onClick={sendOtp}
      >
        Send OTP
      </button>
    ) : (
      <>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-success mb-3"
          onClick={verifyOtp}
        >
          Verify OTP
        </button>
      </>
    )}
  </>
)}


                  {/* EMAIL */}
                  <div className="mb-3 border-bottom">
                    <input
                      type="email"
                      name="email"
                      className="form-control border-0 rounded-0 px-0"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* OCCUPATION */}
                  <div className="mb-4 border-bottom">
                    <select
                      name="occupation"
                      className="form-select border-0 rounded-0 px-0"
                    >
                      <option value="">Select occupation</option>
                      <option>Student</option>
                      <option>Employee</option>
                      <option>Business Owner</option>
                      <option>Freelancer</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <button className="btn btn-warning px-5 py-2">
                    Submit
                  </button>
                </form>
              </div>

              {/* IMAGE */}
              <div className="col-md-6 text-center d-none d-md-block">
                <img
                  src="/Assests/camimage.jpeg"
                  alt="Contact"
                  className="img-fluid"
                  style={{ maxWidth: "300px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
