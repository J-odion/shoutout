import { useState } from "react";
import { staffList} from "../api/data"

type ShoutoutFormProps = {
  type: "select" | "message" | "name" | "sender";
  onSubmit: (value: string) => Promise<void> | void; // Supports async submissions
  staffList?: string[];
  recipient?: string;
};

export default function ShoutoutForm({ type, onSubmit, recipient }: ShoutoutFormProps) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) {
      setError("This field cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors

    try {
      await onSubmit(value);
      setValue(""); // Reset field on success
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" space-y-4 mx-auto"
    >
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {type === "select" && (
        <>
          <label htmlFor="staff" className="block text-sm font-medium text-blue-950">
            Select a staff member
          </label>
          <select
            id="staff"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1 block w-full p-2  border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm rounded-md bg-white/20 backdrop-blur-md text-blue-950"
            disabled={loading}
          >
            <option value="">Select a staff member</option>
            {staffList?.map((staff) => (
              <option key={staff} value={staff}>
                {staff}
              </option>
            ))}
          </select>
        </>
      )}

      {type === "sender" && (
        <>
          <label htmlFor="sender" className="block text-sm font-medium text-blue-950">
            Select Your Name
          </label>
          <select
            id="sender"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1 block w-full p-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md bg-white/20 backdrop-blur-md text-white"
            disabled={loading}
          >
            <option value="">Select your Name</option>
            {staffList?.map((staff) => (
              <option key={staff} value={staff}>
                {staff}
              </option>
            ))}
          </select>
         
        </>
      )}

      {type === "message" && (
        <>
          <label htmlFor="message" className="block text-sm font-medium text-white">
            Write your shoutout for {recipient}
          </label>
          <textarea
            id="message"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1 block w-full p-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md bg-white/20 backdrop-blur-md text-white"
            rows={4}
            disabled={loading}
          ></textarea>
        </>
      )}

      <button
        type="submit"
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
          ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"}
        `}
        disabled={loading}
      >
        {loading ? "Submitting..." : type === "select" ? "Next" : "Submit"}
      </button>
    </form>
  );
}
