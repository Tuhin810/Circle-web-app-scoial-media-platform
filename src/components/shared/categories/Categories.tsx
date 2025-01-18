import React from "react";

const categoriesData = [
  { name: "Fashion", icon: "👗" },
  { name: "Fitness", icon: "💪" },
  { name: "Gaming", icon: "🎮" },
  { name: "Tech", icon: "💻" },
  { name: "Travel", icon: "✈️" },
  { name: "Music", icon: "🎵" },
  { name: "Food", icon: "🍔" },
  { name: "Photography", icon: "📸" },
  { name: "Art", icon: "🎨" },
  { name: "Lifestyle", icon: "🏖️" },
];

const Categories = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Explore Categories
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categoriesData.map((category, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out bg-gray-800 hover:bg-gray-700"
          >
            <div className="text-center">
              <span className="text-4xl mb-2 block">{category.icon}</span>
              <p className="text-lg font-medium">{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
