import { Button } from "../ui/button";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="mx-auto max-w-[250rem] px-4 flex flex-col md:flex-row justify-between items-start mt-30 py-8 pl-10 md:pl-0 relative before:absolute before:-top-4 before:left-0 before:h-0.5 before:w-full before:bg-text">
      <div className="mb-15 md:mb-0">
        <div className="text-[5rem] font-black mb-5">++</div>
        <p className="text-xl text-text/70 max-w-130">
          Wear the Arc. Anime-inspired streetwear for gamers and otaku. Every drop limited. No restocks. Ever.
        </p>
        <div className="mt-5 text-sm text-text/60 mb-2">Follow the lore</div>
        <div>
          <Button size="lg" className="text-xl p-8"> <FaTiktok /> TikTok</Button>
          <Button size="lg" className="text-xl p-8"> <FaInstagram /> Instagram</Button>
          <Button size="lg" className="text-xl p-8"> <FaFacebook /> Facebook</Button>
        </div>
      </div>

      <div>
        <div className="text-text/50 text-[1.1rem]">DROPS</div>
        <div className="flex flex-col">
          <Link className="text-2xl my-4" to="/">Home</Link>
          <Link className="text-2xl my-4" to="/">Drop</Link>
          <Link className="text-2xl my-4" to="/">Collection</Link>
        </div>
      </div>

      <div className="my-15 md:my-0">
        <div className="text-text/50 text-[1.1rem]">EXPLORE</div>
        <div className="flex flex-col">
          <Link className="text-2xl my-4" to="/">Lookbook</Link>
          <Link className="text-2xl my-4" to="/">Our Story</Link>
          <Link className="text-2xl my-4" to="/">Collection</Link>
        </div>
      </div>

      <div>
        <div className="text-text/50 text-[1.1rem]">Community</div>
        <div className="flex flex-col">
          <Link className="text-2xl my-4" to="/">TikTok</Link>
          <Link className="text-2xl my-4" to="/">Instagram</Link>
          <Link className="text-2xl my-4" to="/">Facebook</Link>
        </div>
      </div>

      <div className="mt-15 md:mt-0">
        <div className="text-text/50 text-[1.1rem]">Contact</div>
        <div className="flex flex-col">
          <Link className="text-2xl my-4" to="/">FAQ</Link>
          <Link className="text-2xl my-4" to="/">Review</Link>
          <Link className="text-2xl my-4" to="/">Privacy Policy</Link>
          <Link className="text-2xl my-4" to="/">Terms</Link>
          <Link className="text-2xl my-4" to="/">Help</Link>
          <Link className="text-2xl my-4" to="/">Return Policy</Link>
          <Link className="text-2xl my-4" to="/">Contact Us</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
