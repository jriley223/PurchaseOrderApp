/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function loadXMLDoc(filename)
{
    
    if (window.XMLHttpRequest)
    {
       var xhttp = new XMLHttpRequest();
    }
    else // code for IE5 and IE6
    {
       var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseXML;
}