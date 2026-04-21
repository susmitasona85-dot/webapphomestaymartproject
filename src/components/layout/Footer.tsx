import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand and Story */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
              Nature<span className="text-earth-brown">Stay</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Experience the harmony of nature and comfort. Our homestay offers a unique escape into the lush greenery, providing peace and authentic local experiences.
            </p>
            <div className="flex space-x-4 mt-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary/60">Follow us on Socials</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/stay" className="hover:text-primary transition-colors">Explore Stays</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Travel Blog</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/policies" className="hover:text-primary transition-colors">Terms & Policies</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-primary shrink-0" />
                <span>123 Forest View Lane, Hill Station, North Bengal, 734001</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-primary shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-primary shrink-0" />
                <span>hello@naturestay.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NatureStay Homestay. All rights reserved. Designed for immersive experiences.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
