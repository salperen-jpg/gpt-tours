import { CgChevronRight } from "react-icons/cg";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="text-center mb-12 flex justify-center items-center gap-x-8">
      <CgChevronRight className="text-4xl section-icon" />

      <h2 className="font-['Caveat'] text-2xl sm:text-3xl lg:text-5xl">
        {title}
      </h2>
    </div>
  );
};
export default SectionTitle;
