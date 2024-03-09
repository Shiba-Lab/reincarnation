const NotAvailablePage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
      <div className="relative w-full h-[400px] lg:h-[600px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[300px] h-[300px] bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full animate-pulse" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[200px] h-[200px] bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-spin-slow" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[100px] h-[100px] bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-bounce" />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        <h1 className="text-4xl font-bold text-white text-center">
          Not Available
        </h1>
        <p className="text-white">
          他の方が体験中ですので、しばらくしてから再度お試しください。
        </p>
      </div>
    </div>
  );
};

export default NotAvailablePage;
