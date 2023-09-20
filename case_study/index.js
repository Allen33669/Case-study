/*
main-content
*/

//

let sideMenu = $(".main-content, .side-menu");
let displayContent = $(".display-content");
let currentDisplay = displayContent.children(".image-zoom");
let currentDisplay2 = displayContent.children(".image-magnifier-glass");


let menuItem = [
 ".drop-ballsM",
 ".change-barM", 
 ".transform-iconM", 
 ".filter-searchM", 
 ".sidebar-overlayM", 
 ".sidebar-pushM", 
 ".headbar-scrollM", 
 ".cascading-dropdownM", 
 ".slide-showM", 
 ".image-zoomM", 
 ".image-magnifier-glassM", 
 ".image-comparison-sliderM", 
 ".copy-read-clipboardM", 
 ".checkbox-switchM", 
 ".svg-frameM", 
 ".google-chartM"];
let displayItem = [
  ".canvas-frame", 
  ".change-bar", 
  ".transform-icon", 
  ".filter-search", 
  ".sidebar-overlay", 
  ".sidebar-push", 
  ".headbar-scroll", 
  ".cascading-dropdown", 
  ".slide-show", 
  ".image-zoom", 
  ".image-magnifier-glass", 
  ".image-comparison-slider", 
  ".copy-read-clipboard", 
  ".checkbox-switch", 
  ".svg-frame", 
  ".google-chart"];
for (let i = 0; i < menuItem.length; i++){
  sideMenu.children(menuItem[i]).click(() => {showDisplay(displayItem[i]);});
}



function showDisplay(currentDisplayClass){
  if (currentDisplay !== undefined){
    currentDisplay.toggleClass("displayNone");
  }

  if (currentDisplay2 !== undefined) {
    currentDisplay2.toggleClass("displayNone");
    currentDisplay2 = undefined;
  }
  currentDisplay = displayContent.children(currentDisplayClass)
  currentDisplay.toggleClass("displayNone");
}



