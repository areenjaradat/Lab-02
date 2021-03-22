'use strict';

let arrayOfObjects=[];

function Data(image_url,title,description,keyword,horns){
    this.image_url=image_url;
    this.title=title;
    this.description=description;
    this.keyword=keyword;
    this.horns=horns;
    arrayOfObjects.push(this);
}
Data.prototype.render=function(){
    // console.log("create render");
    let imgaeDisplay=$('#photo-template').clone();
    // console.log(imgaeDisplay)
    $('main').append(imgaeDisplay);
    imgaeDisplay.find('h2').text(this.title);
    imgaeDisplay.find('img').attr('src',this.image_url);
    imgaeDisplay.find('p').text(this.description);
    imgaeDisplay.removeAttr('id');

    imgaeDisplay.attr('class','divClass');
    
};

function getData(){
    
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }
// console.log("start");
    $.ajax('data/page-1.json',ajaxSettings).then(data=>{
        // console.log("inside the ajax");
        data.forEach(element => {
            // console.log("create object");
            // console.log(element.image_url,,element.description,element.keyword,element.horns);
            let getdata=new Data(element.image_url,element.title,element.description,element.keyword,element.horns);
            getdata.render();
            // console.log(getdata)  
            $('select').append($('<option>', {
                // value: element.keyword,
                text: element.keyword
            }));

        });
    })

}

$(document).ready(function() {
    
$('select').change(function() {
    $('.divClass').remove();
   let theOption= $("select option:selected" ).text();

    console.log($( "select option:selected" ).text());
   
    arrayOfObjects.forEach((element,index)=>{
    if (arrayOfObjects[index].keyword===theOption){
        arrayOfObjects[index].render();
    }
})
arrayOfObjects.forEach((element,index)=>{
    if ('Filter by Keyword'===theOption){
        arrayOfObjects[index].render();
    }
})
})//.trigger('change');

})


console.log(arrayOfObjects);
$('document').ready(getData);
// $('document').ready(filllist);
// $( window ).load(filllist);