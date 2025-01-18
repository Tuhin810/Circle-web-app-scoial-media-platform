import React from "react";
import { useNavigate } from "react-router-dom";

const TermAndConditionPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Terms and Conditions
        </h1>
        <button
          onClick={handleHome}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Go to Home
        </button>

        <h2 className="text-xl font-semibold mb-4">21Xconnect</h2>
        <p className="mb-4">
          Welcome to our Terms and Conditions page. These terms outline the
          rules and regulations for using our website.
        </p>

        {/* User Agreement Section */}
        <h2 className="text-xl font-semibold mb-4">User Agreement</h2>
        <p className="mb-4">
          <strong>1.0 Introduction and Legal Framework</strong>
          <br />
          <br />
          1.0 Introduction and Legal Framework 1.1 California Consumer Privacy
          Act (CCPA) Effective Date: [Insert Date] The California Consumer
          Privacy Act (CCPA) provides California residents with certain rights
          regarding their personal information. This section outlines those
          rights and how to exercise them. - Right to Know: Request disclosure
          of personal information collected - Right to Delete: Request deletion
          of personal information - Right to Opt-Out: Opt-out of personal
          information sale - Right to Non-Discrimination: No discrimination for
          exercising CCPA rights 1.2 Digital Millennium Copyright Act (DMCA)
          Notice Effective Date: [Insert Date] We respect copyright laws and
          expect users to do the same. If you believe your work has been copied
          in a way that constitutes copyright infringement, please provide: -
          Signature of copyright owner or representative - Identification of
          copyrighted work - Identification of infringing material - Contact
          information - Good-faith belief statement - Accuracy statement under
          penalty of perjury 1.3 Terms of Service Effective Date: [Insert Date]
          This section outlines general terms and conditions. - Acceptance of
          Terms: Agree to be bound by these Terms of Service - Modifications to
          Terms: Changes effective immediately upon posting - User
          Responsibilities: Provide accurate information, use services lawfully,
          respect community guidelines 1.4 Governing Law Effective Date: [Insert
          Date] This section specifies governing laws. - Applicable Law: Laws of
          [insert state or country], without regard to conflict of law
          principles - Jurisdiction: Submit to personal jurisdiction of courts
          located within [insert jurisdiction] 2.0 User Information and Data
          Protection 2.1 Privacy Policy Effective Date: [Insert Date] Our
          Privacy Policy explains how we collect, use, and protect your personal
          information. - Information We Collect: Name, email address, phone
          number, payment information, usage data - Use of Information: Provide
          services, notify changes, allow participation, customer support,
          analysis - Data Protection: Implement security measures to protect
          personal information 2.2 Cookie Policy Effective Date: [Insert Date]
          This section explains how we use cookies and similar technologies. -
          What are Cookies?: Small text files placed on your device - Types of
          Cookies: Essential, analytical, marketing - Managing Cookies: Through
          browser settings; disabling may affect functionality 2.3 Data
          Protection and GDPR Compliance Effective Date: [Insert Date] This
          section outlines our commitment to data protection and GDPR
          compliance. - Data Collection and Use: Collect necessary data for
          services and improvement - User Rights Under GDPR: Access,
          rectification, erasure, restriction, data portability - Contact for
          Data Requests: [Insert contact information] 2.4 Security of Your
          Information Effective Date: [Insert Date] We implement reasonable
          security measures to protect your personal information from
          unauthorized access, use, or disclosure. This includes: - Encryption -
          Firewalls - Secure server facilities You also have a role in
          safeguarding your account: - Use strong passwords and change them
          regularly - Keep your login credentials confidential - Notify us
          immediately if you suspect unauthorized access In the unlikely event
          of a data breach, we will investigate and remedy the situation,
          notifying affected users as required by applicable law. 3.0 User
          Accounts and Content 3.1 Age Verification and Restriction Effective
          Date: [Insert Date] 21Xconnect is committed to ensuring that only
          individuals 18 years of age or older access our platform. To achieve
          this, we will utilize one or more third-party age verification
          services to confirm users' ages. These services may include but are
          not limited to: - Government-issued ID verification, driver's license,
          passport - Age verification software - Third-party databases We
          reserve the right to request additional information or documentation
          to verify age. Failure to provide accurate information or comply with
          age verification may result in denial of account creation, account
          suspension or termination. To comply with legal requirements, users
          must verify their age before accessing our services. 3.2 User Account
          Management Effective Date: [Insert Date] To access certain features,
          you may need to create an account. You agree to provide accurate and
          complete information during registration and update it as necessary.
          You are responsible for maintaining account confidentiality and
          notifying us of any unauthorized use or security breaches. We reserve
          the right to suspend or terminate accounts for conduct violating these
          terms or harming others. 3.3 User Generated Content Effective Date:
          [Insert Date] This section governs user-submitted content. - Ownership
          of Content: Users retain ownership, granting us a non-exclusive
          license - Content Guidelines: No offensive, illegal, or infringing
          content - Removal of Content: We reserve the right to monitor, review,
          and remove content Prohibited Content 21Xconnect strictly prohibits
          the posting of photos or descriptions that: - Depict minors
          (individuals under 18 years of age) in any context - Contain explicit
          or suggestive content - Promote or glorify violence, hate speech, or
          discrimination - Infringe on intellectual property rights - Violate
          any applicable laws or regulations Users are expected to report any
          prohibited content to our support team immediately. 3.4 Community
          Guidelines Effective Date: [Insert Date] Users are expected to
          interact respectfully and constructively. Prohibited behaviors
          include: - Harassment, threats, or intimidation - Spamming or
          excessive self-promotion - Posting false or misleading information
          Report any violations to us immediately. Consequences may include
          warnings, account suspension, or termination, depending on severity
          and frequency. 4.0 Intellectual Property and Monetization 4.1
          Monetization Policy Effective Date: [Insert Date] This section
          outlines how users can earn money and what is expected of them. -
          Eligibility for Monetization: Comply with community guidelines and
          have a verified account - Revenue Sharing: Terms communicated
          separately - Payment Terms: Daily, weekly, or monthly payments; valid
          payment information required - Compliance: Ensure monetization
          practices comply with laws and regulations 4.2 Trademarks and Branding
          Effective Date: [Insert Date] This section addresses the use of
          trademarks and branding materials. - Ownership of Trademarks: Property
          of their respective owners - Branding Guidelines: Adhere to guidelines
          provided upon request - Reporting Infringement: Contact us with
          details of alleged infringement 4.3 Intellectual Property Rights
          Effective Date: [Insert Date] All content, trademarks, and
          intellectual property rights on our platform are owned by us or
          licensed to us. Unauthorized use may result in legal action. You are
          granted a limited, non-exclusive, non-transferable license to access
          and use our services, subject to these Terms of Service and revocable
          at any time. If you provide feedback or suggestions, we may use it
          without obligation to you. 5.0 Payments and Refunds 5.1 Payment and
          Refund Policy Effective Date: [Insert Date] To protect our clients'
          privacy and personal data, including banking information, 21Xconnect
          does not issue refunds except in rare instances and on an individual
          case basis. By using our services, users acknowledge and agree to this
          policy. - All payments are final and non-refundable - Exceptions may
          be made in cases of technical issues or platform errors - Refund
          decisions are made at the sole discretion of 21Xconnect 6.0 Liability
          and Indemnification 6.1 Limitation of Liability Effective Date:
          [Insert Date] 21Xconnect shall not be liable for any damages, claims,
          or losses arising from: - User-generated content, including but not
          limited to intellectual property infringement, defamation, or privacy
          violations - Third-party services or links, including but not limited
          to security breaches, data loss, or service interruptions - Technical
          issues or platform errors, including but not limited to server
          crashes, data corruption, or connectivity issues - User violations of
          these Terms of Service, including but not limited to unauthorized use,
          hacking, or exploitation of vulnerabilities Users agree to indemnify,
          defend, and hold harmless 21Xconnect, its affiliates, officers,
          directors, employees, and agents from any claims, damages, or losses
          resulting from their use of our services or violations of these Terms
          of Service. To the fullest extent permitted by law, we shall not be
          liable for: - Indirect, incidental, special, consequential, or
          punitive damages - Lost profits, revenue, or business opportunities
        </p>

        {/* Add additional sections similarly... */}
      </div>
    </div>
  );
};

export default TermAndConditionPage;
