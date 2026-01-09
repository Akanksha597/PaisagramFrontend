"use client";
import { FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div className="page-wrapper">
      <div className="thankyou-card">

        {/* CLOSE BUTTON */}
        <button
          className="close-btn"
          aria-label="Close"
          onClick={() => router.push("/")}
        >
          ✕
        </button>

        {/* IMAGE */}
        <div className="image-wrapper">
          <img
            src="/Assests/thank you.avif"
            alt="Thank You"
            className="thankyou-image"
          />
        </div>

        {/* TEXT */}
        <h1 className="title">Thank You! 🎉</h1>

        <p className="subtitle">
          Your response has been successfully submitted.
          <br />
          We’ll reach out to you very soon!
        </p>

        {/* SOCIAL ICONS */}
        <div className="social-row">
           <a
            href="https://www.youtube.com/@paisagramindia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="social-icon youtube"
          >
            <FaYoutube />
          </a>

          <a
            href="https://www.instagram.com/paisagramindia/?igsh=MXRmZTBnNDdwcGszaA%3D%3D#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="social-icon instagram"
          >
            <FaInstagram />
          </a>

         
          <a
            href="https://chat.whatsapp.com/Ei1SZNM9MN91RlzEbDaAeU"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="social-icon whatsapp"
          >
            <FaWhatsapp />
          </a>
        </div>

        <p className="footer-text">
          Follow us for the latest updates 🚀
        </p>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: linear-gradient(135deg, #fff1e6, #eef5ff);
        }

        .thankyou-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: #fff;
          border-radius: 26px;
          padding: 2rem 1.5rem;
          text-align: center;
          box-shadow: 0 30px 80px rgba(0,0,0,0.12);
          animation: fadeUp 0.8s ease;
        }

        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #f3f4f6;
          color: #374151;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .close-btn:hover {
          background: #e5e7eb;
          transform: scale(1.05);
        }

        .image-wrapper {
          width: 160px;
          height: 160px;
          margin: 0 auto 1.5rem;
          border-radius: 50%;
          padding: 6px;
          background: linear-gradient(135deg, #EF7F1A, #0163AB);
          animation: pulse 3s infinite;
        }

        .thankyou-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .title {
          font-size: clamp(1.8rem, 4vw, 2.3rem);
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #EF7F1A, #0163AB);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          color: #6b7280;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .social-row {
          display: flex;
          justify-content: center;
          gap: 1.2rem;
        }

        .social-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #fff;
          font-size: 1.5rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .social-icon:hover {
          transform: translateY(-6px) scale(1.05);
          box-shadow: 0 14px 30px rgba(0,0,0,0.25);
        }

        .instagram {
          background: radial-gradient(circle at 30% 30%, #fdf497, #fd5949, #d6249f, #285AEB);
        }

        .youtube {
          background: #ff0000;
        }

        .whatsapp {
          background: #25D366;
        }

        .footer-text {
          margin-top: 2rem;
          font-size: 0.8rem;
          color: #9ca3af;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(239,127,26,0.4);
          }
          70% {
            box-shadow: 0 0 0 22px rgba(239,127,26,0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239,127,26,0);
          }
        }
      `}</style>
    </div>
  );
}
