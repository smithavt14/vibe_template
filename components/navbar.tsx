import Container from "@/components/container";
import Avatar from "@/components/avatar";
import ThemeController from "@/components/theme-controller";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 border-b border-base-300">
      <Container className="flex justify-between items-center w-full">
        <div className="navbar-start">
          <Link href="/" className="text-xl font-bold">Vibe</Link>
        </div>
        
        <div className="navbar-end flex items-center gap-6">
          <ThemeController />
          <Avatar size="medium" />
        </div>
      </Container>
    </div>
  );
}
