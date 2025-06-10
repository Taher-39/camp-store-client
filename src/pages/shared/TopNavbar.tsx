import { Phone } from "lucide-react";

const TopNavbar = () => {
  return (
    // <div className="bg-[#FC8934] px-4 md:px-8 lg:px-16">
    <div className="bg-[#9EA647] px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Changed to regular div with text-center + md:text-left */}
        <div className="text-white py-2 text-center">
          <span className="inline-block">
            আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন: 
          </span>
          
          {/* Phone Number 1 */}
          <a 
            href="tel:+8801516559515" 
            className="inline-flex items-center hover:text-gray-200 transition-colors duration-200 mx-1"
          >
            <Phone className="w-4 h-4 text-white mr-1" /> 
            +8801516559515
          </a>
          
          <span className="mx-1">|</span>
          
          {/* Hotline Number */}
          {/* <a 
            href="tel:01609136646" 
            className="inline-flex items-center hover:text-gray-200 transition-colors duration-200 mx-1"
          >
            <Phone className="w-4 h-4 text-white mr-1" /> 
            হট লাইন: 01609136646
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;