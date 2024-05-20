const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-300px)]">
      <p className="text-7xl font-bold text-primary">L</p>
      <div className="w-14 h-14 border-8 border-dashed rounded-full animate-spin mt-2 border-red-500"></div>
      <p className="text-7xl font-bold text-primary">ading....</p>
    </div>
  );
};

export default LoadingPage;
