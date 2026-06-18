import { Button } from "../components/ui/button";

const Navbar = () => {
  return (
    <nav aria-label="Main navigation" className="w-full">
      <div className="flex items-center justify-between px-12 py-4 md:px-12 lg:px-20">
        <a href="/" className="text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-80">
          MailCraft
        </a>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white text-xl">
            Login
          </Button>
          <Button size="sm" className="bg-white text-black font-semibold hover:bg-white/90 text-xl cursor-pointer">
            Get started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
