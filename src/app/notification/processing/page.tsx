const ProcessingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-6 bg-white dark:bg-gray-800 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-gray-100">
          Upload Complete
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          現在処理中ですので、少々お待ちください
        </p>
        <div className="mt-6">
          <div className="animate-pulse h-2 w-full bg-blue-500 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProcessingPage;
