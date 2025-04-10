
import { Layout } from "@/components/layout/Layout";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="font-heading text-4xl mb-6">Terms of Service</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Last Updated: April 10, 2025
          </p>
          
          <p>
            These Terms of Service ("Terms") govern your access to and use of the FoodFinder website, mobile applications, and services (collectively, the "Services"). Please read these Terms carefully before using our Services.
          </p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our Services.
          </p>
          
          <h2>2. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of our Services after any changes means you accept the updated Terms.
          </p>
          
          <h2>3. Using Our Services</h2>
          <h3>3.1 Account Creation</h3>
          <p>
            To use certain features of our Services, you may need to create an account. You agree to provide accurate information and keep it up-to-date. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          
          <h3>3.2 User Content</h3>
          <p>
            Our Services allow you to submit content, such as reviews, ratings, photos, and comments ("User Content"). You retain ownership of your User Content, but you grant us a non-exclusive, royalty-free, worldwide, transferable, sub-licensable license to use, store, display, reproduce, modify, create derivative works, and distribute your User Content in connection with the operation and provision of our Services.
          </p>
          
          <h2>4. Prohibited Conduct</h2>
          <p>
            You agree not to:
          </p>
          <ul>
            <li>Use our Services in any manner that could interfere with, disrupt, negatively affect, or inhibit other users from fully enjoying our Services</li>
            <li>Use our Services for any illegal or unauthorized purpose</li>
            <li>Attempt to circumvent any content filtering techniques we employ</li>
            <li>Attempt to access areas/features of our Services that you are not authorized to access</li>
            <li>Post or transmit any content that is fraudulent, false, misleading, or deceptive</li>
            <li>Harass, threaten, or intimidate any other user of our Services</li>
            <li>Use automated means to access our Services without our permission</li>
          </ul>
          
          <h2>5. Termination</h2>
          <p>
            We may terminate or suspend your access to all or part of our Services, without notice, for conduct that we believe violates these Terms or is harmful to other users of our Services, us, or third parties, or for any other reason.
          </p>
          
          <h2>6. Contact Information</h2>
          <p>
            If you have questions about these Terms, please contact us at:
          </p>
          <p>
            Email: legal@foodfinder.com<br />
            Address: 123 Food Street, Culinary City, 12345
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
