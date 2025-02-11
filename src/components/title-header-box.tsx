import React from "react";

interface TitleHeaderProps {
  heading: string;
  actionLabel?: string;
  icon?: any;
  onClick?: () => void;
  RenderComponent?: React.ComponentType; // Or React.FC<any> depending on how you want to define the props of the component being passed
}

const TitleHeaderBox = ({
  heading,
  actionLabel,
  icon,
  onClick,
  RenderComponent,
}: TitleHeaderProps) => {
  return (
    <div className="w-full border-b pb-4 mb-4 flex items-center justify-between">
      <p className="text-lg font-semibold">{heading}</p>
      {RenderComponent ? (
        <RenderComponent />
      ) : (
        actionLabel && (
          <span
            onClick={onClick}
            className="inline-flex text-primary font-semibold text-sm items-center gap-1 cursor-pointer"
          >
            {" "}
            {icon && icon} {actionLabel}
          </span>
        )
      )}
    </div>
  );
};

export default TitleHeaderBox;
