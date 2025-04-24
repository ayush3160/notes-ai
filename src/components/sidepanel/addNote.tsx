"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AddNote() {
  return (
    <div className="p-4">
      <Input className="mb-4" placeholder="Title" />
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Write your note..."
        rows={10}
        cols={30}
      ></textarea>
      <Button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save Note
      </Button>
    </div>
  );
}
