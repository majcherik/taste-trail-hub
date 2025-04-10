
import { Layout } from "@/components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="font-heading text-4xl mb-6">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Last Updated: April 10, 2025
          </p>
          
          <p>
            This Privacy Policy describes how FoodFinder ("we," "our," or "us") collects, uses, and shares your information when you use our website, mobile applications, and services (collectively, the "Services").
          </p>
          
          <h2>Information We Collect</h2>
          
          <h3>Information You Provide to Us</h3>
          <p>
            We collect information you provide directly to us when you create an account, complete your profile, communicate with us, or otherwise use our Services. This information may include:
          </p>
          <ul>
            <li>Name, email address, password, and other account registration information</li>
            <li>Profile information, such as your photo, food preferences, and dietary restrictions</li>
            <li>Content you post, including reviews, ratings, photos, comments, and messages</li>
            <li>Information you provide when you contact us or participate in surveys or promotions</li>
          </ul>
          
          <h3>Information We Collect Automatically</h3>
          <p>
            When you use our Services, we automatically collect certain information, including:
          </p>
          <ul>
            <li>Device information, such as your IP address, browser type, operating system, and device identifiers</li>
            <li>Usage information, including pages visited, time spent on pages, and links clicked</li>
            <li>Location information, such as your precise or approximate location when you use our app or website</li>
            <li>Cookies and similar tracking technologies to collect information about your interactions with our Services</li>
          </ul>
          
          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect for various purposes, including to:
          </p>
          <ul>
            <li>Provide, maintain, and improve our Services</li>
            <li>Create and maintain your account and profile</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and customer service requests</li>
            <li>Communicate with you about products, services, offers, and events</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>Personalize your experience and deliver content and product and service offerings</li>
          </ul>
          
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: privacy@foodfinder.com<br />
            Address: 123 Food Street, Culinary City, 12345
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
