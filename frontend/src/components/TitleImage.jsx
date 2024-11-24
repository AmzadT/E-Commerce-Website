import { useEffect } from 'react';

const TitleImage = () => {
  useEffect(() => {
    const link =
      document.querySelector("link[rel='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTpDHLtt2IOqGNb-Swq5r2fn0whqWRiSP3Kw&s';
    if (!link.parentNode) {
      document.head.appendChild(link);
    }
  }, []);

  return null; 
};

export default TitleImage;
