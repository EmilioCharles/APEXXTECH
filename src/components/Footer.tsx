export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ApexxTech. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <a href="#" className="hover:text-blue-600">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