/*
canvas-frame
*/
let canvasFrame = {
  start : function(){
    let canvasFrame = document.querySelector(".canvas-frame");
    let canvas = canvasFrame.querySelector(".canvas");
    let canvas2d = canvas.getContext("2d");
    let balls = [];
    let ballsNumber = 6;
    let animation;



    //draw all balls with animation
    function draw(){
      canvas2d.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      for (let i = 0; i < balls.length; i++){
        balls[i].draw(); 
      }

      animation = window.requestAnimationFrame(draw);
    }



    //a specific ball with position, direction, and velocity
    class Ball {
      constructor(canvas2d, x, y, radius, radialIn, radialOut, radialRgba, xDirect, xV, xVV, yV, yVV, yVVV){
        this.canvas2d = canvas2d;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.radialIn = radialIn;
        this.radialOut = radialOut;
        this.radialRgba = radialRgba;
        this.xDirect = xDirect;
        this.yDirect = 1;
        this.xV = xV; //every x move xV pixels
        this.xVV = xVV; //every x move velocity based on x position
        this.yV = yV; //every y move yV pixels
        this.yVV = yVV; //every y move velocity based on current ball's max height position
        this.yVVV = yVVV; //every y move velocity based on current ball's relative position with max height position
        this.boundHeight = y //the ball's max height position every bounce
        this.bouneV = 0.15; //the ball's max height position reduction(%) every bounce
      }

      //draw the ball
      draw(){
        //set the radialStyle
        let radialStyle = canvas2d.createRadialGradient(this.x, this.y, this.radialIn, this.x, this.y, this.radialOut);
        let radialRgbaString = this.radialRgba.slice(0, 16);
        let radialRgbaString1 = radialRgbaString + "0.5)", 
        radialRgbaString2 = radialRgbaString + "0.6)",
        radialRgbaString3 = radialRgbaString + "0.7)",
        radialRgbaString4 = radialRgbaString + "0.8)",
        radialRgbaString5 = radialRgbaString + "0.9)",
        radialRgbaString6 = radialRgbaString + "1)";
        
        radialStyle.addColorStop(0, String(radialRgbaString1));
        radialStyle.addColorStop(0.2, String(radialRgbaString2));
        radialStyle.addColorStop(0.4, String(radialRgbaString3));
        radialStyle.addColorStop(0.6, String(radialRgbaString4));
        radialStyle.addColorStop(0.8, String(radialRgbaString5));
        radialStyle.addColorStop(1, String(radialRgbaString6));

        //draw the ball
        this.canvas2d.beginPath();
        this.canvas2d.arc(this.x, this.y, this.radius, 0, 360);
        this.canvas2d.closePath();

        this.canvas2d.fillStyle = radialStyle;
        this.canvas2d.fill(); 



        //relocate x and x direction
        if (this.x > (canvas.clientWidth - (this.radius + this.xV))){
          this.xDirect = -1;
        }else if (this.x < (this.radius + this.xV)){
          this.xDirect = 1;
        }else{

        }

        
        
        //relocate y and y direction
        if ((this.y > (canvas.clientHeight - (this.radius + this.yV))) && (this.boundHeight < (canvas.clientHeight - (this.radius + this.yV)))){
          this.yDirect = -1;
          if ((this.boundHeight >= (canvas.clientHeight - (this.radius * 2 + this.yV))) && (this.boundHeight < (canvas.clientHeight - (this.radius + this.yV)))){

          }else{
            this.boundHeight += (canvas.clientHeight - this.boundHeight) * this.bouneV;
          }

        }else if (this.y < this.boundHeight){
          this.yDirect = 1;
        }else if (this.boundHeight >= (canvas.clientHeight - (this.radius + this.yV))){
          return;
        }else{

        }
        



        //set new x and y
        this.x += (this.xV + this.x * this.xVV) * this.xDirect;
        this.y += ((canvas.clientHeight - this.boundHeight) * this.yVV + (this.y - this.boundHeight) * this.yVVV + this.yV) * this.yDirect;
      }
    }


    //set canvas scale
    canvas2d.scale(1, 1);

    //set balls
    for (let i = 0; i < ballsNumber; i++){
      for (let j = 0; j < ballsNumber; j++){
        let xDirect = 0;
        if (Math.random() > 0.5){
          xDirect = 1;
        }else{
          xDirect = -1;
        }
        
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);

        let rgba = `rgba(${r}, ${g}, ${b}, 1)`;
        let xV = 5 + (Math.random() * 5);
        let yVVV = 0.06 + (Math.random() * 0.02);
        balls.push(new Ball(canvas2d, 100 + (i * 50), 100 + (j * 50) , 20, 2, 20, rgba, xDirect, xV, 0, 0, 0.0075, yVVV));
      }
    }



    //set animation start and end conditions
    canvas.addEventListener("mouseover", () => {
      animation = window.requestAnimationFrame(draw);   
    });

    canvas.addEventListener("mouseout", () => {
      window.cancelAnimationFrame(animation);   
    });  
  }
}

canvasFrame.start();



//change horizon vertical
let changeBar = {
  start : function(){
    let button = document.querySelector(".change-horizon-vertical");
    button.addEventListener("click", changeHorizonVertical);

    function changeHorizonVertical(){
      let elementH = document.querySelector(".horizon-bar");
      let elementV = document.querySelector(".vertical-bar");

      if (elementH.style.display == "none"){
        elementH.style.display = "flex";
        elementV.style.display = "none";
      }else{
        elementV.style.display = "block";
        elementH.style.display = "none";
      }
    }
  }
}

changeBar.start();



//transform menu
let transformMenu = {
  start : function(){
    //document.querySelector(".transform-icon").addEventListener("click", transformIcon);
    $(".transform-icon").click(transformIcon)
    function transformIcon(){
      $(".transform-icon").toggleClass("change");
    }
  }
}

transformMenu.start();



