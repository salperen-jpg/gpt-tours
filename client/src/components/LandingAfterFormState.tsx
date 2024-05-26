import { SectionSeperator } from ".";
import { SectionTitle } from ".";
import { TiTick } from "react-icons/ti";

const LandingAfterFormState = () => {
  return (
    <>
      <section className="sub-section align-element py-[15rem]">
        <SectionTitle title="Contact Us" />
        <div className="grid place-items-center gap-4 py-[7rem]">
          <div className="tick bg-green-300 w-[5rem] h-[5rem]">
            <div className="tick bg-white w-[3rem] h-[3rem]">
              <TiTick className="text-5xl text-green-500" />
            </div>
          </div>
          <h4 className=" max-w-[16rem] mx-auto text-center sm:max-w-[24rem] font-semibold tracking-wide text-2xl sm:text-3xl">
            Your message has been submitted successfully!
          </h4>
        </div>
      </section>
      <SectionSeperator />
    </>
  );
};
export default LandingAfterFormState;
