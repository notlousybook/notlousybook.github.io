float lineWidth=7.0;float tunneRotSpeed=0.05;float tunnelSpeed=0.06;float size=100.0;
#define rotate(a) mat2(cos(a),-sin(a),sin(a),cos(a))
vec3 objectStartPos=vec3(0,0,-50.0);float camRange=1000.0;float scale[8];vec3 projPos[8];
vec4 quads[6]=vec4[](vec4(0,1,2,3),vec4(4,5,6,7),vec4(3,7,4,0),vec4(6,5,1,2),vec4(0,1,5,4),vec4(2,3,7,6));
vec3 edges[24];
void oval(vec2 sc,vec2 c,float r,float st,vec4 scolor,vec4 fcolor,inout vec4 p){
float dist=distance(sc,c);if(dist<r){if(dist<r-st)p=fcolor;else p=scolor;}}
bool lineItersection(vec2 v1,vec2 v2,vec2 v3,vec2 v4){
float bx=v2.x-v1.x,by=v2.y-v1.y,dx=v4.x-v3.x,dy=v4.y-v3.y;
float bdd=bx*dy-by*dx;if(bdd==0.)return false;
float cx=v3.x-v1.x,cy=v3.y-v1.y;
float t=(cx*dy-cy*dx)/bdd;if(t<0.||t>1.)return false;
float u=(cx*by-cy*bx)/bdd;return u>=0.&&u<=1.;}
void Line(vec2 sc,vec2 p1,vec2 p2,float th,vec4 col,inout vec4 p){
float a=distance(p1,sc),b=distance(p2,sc),c=distance(p1,p2);
if(a>=c||b>=c)return;float pv=(a+b+c)*.5;float dist=2./c*sqrt(pv*(pv-a)*(pv-b)*(pv-c));
if(dist<th)p=mix(p,col,1./max(1.,dist*3.));}
bool insideQuad(vec2 v1,vec2 v2,vec2 v3,vec2 v4,vec2 pt){
vec2 pt2=vec2(pt.x-10000.,pt.y);int cc=0;
if(lineItersection(pt,pt2,v1,v2))cc++;if(lineItersection(pt,pt2,v2,v3))cc++;
if(lineItersection(pt,pt2,v3,v4))cc++;if(lineItersection(pt,pt2,v4,v1))cc++;
return cc==1;}
void mainImage(out vec4 o,vec2 F){
float frame=iTime*60.;float FR=radians(frame);float sF=sin(FR),cF=cos(FR);
vec2 ctr=(iResolution.xy/2.)+vec2((cF*sF*.2)*250.,(cF-cF*2.2)*50.);
vec2 cd=ctr-F;vec3 hr=vec3(iResolution.x*.5,iResolution.y*.5,0);
vec2 uvT=F/iResolution.xy;float ang=atan(cd.y,cd.x)*3.14;float dist=length(F-ctr);
uvT.x=1./(dist*.0005);uvT.y=ang;
vec4 col=texture(iChannel3,uvT*vec2(.4,3.)+vec2(frame*tunnelSpeed,frame*tunneRotSpeed));
col*=vec4(.2,.4,1.,1.)*(2./(dist*.01));
float rot=frame*.02;vec2 sc=vec2(F.x,iResolution.y-F.y);vec3 cp=vec3(0,0,90.+cos(FR)*50.);
vec3 verts[8]=vec3[](vec3(-1,-1,-1),vec3(-1,-1,1),vec3(1,-1,1),vec3(1,-1,-1),vec3(-1,1,-1),vec3(-1,1,1),vec3(1,1,1),vec3(1,1,-1));
for(int i=0;i<8;i++){verts[i].xz*=rotate(rot);verts[i].yz*=rotate(rot*.7);verts[i].xy*=rot*.2;verts[i]+=objectStartPos;}
float range=max(0.,1.*sF);
for(int i=0;i<8;i++){float cd=distance(verts[i],cp);scale[i]=(camRange/cd)*.1;projPos[i]=verts[i]-cp;projPos[i]*=size*scale[i];projPos[i]+=hr;}
for(int i=0;i<6;i++){vec3 center=(projPos[int(quads[i].x)]+projPos[int(quads[i].y)]+projPos[int(quads[i].z)]+projPos[int(quads[i].w)])/4.;
edges[i*4]=projPos[int(quads[i].x)]+((center-projPos[int(quads[i].x)])*range);
edges[i*4+1]=projPos[int(quads[i].y)]+((center-projPos[int(quads[i].y)])*range);
edges[i*4+2]=projPos[int(quads[i].z)]+((center-projPos[int(quads[i].z)])*range);
edges[i*4+3]=projPos[int(quads[i].w)]+((center-projPos[int(quads[i].w)])*range);}
for(int i=0;i<6;i++){if(insideQuad(edges[i*4].xy,edges[i*4+1].xy,edges[i*4+2].xy,edges[i*4+3].xy,sc)){
vec2 ctr2=(edges[i*4].xy+edges[i*4+1].xy+edges[i*4+2].xy+edges[i*4+3].xy)/4.;
float minX=min(edges[i*4].x,min(edges[i*4+1].x,min(edges[i*4+2].x,edges[i*4+3].x)));
float minY=min(edges[i*4].y,min(edges[i*4+1].y,min(edges[i*4+2].y,edges[i*4+3].y)));
float maxX=max(edges[i*4].x,max(edges[i*4+1].x,max(edges[i*4+2].x,edges[i*4+3].x)));
float maxY=max(edges[i*4].y,max(edges[i*4+1].y,max(edges[i*4+2].y,edges[i*4+3].y)));
float w=maxX-minX,h=maxY-minY;
float xDist=distance(minX,sc.x)/w,yDist=distance(minY,sc.y)/h;
col=(col+texture(iChannel2,vec2(xDist,1.-yDist)*.1))*.75;
col-=.2*(distance(ctr2,sc)/w);}}
vec4 lc=col*3.;
for(int i=0;i<6;i++){Line(sc,edges[i*4].xy,edges[i*4+1].xy,lineWidth,lc,col);
Line(sc,edges[i*4+1].xy,edges[i*4+2].xy,lineWidth,lc,col);
Line(sc,edges[i*4+2].xy,edges[i*4+3].xy,lineWidth,lc,col);
Line(sc,edges[i*4+3].xy,edges[i*4].xy,lineWidth,lc,col);}
for(int i=0;i<24;i++){oval(sc,edges[i].xy,4.,lineWidth,vec4(1.),col*5.,col);}
vec2 sp=vec2(400.+(cos(FR)*300.),200.+(sin(FR)*100.));
float sd=distance(sc,sp)*.02;o=col+vec4(.1/sd,.1/sd,.2/sd,0);}
