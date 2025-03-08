import YogaImage from "@/assets/img/yoga.svg";

export const DoYoga = () => {
  return (
    <>
      <img src={YogaImage} className="w-full h-64 mt-20 mb-8" />
      <p className="text-center text-sm font-semibold text-neutral-500 mt-12">
        Breathe in... breathe out... and enjoy this rare moment of freedom!
      </p>
    </>
  );
};
