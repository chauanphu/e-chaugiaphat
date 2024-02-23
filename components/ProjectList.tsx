import React from "react";
import MyCarousel from "./MyCarousel";
import styles from "styles/ProductList.module.scss";
import { Project } from "@prisma/client";
import ProjectCard from "./ProjectCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    partialVisibilityGutter: 30,
  },
};

export default function ProjectList({ projects, isCarousel = false }: { projects: Project[], isCarousel?: boolean}) {
  return (
    <>
      {isCarousel ? (
        projects && projects.length > 0 ? (
          <MyCarousel seconds={3} responsive={responsive}>
            {projects.map((project) => (
              <ProjectCard key={project.url} project={project} />
            ))}
          </MyCarousel>
        ) : (
          <p>Dự án đang được cập nhật</p>
        )
      ) : (
        <div className={styles.project__list}>
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.url} project={project} />
            ))
          ) : (
            <p>Dự án đang được cập nhật</p>
          )}
        </div>
      )}
    </>
  );
}
