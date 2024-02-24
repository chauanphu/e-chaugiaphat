
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/CTO.module.scss';

import phone_icon from '../public/images/call-animated.gif';
import facebook_icon from '../public/images/facebook-icon.gif';
import zalo_icon from '../public/images/zalo-icon.gif';
import { getContact } from 'lib/utils';

const CTO = () => {
  const contact = getContact();
  const buttons = [
    {
      imageSrc: phone_icon,
      buttonText: contact.phone.display,
      buttonLink: 'tel:' + contact.phone.number,
      background: true,

    },
    // {
    //   imageSrc: facebook_icon,
    //   buttonText: 'Facebook',
    //   buttonLink: 'https://www.facebook.com/dongphuctrangiaphat',
    //   background: false,
    // },
    {
      imageSrc: zalo_icon,
      buttonText: contact.phone.display,
      buttonLink: 'https://zalo.me/'+contact.phone.number,
      background: false,
    },
  ];

  return (
    <div className={styles.cto__buttons}>
      {buttons.map((button, index) => (
        <Link key={index} 
            href={button.buttonLink} 
            className={`${styles.cto__button} ${button.background ? styles.with__background : ''}`}
            rel="noopener noreferrer" target="_blank"
        >
          <span>{button.buttonText}</span>
          <Image src={button.imageSrc} alt="Icon" height={35}/>
        </Link>
        
      ))}
    </div>
  );
};

export default CTO;
