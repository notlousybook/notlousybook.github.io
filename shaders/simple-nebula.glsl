void mainImage(out vec4 o,vec2 F){vec2 uv=F/iResolution.xy;float t=iTime*.08;
float a=uv.x*3.+t,b=uv.y*3.+t*.6,c=(uv.x+uv.y)*2.+t*.4;
float n=sin(a)*cos(b)*sin(c);n+=sin(a*2.3+1.7)*cos(b*1.7+2.3)*sin(c*2.1+3.7)*.5;
n+=sin(a*4.1+4.3)*cos(b*3.7+5.1)*sin(c*3.3+6.7)*.25;n=n*.5+.5;
o=vec4(n*.14+.02,n*.26+.06,n*.20+.05,n*.45);}
