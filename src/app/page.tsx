"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, FilePenLine, X } from "lucide-react";
import AddNote from "@/components/sidepanel/addNote";
import ChatSummary from "@/components/sidepanel/chatSummary";
import EditNote from "@/components/sidepanel/editNote";

type SidePanelView = "" | "add" | "edit" | "view" | "summary" | "chat";
export type Note = {
  id: number;
  title: string;
  description?: string;
};

const sidePanelHeading = {
  add: "Add Note",
  edit: "Edit Note",
  view: "View Note",
  summary: "Generate Summary",
  chat: "Chat with AI",
};

export default function Home() {
  const router = useRouter();
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Meeting Notes",
      description: "Notes from the last meeting.",
    },
    {
      id: 2,
      title: "Project Ideas",
      description: "Ideas for the next project.",
    },
    { id: 3, title: "Grocery List", description: "Items to buy this week." },
  ]);
  const [search, setSearch] = useState("");
  const [activeView, setActiveView] = useState<SidePanelView>("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null); // when editing/viewing/chatting

  async function checkSession() {
    const { data, error } = await supabaseClient.auth.getSession();
    if (error || !data.session) {
      router.push("/signin");
    }
  }

  function closeSidePanel() {
    setActiveView("");
    setSelectedNote(null);
  }

  useEffect(() => {
    checkSession();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-5xl pt-8 flex overflow-hidden">
      {/* Main Content */}
      <main
        className={`transition-all duration-300 p-4 md:p-8 flex-1 ${
          activeView !== "" ? "hidden md:block md:max-w-3xl" : "block mx-auto"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All Your Notes</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => setActiveView("add")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Note
            </Button>
            <Button
              onClick={() => setActiveView("summary")}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Generate Summary AI
            </Button>
          </div>
        </div>

        <Input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded mb-6"
        />

        <div className="flex flex-col gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-4 border rounded shadow-sm w-full hover:shadow-md transition-shadow duration-200 flex flex-row"
            >
              <div
                onClick={() => setActiveView("view")}
                className="cursor-pointer flex justify-between items-center w-4/5"
              >
                <h2 className="text-lg font-semibold">{note.title}</h2>
              </div>
              <div className="flex gap-2 ml-auto">
                <Button
                  onClick={() => {
                    setActiveView("edit");
                    setSelectedNote(note);
                  }}
                  className="px-4 py-2 rounded hover:bg-blue-700"
                >
                  <FilePenLine className="h-4 w-4" />
                </Button>
                <Button className="px-4 py-2 rounded hover:bg-blue-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Sliding Panel */}
      <div
        className={`shadow-lg border-l h-full fixed top-0 transition-transform duration-300 z-20 overflow-y-auto
        ${activeView !== "" ? "translate-x-0" : "translate-x-full"}
        w-full md:w-[500px] right-0`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">
            {activeView ? sidePanelHeading[activeView] : ""}
          </h2>
          <Button className="cursor-pointer" onClick={closeSidePanel}>
            <X className="w-6 h-6 text-gray-600" />
          </Button>
        </div>
        {activeView === "add" && <AddNote />}
        {activeView === "summary" && <ChatSummary />}
        {activeView === "edit" && selectedNote && (
          <EditNote note={selectedNote} />
        )}
      </div>
    </div>
  );
}
