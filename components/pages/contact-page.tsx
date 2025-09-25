import React from "react";
import DynamicHeader from "./ui/dynamic-header";

export default function ContactPage() {
  return (
    <div>
      <DynamicHeader
        backgroundType="image"
        backgroundSrc="/images/contact-image.jpeg"
        topicText="Contact Us"
        statementText="GET IN TOUCH WITH TRUE SPORTS"
        descriptionText="We're here to assist you. Whether you're a sports brand or a passionate fan, reach out to us for inquiries, partnerships, or just to say hello."
        overlayOpacity={0.9}
      />
      <section className="w-full bg-blue-700 py-12 md:py-16 px-6">
        <div className="grid gap-12 md:grid-cols-3 px-12 md:px-20">
          {/* Address */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white uppercase">Address</h3>
            <p className="text-white leading-5">
              6 Shields Crt, Suite 204 <br />
              Markham, Ontario, L3R 4S1 <br />
              Canada
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 leading-5">
            <h3 className="text-xl font-bold text-white uppercase">Contact Info</h3>
            <p className="text-white">
              Phone:{" "}
              <a
                href="tel:+14163019037"
                className="text-white hover:text-gray-200"
              >
                +(416) 301-9037
              </a>
            </p>
            <p className="text-white">
              Email:{" "}
              <a
                href="mailto:info@truesportslive.com"
                className="text-white hover:text-gray-200"
              >
                info@truesportslive.com
              </a>
            </p>
          </div>

          {/* Hours of Operations */}
          <div className="space-y-3 leading-5">
            <h3 className="text-xl font-bold text-white uppercase">
              Hours of Operations
            </h3>
            <p className="text-white">
              <span className="font-semibold">Monday to Friday:</span> 8AM – 7PM{" "}
              <br />
              <span className="font-semibold">Saturday:</span> 10AM – 4PM <br />
              <span className="font-semibold">Sunday:</span> Closed
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
