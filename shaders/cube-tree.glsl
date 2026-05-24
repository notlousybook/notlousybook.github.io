const float PI=3.14159265;
mat3 rotAxis(vec3 v,float a){float c=cos(radians(a)),s=sin(radians(a));return mat3(c+(1.-c)*v.x*v.x,(1.-c)*v.x*v.y-s*v.z,(1.-c)*v.x*v.z+s*v.y,(1.-c)*v.x*v.y+s*v.z,c+(1.-c)*v.y*v.y,(1.-c)*v.y*v.z-s*v.x,(1.-c)*v.x*v.z-s*v.y,(1.-c)*v.y*v.z+s*v.x,c+(1.-c)*v.z*v.z);}
mat3 lookat(vec3 fw,vec3 up){fw=normalize(fw);vec3 rt=normalize(cross(fw,normalize(up)));return mat3(rt,cross(rt,fw),fw);}
float box(vec3 p,vec3 d){return max(max(abs(p.x)-d.x,abs(p.y)-d.y),abs(p.z)-d.z);}
float sphere(vec3 p,float s){return length(p)-s;}
float ill=0.;
float ipt(){return iTime+sin(iTime+PI);}
float map(vec3 p){float d=p.y;vec3 pp=p;ill=0.;p=abs(p);p=rotAxis(vec3(-1.,0.,0.),40.)*p;p=abs(p);p=rotAxis(vec3(0.,1.,0.),45.)*p;p=abs(p);for(int i=0;i<15;i++){p-=vec3(.25);p=rotAxis(normalize(vec3(.5,.25,1.)),20.+pp.x+pp.y+pp.z)*p;float size=cos(float(i)/20.*PI*2.-ipt());float dbox=box(p,vec3((1.1-float(i)/20.)*.25+pow(size*.4+.4,10.)));if(dbox<d){d=dbox;ill=pow(size*.5+.5,10.);}}p-=vec3(.25);p=rotAxis(normalize(vec3(.5,.25,1.)),20.+pp.x+pp.y+pp.z)*p;d=min(d,sphere(p,.25));return d;}
vec3 ldir=normalize(vec3(.267,.358,.90));
vec3 sky(vec3 dir){vec3 col=mix(vec3(40.,34.,30.),vec3(18.,28.,44.),min(abs(dir.y)*2.+.5,1.))/255.*.5;col*=(1.+vec3(1.,.7,.3)/sqrt(length(dir-ldir))*4.);return col;}
float ao(vec3 p,vec3 n,float d){float dlt=0.,oc=0.;for(int i=1;i<=6;i++){dlt=d*float(i)/6.;oc+=(dlt-map(p+n*dlt))/exp(dlt);}oc/=6.;return clamp(pow(1.-oc,d),0.,1.);}
vec3 normal(vec3 p){vec3 e=vec3(.01,0.,0.);return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));}
vec4 raymarche(vec3 org,vec3 dir,vec2 nf){float d=1.,g=0.,t=0.;vec3 p=org+dir*nf.x;for(int i=0;i<42;i++){if(d>.001&&t<nf.y){d=map(p);t+=d;p+=d*dir;g+=1./42.;}}return vec4(p,g);}
vec3 shade(vec4 p,vec3 n,vec3 org,vec3 dir){vec3 col=vec3(.1);col+=pow(sky(vec3(1.,0.,0.))*max(dot(n,ldir),0.)*2.,vec3(2.));col+=mix(vec3(1.,.3,.1),vec3(.1,.7,.1),length(p.xyz)/8.)*ill*p.w*5.;col*=pow(ao(p.xyz,n,1.),1.5);col=mix(col,sky(dir),vec3(1.)*min(pow(distance(p.xyz,org)/20.,2.),1.));return col;}
vec2 hash2(float n){return fract(sin(vec2(n,n+1.))*vec2(43758.5453123,22578.1459123));}
void mainImage(out vec4 fragColor,vec2 fragCoord){vec2 o=hash2(float(iFrame))-.5;vec2 v=(-iResolution.xy+2.*(fragCoord+o))/iResolution.y;vec2 q=fragCoord.xy/iResolution.xy;float ct=(iTime+140.)*.025;vec3 org=vec3(cos(ct)*10.,2.+cos(ct),sin(ct)*10.);vec3 dir=normalize(vec3(v.x,v.y,1.5));dir=lookat(-org+vec3(0.,2.,0.),vec3(0.,1.,0.))*dir;vec4 p=raymarche(org,dir,vec2(4.,20.));vec3 n=normal(p.xyz);vec3 col=shade(p,n,org,dir);fragColor=mix(vec4(col,1.),texture(iChannel0,q),.8);}
