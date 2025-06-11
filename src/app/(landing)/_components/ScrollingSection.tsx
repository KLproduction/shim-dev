import { features } from "@/data/data";

type Props = {};

const ScrollingSection = (props: Props) => {
  return (
    <div className="flex w-full gap-20">
      <div className="w-full">
        <ul>
          {features.map((feature) => (
            <li key={feature.id}>
              <p className="font-heading py-16 text-5xl text-red-300">
                {feature.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full">right</div>
    </div>
  );
};

export default ScrollingSection;
