const Footer = () => {
  return (
    <footer className="bg-red-500 text-white text-sm mt-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
        <p>Copyright © 2025 Nookli, Inc.</p>
        <div className="space-x-4 mt-2 sm:mt-0">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy & Policy</a>
          <a href="mailto:hello@nookli.ai" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;