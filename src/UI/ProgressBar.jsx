const ProgressBar = ({ completed = 0, total = 100 }) => {
    const percentage =
      total === 0 ? 0 : Math.round((completed / total) * 100);
  
    return (
      <div
        className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
      >
        <div
          className="h-full bg-gray-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={completed}
          aria-valuemax={total}
        />
      </div>
    );
  };
  
  export default ProgressBar;
