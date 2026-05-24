#define LOOP_DURATION 5.
#define MOVE_COUNT 6.
#define TIME_OFFSET .3
#define PI 3.1415926
#define QUATERNION_IDENTITY vec4(0,0,0,1)

vec4 moves[6]=vec4[6](vec4(1,0,0,2.),vec4(0,1,0,-1.),vec4(0,-1,0,-3.),vec4(0,0,-1,2.),vec4(0,-1,0,-1.),vec4(0,1,0,-3.));

vec4 qmul(vec4 q1,vec4 q2){return vec4(q2.xyz*q1.w+q1.xyz*q2.w+cross(q1.xyz,q2.xyz),q1.w*q2.w-dot(q1.xyz,q2.xyz));}
vec3 rotate_vector(vec3 v,vec4 r){vec4 r_c=r*vec4(-1,-1,-1,1);return qmul(r,qmul(vec4(v,0),r_c)).xyz;}
vec4 rotate_angle_axis(float angle,vec3 axis){float sn=sin(angle*.5),cs=cos(angle*.5);return vec4(axis*sn,cs);}
vec4 q_conj(vec4 q){return vec4(-q.x,-q.y,-q.z,q.w);}
vec4 q_slerp(vec4 a,vec4 b,float t){if(length(a)==0.){if(length(b)==0.)return QUATERNION_IDENTITY;return b;}else if(length(b)==0.)return a;float cosHA=a.w*b.w+dot(a.xyz,b.xyz);if(cosHA>=1.||cosHA<=-1.)return a;else if(cosHA<0.){b.xyz=-b.xyz;b.w=-b.w;cosHA=-cosHA;}float blendA,blendB;if(cosHA<.99){float halfA=acos(cosHA);float sinHA=sin(halfA);float oos=1./sinHA;blendA=sin(halfA*(1.-t))*oos;blendB=sin(halfA*t)*oos;}else{blendA=1.-t;blendB=t;}vec4 result=vec4(blendA*a.xyz+blendB*b.xyz,blendA*a.w+blendB*b.w);if(length(result)>0.)return normalize(result);return QUATERNION_IDENTITY;}

void pR(inout vec2 p,float a){p=cos(a)*p+sin(a)*vec2(p.y,-p.x);}
float vmin(vec3 v){return min(min(v.x,v.y),v.z);}
float vmax(vec3 v){return max(max(v.x,v.y),v.z);}
float fBox(vec3 p,vec3 b){vec3 d=abs(p)-b;return length(max(d,vec3(0)))+vmax(min(d,vec3(0)));}
float smin(float a,float b,float k){float f=clamp(.5+.5*((a-b)/k),0.,1.);return(1.-f)*a+f*b-f*(1.-f)*k;}
float smax(float a,float b,float k){return -smin(-a,-b,k);}
float range(float vmin,float vmax,float value){return clamp((value-vmin)/(vmax-vmin),0.,1.);}
float almostIdentity(float x){return x*x*(2.-x);}
float circularOut(float t){return sqrt((2.-t)*t);}
vec3 pal(float t,vec3 a,vec3 b,vec3 c,vec3 d){return a+b*cos(6.28318*(c*t+d));}
vec3 spectrum(float n){return pal(n,vec3(.5),vec3(.5),vec3(1.),vec3(0.,.33,.67));}
vec3 erot(vec3 p,vec3 ax,float ro){return mix(dot(ax,p)*ax,p,cos(ro))+sin(ro)*cross(ax,p);}

bool lightingPass;
float time;

void applyMomentum(inout vec4 q,float tm,int i,vec4 mv){float turns=mv.w;vec3 axis=mv.xyz;float duration=abs(turns);float rotation=PI/2.*turns*.75;float start=float(i+1);float t=tm*MOVE_COUNT;float r=range(start,start+duration,t);float angle=circularOut(r)*rotation;vec4 q2=rotate_angle_axis(angle,axis);q=qmul(q,q2);}
void applyMove(inout vec3 p,int i,vec4 mv){float turns=mv.w;vec3 axis=mv.xyz;float rotation=PI/2.*turns;float start=float(i);float t=time*MOVE_COUNT;float r=range(start,start+1.,t);r=pow(almostIdentity(r),2.5);float angle=r*rotation;bool animSide=vmax(p*-axis)>0.;if(animSide)angle=0.;p=erot(p,axis,angle);}
vec4 momentum(float tm){vec4 q=QUATERNION_IDENTITY;applyMomentum(q,tm,5,moves[5]);applyMomentum(q,tm,4,moves[4]);applyMomentum(q,tm,3,moves[3]);applyMomentum(q,tm,2,moves[2]);applyMomentum(q,tm,1,moves[1]);applyMomentum(q,tm,0,moves[0]);return q;}
vec4 momentumLoop(float tm){vec4 q;q=momentum(3.);q=q_conj(q);q=q_slerp(QUATERNION_IDENTITY,q,tm);q=qmul(momentum(tm+1.),q);q=qmul(momentum(tm),q);return q;}

