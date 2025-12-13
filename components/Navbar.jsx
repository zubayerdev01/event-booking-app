import Image from "next/image";
import Link from "next/link";
import SignInOut from "@/components/auth/SignInOut";

const Navbar = () => {
  return (
    <nav>
      <div className="container flex justify-between items-center py-4">
        <div className="nav-brand">
          <Link href="/">
            <Image
              src="/eventry-logo-full-transparent.svg"
              alt="Eventry"
              width={0}
              height={0}
              sizes="100vw"
              className="w-48 h-auto"
            />
          </Link>
        </div>

        <ul className="flex gap-4 text-[#9C9C9C]">
          <li>
           <SignInOut />
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>Contact Us</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
