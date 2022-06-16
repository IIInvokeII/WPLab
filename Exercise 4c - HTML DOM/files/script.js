var selected=0;
var row=0;
var column=0;

function randomize()
{
    numbers=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    document.getElementById(1).innerHTML='';
    i=2;
    while(numbers.length!=0)
    {
        x=Math.floor(Math.random() * numbers.length);
        val=numbers[x];
        document.getElementById(i).innerHTML=val;
        numbers.splice(x,1);
        i+=1;
    }
}


function hideagain(x,issue)
{
    x.className='normal';
    document.getElementById(row*4+column+1).className='normal';
    document.getElementById(issue).className='hide';
}

function completed()
{
    for(var i=2;i<=16;i++)
    {
        if(document.getElementById(i).innerHTML!=i-1)
            return 0;
    }
    return 1;
}

function neighbour(r,c)
{
    var arr=[[row-1,column],[row,column-1],[row+1,column],[row,column+1]];
    if(arr.findIndex((val)=>{return val[0]==r && val[1]==c})!=-1)
        return 1;
    return 0;
}

function action(element)
{
    if(selected==0)
    {
        if(element.innerHTML=='')
        {
            element.className='valid';
            selected=1;
            var tot=element.id;
            row=Math.floor((tot-1)/4);
            column=tot-(row*4)-1;
        }
    }
    else
    {
        if(element.innerHTML=='')
        {
            element.className='normal';
        }
        else
        {
            var tot=element.id;
            row_selected=Math.floor((tot-1)/4);
            column_selected=tot-(row_selected*4)-1;
            if(neighbour(row_selected,column_selected))
            {
                var temp=element.innerHTML;
                var emptyval=document.getElementById(row*4+column+1);
                element.innerHTML=emptyval.innerHTML;
                emptyval.innerHTML=temp;
                emptyval.className='normal';
                row=row_selected;
                column=column_selected;
            }
            else
            {
                element.className='invalid';
                document.getElementById(row*4+column+1).className='invalid';
                document.getElementById('issue').className='show';
                showfor1s=setTimeout(hideagain, 1000, element,'issue');
            }
        }
        if(completed())
        {
            document.getElementById('finished').className='show';
            showfor1s=setTimeout(() => {document.getElementById('finished').className='hide';randomize();}, 1000);
        }
        selected=0;
    }
}
