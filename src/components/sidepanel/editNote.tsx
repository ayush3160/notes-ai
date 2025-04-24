import { Note } from "@/app/page";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function EditNote({ note }: { note: Note }) {
  return (
    <div className="p-4">
      <Input className="mb-4" placeholder="Title" defaultValue={note.title} />
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Write your note..."
        rows={10}
        cols={30}
        defaultValue={note.description}
      ></textarea>
      <Button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save Note
      </Button>
    </div>
  );
}
