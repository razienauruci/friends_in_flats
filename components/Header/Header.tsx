import User from '../User';
import Link from 'next/link';
import Image from 'next/image';
import logo from './logo.png'; // Adjusted the path to the logo

export default async function Header() {
  return (
    <header className="bg-white shadow-md py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image src={logo} alt="Company Logo" width={100} height={100} />
        </div>
        <nav className="flex items-center space-x-6">
          <Link href="/" legacyBehavior>
            <a className="text-blue-600 hover:text-blue-800 transition-colors text-lg">Home</a>
          </Link>
          <Link href="/landlord/onboarding" legacyBehavior>
            <a className="text-blue-600 hover:text-blue-800 transition-colors text-lg">Landlord Onboarding</a>
          </Link>
          <Link href="/listings" legacyBehavior>
            <a className="text-blue-600 hover:text-blue-800 transition-colors text-lg">Apartments</a>
          </Link>
          <User />
        </nav>
      </div>
    </header>
  );
}
