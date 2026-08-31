import {
  FolderKanban,
  Image,
  Video,
  Plus,
} from "lucide-react";

const stats = [
  {
    title: "کل پروژه‌ها",
    key: "projects",
    icon: FolderKanban,
  },
  {
    title: "تصاویر",
    key: "images",
    icon: Image,
  },
  {
    title: "ویدیوها",
    key: "videos",
    icon: Video,
  },
];

export default function AdminStats({ projects = [] }) {

  const imageCount = projects.reduce(
    (total, project) =>
      total +
      (Array.isArray(project.images)
        ? project.images.length
        : 0),
    0
  );

  const videoCount = projects.filter(
    (project) => project.video
  ).length;

  const values = {
    projects: projects.length,
    images: imageCount,
    videos: videoCount,
  };

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >

      {stats.map((item) => {

        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="
              rounded-[24px]
              border
              border-white/10
              bg-white/[0.03]
              p-6
              transition
              duration-300
              hover:-translate-y-1
              hover:border-primary/30
            "
          >

            <div className="flex items-center justify-between">

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-primary/10
                  text-primary
                "
              >
                <Icon size={23} />
              </div>

              <span className="text-3xl font-black text-primary">
                {values[item.key]}
              </span>

            </div>

            <p className="mt-5 text-sm text-white/50">
              {item.title}
            </p>

          </div>
        );
      })}

    </div>
  );
}