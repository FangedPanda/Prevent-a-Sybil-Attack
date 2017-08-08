var snodes=[];//array of sybil nodes
var sensors=[];//creating a sensors array
var circles=[];//array of circles
var flag2=0;//show wheter clicked or not
var flag=1;//flag to know whether show or hide
var count=0;//counter to check how many times clicked
var matrix=new Array(20);//creating a 2d array
var no;//this variable shows the node which is clicked
var du=0;//how many times the sybil node is duplicated
var conn=0;//connect all nodes
var img1,img2,img3;//image
var ccount=0;//count of no of nodes clicked
var account=Array(2);//array of ccount
var keyp=[];
var smsg=0;
for(var i=0;i<20;i++)
{
  matrix[i]=new Array(20);
  for(var j=0;j<20;j++)
  {
    matrix[i][j]=0;//initializing the array
  }
}
function setup()
{
  var c;//started
  c=createCanvas(1350,750);
  img1=loadImage("up.png");//loading arrow image
  img2=loadImage("right.png");//loading right image
  img3=loadImage("down.png");//loading down image
  for(var i=0;i<20;i++)
  {
    var s=Math.floor(random(500,1500));
    keyp[i]=s;
    //console.log("key"+" "+keyp[i]);
  }
  for(var i=0;i<20;i++)
  {
    var test=0;//variable for checking collision
    var s=new sensor(random(40,1300),random(40,580));//new sensor node created
    for(var j=0;j<sensors.length;j++)//testing new functionality for distinct nodes
    {
      if(Math.sqrt(Math.pow(s.x1-sensors[j].x1,2)+Math.pow(s.y1-sensors[j].y1,2))<100)//checking for collision
      {
        i--;
        test=1;//collision occured
        break;
      }
    }
    if(test==0)//if there was no clash
    {
      sensors.push(s);//sensor object pushed into sensors array
      sensors[i].fillk(keyp,i);
    }
  }
  nmatrix(matrix);//creating a matrix of all the neighbours
}

function draw()//drawing on the screen
{
  background(51);
  stroke(0,0,0);
  image(img1,20,660,50,50);
  text("Spawn_sybil_Node(UP_ARROW)",80,660,100,20);
  image(img2,460,660,50,50);
  text("Communicate_nodes(Right_ARROW)",520,660,100,20);
  image(img3,880,660,50,50);
  text("Sybilid&Communication(DOWN_ARROW)",940,660,100,20);
  for(var i=0;i<20;i++)
  {
    sensors[i].colours();
    sensors[i].showid(i);
    if(conn==1)//if right key is pressed
    {
      sensors[i].showline(matrix,sensors,conn);//just for showing communication
    }
  }
  showarea();
  for(var i=0;i<snodes.length;i++)
  {
    snodes[i].create();
    for(var j=0;j<du;j++)
    {
      snodes[i].duplicate(du);
      snodes[i].showline(sensors);
    }
  }
  if(smsg==1)
  {
  sensors[no].dprf();
  }
}
function nmatrix(matrix)//stores all position of the nodes in matrix array
{
  for(var i=0;i<20;i++)
  {
    for(var j=0;j<20;j++)
    {
        if(Math.sqrt(Math.pow(sensors[i].x1-sensors[j].x1,2)+Math.pow(sensors[i].y1-sensors[j].y1,2))<400)//range of the sensor
      {
        matrix[i][j]=1;//neighbour found
        if(i!=j)
        {
          sensors[i].filln(j);//put j in i's neighbour
        }
      }
    }
  }
}
function mousePressed()
{
  count++;
  flag2=1;//we are ready to draw a circle
  if(flag==1)
  {
  for(var i=0;i<20;i++)
    {
      if(abs(mouseX-sensors[i].x1)<=40 && abs(mouseY-sensors[i].y1)<=40)//checking where we clicked
      {
          ccount++;//node clicked
          no=i;//node saved in no
          account[ccount-1]=no;//nodes saved
          if(ccount==2)//if two nodes clicked
          {
            sensors[account[0]].prf(account[1],account[0],keyp);
            ccount=0;
          }
          var ccreate=new circ(sensors[no].x1,sensors[no].y1);
          circles.push(ccreate);
      }
    }
  }
  else
  {
    circles.pop();//deleting the already created
  }
//  if(dist(mouseX,mouseY,snodes[0].x1,snodes[0].y1)<40)
//  {
//    rsn=0;
//    do{}while(rsn==no)
//    {
//      rsn=random(1,20);
//    }
//  }
}
function showarea()//this function shows the area which is affected
{
  if(flag2==1)
  {
    if(count%2==0)
    {
      smsg=1;
    }
    if(count%2==0)
    {
  if(flag==0)//already showing
    {
      flag=1;
      smsg=0;
    }
  }
  else//need to show
    {
      //pushing
      circles[0].show1();
      //circles[0].show2(matrix,no);//showing the neighbours
      //circles[0].show2(matrix,no);//checking the matrix
      circles[0].show3(no,sensors);
      //circles[0].showmatrix(matrix);//testing
      flag=0;
    }
  }
}
function keyPressed()
{
  if(keyCode==UP_ARROW)
  {
    var s=new sybil();
    snodes.push(s);
  }
  if(keyCode==DOWN_ARROW)
  {
    du++;
  }
  if(keyCode==39)//right arrow key
  {
    conn=1;
  }
  if(keyCode==68)
  {
      for(var i=0;i<snodes.length;i++)
      {
        snodes.pop();
      }
    }
  if(keyCode==77)
  {
    for(var i=0;i<snodes.length;i++)
    {
    snodes[i].showmsg(sensors,keyp);
    }
  }
  if(keyCode==83)
  {
    snodes[0].showids(sensors);
  }
  }
