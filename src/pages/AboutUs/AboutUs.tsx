import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

import teamMember1 from "@/assets/TeamMember/Abu Taher.jpg";
import teamMember2 from "@/assets/TeamMember/Team-memeber-01.png";

const AboutUsPage = () => {
  return (
    <div className="container mx-auto py-8">
      {/* Contact Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Email: info@campstore.com</p>
        <p>Address: 123 Camp Road, Adventure City, USA</p>
      </section>

      {/* Google Map */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Location</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354346806547!2d144.9575260153188!3d-37.81668897975132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43e40400f1%3A0x5045675218cedf0!2zU291dGhiYW5rLCBBVUNLLCDgBDA!5e0!3m2!1sen!2sus!4v1601117388444!5m2!1sen!2sus"
          width="100%"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </section>

      {/* Social Media Links */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/campstore"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className="text-3xl text-blue-600" />
          </a>
          <a
            href="https://www.twitter.com/campstore"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon className="text-3xl text-blue-400" />
          </a>
          <a
            href="https://www.instagram.com/campstore"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="text-3xl text-pink-600" />
          </a>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p>
          At CampStore, our mission is to provide high-quality camping gear and
          outdoor products that inspire adventure and help our customers connect
          with nature.
        </p>
      </section>

      {/* Team Members */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <img
              src={teamMember1}
              alt="Team Member 1"
              className="w-40 h-40 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold">Abu Taher</h3>
            <p className="text-gray-500">Founder & CEO</p>
            <p className="mt-2">
              Abu Taher is passionate about the outdoors and started CampStore to
              share his love for adventure with others.
            </p>
          </div>
          <div className="text-center">
            <img
              src={teamMember2}
              alt="Team Member 2"
              className="w-40 h-40 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold">Jane Smith</h3>
            <p className="text-gray-500">Head of Marketing</p>
            <p className="mt-2">
              Jane is an experienced marketer who brings creativity and a deep
              understanding of the outdoor industry to the team.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
