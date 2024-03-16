type LogoProps = {
  className?: string;
  width?: string;
  height?: string;
};

const Logo = (props?: LogoProps) => {
  return (
    <>
      <div className='flex items-center justify-center gap-2'>
        <LogoMark {...props} />
        <LogoText {...props} />
      </div>
    </>
  );
};

export const LogoMark = (props?: LogoProps) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        xmlSpace='preserve'
        width={32}
        height={32}
        viewBox='0 0 216 216'
        {...props}
      >
        <defs>
          <radialGradient
            id='snoo-radial-gragient'
            cx={169.75}
            cy={92.19}
            r={50.98}
            fx={169.75}
            fy={92.19}
            gradientTransform='matrix(1 0 0 .87 0 11.64)'
            gradientUnits='userSpaceOnUse'
          >
            <stop offset={0} stopColor='#feffff' />
            <stop offset={0.4} stopColor='#feffff' />
            <stop offset={0.51} stopColor='#f9fcfc' />
            <stop offset={0.62} stopColor='#edf3f5' />
            <stop offset={0.7} stopColor='#dee9ec' />
            <stop offset={0.72} stopColor='#d8e4e8' />
            <stop offset={0.76} stopColor='#ccd8df' />
            <stop offset={0.8} stopColor='#c8d5dd' />
            <stop offset={0.83} stopColor='#ccd6de' />
            <stop offset={0.85} stopColor='#d8dbe2' />
            <stop offset={0.88} stopColor='#ede3e9' />
            <stop offset={0.9} stopColor='#ffebef' />
          </radialGradient>
          <radialGradient
            xlinkHref='#snoo-radial-gragient'
            id='snoo-radial-gragient-2'
            cx={47.31}
            r={50.98}
            fx={47.31}
          />
          <radialGradient
            xlinkHref='#snoo-radial-gragient'
            id='snoo-radial-gragient-3'
            cx={109.61}
            cy={85.59}
            r={153.78}
            fx={109.61}
            fy={85.59}
            gradientTransform='matrix(1 0 0 .7 0 25.56)'
          />
          <radialGradient
            id='snoo-radial-gragient-4'
            cx={-6.01}
            cy={64.68}
            r={12.85}
            fx={-6.01}
            fy={64.68}
            gradientTransform='matrix(1.07 0 0 1.55 81.08 27.26)'
            gradientUnits='userSpaceOnUse'
          >
            <stop offset={0} stopColor='#f60' />
            <stop offset={0.5} stopColor='#ff4500' />
            <stop offset={0.7} stopColor='#fc4301' />
            <stop offset={0.82} stopColor='#f43f07' />
            <stop offset={0.92} stopColor='#e53812' />
            <stop offset={1} stopColor='#d4301f' />
          </radialGradient>
          <radialGradient
            xlinkHref='#snoo-radial-gragient-4'
            id='snoo-radial-gragient-5'
            cx={-73.55}
            cy={64.68}
            r={12.85}
            fx={-73.55}
            fy={64.68}
            gradientTransform='matrix(-1.07 0 0 1.55 62.87 27.26)'
          />
          <radialGradient
            id='snoo-radial-gragient-6'
            cx={107.93}
            cy={166.96}
            r={45.3}
            fx={107.93}
            fy={166.96}
            gradientTransform='matrix(1 0 0 .66 0 57.4)'
            gradientUnits='userSpaceOnUse'
          >
            <stop offset={0} stopColor='#172e35' />
            <stop offset={0.29} stopColor='#0e1c21' />
            <stop offset={0.73} stopColor='#030708' />
            <stop offset={1} />
          </radialGradient>
          <radialGradient
            xlinkHref='#snoo-radial-gragient'
            id='snoo-radial-gragient-7'
            cx={147.88}
            cy={32.94}
            r={39.77}
            fx={147.88}
            fy={32.94}
            gradientTransform='matrix(1 0 0 .98 0 .54)'
          />
          <radialGradient
            id='snoo-radial-gragient-8'
            cx={131.31}
            cy={73.08}
            r={32.6}
            fx={131.31}
            fy={73.08}
            gradientUnits='userSpaceOnUse'
          >
            <stop offset={0.48} stopColor='#7a9299' />
            <stop offset={0.67} stopColor='#172e35' />
            <stop offset={0.75} />
            <stop offset={0.82} stopColor='#172e35' />
          </radialGradient>
          <style>
            {
              '.snoo-cls-11,.snoo-cls-9{stroke-width:0}.snoo-cls-9{fill:#842123}.snoo-cls-11{fill:#ffc49c}'
            }
          </style>
        </defs>
        <path
          d='M108 0C48.35 0 0 48.35 0 108c0 29.82 12.09 56.82 31.63 76.37l-20.57 20.57C6.98 209.02 9.87 216 15.64 216H108c59.65 0 108-48.35 108-108S167.65 0 108 0Z'
          style={{
            fill: '#ff4500',
            strokeWidth: 0,
          }}
        />
        <circle
          cx={169.22}
          cy={106.98}
          r={25.22}
          style={{
            strokeWidth: 0,
            fill: 'url(#snoo-radial-gragient)',
          }}
        />
        <circle
          cx={46.78}
          cy={106.98}
          r={25.22}
          style={{
            fill: 'url(#snoo-radial-gragient-2)',
            strokeWidth: 0,
          }}
        />
        <ellipse
          cx={108.06}
          cy={128.64}
          rx={72}
          ry={54}
          style={{
            fill: 'url(#snoo-radial-gragient-3)',
            strokeWidth: 0,
          }}
        />
        <path
          d='M86.78 123.48c-.42 9.08-6.49 12.38-13.56 12.38s-12.46-4.93-12.04-14.01c.42-9.08 6.49-15.02 13.56-15.02s12.46 7.58 12.04 16.66Z'
          style={{
            fill: 'url(#snoo-radial-gragient-4)',
            strokeWidth: 0,
          }}
        />
        <path
          d='M129.35 123.48c.42 9.08 6.49 12.38 13.56 12.38s12.46-4.93 12.04-14.01c-.42-9.08-6.49-15.02-13.56-15.02s-12.46 7.58-12.04 16.66Z'
          style={{
            fill: 'url(#snoo-radial-gragient-5)',
            strokeWidth: 0,
          }}
        />
        <ellipse
          cx={79.63}
          cy={116.37}
          className='snoo-cls-11'
          rx={2.8}
          ry={3.05}
        />
        <ellipse
          cx={146.21}
          cy={116.37}
          className='snoo-cls-11'
          rx={2.8}
          ry={3.05}
        />
        <path
          d='M108.06 142.92c-8.76 0-17.16.43-24.92 1.22-1.33.13-2.17 1.51-1.65 2.74 4.35 10.39 14.61 17.69 26.57 17.69s22.23-7.3 26.57-17.69c.52-1.23-.33-2.61-1.65-2.74-7.77-.79-16.16-1.22-24.92-1.22Z'
          style={{
            fill: 'url(#snoo-radial-gragient-6)',
            strokeWidth: 0,
          }}
        />
        <circle
          cx={147.49}
          cy={49.43}
          r={17.87}
          style={{
            fill: 'url(#snoo-radial-gragient-7)',
            strokeWidth: 0,
          }}
        />
        <path
          d='M107.8 76.92c-2.14 0-3.87-.89-3.87-2.27 0-16.01 13.03-29.04 29.04-29.04 2.14 0 3.87 1.73 3.87 3.87s-1.73 3.87-3.87 3.87c-11.74 0-21.29 9.55-21.29 21.29 0 1.38-1.73 2.27-3.87 2.27Z'
          style={{
            fill: 'url(#snoo-radial-gragient-8)',
            strokeWidth: 0,
          }}
        />
        <path
          d='M62.82 122.65c.39-8.56 6.08-14.16 12.69-14.16 6.26 0 11.1 6.39 11.28 14.33.17-8.88-5.13-15.99-12.05-15.99s-13.14 6.05-13.56 15.2c-.42 9.15 4.97 13.83 12.04 13.83h.52c-6.44-.16-11.3-4.79-10.91-13.2ZM153.3 122.65c-.39-8.56-6.08-14.16-12.69-14.16-6.26 0-11.1 6.39-11.28 14.33-.17-8.88 5.13-15.99 12.05-15.99 7.07 0 13.14 6.05 13.56 15.2.42 9.15-4.97 13.83-12.04 13.83h-.52c6.44-.16 11.3-4.79 10.91-13.2Z'
          className='snoo-cls-9'
        />
      </svg>
    </>
  );
};

