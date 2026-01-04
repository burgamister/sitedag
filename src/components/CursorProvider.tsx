import { useEffect } from 'react';

const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const cursorSvg = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 28 28" enable-background="new 0 0 28 28" xml:space="preserve"><polygon fill="%23FFFFFF" points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6 "/><polygon fill="%23FFFFFF" points="17.3,21.6 13.7,23.1 9,12 12.7,10.5 "/><rect x="12.5" y="13.6" transform="matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)" width="2" height="8"/><polygon points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 "/></svg>`;
    
    const cursorUrl = `data:image/svg+xml;utf8,${cursorSvg}`;

    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: url('${cursorUrl}') 0 0, auto;
        cursor-size: 40px;
      }

      a,
      button,
      [role="button"],
      input[type="button"],
      input[type="submit"],
      label,
      select,
      textarea,
      .cursor-pointer {
        cursor: url('${cursorUrl}') 0 0, pointer;
      }

      input[type="text"],
      input[type="email"],
      input[type="password"],
      input[type="number"],
      textarea {
        cursor: url('${cursorUrl}') 0 0, text;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <>{children}</>;
};

export default CursorProvider;
