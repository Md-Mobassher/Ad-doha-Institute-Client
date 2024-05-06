import React from "react";

const Container = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="lg:mt-20 md:mt-16 mt-12 lg:mb-8 md:mb-8 mb-6 max-w-7xl mx-auto px-4">
      {children}
    </div>
  );
};

export default Container;