//filter search
let filterSearch = {
  start : function(){
    let filterSearchElement = document.querySelector(".filter-search");
    document.querySelector(".my-search-button").addEventListener("click", filterSearch);

    function filterSearch(){
      console.log("enter filter-search");
      let input = document.querySelector(".my-search").value.toUpperCase();
      console.log(input);
      let elements = filterSearchElement.querySelector("ul").querySelectorAll("li");

      Array.from(elements).forEach((element) => {
        let elementText = element.innerHTML.toUpperCase();
        console.log(elementText);
        if (elementText.includes(input)){
          element.style.display = "";
        }else{
          element.style.display = "none";
        }
      });
    }
  }
}

filterSearch.start();



//sidebar-overlay
let sidebarOverlay = {
  start : function () {
    let sidebarOverlay = $(".sidebar-overlay");
    let sidebar = sidebarOverlay.children(".sidebar");
    let menu = sidebar.children(".menu");
    sidebarOverlay.children(".open-sidebar").click(openSidebarOverlay);
    menu.children(".close-button").click(closeSidebarOverlay);

    function openSidebarOverlay(){
      sidebar.animate({width: "150px", opacity: "1"}, 2000);
      menu.animate({width: "118px", opacity: "0.8"}, 1000)
          .children("a").animate({fontSize: "24px"}, 1000);
    }

    function closeSidebarOverlay(){
      sidebar.animate({width: "0px", opacity: "0"}, 2000);
      menu.animate({width: "0px", opacity: "0"}, 1000)
          .children("a").animate({fontSize: "0px"}, 1000);
    }
  }
}

sidebarOverlay.start();



