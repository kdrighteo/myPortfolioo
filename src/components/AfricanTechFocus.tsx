import React from "react";
import Image from "next/image";

export default function AfricanTechFocus() {
  return (
    <section className="section bg-gradient-to-r from-primary-700 to-primary-800 text-white py-16">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Building Technology for Africa
            </h2>
            <p className="text-lg mb-6">
              As a web developer from Ghana, I'm passionate about leveraging
              technology to address unique challenges and opportunities in the
              African context. My work focuses on creating accessible, practical
              solutions that consider local infrastructure, connectivity
              constraints, and cultural contexts.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-white rounded-full p-2 mr-4 text-primary-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl">
                    Low-resource Environments
                  </h3>
                  <p>
                    Optimizing applications for devices and networks common in
                    Ghana and across Africa
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white rounded-full p-2 mr-4 text-primary-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl">Local Solutions</h3>
                  <p>
                    Creating technology that addresses specific needs in
                    Ghanaian communities
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white rounded-full p-2 mr-4 text-primary-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl">Digital Accessibility</h3>
                  <p>
                    Ensuring technology solutions are accessible to diverse
                    users regardless of technical expertise
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent opacity-50 z-10"></div>
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <blockquote className="text-xl italic">
                "Technology should serve the unique needs of African communities
                while creating opportunities for innovation and growth."
              </blockquote>
            </div>
            <div className="relative h-full w-full">
              <Image
                src="/images/african-tech.jpg"
                alt="Technology in African context"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
