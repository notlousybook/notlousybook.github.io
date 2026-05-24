void mainImage(out vec4 o,vec2 F){vec2 uv=(F-.5*iResolution.xy)/iResolution.y;
float t=iTime*.15;vec2 p=uv*6.;p.x+=sin(p.y*1.2+t)*.5;p.y+=cos(p.x*1.3+t*.7)*.5;
float d=length(p)+.5;float g=1./(d*d*8.+.5);g+=sin(p.x*10.-t*2.)*.15;
g+=cos(p.y*10.+t*1.7)*.15;g=clamp(g,0.,1.);
o=vec4(g*.12+.01,g*.22+.05,g*.18+.06,g*.45);}
