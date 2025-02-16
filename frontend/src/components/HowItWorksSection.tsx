import React from "react";

const HowItWorksSection: React.FC = () => {
  return (
    <section className="w-full pb-0 mb-0">
      <div className="container mx-auto px-4">
        <div className="main-content">
          <div className="py-10">
            <h2 className="text-3xl md:text-4xl font-raleway font-bold text-[#082515] leading-tight mt-8">
              Ever wondered how online marketplace connects buyers and sellers?
            </h2>
            <p className="font-raleway mt-8 text-gray-700">
              <strong>Step 1: Promoting Products</strong>
              <br />
              ProfitPlus connects vendors with affiliates who promote their products to a wider audience. Affiliates earn commissions for each sale made through their unique referral link.
              <br /><br />

              <strong>Step 2: Vendors Create and Sell Products</strong>
              <br />
              Vendors create and list their digital products, such as online courses, ebooks, and software, on the ProfitPlus platform. They set the price and commission rate for affiliates.
              <br /><br />

              <strong>Step 3: Optional Exam and Certificate Feature</strong>
              <br />
              For an additional fee (30,000 NGN), vendors can add an exam and certificate feature to their course. This enhances the learning experience and increases the course's value.
              <br /><br />

              <strong>Step 4: Sales and Commissions</strong>
              <br />
              When a sale is made, the vendor earns the sale price minus the affiliate commission. ProfitPlus tracks sales and commissions, making it easy for vendors and affiliates to monitor their earnings.
              <br /><br />

              <strong>Step 5: Weekly Payouts</strong>
              <br />
              Every Sunday, ProfitPlus pays out earnings to vendors and affiliates. Vendors receive their sale earnings minus commissions, while affiliates receive their commission earnings.
              <br /><br />

              By providing a platform for vendors to sell their products and affiliates to promote them, ProfitPlus facilitates a win-win situation for all parties involved.
            </p>
          </div>
          <div className="clear-both"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;