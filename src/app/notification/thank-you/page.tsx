const ThankYouPage = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Thank You!
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            作品をご体験いただきありがとうございました。
          </p>
          <div className="mt-4">
            <img
              alt="Circle Logo"
              className="mx-auto h-24 w-24 rounded-full object-cover"
              height="90"
              src="/ShibaLab.svg"
              width="90"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
