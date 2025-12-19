export const PracticeAreas: React.FC = () => {
  const areas = [
    "Corporate & Commercial",
    "Startups & MSME Law",
    "Tech Law",
    "Real Estate Law",
    "Regulatory Compliance",
    "Company Governance",
  ];

  return (
    <div className="mt-16 mb-12 flex items-center justify-center px-4 ">
      <div className="w-full max-w-md">
        <h1 className="text-3xl lg:text-xl font-semibold text-gray-800 mb-12 text-left">
          Practice Areas
        </h1>

        {/* List of practice areas */}
        <div className="space-y-8 mx-8">
          {areas.map((area, index) => (
            <div key={index}>
              <div className="text-xl lg:text-sm font-medium text-gray-700 text-left">
                {area}
              </div>
              {/* Divider line - hidden after the last item */}
              {index < areas.length - 1 && (
                <hr className="mt-8 border-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
