var slideholder =document.getElementById('slideholder') // lấy hết cái slideholder vào 1 cái biến
var indicators = document.getElementById('indicators') // lấy hết cái indicators vào 1 cái biến
var currentSlide=1;
var slidewidth =500;
var totalslide=5;
var  test = 500;
function slide (direction,element)
{
    if(direction=='next') 
    {
         currentSlide=currentSlide+1;
    }
    if(direction=='back') 
    {
              currentSlide=currentSlide-1;
    }
    if (currentSlide > totalslide)
    {
              currentSlide=1;
    }
    else if (currentSlide <1)
    {
        currentSlide=totalslide;
    }
   
    Animationslide();
}
function Animationslide()
{
    var position=(currentSlide -1) *slidewidth  *-1;
    slideholder.style.left=position+'px';
    for(var i=0;i<allDots.length;i++)
    {
        allDots[i].style.backgroundColor='white';
    }
    allDots[currentSlide-1].style.backgroundColor='red';
};
// lấy tất cả các chấm trong con 
var allDots =indicators.children;
for (var i=0;i<allDots.length;i++)
{
    dotListenEvent(allDots[i],i+1)
}
// duyệt phần tử lấy được lắng nghe sự kiện click 
function dotListenEvent (dotDiv,slidenum)
{
    dotDiv.addEventListener('click',function(event)
    {
        currentSlide=slidenum;
        Animationslide();
    })
}