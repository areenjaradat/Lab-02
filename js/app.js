'use strict';

let arrayOfObjects=[];

let button1=$('#page1');
let button2=$('#page2');
let arrayOfPage1=[];
let keywords1=[];
let arrayOfPage2=[];
let keywords2=[];


$('document').ready(getData);

readDataFromPage2();

function Data(image_url,title,description,keyword,horns){
    this.image_url=image_url;
    this.title=title;
    this.description=description;
    this.keyword=keyword;
    this.horns=horns;
    arrayOfObjects.push(this);
}
Data.prototype.renderFunction=function(){

    let div=$('#photo-template').html();
    // console.log(div);
    // console.log(this)
    let html=Mustache.render(div,this);

    // console.log(html);
    // $('template').attr('class','templeteClass');

    return html;


};



function getData(){
    
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }
// console.log(arrayOfObjects);
    $.ajax('data/page-1.json',ajaxSettings).then(data=>{
       
        data.forEach(element => {
            // console.log("create object");
            // console.log(element.image_url,,element.description,element.keyword,element.horns);
           
            let getdata=new Data(element.image_url,element.title,element.description,element.keyword,element.horns);
            arrayOfPage1.push(getdata);
            if(!keywords1.includes(getdata.keyword)){keywords1.push(getdata.keyword);}
            $('#dataLlist').append(getdata.renderFunction()) ;
            // console.log(getdata)  
          

        });
        keywords1.forEach(element=>{
            // console.log(element)
            $('#keys').append($('<option>', {
                // value: element.keyword,
                text: element
            }));
        })
    })

}

    $(document).ready(function() {
    
        $('#keys').on('change',function() {
           
            let theOption= $("#keys option:selected" ).text();
            $('#dataLlist').empty();
        
            // console.log(arrayOfObjects);
            arrayOfObjects.forEach((element,index)=>{
            if (element.keyword===theOption){
                // console.log("insideds")
                $('#dataLlist').append(element.renderFunction()) ;
                
            }else  if ('Filter by Keyword'===theOption){
                $('#dataLlist').append(element.renderFunction()) ;
                
            }
        })
    
        })
        
        })

$(document).ready(function() {

   
    button1.click(function(){
        arrayOfObjects=arrayOfPage1;
        $('#dataLlist').empty();
        $('#keys').empty();
        arrayOfPage1.forEach((element,index) => {
                // console.log(element)
                $('#dataLlist').append(element.renderFunction()) ;
            });
            $('#keys').append($('<option>', {
                // value: element.keyword,
                text: 'Filter by Keyword'
            }));
            keywords1.forEach(element=>{
                $('#keys').append($('<option>', {
                    // value: element.keyword,
                    text: element
                }));
            })

           
    })

    button2.click(function(){
        arrayOfObjects=arrayOfPage2;
        $('#dataLlist').empty();
        $('#keys').empty();
        arrayOfPage2.forEach(element => {
               
                $('#dataLlist').append(element.renderFunction()) ;
            });
            $('#keys').append($('<option>', {
                // value: element.keyword,
                text: 'Filter by Keyword'
            }));
            keywords2.forEach(element=>{
                $('#keys').append($('<option>', {
                    // value: element.keyword,
                    text: element
                }));
            })

           
    })
})
$(document).ready(function() {
    
    $('#sorting').on('change',function() {
        let sortingOption= $("#sorting option:selected" ).text();
        let theOption= $("#keys option:selected" ).text();
        console.log(sortingOption)
       
    let selectedObj=[];
    
        // console.log(arrayOfObjects);
        if(theOption==='Filter by Keyword'){ selectedObj=arrayOfPage1;}
        arrayOfObjects.forEach((element,index)=>{
        if (element.keyword===theOption){
            selectedObj[index]=element;
            console.log(element.keyword)
        }
    })
    console.log(selectedObj)
    if(sortingOption==='title'){
        selectedObj.sort((a,b)=> b.title.toLowerCase() > a.title.toLowerCase() ?  -1:  1 );
    }else if(sortingOption==='horns'){
        selectedObj.sort((a,b)=>a.horns>b.horns?1:-1);
    }

    $('#dataLlist').empty();
    selectedObj.forEach(element=>{
        $('#dataLlist').append(element.renderFunction()) ;
    })
    })
    
    })

function readDataFromPage2(){

    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }

    $.ajax('data/page-2.json',ajaxSettings).then(data=>{

        data.forEach(element => {
            let getdata=new Data(element.image_url,element.title,element.description,element.keyword,element.horns);
            arrayOfPage2.push(getdata);
            if(!keywords2.includes(getdata.keyword)){keywords2.push(getdata.keyword);}
        });
    })
}

// console.log(arrayOfPage1);
// console.log(keywords1);
// console.log(arrayOfPage2);
// console.log(keywords2);