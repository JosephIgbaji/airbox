import React from "react";

const TitleHeaderBox = ({
  heading,
  actionLabel,
  icon,
  onClick,
  RenderComponent,
}) => {
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