vec4 mapBox(vec3 p){pR(p.xy,step(0.,-p.z)*PI/-2.);pR(p.xz,step(0.,p.y)*PI);pR(p.yz,step(0.,-p.x)*PI*1.5);vec3 face=step(vec3(vmax(abs(p))),abs(p))*sign(p);float faceIndex=max(vmax(face*vec3(0,1,2)),vmax(face*-vec3(3,4,5)));vec3 col=spectrum(faceIndex/6.+.1+.5);float thick=.033;float d=length(p+vec3(.1,.02,.05))-.4;d=max(d,-d-thick);vec3 ap=abs(p);float l=sqrt(sqrt(1.)/3.);vec3 plane=cross(abs(face),normalize(vec3(1)));float groove=max(-dot(ap.yzx,plane),dot(ap.zxy,plane));d=smax(d,-abs(groove),.01);float gap=.005;float r=.05;float cut=-fBox(abs(p)-(1.+r+gap),vec3(1.))+r;d=smax(d,-cut,thick/2.);float opp=vmin(abs(p))+gap;opp=max(opp,length(p)-1.);if(opp<d)return vec4(opp,vec3(-1));return vec4(d,col*.4);}

vec4 map(vec3 p){if(iMouse.x>0.){pR(p.yz,((iMouse.y/-iResolution.y)*2.+1.)*2.);pR(p.xz,((iMouse.x/-iResolution.x)*2.+1.)*4.);}pR(p.xz,time*PI*2.);vec4 q=momentumLoop(time);p=rotate_vector(p,q);applyMove(p,5,moves[5]);applyMove(p,4,moves[4]);applyMove(p,3,moves[3]);applyMove(p,2,moves[2]);applyMove(p,1,moves[1]);applyMove(p,0,moves[0]);return mapBox(p);}

mat3 calcLookAtMatrix(vec3 ro,vec3 ta,float roll){vec3 ww=normalize(ta-ro);vec3 uu=normalize(cross(ww,vec3(sin(roll),cos(roll),0.)));vec3 vv=normalize(cross(uu,ww));return mat3(uu,vv,ww);}
vec3 calcNormal(vec3 p){const float h=.001;#define ZERO (min(iFrame,0))vec3 n=vec3(0.);for(int i=ZERO;i<4;i++){vec3 e=.5773*(2.*vec3((((i+3)>>1)&1),((i>>1)&1),(i&1))-1.);n+=e*map(p+e*h).x;}return normalize(n);}
vec2 iSphere(vec3 ro,vec3 rd,float r){vec3 oc=ro;float b=dot(oc,rd);float c=dot(oc,oc)-r*r;float h=b*b-c;if(h<0.)return vec2(-1.);h=sqrt(h);return vec2(-b-h,-b+h);}
float softshadow(vec3 ro,vec3 rd,float mint,float tmax){float res=1.;vec2 bound=iSphere(ro,rd,.55);tmax=min(tmax,bound.y);float t=mint;float ph=1e10;for(int i=0;i<100;i++){vec4 hit=map(ro+rd*t);float h=hit.x;if(hit.y>0.){res=min(res,10.*h/t);}t+=h;if(res<.0001||t>tmax)break;}return clamp(res,0.,1.);}
vec3 render(vec2 p){vec3 col=vec3(.02,.01,.025);vec3 camPos=vec3(0,0,2.);mat3 camMat=calcLookAtMatrix(camPos,vec3(0,0,-1),0.);vec3 rd=normalize(camMat*vec3(p.xy,2.8));vec3 pos=camPos;vec2 bound=iSphere(pos,rd,.55);if(bound.x<0.)return col;lightingPass=false;float rayLength=bound.x;float dist=0.;bool background=true;vec4 res;for(int i=0;i<120;i++){rayLength+=dist;pos=camPos+rd*rayLength;res=map(pos);dist=res.x;if(abs(dist)<.001){background=false;break;}if(rayLength>bound.y)break;}lightingPass=true;if(!background){col=res.yzw;vec3 nor=calcNormal(pos);vec3 lig=normalize(vec3(-.33,.3,.25));vec3 lba=normalize(vec3(.5,-1.,-.5));vec3 hal=normalize(lig-rd);float amb=sqrt(clamp(.5+.5*nor.y,0.,1.));float dif=clamp(dot(nor,lig),0.,1.);float bac=clamp(dot(nor,lba),0.,1.)*clamp(1.-pos.y,0.,1.);float fre=pow(clamp(1.+dot(nor,rd),0.,1.),2.);if(dif>.001)dif*=softshadow(pos,lig,.001,.9);float occ=1.;float spe=pow(clamp(dot(nor,hal),0.,1.),16.)*dif*(.04+.96*pow(clamp(1.+dot(hal,rd),0.,1.),5.));vec3 lin=vec3(0.);lin+=2.80*dif*vec3(1.30,1.,.70);lin+=.55*amb*vec3(.40,.60,1.15)*occ;lin+=1.55*bac*vec3(.25,.25,.25)*occ*vec3(2,0,1);lin+=.25*fre*vec3(1.,1.,1.)*occ;col=col*lin;col+=5.*spe*vec3(1.10,.90,.70);}return col;}
void mainImage(out vec4 fragColor,vec2 fragCoord){float mTime=(iTime+TIME_OFFSET)/LOOP_DURATION;time=mTime;vec2 o=vec2(0);vec3 col=vec3(0);time=mod(time,1.);vec2 p=(-iResolution.xy+2.*(fragCoord+o))/iResolution.y;col+=render(p);col=pow(col,vec3(.4545));fragColor=vec4(col,.35);}
