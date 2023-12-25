import React from 'react';
import styles from 'styles/Breadcrumbs.module.scss';

interface Breadcrumb {
    label: string;
    url: string;
}

interface BreadcrumbsProps {
    breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
    return (
        <nav aria-label="breadcrumb" className='container'>
            <ol className={styles.breadcrumb}>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li key={index} className={styles.breadcrumbItem}>
                        <a href={breadcrumb.url}>{breadcrumb.label}</a>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
