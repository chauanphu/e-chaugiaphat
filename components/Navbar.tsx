import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Navbar.module.scss";
import email_icon from "../public/images/email-icon.svg";
import phone_icon from "../public/images/phone-icon.svg";
import home_icon from "../public/images/home-icon.svg";
import burger_icon from "../public/images/Menu.svg";
import logo from "../public/images/logo.png";
import { CategoryWithSub } from "lib/prisma";
import { isPageActive, getPages, getContact } from "lib/utils";
import { useEffect, useState } from "react";

export default function Navbar({
  openSidebar,
  categories,
}: {
  openSidebar: () => void;
  categories: CategoryWithSub[];
}) {
  // Get active link
  const router = useRouter();
  const activeLink = router.pathname;
  const pages = getPages();
  const contacts = getContact();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(isScrollDown())
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  const isScrollDown = () => {
    const currentScrollPos = window.pageYOffset;
    // Check if scrolling down and scroll more than 70
    (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10;
    return prevScrollPos > currentScrollPos;
  };

  const categoriesGenerator = () => {
    return (
      <>
        {categories.map((category) => (
          <li
            className={styles.navItems + " " + styles.navDropdown}
            key={category.slug}
          >
            <Link href={`/san-pham/${category.slug}`}>{category.name}</Link>
            {category.children && category.children.length > 0 && (
              <>
                <span className={styles.cavet}>&#9660;</span>
                <ul className={styles.dropdown}>
                  {category.children.map((childCategory) => (
                    <li key={childCategory.slug}>
                      <Link href={`/san-pham/${childCategory.slug}`}>
                        {childCategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </>
    );
  };

  return (
    <>
      <header className={`${styles.header} ${
            visible ? styles.navOpen : styles.navClose
          }`}>
        {/* Header top */}
        <nav
          className={`${styles.header__top}`}
        >
          <div className="container">
            <ul className={styles.info}>
              <li>
                <Image src={email_icon} alt="Icon" height={16} />
                {contacts.email}
              </li>
              <li>
                <Image src={phone_icon} alt="Icon" height={16} />
                {contacts.phone.full}
              </li>
              <li>
                <Image src={home_icon} alt="Icon" height={16} />
                {contacts.address}
              </li>
            </ul>
          </div>
        </nav>
        {/* Main menu */}
        <nav className={styles.navbar}>
          <div className={styles.main__menu + " container"}>
            <div className={styles.navbar__logo}>
              <Link href="/">
                <Image src={logo} alt="Icon" height={100} />
              </Link>
            </div>
            <ul className={styles.page__menu}>
              {pages &&
                pages.map((page, index) => (
                  <li
                    key={index}
                    className={`${
                      isPageActive(activeLink, page.link) ? styles.active : ""
                    }`}
                  >
                    <Link href={page.link}>{page.name}</Link>
                  </li>
                ))}
            </ul>
            <button className={styles.navbar__toggle} onClick={openSidebar}>
              <Image src={burger_icon} alt="Menu Icon" />
            </button>
          </div>
          {/* Add list of menu with active links */}
          <div className={styles.navbar__menu}>
            <ul className="container">{categories && categoriesGenerator()}</ul>
          </div>
        </nav>
      </header>
    </>
  );
}
