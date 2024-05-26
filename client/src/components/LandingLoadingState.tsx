import SectionSeperator from "./SectionSeperator";
import SectionTitle from "./SectionTitle";

const LandingLoadingState = () => {
  return (
    <>
      <section className="sub-section align-element py-[15rem]">
        <SectionTitle title="Contact Us" />
        <div className="grid place-items-center py-[7rem]">
          <span className="animate-ping absolute inline-flex h-[2rem] w-[2rem] rounded-full bg-sky-400 opacity-75"></span>
        </div>
      </section>
      <SectionSeperator />
    </>
  );
};
export default LandingLoadingState;
