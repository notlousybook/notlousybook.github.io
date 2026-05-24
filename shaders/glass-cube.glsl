mat3 rotx(float a){float s=sin(a);float c=cos(a);return mat3(1,0,0,0,c,s,0,-s,c);}
mat3 roty(float a){float s=sin(a);float c=cos(a);return mat3(c,0,s,0,1,0,-s,0,c);}
mat3 rotz(float a){float s=sin(a);float c=cos(a);return mat3(c,s,0,-s,c,0,0,0,1);}
vec3 getColor(vec3 p){p=abs(p);p*=1.25;p=0.5*p/dot(p,p);float t=0.13*length(p);
vec3 c=vec3(.3,.4,.5);c+=.12*cos(6.283*t*1.+vec3(0,.8,1.1));c+=.11*cos(6.283*t*3.1+vec3(.3,.4,.1));
c+=.10*cos(6.283*t*5.1+vec3(.1,.7,1.1));c+=.10*cos(6.283*t*17.1+vec3(.2,.6,.7));
c+=.10*cos(6.283*t*31.1+vec3(.1,.6,.7));c+=.10*cos(6.283*t*65.1+vec3(0,.5,.8));
c+=.10*cos(6.283*t*115.1+vec3(.1,.4,.7));c+=.10*cos(6.283*t*265.1+vec3(1.1,1.4,2.7));
return clamp(c,0.,1.);}
void mainImage(out vec4 o,vec2 F){vec2 u=(F-.5*iResolution.xy)/iResolution.x;
vec3 w=normalize(vec3(0,0,-4));vec3 up=vec3(0,1,0);float t=iTime*0.2;
vec3 ro=4.*vec3(cos(t)*cos(.5),sin(t)*cos(.5),sin(.5));
w=normalize(-ro);vec3 uu=normalize(cross(w,up));vec3 vv=cross(uu,w);
vec3 rd=normalize(w*.7+u.x*uu+u.y*vv);float d=length(ro);if(d<.1){o=vec4(0);return;}
vec3 ni;rd+=.0001*(1.-abs(sign(rd)));vec3 dr=1./rd;vec3 n=ro*dr;vec3 k=vec3(.75,.75,1.25)*abs(dr);
vec3 pin=-k-n;vec3 pout=k-n;float tin=max(pin.x,max(pin.y,pin.z));
float tout=min(pout.x,min(pout.y,pout.z));if(tin>tout){o=vec4(0);return;}
ni=-sign(rd)*step(pin.zxy,pin.xyz)*step(pin.yzx,pin.xyz);
vec3 pos=ro+tin*rd;vec3 nr=n.zyx*ni.x+n.yzx*ni.y+n.xyz*ni.z;
vec3 rdr=reflect(rd,nr);float R0=.014;float fr=R0+(1.-R0)*pow(1.-dot(-rd,nr),5.);
vec3 col=mix(getColor(pos),vec3(.01,.02,.03),pow(fr,1.5));
o=vec4(clamp(col,0.,1.),.35);}
