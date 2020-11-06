var penguinPromise = d3.json("classData.json");

var successFnc = function(d)
{
    console.log(d);
}

var failFnc = function(error){
    console.log(error);
}

penguinPromise.then(successFnc, failFnc);