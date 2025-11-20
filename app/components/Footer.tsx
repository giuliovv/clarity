export default function Footer() {
    return (
        <footer className="py-12 border-t border-white/10 bg-black">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
                        Clarity
                    </span>
                    <p className="text-sm text-zinc-500 mt-2">
                        © {new Date().getFullYear()} Clarity Inc. All rights reserved.
                    </p>
                </div>

                <div className="flex space-x-6">
                    <a href="#" className="text-zinc-400 hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="text-zinc-400 hover:text-white transition-colors">Terms</a>
                    <a href="#" className="text-zinc-400 hover:text-white transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}
