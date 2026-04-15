import React from "react";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div
      className={`flex ${position} my-20 justify-between items-center gap-10`}
    >
      {/* Section 1 */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6">
        {heading}

        {/* Sub Heading */}
        <div className="text-richblack-300 text-base font-medium w-full">
          {subheading}
        </div>

        {/* Button Group */}
        <div className="flex flex-wrap gap-5 mt-4">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="w-full lg:w-[470px] h-fit code-border flex flex-row py-4 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative overflow-hidden rounded-lg">

        {backgroundGradient}

        {/* Indexing */}
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-bold">
          {[...Array(11)].map((_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 1500, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;