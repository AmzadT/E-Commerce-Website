import { useEffect } from 'react';

const TitleImage = () => {
  useEffect(() => {
    const link =
      document.querySelector("link[rel='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href =
      'https://i.tracxn.com/logo/company/shopsphere.com_Logo_b908ecdf-b543-4425-b89b-7e8c302224c2.jpg?height=120&width=120';
    if (!link.parentNode) {
      document.head.appendChild(link);
    }
  }, []);

  return null; 
};

export default TitleImage;
