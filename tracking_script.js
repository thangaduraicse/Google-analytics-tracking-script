// Google Tracking Conversion
// This function below parses a string and returns a value.  We will use it to get data from the __utmz cookie
$.fn._uGC = function(l,n,s) {
  if (!l || l=="" || !n || n=="" || !s || s=="") return "-";
  var i,i2,i3,c="-";
  i=l.indexOf(n);
  i3=n.indexOf("=")+1;
  if (i>-1) {
  i2=l.indexOf(s,i); if (i2 < 0) { i2=l.length; }
  c=l.substring((i+i3),i2);
  }
  return c;
}

// Get UTMz Parameters
$.fn.utmz_tracking_conversion = function() {
  // Get the Tracking Conversion
  var pageTracker = _gat._getTracker("UA-1-1");
  pageTracker._trackPageview();
  //
  // Get the __utmz cookie value. This cookie
  // stores all campaign related information information.
  //
  var z = $.fn._uGC(document.cookie, '__utmz=', ';');
  //
  // The cookie has a number of namevalue pairs.
  // Each identifies an aspect of the campaign.
  //
  // utmcsr  = campaign source (Google, Yahoo, LinkedIn, News Letter)
  // utmcmd  = campaign medium (Direct, Organic, CPC, Referral, EMail)
  // utmctr  = campaign term (keyword)
  // utmcct  = campaign content  (Typically Ad Header or Theme)
  // utmccn  = campaign name (Mobile |Tableau | CMS)
  // utmgclid = unique identifier used when AdWords auto tagging is enabled
  //
  // This code separates the campaigntracking cookie
  // and populates a variable with each piece of campaign info.
  //
  var source  = $.fn._uGC(z, 'utmcsr=', '|');
  var medium  = $.fn._uGC(z, 'utmcmd=', '|');
  var term    = $.fn._uGC(z, 'utmctr=', '|');
  var content = $.fn._uGC(z, 'utmcct=', '|');
  var campaign = $.fn._uGC(z, 'utmccn=', '|');
  var gclid   = $.fn._uGC(z, 'utmgclid=', '|');
  //
  // The gclid is ONLY present when auto tagging has been enabled.
  // All other variables, except the term variable, will be '(not set)'.
  // Because the gclid is only present for Google AdWords we can
  // populate some other variables that would normally
  // be left blank.
  //
  if (gclid !="-") {
    source = 'google';
    medium = 'cpc';
  }
  // Data from the custom segmentation cookie can also be passed
  // back to your server via a hidden form field
  var csegment = $.fn._uGC(document.cookie, '__utmv=', ';');
  if (csegment != '-') {
    var csegmentex = /[1-9]*?\.(.*)/;
    csegment    = csegment.match(csegmentex);
    csegment    = csegment[1];
  } else {
    csegment = '(not set)';
  }
  //
  // Additional Visitor Visits Information
  // We're going to extract the number of visits that the visitor
  // has generated.  It's also stored in a cookie, the __utma cookis
  //
  var a = $.fn._uGC(document.cookie, '__utma=', ';');
  var aParts = a.split(".");
  var nVisits = aParts[5];
  // return the tracking info as an array
  return {
    source: source,
    medium: medium,
    term: term,
    content: content,
    campaign: campaign,
    csegment: csegment,
    nVisits: nVisits
  }
}