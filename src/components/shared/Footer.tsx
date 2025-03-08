import { Github, Mail } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Company */}
          <div>
            <h3 className="text-xl font-bold mb-4">Mega Cab Services</h3>
            <p className="text-gray-300 mb-4">
              Providing premium cab rental services since 2020. We connect you
              with professional drivers and well-maintained vehicles to ensure
              your journey is comfortable, safe, and on time.
            </p>
          </div>

          {/* Contact Info */}
          <div className="md:text-right">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center md:justify-end">
                <Mail className="mr-2" />
                <a
                  href="mailto:husniwfayo@gmail.com"
                  className="text-gray-300 hover:text-white transition"
                >
                  husniwfayo@gmail.com
                </a>
              </div>
              <div className="flex items-center md:justify-end">
                <Github className="mr-2" />
                <a
                  href="https://github.com/husnihaniffa"
                  className="text-gray-300 hover:text-white transition"
                >
                  github.com/husnihaniffa
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Mega Cab Services. All rights reserved.
            Developed by Husni Haniffa.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
