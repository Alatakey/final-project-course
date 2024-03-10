export default function Footer() {
  return (
    <footer className="bg-gray-200 py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h5 className="text-lg font-bold mb-4">About Us</h5>
            <p>Brief description about your company or website.</p>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-4">Quick Links</h5>
            <ul className="list-none">
              <li>
                <a
                  className="text-gray-700 hover:text-blue-500"
                  href="homePage"
                >
                  Home page
                </a>
              </li>
              <li>
                <a className="text-gray-700 hover:text-blue-500" href="About">
                  About
                </a>
              </li>
              <li>
                <a className="text-gray-700 hover:text-blue-500" href="Contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-4">Contact Us</h5>
            <ul className="list-none">
              <li>
                <i className="fas fa-map-marker-alt text-gray-700 mr-2"></i> 123
                Street, City, State
              </li>
              <li>
                <i className="fas fa-phone text-gray-700 mr-2"></i> (123)
                456-7890
              </li>
              <li>
                <i className="fas fa-envelope text-gray-700 mr-2"></i>{" "}
                <a
                  href="mailto:info@example.com"
                  className="text-gray-700 hover:text-blue-500"
                >
                  info@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-700">
            &copy; 2024 Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
