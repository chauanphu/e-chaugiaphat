import style from "styles/Blog.module.scss"

export enum HTMLContentTypes {
    BLOG= "blog",
    CONTACT= "contact",
}

export type HTMLContentProps = {
    htmlContent?: string;
    type: HTMLContentTypes
};

function getClassName(type: HTMLContentTypes) {
    switch (type) {
        case HTMLContentTypes.BLOG:
            return style.blog;
        case HTMLContentTypes.CONTACT:
            return style.contact;
        default:
            return style.pageContent;
    }
}

export default function HTMLContent({ htmlContent, type }: HTMLContentProps) {
    return (
        <div
        className={getClassName(type)}
        dangerouslySetInnerHTML={{ __html: htmlContent || "Chưa cập nhật" }}
        />
    );
}