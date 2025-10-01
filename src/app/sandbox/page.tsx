import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import {
  folders_table as folders,
  files_table as files,
} from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-xl font-bold">Database Management</h2>

      <form
        action={async () => {
          "use server";
          const user = await auth();
          if (!user.userId) {
            throw new Error("Not authenticated");
          }

          // Update all existing folders and files to current user
          const { eq } = await import("drizzle-orm");

          await db
            .update(folders)
            .set({ ownerId: user.userId })
            .where(eq(folders.ownerId, "me"));

          await db
            .update(files)
            .set({ ownerId: user.userId })
            .where(eq(files.ownerId, "me"));

          console.log("Updated all folders and files to user:", user.userId);
        }}
      >
        <button
          type="submit"
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Fix Owner IDs (Update "me" to your user ID)
        </button>
      </form>

      <form
        action={async () => {
          "use server";
          const user = await auth();
          if (!user.userId) {
            throw new Error("Not authenticated");
          }

          // Insert new data with correct user ID
          await db.insert(folders).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index !== 0 ? 1 : null,
              ownerId: user.userId,
            })),
          );
          await db.insert(files).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              size: 50000,
              url: file.url,
              parent: (index % 3) + 1,
              ownerId: user.userId,
            })),
          );

          console.log("Seed completed successfully!");
        }}
      >
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Add More Seed Data
        </button>
      </form>
    </div>
  );
}
