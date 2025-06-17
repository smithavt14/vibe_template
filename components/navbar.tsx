import Container from "@/components/container";
import Avatar from "@/components/avatar";
import ThemeController from "@/components/theme-controller";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 border-b border-base-300">
      <Container className="flex justify-between items-center w-full">
        <div className="navbar-start">
          <Link href="/" className="text-xl font-bold">Vibe</Link>
        </div>
        
        <div className="navbar-end flex items-center gap-6">
          <ThemeController />
          <Link 
            href="https://github.com/smithavt14/vibe_template"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
            aria-label="View source on GitHub"
          >
            <FaGithub size={20} />
          </Link>
          <Avatar size="medium" />
        </div>
      </Container>
    </div>
  );
}
