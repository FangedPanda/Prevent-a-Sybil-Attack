function circ(x,y)
{
  this.x=x;
  this.y=y;
  this.show1=function()
  {
    fill(30,0,150,60);
    ellipse(x,y,800,800);
  }
  this.show2=function(a,b)//showing the neighbours
  {
    var k=0;//checks how many neighbours
    //textSize(18);
    //fill(200);
    //text("neighbours",x-40,y-70,30,30);
    for(var i=0;i<20;i++)
    {
      if(i==19)//if it is the last element
      {
      textSize(18);
      fill(200);
      text("Neighbours",x-25,y-(20*k)-30,30,30);//writing neighbous on top
      }
      if(a[b][i]==1)//if the node is a neighbour
      {
        k++;
        textSize(14);
        fill(200);
        if(i!=b)
        {
          text(i+1,x-10,y-90-(20*k),20,20);
        }
      }
    }
  }
  this.showmatrix=function(a)
  {
    for(var i=0;i<20;i++){
    fill(200);
    textSize(16);
    text(i+1,((x-200)+20*i),((y-200)),20,20);
  }
    for(var i=0;i<20;i++)
    {
      fill(200);
      textSize(16);
      text(i+1,((x-200)),((y-200)+20*i+20),20,20);
      for(var j=0;j<20;j++)
      {
        fill(200);
        textSize(14);
        text(a[i][j],((x-200)+20*j+20),((y-200)+20*i+20),14,14);
      }
    }
  }
  this.show3=function(a,b)//showing the neighbours through another method
  {
    for(var i=0;i<b[a].neighbours.length;i++)//traversing the whole neighbour matrix
    {
      textSize(14);
      fill(200);
      text(b[a].neighbours[i]+1,x-10,y+180-(20*i),20,20);
    }
    textSize(18);
    fill(200);
    text("Neighbours",x-30,y+180-90-(20*i)-20,20,20);
  }
}
