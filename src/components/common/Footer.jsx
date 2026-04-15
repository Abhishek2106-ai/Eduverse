import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">

          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">

            {/* Company */}
            <div className="w-[30%] flex flex-col gap-3 mb-7">
              <img src={Logo} alt="Logo" className="object-contain" />
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Company
              </h1>

              <div className="flex flex-col gap-2">
                <Link to="/about" className="footer-link">About</Link>
                <Link to="/" className="footer-link">Careers</Link>
                <Link to="/" className="footer-link">Affiliates</Link>
              </div>

              <div className="flex gap-3 text-lg mt-2">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            {/* Resources */}
            <div className="w-[48%] lg:w-[30%] mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => (
                  <Link key={index} to="/" className="footer-link">
                    {ele}
                  </Link>
                ))}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Support
              </h1>

              <div className="mt-2">
                <Link to="/contact" className="footer-link">
                  Help Center
                </Link>
              </div>
            </div>

            {/* Plans + Community */}
            <div className="w-[48%] lg:w-[30%] mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => (
                  <Link key={index} to="/" className="footer-link">
                    {ele}
                  </Link>
                ))}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => (
                  <Link key={index} to="/" className="footer-link">
                    {ele}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2 (Dynamic Links) */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLink2.map((ele, i) => (
              <div key={i} className="w-[48%] lg:w-[30%] mb-7">
                <h1 className="text-richblack-50 font-semibold text-[16px]">
                  {ele.title}
                </h1>

                <div className="flex flex-col gap-2 mt-2">
                  {ele.links.map((link, index) => (
                    <Link
                      key={index}
                      to={link.link || "/"}
                      className="footer-link"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-3">

          <div className="flex">
            {BottomFooter.map((ele, i) => (
              <Link
                key={i}
                to="/"
                className={`px-3 footer-link ${
                  i !== BottomFooter.length - 1
                    ? "border-r border-richblack-700"
                    : ""
                }`}
              >
                {ele}
              </Link>
            ))}
          </div>

          <div className="text-center">
            Made with ❤️ Eduverse
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;