import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";

import { API_URL } from "../config/api";

import ProjectHero from "../components/portfolio/ProjectHero";
import Gallery from "../components/portfolio/Gallery";
import ProjectInfo from "../components/portfolio/ProjectInfo";
import RelatedProjects from "../components/portfolio/RelatedProjects";

export default function Project() {
  const { slug } = useParams();

  // =========================
  // State
  // =========================

  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Get Project
  // =========================

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/projects/slug/${slug}`
        );

        // پروژه پیدا نشده
        if (response.status === 404) {
          setProject(null);
          return;
        }

        if (!response.ok) {
          throw new Error("خطا در دریافت پروژه");
        }

        const data = await response.json();

        setProject(data.project);

        // =========================
        // Related Projects
        // =========================

        const relatedResponse = await fetch(
          `${API_URL}/projects`
        );

        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();

          const related = (relatedData.projects || [])
            .filter((item) => item.slug !== slug)
            .slice(0, 3);

          setRelatedProjects(related);
        }
      } catch (error) {
        console.error("Project API Error:", error);

        setError("دریافت اطلاعات پروژه با مشکل مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center">
        <div
          className="
            h-14
            w-14
            animate-spin
            rounded-full
            border-2
            border-primary
            border-t-transparent
          "
        />
      </section>
    );
  }

  // =========================
  // Error
  // =========================

  if (error) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="text-xl text-red-400">
            {error}
          </p>
        </div>
      </section>
    );
  }

  // =========================
  // Not Found
  // =========================

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  // =========================
  // Page
  // =========================

  return (
    <>
      {/* Project Hero */}

      <ProjectHero project={project} />

      {/* Gallery */}

      {project.images?.length > 0 && (
        <Gallery images={project.images} />
      )}

      {/* Project Information */}

      <ProjectInfo project={project} />

      {/* Related Projects */}

      {relatedProjects.length > 0 && (
        <RelatedProjects projects={relatedProjects} />
      )}
    </>
  );
}