export const LogoText = (props?: LogoProps) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={props?.className + ' h-[22px] text-orange'}
        viewBox='0 0 514 149'
        {...props}
      >
        <g
          style={{
            fill: 'currentColor',
          }}
        >
          <path d='M71.62 45.92 59.61 74.48c-1.51-.76-5.11-1.61-8.51-1.61s-6.81.85-10.12 2.46c-6.53 3.31-11.35 9.93-11.35 19.48v52.3H-.26V45.35h29.04v14.28h.57c6.81-9.08 17.21-15.79 30.74-15.79 4.92 0 9.65.95 11.54 2.08ZM65.84 96.52c0-29.41 20.15-52.68 50.32-52.68 27.33 0 46.91 19.96 46.91 48.05 0 4.92-.47 9.55-1.51 14H93.08c3.12 10.69 12.39 19.01 26.29 19.01 7.66 0 18.54-2.74 24.4-7.28l9.27 22.32c-8.61 5.86-21.75 8.7-33.29 8.7-32.25 0-53.91-20.81-53.91-52.11Zm26.67-9.36h43.03c0-13.05-8.89-19.96-19.77-19.96-12.3 0-20.62 7.94-23.27 19.96ZM419.53-.37c10.03 0 18.25 8.23 18.25 18.25s-8.23 18.25-18.25 18.25-18.25-8.23-18.25-18.25S409.51-.37 419.53-.37Zm14.94 147.49h-29.89V45.35h29.89v101.77ZM246 1.47 245.91 55h-.57c-8.23-7.85-17.12-11.07-28.75-11.07-28.66 0-47.67 23.08-47.67 52.3s17.78 52.4 46.72 52.4c12.11 0 23.55-4.16 30.93-13.62h.85v12.11h28.47V1.47H246Zm1.42 121.39h-.99l-6.67-6.93c-4.34 4.33-10.28 6.93-17.22 6.93-14.64 0-24.88-11.58-24.88-26.6s10.24-26.6 24.88-26.6 24.88 11.58 24.88 26.6v26.6ZM360.15 1.47 360.06 55h-.57c-8.23-7.85-17.12-11.07-28.75-11.07-28.66 0-47.67 23.08-47.67 52.3s17.78 52.4 46.72 52.4c12.11 0 23.55-4.16 30.93-13.62h.85v12.11h28.47V1.47h-29.89Zm1.28 121.39h-.99l-6.67-6.93c-4.34 4.33-10.28 6.93-17.22 6.93-14.64 0-24.88-11.58-24.88-26.6s10.24-26.6 24.88-26.6 24.88 11.58 24.88 26.6v26.6ZM492.44 45.35h21.85v25.44h-21.85v76.33h-29.89V70.79H440.8V45.35h21.75V17.69h29.89v27.66Z' />
        </g>
      </svg>
    </>
  );
};

export default Logo;
