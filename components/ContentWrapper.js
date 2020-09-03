import React from "react";

export const ContentWrapper = ({ children }) => (
  <div className="w-full flex flex-col items-center max-w-full sm:max-w-2xl">
    {children}
  </div>
);
