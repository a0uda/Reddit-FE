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

      {/* <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        xmlSpace='preserve'
        id='Layer_1'
        x={0}
        y={0}
        // style={{
        //   enableBackground: 'new 0 0 856 588.55',
        // }}
        // viewBox={`0 0 ${props?.width || '100%'} ${props?.height || 'auto'}`}
        {...props}
        className={'flex items-center justify-center ' + props?.className}
        height={props?.height || 'auto'}
        width={props?.width || '100%'}
      >
        <style>
          {
            '.st3{fill:#842123}.st6{fill:#ffc49c}.st12{fill:#ff6101}.st13{fill:#ff4500}'
          }
        </style>
        <symbol id='Snoo' viewBox='-216.1 -188.86 432.21 377.72'>
          <radialGradient
            id='SVGID_1_'
            cx={154.385}
            cy={1202.981}
            r={127.45}
            fx={154.385}
            fy={1212.101}
            gradientTransform='matrix(1 0 0 .87 0 -1084.44)'
            gradientUnits='userSpaceOnUse'
          >
            <stop
              offset={0}
              style={{
                stopColor: '#feffff',
              }}
            />
            <stop
              offset={0.4}
              style={{
                stopColor: '#feffff',
              }}
            />
            <stop
              offset={0.51}
              style={{
                stopColor: '#f9fcfc',
              }}
            />
            <stop
              offset={0.62}
              style={{
                stopColor: '#edf3f5',
              }}
            />
            <stop
              offset={0.7}
              style={{
                stopColor: '#dee9ec',
              }}
            />
            <stop
              offset={0.72}
              style={{
                stopColor: '#d8e4e8',
              }}
            />
            <stop
              offset={0.76}
              style={{
                stopColor: '#ccd8df',
              }}
            />
            <stop
              offset={0.8}
              style={{
                stopColor: '#c8d5dd',
              }}
            />
            <stop
              offset={0.83}
              style={{
                stopColor: '#ccd6de',
              }}
            />
            <stop
              offset={0.85}
              style={{
                stopColor: '#d8dbe2',
              }}
            />
            <stop
              offset={0.88}
              style={{
                stopColor: '#ede3e9',
              }}
            />
            <stop
              offset={0.9}
              style={{
                stopColor: '#ffebef',
              }}
            />
          </radialGradient>
          <circle
            cx={153.06}
            cy={-0.31}
            r={63.05}
            style={{
              fill: 'url(#SVGID_1_)',
            }}
          />
          <radialGradient
            id='SVGID_00000105386287501514902370000016239983044772598164_'
            cx={-151.725}
            cy={-37.27}
            r={127.45}
            fx={-151.725}
            fy={-28.15}
            gradientUnits='userSpaceOnUse'
          >
            <stop
              offset={0}
              style={{
                stopColor: '#feffff',
              }}
            />
            <stop
              offset={0.4}
              style={{
                stopColor: '#feffff',
              }}
            />
            <stop
              offset={0.51}
              style={{
                stopColor: '#f9fcfc',
              }}
            />
            <stop
              offset={0.62}
              style={{
                stopColor: '#edf3f5',
              }}
            />
            <stop
              offset={0.7}
              style={{
                stopColor: '#dee9ec',
              }}
            />
            <stop
              offset={0.72}
              style={{
                stopColor: '#d8e4e8',
              }}
            />
            <stop
              offset={0.76}
              style={{
                stopColor: '#ccd8df',
              }}
            />
            <stop
              offset={0.8}
              style={{
                stopColor: '#c8d5dd',
              }}
            />
            <stop
              offset={0.83}
              style={{
                stopColor: '#ccd6de',
              }}
            />
            <stop
              offset={0.85}
              style={{
                stopColor: '#d8dbe2',
              }}
            />
            <stop
              offset={0.88}
              style={{
                stopColor: '#ede3e9',
              }}
            />
            <stop
              offset={0.9}
              style={{
                stopColor: '#ffebef',
              }}
            />
          </radialGradient>
          <circle
            cx={-153.05}
            cy={-0.31}
            r={63.05}
            style={{
              fill: 'url(#SVGID_00000105386287501514902370000016239983044772598164_)',
            }}
          />
          <radialGradient
            id='SVGID_00000168815798996223081950000013840792387800997782_'
            cx={4.035}
            cy={3503.423}
            r={384.44}
            gradientTransform='matrix(1 0 0 .7 0 -2506.35)'
            gradientUnits='userSpaceOnUse'
          >
            <stop
              offset={0}
              style={{
                stopColor: '#feffff',
              }}
            />
            <stop
              offset={0.4}
              style={{
                stopColor: '#feffff',
              }}
            />
            <stop
              offset={0.51}
              style={{
                stopColor: '#f9fcfc',
              }}
            />
            <stop
              offset={0.62}
              style={{
                stopColor: '#edf3f5',
              }}
            />
            <stop
              offset={0.7}
              style={{
                stopColor: '#dee9ec',
              }}
            />
            <stop
              offset={0.72}
              style={{
                stopColor: '#d8e4e8',
              }}
            />
            <stop
              offset={0.76}
              style={{
                stopColor: '#ccd8df',
              }}
            />
            <stop
              offset={0.8}
              style={{
                stopColor: '#c8d5dd',
              }}
            />
            <stop
              offset={0.83}
              style={{
                stopColor: '#ccd6de',
              }}
            />
            <stop
              offset={0.85}
              style={{
                stopColor: '#d8dbe2',
              }}
            />
            <stop
              offset={0.88}
              style={{
                stopColor: '#ede3e9',
              }}
            />
            <stop
              offset={0.9}
              style={{
                stopColor: '#ffebef',
              }}
            />
          </radialGradient>
          <ellipse
            cx={0.16}
            cy={53.86}
            rx={180}
            ry={135}
            style={{
              fill: 'url(#SVGID_00000168815798996223081950000013840792387800997782_)',
            }}
          />
          <path
            d='M-53.07 40.73C-54.12 63.6-69.29 71.9-86.98 71.9s-31.15-11.71-30.09-34.58c1.05-22.87 16.23-38.01 33.91-38.01s31.15 18.54 30.09 41.42zM117.38 37.32c1.05 22.87-12.42 34.58-30.09 34.58s-32.85-8.3-33.91-31.17C52.33 17.86 65.8-.69 83.47-.69s32.85 15.13 33.91 38.01z'
            className='st3'
          />
          <radialGradient
            id='SVGID_00000069361447949215980580000015894570221781854397_'
            cx={-81.405}
            cy={-2563.493}
            r={32.12}
            gradientTransform='matrix(1 0 0 1.46 0 3794.9)'
            gradientUnits='userSpaceOnUse'
          >
            <stop
              offset={0}
              style={{
                stopColor: '#f60',
              }}
            />
            <stop
              offset={0.5}
              style={{
                stopColor: '#ff4500',
              }}
            />
            <stop
              offset={0.7}
              style={{
                stopColor: '#fc4301',
              }}
            />
            <stop
              offset={0.82}
              style={{
                stopColor: '#f43f07',
              }}
            />
            <stop
              offset={0.92}
              style={{
                stopColor: '#e53812',
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: '#d4301f',
              }}
            />
          </radialGradient>
          <path
            d='M-53.05 42.73c-.99 21.41-15.19 29.17-31.73 29.17s-29.15-11.63-28.16-33.03c.99-21.41 15.19-35.41 31.73-35.41s29.14 17.86 28.16 39.27z'
            style={{
              fill: 'url(#SVGID_00000069361447949215980580000015894570221781854397_)',
            }}
          />
          <radialGradient
            id='SVGID_00000098943211279690425320000005794874445908243891_'
            cx={21949.606}
            cy={-2563.493}
            r={32.12}
            gradientTransform='matrix(-1 0 0 1.46 22031.32 3794.9)'
            gradientUnits='userSpaceOnUse'
          >
            <stop
              offset={0}
              style={{
                stopColor: '#f60',
              }}
            />
            <stop
              offset={0.5}
              style={{
                stopColor: '#ff4500',
              }}
            />
            <stop
              offset={0.7}
              style={{
                stopColor: '#fc4301',
              }}
            />
            <stop
              offset={0.82}
              style={{
                stopColor: '#f43f07',
              }}
            />
            <stop
              offset={0.92}
              style={{
                stopColor: '#e53812',
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: '#d4301f',
              }}
            />
          </radialGradient>
          <path
            d='M53.37 42.73C54.35 64.14 68.56 71.9 85.1 71.9s29.15-11.63 28.16-33.03c-.99-21.41-15.19-35.41-31.73-35.41S52.38 21.32 53.37 42.73z'
            style={{
              fill: 'url(#SVGID_00000098943211279690425320000005794874445908243891_)',
            }}
          />
          <ellipse cx={-70.91} cy={23.18} className='st6' rx={7} ry={7.64} />
          <ellipse cx={95.54} cy={23.18} className='st6' rx={7} ry={7.64} />
          <path
            d='M.15 87.16c-22.32 0-43.71 1.08-63.49 3.04-3.38.34-5.52 3.78-4.21 6.86 11.08 25.97 37.22 44.21 67.7 44.21s56.62-18.24 67.7-44.21c1.31-3.08-.83-6.52-4.21-6.86-19.78-1.97-41.17-3.04-63.49-3.04z'
            style={{
              fill: '#bbcfda',
            }}
          />
          <path
            d='M.15 92.12c-22.25 0-43.57 1.09-63.29 3.09-3.37.34-5.51 3.84-4.2 6.97 11.05 26.38 37.1 44.91 67.49 44.91s56.44-18.53 67.49-44.91c1.31-3.12-.83-6.62-4.2-6.97-19.72-2-41.04-3.09-63.29-3.09z'
            style={{
              fill: '#fff',
            }}
          />
          <radialGradient
            id='SVGID_00000121988990304105269500000002037091179998983575_'
            cx={-0.175}
            cy={4425.489}
            r={113.26}
            gradientTransform='matrix(1 0 0 .66 0 -2769.87)'
            gradientUnits='userSpaceOnUse'
          >
            <stop
              offset={0}
              style={{
                stopColor: '#172e35',
              }}
            />
            <stop
              offset={0.29}
              style={{
                stopColor: '#0e1c21',
              }}
            />
            <stop
              offset={0.73}
              style={{
                stopColor: '#030708',
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: '#000',
              }}
            />
          </radialGradient>
          <path
            d='M.15 89.54c-21.9 0-42.89 1.08-62.3 3.04-3.32.34-5.42 3.78-4.13 6.86 10.87 25.97 36.52 44.21 66.44 44.21s55.56-18.24 66.44-44.21c1.29-3.08-.81-6.52-4.13-6.86-19.41-1.97-40.4-3.04-62.32-3.04z'
            style={{
              fill: 'url(#SVGID_00000121988990304105269500000002037091179998983575_)',
            }}
          />
          <radialGradient
            id='SVGID_00000150814841765609134470000006904439060531693720_'
            cx={99.705}
            cy={-16}
            r={99.42}
            gradientTransform='matrix(1 0 0 .98 0 -169.72)'
            gradientUnits='userSpaceOnUse'
          >
            <stop
              offset={0}
              style={{
                stopColor: '#feffff',
              }}
            />
            <stop
              offset={0.4}
              style={{
                stopColor: '#feffff',
              }}
            />
            <stop
              offset={0.51}
              style={{
                stopColor: '#f9fcfc',
              }}
            />
            <stop
              offset={0.62}
              style={{
                stopColor: '#edf3f5',
              }}
            />
            <stop
              offset={0.7}
              style={{
                stopColor: '#dee9ec',
              }}
            />
            <stop
              offset={0.72}
              style={{
                stopColor: '#d8e4e8',
              }}
            />
            <stop
              offset={0.76}
              style={{
                stopColor: '#ccd8df',
              }}
            />
            <stop
              offset={0.8}
              style={{
                stopColor: '#c8d5dd',
              }}
            />
            <stop
              offset={0.83}
              style={{
                stopColor: '#ccd6de',
              }}
            />
            <stop
              offset={0.85}
              style={{
                stopColor: '#d8dbe2',
              }}
            />
            <stop
              offset={0.88}
              style={{
                stopColor: '#ede3e9',
              }}
            />
            <stop
              offset={0.9}
              style={{
                stopColor: '#ffebef',
              }}
            />
          </radialGradient>
          <circle
            cx={98.74}
            cy={-144.18}
            r={44.68}
            style={{
              fill: 'url(#SVGID_00000150814841765609134470000006904439060531693720_)',
            }}
          />
          <radialGradient
            id='SVGID_00000048497775551503425380000011042547851137944497_'
            cx={58.275}
            cy={-85.04}
            r={81.49}
            gradientUnits='userSpaceOnUse'
          >
            <stop
              offset={0.48}
              style={{
                stopColor: '#7a9299',
              }}
            />
            <stop
              offset={0.67}
              style={{
                stopColor: '#172e35',
              }}
            />
            <stop
              offset={0.75}
              style={{
                stopColor: '#000',
              }}
            />
            <stop
              offset={0.82}
              style={{
                stopColor: '#172e35',
              }}
            />
          </radialGradient>
          <path
            d='M-.49-75.45c-5.35 0-9.69-2.24-9.69-5.69 0-40.03 32.56-72.59 72.59-72.59 5.35 0 9.69 4.34 9.69 9.69s-4.34 9.69-9.69 9.69c-29.34 0-53.22 23.87-53.22 53.22 0 3.45-4.34 5.69-9.69 5.69l.01-.01z'
            style={{
              fill: 'url(#SVGID_00000048497775551503425380000011042547851137944497_)',
            }}
          />
          <path
            d='M-64.82 53.32c0 8.28-8.81 12-19.69 12s-19.69-3.72-19.69-12 8.81-15 19.69-15 19.69 6.72 19.69 15zM104.5 53.32c0 8.28-8.81 12-19.69 12s-19.69-3.72-19.69-12 8.81-15 19.69-15 19.69 6.72 19.69 15z'
            className='st12'
          />
        </symbol>
        <path
          d='M149 186.28c-59.65 0-108 48.35-108 108 0 29.82 12.09 56.82 31.63 76.37l-20.57 20.57c-4.08 4.08-1.19 11.06 4.58 11.06H149c59.65 0 108-48.35 108-108s-48.35-108-108-108z'
          className='st13'
        />
        <use
          xlinkHref='#Snoo'
          width={432.21}
          height={377.72}
          x={-216.1}
          y={-188.86}
          style={{
            overflow: 'visible',
          }}
          transform='matrix(.4 0 0 .4 149.002 293.37)'
        />
        <path
          d='m372.62 264.2-12.01 28.56c-1.51-.76-5.11-1.61-8.51-1.61s-6.81.85-10.12 2.46c-6.53 3.31-11.35 9.93-11.35 19.48v52.3h-29.89V263.62h29.04v14.28h.57c6.81-9.08 17.21-15.79 30.74-15.79 4.92 0 9.65.95 11.54 2.08l-.01.01zM366.84 314.8c0-29.41 20.15-52.68 50.32-52.68 27.33 0 46.91 19.96 46.91 48.05 0 4.92-.47 9.55-1.51 14h-68.48c3.12 10.69 12.39 19.01 26.29 19.01 7.66 0 18.54-2.74 24.4-7.28l9.27 22.32c-8.61 5.86-21.75 8.7-33.29 8.7-32.25 0-53.91-20.81-53.91-52.12zm26.67-9.36h43.03c0-13.05-8.89-19.96-19.77-19.96-12.3 0-20.62 7.94-23.26 19.96zM720.53 217.91c10.03 0 18.25 8.23 18.25 18.25s-8.23 18.25-18.25 18.25-18.25-8.23-18.25-18.25 8.23-18.25 18.25-18.25zm14.94 147.49h-29.89V263.63h29.89V365.4zM547 219.75l-.09 53.53h-.57c-8.23-7.85-17.12-11.07-28.75-11.07-28.66 0-47.67 23.08-47.67 52.3s17.78 52.4 46.72 52.4c12.11 0 23.55-4.16 30.93-13.62h.85v12.11h28.47V219.75H547zm1.42 121.39h-.99l-6.67-6.93c-4.34 4.33-10.28 6.93-17.22 6.93-14.64 0-24.88-11.58-24.88-26.6 0-15.02 10.24-26.6 24.88-26.6 14.64 0 24.88 11.58 24.88 26.6v26.6zM661.15 219.75l-.09 53.53h-.57c-8.23-7.85-17.12-11.07-28.75-11.07-28.66 0-47.67 23.08-47.67 52.3s17.78 52.4 46.72 52.4c12.11 0 23.55-4.16 30.93-13.62h.85v12.11h28.47V219.75h-29.89zm1.28 121.39h-.99l-6.67-6.93c-4.34 4.33-10.28 6.93-17.22 6.93-14.64 0-24.88-11.58-24.88-26.6 0-15.02 10.24-26.6 24.88-26.6s24.88 11.58 24.88 26.6v26.6zM793.44 263.63h21.85v25.44h-21.85v76.33h-29.89v-76.33H741.8v-25.44h21.75v-27.66h29.89v27.66z'
          className='st13'
        />
      </svg> */}
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
        className={props?.className + ' h-[22px] text-primary'}
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
