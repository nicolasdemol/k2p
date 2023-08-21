const Notification = ({ title, description, timestamp }) => {
  return (
    <div
      id="toast-notification"
      className="relative my-4 w-full p-4 text-gray-900 bg-white rounded-xl shadow dark:bg-gray-800 dark:text-gray-300"
      role="alert"
    >
      <div className="flex items-center">
        <div className="ml-3 text-sm font-normal">
          <div className="text-sm font-normal">{description}</div>
          <span className="text-xs font-medium text-blue-600 dark:text-blue-500">
            {timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

export { Notification };
