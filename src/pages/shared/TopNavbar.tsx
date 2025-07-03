import { Phone, MessageCircle } from "lucide-react";

const TopNavbar = () => {
  return (
    <div className="bg-[#9EA647] px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center py-2 text-white">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="text-sm sm:text-base">
              যে কোন পণ্য অর্ডার করতে:
            </span>
            
            <div className="flex items-center gap-3">
              <a 
                href="tel:+8801516559515" 
                className="flex items-center hover:text-gray-200 transition-colors duration-200"
              >
                <Phone className="w-4 h-4 mr-1" /> 
                <span className="text-sm sm:text-base">+8801516559515</span>
              </a>
              
              <span className="text-gray-300">|</span>
              
              <a 
                href="https://wa.me/8801516559515" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:text-gray-200 transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                <span className="text-sm sm:text-base">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;