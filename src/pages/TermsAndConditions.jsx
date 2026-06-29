import { motion } from "framer-motion";
import NavbarTv from "../components/NavbarTv";
import FooterTV from "../components/FooterTV";

// Typography component for paragraphs
const TypographyP = ({ children }) => {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6 text-white/80 text-justify">
      {children}
    </p>
  );
};

const TermsAndConditions = () => {

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{
        // CSS variables for theming
        "--tv-primary": "#00FF41",
        "--tv-secondary": "#00FF41",
        "--tv-border": "rgba(218, 164, 37, 0.2)",
        "--tv-bg-highlight": "rgba(242, 202, 70, 0.05)",
        "--tv-card-bg": "rgba(255, 255, 255, 0.05)",
        "--tv-shadow": "0 8px 32px rgba(255, 255, 255, 0.1)",
      }}
    >
      <NavbarTv />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
{/* Header */}
<div className="mb-8 text-center">
  <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[var(--tv-primary)] via-green-400 to-[var(--tv-secondary)] bg-clip-text text-transparent">
    Terms & Conditions
  </h1>
</div>

{/* Content */}
<div className="space-y-10">
  {/* 1. Registration & Payment */}
  <div>
    <h3 className="text-2xl font-bold text-[var(--tv-primary)] mb-2">
      1. Registration & Payment
    </h3>
    <TypographyP>
      All registrations are subject to payment confirmation. Registration fees
      are non-refundable once payment is processed. Participants must provide
      valid payment proof during registration.
    </TypographyP>
  </div>

  {/* 2. Event Participation */}
  <div>
    <h3 className="text-2xl font-bold text-[var(--tv-primary)] mb-2">
      2. Event Participation
    </h3>
    <TypographyP>
      Participants are expected to maintain appropriate conduct during all
      events. Any form of misconduct may result in immediate disqualification
      without a refund.
    </TypographyP>
  </div>

  {/* 3. Privacy & Data Protection */}
  <div>
    <h3 className="text-2xl font-bold text-[var(--tv-primary)] mb-2">
      3. Privacy & Data Protection
    </h3>
    <TypographyP>
      Personal information provided during registration will be used solely for
      event management and communication purposes. We are committed to
      protecting your privacy and data. Additionally, photos taken during the
      event — which may include participants — may be used in our social media
      posts to promote the event and related activities.
    </TypographyP>
  </div>

  {/* 4. Event Changes */}
  <div>
    <h3 className="text-2xl font-bold text-[var(--tv-primary)] mb-2">
      4. Event Changes
    </h3>
    <TypographyP>
      Event organizers reserve the right to modify schedules, venues, or cancel
      events due to unforeseen circumstances. Participants will be notified of
      any changes via WhatsApp or email.
    </TypographyP>
  </div>

  {/* 5. Liability */}
  <div>
    <h3 className="text-2xl font-bold text-[var(--tv-primary)] mb-2">
      5. Liability
    </h3>
    <TypographyP>
      Participants attend events at their own risk. Organizers are not liable
      for any personal injury, loss of property, or other damages that may occur
      during the event.
    </TypographyP>
  </div>

  {/* 6. Code of Conduct */}
  <div>
    <h3 className="text-2xl font-bold text-[var(--tv-primary)] mb-2">
      6. Code of Conduct
    </h3>
    <TypographyP>
      All participants must adhere to the event's code of conduct. Respectful
      behavior towards fellow participants, organizers, and volunteers is
      mandatory.
    </TypographyP>
  </div>

  {/* 7. Contact Information */}
  <div>
    <h3 className="text-2xl font-bold text-[var(--tv-primary)] mb-2">
      7. Contact Information
    </h3>
    <TypographyP>
      For any queries regarding these terms and conditions, please contact the
      TechnoVista 2k25 organizing committee through the official channels
      provided in the footer.
    </TypographyP>
  </div>
</div>

        </motion.div>
      </div>

      <FooterTV />
    </div>
  );
};

export default TermsAndConditions;
