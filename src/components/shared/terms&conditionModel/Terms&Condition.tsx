import { useState } from "react";

const TermsCondition = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <a href="#" className="text-gray-300 text-sm" onClick={handleOpen}>
        Terms of Use & Privacy Policy
      </a>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            className="bg-white w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 p-8 rounded-lg overflow-y-auto max-h-[80vh] shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside it
          >
            <h2 className="text-2xl font-bold mb-4">
              Terms of Use & Privacy Policy
            </h2>
            <p className="mb-4 text-xs">
              TERMS OF SERVICE 1.0 Introduction and Legal Framework 1.1
              California Consumer Privacy Act (CCPA) Effective Date: [Insert
              Date] The California Consumer Privacy Act (CCPA) provides
              California residents with certain rights regarding their personal
              information. This section outlines those rights and how to
              exercise them. - Right to Know: Request disclosure of personal
              information collected - Right to Delete: Request deletion of
              personal information - Right to Opt-Out: Opt-out of personal
              information sale - Right to Non-Discrimination: No discrimination
              for exercising CCPA rights 1.2 Digital Millennium Copyright Act
              (DMCA) Notice Effective Date: [Insert Date] We respect copyright
              laws and expect users to do the same. If you believe your work has
              been copied in a way that constitutes copyright infringement,
              please provide: - Signature of copyright owner or representative -
              Identification of copyrighted work - Identification of infringing
              material - Contact information - Good-faith belief statement -
              Accuracy statement under penalty of perjury 1.3 Terms of Service
              Effective Date: [Insert Date] This section outlines general terms
              and conditions. - Acceptance of Terms: Agree to be bound by these
              Terms of Service - Modifications to Terms: Changes effective
              immediately upon posting - User Responsibilities: Provide accurate
              information, use services lawfully, respect community guidelines
              1.4 Governing Law Effective Date: [Insert Date] This section
              specifies governing laws. - Applicable Law: Laws of [insert state
              or country], without regard to conflict of law principles -
              Jurisdiction: Submit to personal jurisdiction of courts located
              within [insert jurisdiction] 2.0 User Information and Data
              Protection 2.1 Privacy Policy Effective Date: [Insert Date] Our
              Privacy Policy explains how we collect, use, and protect your
              personal information. - Information We Collect: Name, email
              address, phone number, payment information, usage data - Use of
              Information: Provide services, notify changes, allow
              participation, customer support, analysis - Data Protection:
              Implement security measures to protect personal information 2.2
              Cookie Policy Effective Date: [Insert Date] This section explains
              how we use cookies and similar technologies. - What are Cookies?:
              Small text files placed on your device - Types of Cookies:
              Essential, analytical, marketing - Managing Cookies: Through
              browser settings; disabling may affect functionality 2.3 Data
              Protection and GDPR Compliance Effective Date: [Insert Date] This
              section outlines our commitment to data protection and GDPR
              compliance. - Data Collection and Use: Collect necessary data for
              services and improvement - User Rights Under GDPR: Access,
              rectification, erasure, restriction, data portability - Contact
              for Data Requests: [Insert contact information] 2.4 Security of
              Your Information Effective Date: [Insert Date] We implement
              reasonable security measures to protect your personal information
              from unauthorized access, use, or disclosure. This includes: -
              Encryption - Firewalls - Secure server facilities You also have a
              role in safeguarding your account: - Use strong passwords and
              change them regularly - Keep your login credentials confidential -
              Notify us immediately if you suspect unauthorized access In the
              unlikely event of a data breach, we will investigate and remedy
              the situation, notifying affected users as required by applicable
              law. 3.0 User Accounts and Content 3.1 Age Verification and
              Restriction Effective Date: [Insert Date] 21Xconnect is committed
              to ensuring that only individuals 18 years of age or older access
              our platform. To achieve this, we will utilize one or more
              third-party age verification services to confirm users' ages.
              These services may include but are not limited to: -
              Government-issued ID verification, driver's license, passport -
              Age verification software - Third-party databases We reserve the
              right to request additional information or documentation to verify
              age. Failure to provide accurate information or comply with age
              verification may result in denial of account creation, account
              suspension or termination. To comply with legal requirements,
              users must verify their age before accessing our services. 3.2
              User Account Management Effective Date: [Insert Date] To access
              certain features, you may need to create an account. You agree to
              provide accurate and complete information during registration and
              update it as necessary. You are responsible for maintaining
              account confidentiality and notifying us of any unauthorized use
              or security breaches. We reserve the right to suspend or terminate
              accounts for conduct violating these terms or harming others. 3.3
              User Generated Content Effective Date: [Insert Date] This section
              governs user-submitted content. - Ownership of Content: Users
              retain ownership, granting us a non-exclusive license - Content
              Guidelines: No offensive, illegal, or infringing content - Removal
              of Content: We reserve the right to monitor, review, and remove
              content Prohibited Content 21Xconnect strictly prohibits the
              posting of photos or descriptions that: - Depict minors
              (individuals under 18 years of age) in any context - Contain
              explicit or suggestive content - Promote or glorify violence, hate
              speech, or discrimination - Infringe on intellectual property
              rights - Violate any applicable laws or regulations Users are
              expected to report any prohibited content to our support team
              immediately. 3.4 Community Guidelines Effective Date: [Insert
              Date] Users are expected to interact respectfully and
              constructively. Prohibited behaviors include: - Harassment,
              threats, or intimidation - Spamming or excessive self-promotion -
              Posting false or misleading information Report any violations to
              us immediately. Consequences may include warnings, account
              suspension, or termination, depending on severity and frequency.
              4.0 Intellectual Property and Monetization 4.1 Monetization Policy
              Effective Date: [Insert Date] This section outlines how users can
              earn money and what is expected of them. - Eligibility for
              Monetization: Comply with community guidelines and have a verified
              account - Revenue Sharing: Terms communicated separately - Payment
              Terms: Daily, weekly, or monthly payments; valid payment
              information required - Compliance: Ensure monetization practices
              comply with laws and regulations 4.2 Trademarks and Branding
              Effective Date: [Insert Date] This section addresses the use of
              trademarks and branding materials. - Ownership of Trademarks:
              Property of their respective owners - Branding Guidelines: Adhere
              to guidelines provided upon request - Reporting Infringement:
              Contact us with details of alleged infringement 4.3 Intellectual
              Property Rights Effective Date: [Insert Date] All content,
              trademarks, and intellectual property rights on our platform are
              owned by us or licensed to us. Unauthorized use may result in
              legal action. You are granted a limited, non-exclusive,
              non-transferable license to access and use our services, subject
              to these Terms of Service and revocable at any time. If you
              provide feedback or suggestions, we may use it without obligation
              to you. 5.0 Payments and Refunds 5.1 Payment and Refund Policy
              Effective Date: [Insert Date] To protect our clients' privacy and
              personal data, including banking information, 21Xconnect does not
              issue refunds except in rare instances and on an individual case
              basis. By using our services, users acknowledge and agree to this
              policy. - All payments are final and non-refundable - Exceptions
              may be made in cases of technical issues or platform errors -
              Refund decisions are made at the sole discretion of 21Xconnect 6.0
              Liability and Indemnification 6.1 Limitation of Liability
              Effective Date: [Insert Date] 21Xconnect shall not be liable for
              any damages, claims, or losses arising from: - User-generated
              content, including but not limited to intellectual property
              infringement, defamation, or privacy violations - Third-party
              services or links, including but not limited to security breaches,
              data loss, or service interruptions - Technical issues or platform
              errors, including but not limited to server crashes, data
              corruption, or connectivity issues - User violations of these
              Terms of Service, including but not limited to unauthorized use,
              hacking, or exploitation of vulnerabilities Users agree to
              indemnify, defend, and hold harmless 21Xconnect, its affiliates,
              officers, directors, employees, and agents from any claims,
              damages, or losses resulting from their use of our services or
              violations of these Terms of Service. To the fullest extent
              permitted by law, we shall not be liable for: - Indirect,
              incidental, special, consequential, or punitive damages - Lost
              profits, revenue, or business opportunities - Diminution in value
              or reputation - Any damages arising from or related to
              user-generated content, third-party services, or technical issues
              Our maximum liability to you for any claims arising out of these
              terms or your use of our services shall be limited to the amount
              you paid as direct payment to 21Xconnect for platform access fees
              in the twelve months preceding the claim, excluding any payments
              made to content creators, tips, or other payments to third parties
              on the platform. 6.2 Indemnification Effective Date: [Insert Date]
              You agree to indemnify, defend, and hold harmless 21Xconnect, its
              affiliates, officers, directors, employees, and agents from any
              claims, damages, losses, liabilities, costs, or expenses arising
              out of: - Your use of our services - Violation of these Terms of
              Service - Violation of any rights of a third party 7.0 Third-Party
              Services and International Use 7.1 Third-Party Links and Services
              Effective Date: [Insert Date] Our services may contain links to
              third-party websites or services not owned or controlled by us. We
              are not responsible for their content, privacy policies, or
              practices. The inclusion of any link does not imply our
              endorsement or approval of the third-party site or its content.
              You access third-party sites at your own risk. 7.2 International
              Use Effective Date: [Insert Date] If you access our services from
              outside [insert country or region], you must comply with local
              laws and regulations. You also agree not to use or export our
              services in violation of applicable export control laws. 8.0
              Changes, Disputes, and Contact 8.1 Changes to the Terms Effective
              Date: [Insert Date] We may modify these terms from time to time.
              When we make significant changes, we will notify you via email or
              through a notice on our platform. Your continued use of our
              services indicates acceptance of the updated terms. 8.2 Dispute
              Resolution Effective Date: [Insert Date] This section outlines the
              process for resolving disputes. - Informal Resolution: Contact us
              directly to resolve disputes - Formal Resolution: Binding
              arbitration; there shall be no class, consolidated, or
              representative actions. 1. Governing Law and Jurisdiction: Any
              disputes arising from or related to these Terms of Service shall
              be governed by and construed in accordance with the laws of
              [State/Province], without regard to its conflict of laws
              principles. All disputes shall be resolved exclusively in the
              small claims court of [City/County], [State/Province], or in any
              other court of competent jurisdiction located in [State/Province].
              2. Small Claims Court Limitation: Any dispute resolution
              proceedings shall be limited to small claims court, with a maximum
              claim amount of $1.00. By agreeing to these Terms of Service, you
              acknowledge and accept this limitation. 3. Binding Decision: The
              decision of the small claims court shall be final and binding on
              both parties. The prevailing party shall be determined by the
              court. 4. Waiver of Jury Trial: Both parties waive their right to
              a jury trial in any dispute resolution proceedings. 5. No Class
              Actions: You agree not to participate in any class action lawsuits
              against 21Xconnect or its affiliates. 6. Arbitration Alternative:
              If the small claims court cannot resolve the dispute, the parties
              agree to resolve the dispute through binding arbitration in
              accordance with the rules of the American Arbitration Association
              (AAA). The arbitration shall take place in [City/County],
              [State/Province], and the arbitrator's decision shall be final and
              binding. 7. Attorney's Fees: The prevailing party shall be
              entitled to recover reasonable attorney's fees and costs incurred
              in connection with the dispute resolution proceedings. 8.3 Contact
              Information Effective Date: [Insert Date] For inquiries or
              concerns regarding our policies and terms, please contact us at:
              21Xconnect [Insert Address] [Insert Phone Number] [Insert Email
              Address] 9.0 Miscellaneous and Acknowledgment 9.1 Force Majeure
              Effective Date: [Insert Date] We shall not be liable for failure
              to perform obligations under these terms due to events beyond our
              reasonable control, including natural disasters, war, terrorism,
              labor disputes, or government actions. 9.2 Miscellaneous Effective
              Date: [Insert Date] If any provision of these terms is found to be
              unenforceable or invalid, the remaining provisions shall remain in
              full force and effect. No waiver of any term shall be deemed a
              further or continuing waiver of such term or any other term. These
              terms constitute the entire agreement between you and us regarding
              the use of our services and supersede any prior agreements or
              understandings. 9.3 Acknowledgment Effective Date: [Insert Date]
              By using our services, you acknowledge that you have: - Read and
              understood these Terms of Service in their entirety - Agreed to be
              bound by these Terms of Service - Acknowledge that these Terms of
              Service constitute a legally binding agreement between you and
              21Xconnect You further acknowledge that: - You had the right to
              consult an attorney before signing this acknowledgment, but chose
              not to do so, or - You consulted with an attorney and secured
              their approval for your signature on this acknowledgment You
              understand that by signing below, you are waiving any claims that
              you were not adequately informed of the terms and conditions of
              this agreement. To confirm your acknowledgment, 21Xconnect will
              use an electronic signature software program, such as DocuSign,
              BoldSign, PandaDoc, or similar technologies. By clicking "I Agree"
              or "I Accept" or by otherwise indicating your acceptance, you are
              creating an electronic signature that is equivalent to a
              handwritten signature. This electronic signature serves as your
              consent to be bound by these Terms of Service, and it is a
              requirement for using our services. If you do not agree to these
              Terms of Service, please do not use our services.
            </p>
            <button
              className="bg-[#67043d] text-white py-2 px-4 rounded"
              onClick={handleClose}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsCondition;
