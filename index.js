//Define fnc to set tooltips
var tooltip = function(aStudent)
{
    console.log("hovering");
    
    var xPos = d3.event.pageX;
    var yPos = d3.event.pageY;
    
    d3.select("#tooltip")
        .classed("hidden", false)
        .style("top", yPos+"px")
        .style("left", xPos+"px")
    
    d3.select("#studentPic")
        .attr("src", "imgs/" + aStudent.picture)
}

//Define fnc to get an array of grades from an object
var getGrade = function(object){
    return object.grade;
}

//Define fnc to draw Final scatter plot
var drawFinalPlot = function(d, screen, xScale, yScale)
{
    console.log("drawFinalPlot is called");
    //Create circles
    d3.select("#graph")
        .selectAll("circle")
        .data(d)
        .enter()
        .append("circle")
        //Give x coordinate
        .attr("cx", function(aStudent){
            var gradeArray = aStudent.homework.map(getGrade);
            return xScale(d3.mean(gradeArray));
        })
        //Give y coordinate
        .attr("cy", function(aStudent){
            return yScale(aStudent.final[0].grade);
        })
        //Give radius
        .attr("r", 6)
        //Show tooltip
        .on("mouseenter", tooltip)
}

//Define fnc to initialize Final vs. HW graph
var finalGraph = function(d)
{
    d3.selectAll("circle").remove();
    
    console.log("finalGraph is called");
    //Set graph size
    var screen = {width: 300, height: 300}
    
    //Apply graph size
    d3.select("#graph")
        .attr("width", screen.width)
        .attr("height", screen.height)
    
    //Define fnc to scale mean hw grades
    var xScale = d3.scaleLinear()
        .domain([0, 50])
        .range([0, screen.width]);
    
    //Define fnc to scale final grades
    var yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([screen.height, 0])
    
    //Draw scatter plot
    drawFinalPlot(d, screen, xScale, yScale);
}

//Define fnc to draw Quiz scatter plot
var drawQuizPlot = function(d, screen, xScale, yScale)
{
    console.log("drawQuizPlot is called");
    //Create circles
    d3.select("#graph")
        .selectAll("circle")
        .data(d)
        .enter()
        .append("circle")
        //Give x coordinate
        .attr("cx", function(aStudent){
            var hwGradeArray = aStudent.homework.map(getGrade);
            return xScale(d3.mean(hwGradeArray));
        })
        //Give y coordinate
        .attr("cy", function(aStudent){
            var quizGradeArray = aStudent.quizes.map(getGrade);
            return yScale(d3.mean(quizGradeArray));
        })
        //Give radius
        .attr("r", 6)
        //Show tooltip
        .on("mouseenter", tooltip)
}

//Define fnc to initialize Quiz vs. HW graph
var quizGraph = function(d)
{
    d3.selectAll("circle").remove();
    
    console.log("quizGraph is called");
    //Set graph size
    var screen = {width: 300, height: 300}
    
    //Apply graph size
    d3.select("#graph")
        .attr("width", screen.width)
        .attr("height", screen.height)
    
    //Define fnc to scale mean hw grades
    var xScale = d3.scaleLinear()
        .domain([0, 50])
        .range([0, screen.width]);
    
    //Define fnc to scale mean quiz grades
    var yScale = d3.scaleLinear()
        .domain([0, 10])
        .range([screen.height, 0])
    
    //Draw scatter plot
    drawQuizPlot(d, screen, xScale, yScale);
}

//Retrieve data
var penguinPromise = d3.json("classData.json");

//When data is found...
var successFnc = function(d)
{
    console.log(d);
    
//    //Final vs. HW
    d3.select("#final")
        .on("click", function(){finalGraph(d)})
    
    //Quiz vs. HW
    d3.select("#quiz")
        .on("click", function(){quizGraph(d)})
}

//When data is not found...
var failFnc = function(error){
    console.log(error);
}
//When data retrieval is finished...
penguinPromise.then(successFnc, failFnc);