function Footer(){
    return (
        <footer dir="rtl" className="w-full border-t bg-gray-50 mt-8">
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-600">© 2026 Prime Shop. همه حقوق محفوظ است.</p>
                <div className="flex gap-4 mt-3 md:mt-0">
                    <a href="#" className="text-gray-600 hover:text-gray-800">قوانین</a>
                    <a href="/Contact-Us" className="text-gray-600 hover:text-gray-800">تماس با ما</a>
                </div>
            </div>
        </footer>
    )
};

export default Footer;