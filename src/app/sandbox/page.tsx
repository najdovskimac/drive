import { db } from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import {
  folders_table as folders,
  files_table as files,
} from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed function
      <form
        action={async () => {
          "use server";
          const folderInsert = await db.insert(folders).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index !== 0 ? 1 : null,
              ownerId: "me",
            })),
          );
          const fileInsert = await db.insert(files).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              size: 50000,
              url: file.url,
              parent: (index % 3) + 1,
              ownerId: "me",
            })),
          );

          console.log(fileInsert);
        }}
      >
        <button type="submit">Run Seed</button>
      </form>
    </div>
  );
}