//sidebar-push
let sidebarPush = {
  start : function(){
    let sidebarPush = $(".sidebar-push");
    let sidebar = sidebarPush.children(".sidebar");
    let button = sidebarPush.children(".open-sidebar");
    sidebar.children(".close-button").click(closeSidebarPush);
    button.click(openSidebarPush);

    function openSidebarPush(){
      sidebar.animate({width: "150px"}, 1000);
      button.animate({marginLeft: "150px"}, 1000);
      sidebarPush.animate({backgroundColor: "rgba(0, 0, 0, 0.3)"}, 2000);
      sidebar.children("a").animate({fontSize: "24px"}, 1000);
      //sidebar.style.width = "150px";
      //button.style.marginLeft = "150px";
      //sidebarPush.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    }

    function closeSidebarPush(){
      sidebar.animate({width: "0px"}, 1000);
      button.animate({marginLeft: "0px"}, 1000);
      sidebarPush.animate({backgroundColor: "rgba(255, 255, 255, 0.3)"}, 2000);
      sidebar.children("a").animate({fontSize: "0px"}, 1000);
      //sidebar.style.width = "0";
      //button.style.marginLeft = "0";
      //sidebarPush.style.backgroundColor = "";
    }
  }
}

sidebarPush.start();
/*
let sidebarPush = {
  start : function(){
    let sidebarPush = document.querySelector(".sidebar-push");
    let sidebar = sidebarPush.querySelector(".sidebar");
    let button = sidebarPush.querySelector(".open-sidebar");
    sidebar.querySelector(".close-button").addEventListener("click", closeSidebarPush);
    button.addEventListener("click", openSidebarPush);

    function openSidebarPush(){
      sidebar.style.width = "150px";
      button.style.marginLeft = "150px";
      sidebarPush.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    }

    function closeSidebarPush(){
      sidebar.style.width = "0";
      button.style.marginLeft = "0";
      sidebarPush.style.backgroundColor = "";
    }
  }
}

sidebarPush.start();
*/


/*
headbar-scroll
*/
let headbarScroll = {
  start : function(){
    let screen = document.querySelector(".headbar-scroll");
    let headbar = screen.querySelector(".headbar");
    screen.addEventListener('scroll', openHeadbar);

    function openHeadbar(){
      if (screen.scrollTop > 20){
        headbar.style.top = "0";
      }else{
        headbar.style.top = "-50px";
      }
    }
  }
}

headbarScroll.start();



/*
cascading-dropdown
*/
let cascadingDropdownObjects = {
  "UX" : {"Interview":0, "Survey":0, "Others":0},
  "UI" : {"Layout":0, "Color":0, "Typo":0, "Others":0},
}

let cascadingDropdown = {
  start : function(){
    let form = document.querySelector(".cascading-dropdown .form");
    let layer1 = form.querySelector(".layer1");
    let layer2 = form.querySelector(".layer2");

    for (let value in cascadingDropdownObjects){
      layer1.options[layer1.options.length] = new Option(value, value);
    }


    layer1.onchange = function(){
      while (layer2.length > 1){
        layer2.removeChild(layer2.lastElementChild);
      }

      for (let value in cascadingDropdownObjects[this.value]){
        layer2.options[layer2.options.length] = new Option(value, value);
      }    
    }
  }

}

cascadingDropdown.start();



//slide-show
let images = [
  "https://magdeleine.co/wp-content/uploads/2023/01/42519372812_d156660b24_o-1400x1049.jpg",
  "https://magdeleine.co/wp-content/uploads/2022/11/51094992594_151aa3c0b6_o-1400x933.jpg",
  "https://magdeleine.co/wp-content/uploads/2022/07/43866107662_74e57f404b_o-1400x933.jpg"];
let imageNum = 1;

let slideShow = {
  start : function(){
    let slideShowElement = document.querySelector(".slide-show");
    let dots = slideShowElement.querySelector(".dots");
    let image = slideShowElement.querySelector(".image-frame .image");
    dots.querySelector(".dot1").addEventListener("click", () => {showSlide(1);});
    dots.querySelector(".dot2").addEventListener("click", () => {showSlide(2);});
    dots.querySelector(".dot3").addEventListener("click", () => {showSlide(3);});
    slideShowElement.querySelector(".image-frame .prev").addEventListener("click", () => {prevSlide();});
    slideShowElement.querySelector(".image-frame .next").addEventListener("click", () => {nextSlide();});

    function showSlide(slideNum){
      if ((slideNum > 0) || (slideNum <= images.length)){
        image.src = images[slideNum - 1];
        image.classList.toggle("fade1");
        image.classList.toggle("fade2");
        imageNum = slideNum;
      }
    }

    function prevSlide(){
      if (imageNum == 1){
        showSlide(images.length);
      }else{
        showSlide(imageNum - 1);
      }
    }

    function nextSlide(){
      if (imageNum == images.length){
        showSlide(1);
      }else{
        showSlide(imageNum + 1);
      }
    }
  }
}

slideShow.start();



//image-zoom
let imageZoom = {
  start : function(){
    let imageZoomElement = document.querySelector(".image-zoom");
    let imageFrame = imageZoomElement.querySelector(".image-frame");
    let image = imageFrame.querySelector(".image");
    let len = imageFrame.querySelector(".len");
    let zoom = imageZoomElement.querySelector(".zoom-frame .zoom");

    let lenPosition = len.getBoundingClientRect();

    //calculate the multiple between image and len
    let multiple = image.width / lenPosition.width;
    
    //adjust the picture size of zoom by multiple
    zoom.style.width = (image.width * multiple) + "px";        

    image.addEventListener("mousemove", (e) => {
      e.preventDefault();
      //calculate how much left and top of len should move
      let position = image.getBoundingClientRect();
      let lenLeft = e.clientX - position.x;
      let lenTop = e.clientY - position.y;
      console.log(`e.clientX:${e.clientX}, position.x:${position.x}`);

      len.style.left = (lenLeft) + "px";
      len.style.top = (lenTop) + "px";

     //move the picture of zoom by multiple and reverse direction
      zoom.style.left = (lenLeft * multiple * (-1)) + "px";
      zoom.style.top = (lenTop * multiple * (-1)) + "px";
    });
  }
}

imageZoom.start();



//image-magnifier-glass
let imageMagnifierGlass = {
  start : function(){
    let imageMagnifierGlassElement = document.querySelector(".image-magnifier-glass");
    let imageFrame = imageMagnifierGlassElement.querySelector(".image-frame");
    let image = imageFrame.querySelector(".image");
    let len = imageFrame.querySelector(".len");
    let zoom = len.querySelector(".zoom");

    let lenPosition = len.getBoundingClientRect();

    //calculate the multiple between image and len
    let multiple = image.width / lenPosition.width;
    
    //adjust the picture size of zoom by multiple
    zoom.style.width = (image.width * multiple) + "px";        

    image.addEventListener("mousemove", (e) => {
      e.preventDefault();
      //calculate how much left and top of len should move
      let position = image.getBoundingClientRect();
      let lenLeft = e.clientX - position.x;
      let lenTop = e.clientY - position.y;

      len.style.left = (lenLeft) + "px";
      len.style.top = (lenTop) + "px";

     //move the picture of zoom by multiple and reverse direction
      zoom.style.left = (lenLeft * multiple * (-1)) + "px";
      zoom.style.top = (lenTop * multiple * (-1)) + "px";
    });
  }
}

imageMagnifierGlass.start();



//image-comparison-slider
let imageComparisonSlider = {
  start : function(){
    let imageComparisonSliderElement = document.querySelector(".image-comparison-slider");
    let imageFrame = imageComparisonSliderElement.querySelector(".image-frame");
    let slider = imageFrame.querySelector(".slider");
    let image1 = imageFrame.querySelector(".image1");
    let clicked = 0;
    

    slider.addEventListener("mousedown", (e) => {
      e.preventDefault();

      //turn on move status
      clicked = 1;
      let imageFramePosition = imageFrame.getBoundingClientRect();

      imageFrame.addEventListener("mousemove", (e) => {
        e.preventDefault();
        
        //change the clip-path of image1 by mouse movement
        if ((clicked == 1) && (e.clientX < imageFramePosition.right) && (e.clientX > imageFramePosition.left)){
          slider.style.left = (e.clientX - imageFramePosition.left  - 25) + "px";

          image1.style.clipPath = "inset(0 " + (imageFramePosition.right - e.clientX) + "px 0 0)";
        }
      });
    });

    window.addEventListener("mouseup", (e) => {
      //turn off move status
      clicked = 0;
    });
  }
}

imageComparisonSlider.start();



//copy-read-clipboard
let copyReadClipboard = {
  start : function(){
    let copyReadClipboardElement = document.querySelector(".copy-read-clipboard");
    let input = copyReadClipboardElement.querySelector(".input");
    let button = copyReadClipboardElement.querySelector(".copy-read-button");
    let content = copyReadClipboardElement.querySelector(".content");

    button.addEventListener("click", function() {
      navigator.clipboard.writeText(input.value).then(() => {
        navigator.clipboard.readText().then((text) => {
          console.log("read: " + text);
          content.innerText = text;
        });
      });
    });
  }
}

copyReadClipboard.start();



//svg
let svg = {
  start : function() {
    let path = document.querySelector(".svg-frame .svg .path");
    let startMove = false;

    document.querySelector(".svg-frame .svg-button").addEventListener("click", moveSvg);

    async function moveSvg(){
      if (startMove == true){
        startMove = false;
      }else{
        startMove = true;
      }

      let offset = 100;
      while(startMove){
        await new Promise((resolve) => {
          setTimeout(resolve, 20);
        });
        path.style.strokeDashoffset = offset;
        if (offset == 100){
          offset = 0;
        }else{
          offset++;
        }
      }
    }
  }
}

svg.start();



//google-chart
let googleChart = {
  start : function(){
    let piechart = document.querySelector(".google-chart .piechart");

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(() => {
      var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7]
        ]);

      var options = {
        title: 'My Daily Activities'
      };

      var chart = new google.visualization.PieChart(piechart);

      chart.draw(data, options);
    });
  }
}

googleChart.start();
