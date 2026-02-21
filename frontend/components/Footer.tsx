export function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-white/5 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-sm">
                <p>&copy; 2024 AgriIntel AI. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-agri-green transition-colors">Privacy</a>
                    <a href="#" className="hover:text-agri-green transition-colors">Terms</a>
                    <a href="#" className="hover:text-agri-green transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}
