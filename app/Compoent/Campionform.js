"use client";

import { ToastContainer, toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function ContactFormDesign() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const eventFromUrl = searchParams.get("event");

  const handleMobileInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      eventName: formData.get("eventName"),
      name: formData.get("name"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      occupation: formData.get("occupation"),
    };

    if (
      !data.name ||
      !data.email ||
      !data.mobile ||
      data.mobile.length !== 10 ||
      !data.occupation
    ) {
      toast.error("❌ Please fill all fields correctly");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/campaion/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error();

      toast.success("✅ Form submitted successfully!");
      e.target.reset();

      setTimeout(() => {
        router.push("/Thankyou");
      }, 1500);
    } catch (error) {
      toast.error("❌ Failed to submit form");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
        <div className="w-100" style={{ maxWidth: "900px" }}>

          <h3 className="fw-bold text-center mb-4">
            Welcome To <span style={{ color: "#EF7F1A" }}>Paisa</span>
            <span style={{ color: "#0163AB" }}>gram</span>
          </h3>

          <div className="bg-white rounded-4 shadow-lg p-4 p-md-5">
            <div className="row align-items-center g-4">

              <div className="col-md-6">
                <form onSubmit={handleSubmit}>

                  {/* AUTO-FILLED EVENT */}
                  <div className="mb-3 border-bottom">
                    <input
                      type="text"
                      name="eventName"
                      className="form-control border-0 rounded-0 px-0"
                      value={eventFromUrl || ""}
                      readOnly
                    />
                  </div>

                  <div className="mb-3 border-bottom">
                    <input
                      type="text"
                      name="name"
                      className="form-control border-0 rounded-0 px-0"
                      placeholder="Enter your name *"
                      required
                    />
                  </div>

                  <div className="mb-3 border-bottom">
                    <input
                      type="email"
                      name="email"
                      className="form-control border-0 rounded-0 px-0"
                      placeholder="Enter your email *"
                      required
                    />
                  </div>

                  <div className="mb-3 border-bottom">
                    <input
                      type="text"
                      name="mobile"
                      className="form-control border-0 rounded-0 px-0"
                      placeholder="Mobile number *"
                      maxLength={10}
                      onInput={handleMobileInput}
                      required
                    />
                  </div>

                  <div className="mb-4 border-bottom">
                    <select
                      name="occupation"
                      className="form-select border-0 rounded-0 px-0"
                      required
                    >
                      <option value="">Select occupation *</option>
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
