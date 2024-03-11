import React from "react";
import styles from "../styles/ProductCard.module.scss";
import Link from "next/link";

import { Project } from "@prisma/client";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({  project }) => {
  const link = `/du-an/${project.url}`;
  return (
    <>
      {project && (
        <Link key={project.url} href={link}>
          <div className={styles.ProductCard}>
            <Image
              className={styles.ProjectCard__image}
              src={project.image_url ? `/api/images/du-an/${project.url}/${project.image_url}`  : ""}
              alt={project.name}
              width={300}
              height={300}
              priority={false}
            />
            <h2 className={styles.ProductCard__title}>
              {project.name}
            </h2>
            <p className={styles.ProductCard__description}>
              {project.description}
            </p>
          </div>
        </Link>
      )}
    </>
  );
};

export default ProjectCard;
