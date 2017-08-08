function sensor(x,y)
{
  this.x1=x;//x position sensor
  this.y1=y;//y position
  this.id;//id of sensor
  this.sid;//sender id
  this.ck=0;//common main key
  this.msg="0";//sender message
  this.neighbours=[];//neighbours of this sensor
  this.keys=[];//stores all the keys
  this.chn=function(a)//change neighbours
  {
    for(var i=0;i<a.length;i++)
    {
      var k=0;
      for(var j=0;j<this.neighbours.length;j++)
      {
        if(a[i]==this.neighbours[j])
        {
          k++;
        }
      }
      if(k==0)
      {
      this.neighbours.push(a[i]);
      }
    }
  }
  this.fillk=function(a,b)
  {
    var s=(b*233)%20;
    for(var i=0;i<11;i++)//generating 11 distinct numbers from 1 to 20
    {
      if(s==20)
      {
        s=0;
        i--;
      }
      else
      {
        this.keys.push(a[s]);
        console.log(this.keys[i]);
        s++;
      }
    }
    console.log("keysof"+" "+b);
  }
  this.filln=function(n)//fill all the neighbourss
  {
    var flag=0;
    for(var i=0;i<this.neighbours.length;i++)//checking all the neighbours ids
    {
      if(this.neighbours[i]==n)
      {
        //sybil node attacking
        flag=1;
        break;
      }
    }
    if(flag==0)//no duplication found
    {
      this.neighbours.push(n);//push the found neighbour into array
    }
  }
  this.colours=function()
  {
    fill(30,0,150,60);
    noStroke();
    ellipse(this.x1,this.y1,50,50);
    fill(50,0,200,100);
    noStroke();
    ellipse(this.x1,this.y1,40,40);
    var c=color('red');
    fill(0);
    noStroke();
    ellipse(this.x1,this.y1,30,30);
  }
  this.showid=function(a)
  {
    fill(150,150,255,100);
    textSize(20);
    textStyle(BOLD);
    text(a+1,this.x1-10,this.y1-10,50,50);
  }
  this.showline=function(a,b)//test function for communication
  {
    for(var j=0;j<20;j++)
    {
    for(var i=0;i<20;i++)
      {
        if(a[j][i]==1 && i!=j)//neighbour found
          {
            stroke(50,50,200);
            strokeWeight(4);
            line(b[j].x1,b[j].y1,b[i].x1,b[i].y1);
          }
        }
      }
    }
  this.prf=function(idd1,idd2,keyp)//idd1 is id of sender idd2 is id of current node
  {
      var rid=(idd2*233)%20;
      var ssid=(idd1*233)%20;
      var s1=[];
      var s2=[];
      for(var i=0;i<11;i++)
      {
      if(ssid==20)
      {
        i--;
        ssid=0;
      }
      else
      {
          s1.push(ssid);
          ssid++;
      }
      }
      for(var i=0;i<11;i++)
      {
        if(rid==20)
        {
          i--;
          rid=0;
        }
        else
        {
          s2.push(rid);
          rid++;
        }
      }
      for(var i=0;i<11;i++)
      {
        this.ck=0;
        for(var j=0;j<11;j++)
        {
          if(s1[i]==s2[j])
          {
            this.ck=s1[i];
            console.log(this.ck);
            break;
          }
        }
        if(this.ck!=0)
        {
          break;
        }
      }
          //(var i=0;i<11;i++)
    //{
      //console.log("key"+" "+s[i]);
    //}
    this.msg=123+keyp[this.ck];
    console.log(this.msg);
  }
  this.dprf=function()
  {
    var s=this.msg;
    text(s,this.x1-30,this.y1-60,20,20);
  }
}
