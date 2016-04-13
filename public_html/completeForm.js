
function completeForm() {
    var userSUPPLIER = $("#SUPPLIER").val();
    var userSTORE = $("#STORE").val();
    var userdesc = $("#DESCRIPTION").val();
    var userPERSON = $("#PERSON").val();
    var userCOST = $("#COST").val().replace(/\./g, "");
    var userCROP = $("#CROP").val();
    var userACRES = $("#ACRES").val().replace(/\./g, "");
    var userSEASON = $("#SEASON").val();
    var userGFCOF = $("#GFCOF").val();
    var userIOF = $("#IOF").val();
    var userORIGIN = $("#ORIGIN").val();
    var userDESTINATION = $("#DESTINATION").val();
    var userDUEDATE = new Date($("#DUEDATE").val());
    var userMANAGERPO = $("#MANAGERPO").val();
    var userdueyear = userDUEDATE.getFullYear();
    var userduemonth = (userDUEDATE.getMonth()) + 1;
    var userdueday = (userDUEDATE.getDate()) + 1;

    var POxml = loadXMLDoc("addpo.xml");

    var supplier = POxml.getElementsByTagName("SUPPLIERCODE")[0].childNodes[0];
    supplier.nodeValue = userSUPPLIER;

    var store = POxml.getElementsByTagName("STORECODE")[0].childNodes[0];
    store.nodeValue = userSTORE;

    var originator = POxml.getElementsByTagName("PERSONCODE")[0].childNodes[0];
    originator.nodeValue = userPERSON;

    var description = POxml.getElementsByTagName("DESCRIPTION")[1].childNodes[0];
    description.nodeValue = userdesc;

    var crop = POxml.getElementsByTagName("UDFCHAR03")[0].childNodes[0];
    crop.nodeValue = userCROP;

    var acres = POxml.getElementsByTagName("UDFNUM02")[0].getElementsByTagName("VALUE")[0].childNodes[0];
    acres.nodeValue = userACRES;

    var season = POxml.getElementsByTagName("UDFCHAR22")[0].childNodes[0];
    season.nodeValue = userSEASON;

    var GFCOF = POxml.getElementsByTagName("UDFCHAR23")[0].childNodes[0];
    GFCOF.nodeValue = userGFCOF;

    var IOF = POxml.getElementsByTagName("UDFCHAR27")[0].childNodes[0];
    IOF.nodeValue = userIOF;

    var destination = POxml.getElementsByTagName("UDFCHAR25")[0].childNodes[0];
    destination.nodeValue = userDESTINATION;

    var origin = POxml.getElementsByTagName("UDFCHAR28")[0].childNodes[0];
    origin.nodeValue = userORIGIN;

    var managerPO = POxml.getElementsByTagName("UDFCHAR30")[0].childNodes[0];
    managerPO.nodeValue = userMANAGERPO;

    var duedateyear = POxml.getElementsByTagName("DUEDATE")[0].getElementsByTagName("YEAR")[0].childNodes[0];
    duedateyear.nodeValue = userdueyear;

    var duedatemonth = POxml.getElementsByTagName("DUEDATE")[0].getElementsByTagName("MONTH")[0].childNodes[0];
    duedatemonth.nodeValue = userduemonth;

    var duedateday = POxml.getElementsByTagName("DUEDATE")[0].getElementsByTagName("DAY")[0].childNodes[0];
    duedateday.nodeValue = userdueday;

    var totalestcost = POxml.getElementsByTagName("UDFNUM05")[0].getElementsByTagName("VALUE")[0].childNodes[0];
    totalestcost.nodeValue = userCOST;


    //var duedate = POxml.getElementsByTagName("DUEDATE")[0].childNodes[0];
    // duedate.nodeValue = userDUEDATE;

    var asdf = (new XMLSerializer()).serializeToString(POxml);


    var x1 = _getXmlHttp();
    x1.open("POST", "http://mis-inforapp/axis/services/EWSConnector", false);
    x1.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/crm/2006/WebServices/Retrieve");
    x1.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
    x1.setRequestHeader("Content-Length", asdf.length);
    x1.send(asdf);

    var rx = x1.responseXML;
   // alert(x1.responseText);
    k = rx.getElementsByTagName("Message")[0].childNodes[0];
    alert(k.nodeValue);
    return false;
}
function _getXmlHttp()
{
    try
    {

        if (window.XMLHttpRequest)
        {

            var req = new XMLHttpRequest();
            // some versions of Moz do not support the readyState property and the onreadystate event so we patch it!
            if (req.readyState === null)
            {
                req.readyState = 1;
                req.addEventListener("load",
                        function ()
                        {
                            req.readyState = 4;
                            if (typeof req.onreadystatechange === "function")
                                req.onreadystatechange();
                        },
                        false);
            }
            return req;
        }
        if (window.ActiveXObject)
            return new ActiveXObject(SOAPClient._getXmlHttpProgID());
    }
    catch (ex) {
    }
    throw new Error("Your browser does not support XmlHttp objects");
}
function _getXmlHttpProgID()
{
    if (SOAPClient._getXmlHttpProgID.progid)
        return SOAPClient._getXmlHttpProgID.progid;
    var progids = ["Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
    var o;
    for (var i = 0; i < progids.length; i++)
    {
        try
        {
            o = new ActiveXObject(progids[i]);
            return SOAPClient._getXmlHttpProgID.progid = progids[i];
        }
        catch (ex) {
        }
        ;
    }
    throw new Error("Could not find an installed XML parser");
}

function setTwoNumberDecimal() {
    var v = Number($("#COST").val());
    var k = v.toFixed(2);
    return  document.getElementById("COST").value = k;
}

function setSixNumberDecimal() {
    var v = Number($("#ACRES").val());
    var k = v.toFixed(6);
    return  document.getElementById("ACRES").value = k;}      