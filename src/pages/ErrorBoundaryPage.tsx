import { useRouteError } from "react-router-dom";

export const ErrorBoundaryPage = () => {
    const error = useRouteError() as Error;
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center p-8 rounded-lg bg-white shadow-lg">
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                    Oops! Something went wrong
                </h1>
                <p className="text-gray-600 mb-4">
                    {error?.message || 'An unexpected error occurred'}
                </p>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    onClick={() => window.location.reload()}
                >
                    Reload Page
                </button>
            </div>
        </div>
    );
};