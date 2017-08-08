function sybil()
{
  this.id=[];//all the id's this node contains
  this.x=random(40,1200);
  this.y=random(40,550);
  this.did=[];//duplicate id's
  this.dc=0;//duplicate id count
  var k=0;//count of duplicate function
  this.create=function()
  {
    fill(150,10,10,50);
    noStroke();
    ellipse(this.x,this.y,50,50);
    fill(170,20,20,150);
    noStroke();
    ellipse(this.x,this.y,30,30);
    fill(0);
    noStroke();
    ellipse(this.x,this.y,20,20);
  }
  this.duplicate=function(du)//duplicates the sybil node
  {
    console.log(du);
    fill(170,20,20,150);
    noStroke();
    for(var i=0;i<du;i++)
    {
      if(i%2==0)
      {
        ellipse(this.x-i*20,this.y,20,20);
      }
      else
      {
        ellipse(this.x+i*20,this.y,20,20);
      }
    }
  }
  this.showline=function(a)
  {
    for(var i=0;i<20;i++)
    {
      if(dist(this.x,this.y,a[i].x1,a[i].y1)<400)
      {
        stroke(200,50,50);
        strokeWeight(4);
        line(this.x,this.y,a[i].x1,a[i].y1);
      }
    }
  }
  this.showmsg=function(a,k)
  {
    for(var i=0;i<20;i++)
    {
      if(dist(this.x,this.y,a[i].x1,a[i].y1)<400)
      {
        var rns=i;
        while(rns==i)
        {
          rns=Math.floor(random(0,19));
        }
        this.did[this.dc]=rns;
        this.dc++;
        a[i].prf(rns,i,k);
      }
    }
  }
  this.showids=function(a)
  {
    for(var i=0;i<20;i++)
    {
        if(dist(this.x,this.y,a[i].x1,a[i].y1)<400)
        {
          a[i].chn(this.did);
        }
    }
  }
}
