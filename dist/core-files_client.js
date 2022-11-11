/*! For license information please see core-files_client.js.LICENSE.txt */
!function(){"use strict";var e,t={7913:function(e,t,r){var s=r(95573),n=r.n(s);!function(e,t){var r=function t(r){this._root=r.root,"/"===this._root.charAt(this._root.length-1)&&(this._root=this._root.substr(0,this._root.length-1));var s=t.PROTOCOL_HTTP+"://";r.useHTTPS&&(s=t.PROTOCOL_HTTPS+"://"),s+=r.host+this._root,this._host=r.host,this._defaultHeaders=r.defaultHeaders||{"X-Requested-With":"XMLHttpRequest",requesttoken:e.requestToken},this._baseUrl=s;var n={baseUrl:this._baseUrl,xmlNamespaces:{"DAV:":"d","http://owncloud.org/ns":"oc","http://nextcloud.org/ns":"nc","http://open-collaboration-services.org/ns":"ocs"}};r.userName&&(n.userName=r.userName),r.password&&(n.password=r.password),this._client=new dav.Client(n),this._client.xhrProvider=_.bind(this._xhrProvider,this),this._fileInfoParsers=[]};r.NS_OWNCLOUD="http://owncloud.org/ns",r.NS_NEXTCLOUD="http://nextcloud.org/ns",r.NS_DAV="DAV:",r.NS_OCS="http://open-collaboration-services.org/ns",r.PROPERTY_GETLASTMODIFIED="{"+r.NS_DAV+"}getlastmodified",r.PROPERTY_GETETAG="{"+r.NS_DAV+"}getetag",r.PROPERTY_GETCONTENTTYPE="{"+r.NS_DAV+"}getcontenttype",r.PROPERTY_RESOURCETYPE="{"+r.NS_DAV+"}resourcetype",r.PROPERTY_INTERNAL_FILEID="{"+r.NS_OWNCLOUD+"}fileid",r.PROPERTY_PERMISSIONS="{"+r.NS_OWNCLOUD+"}permissions",r.PROPERTY_SIZE="{"+r.NS_OWNCLOUD+"}size",r.PROPERTY_GETCONTENTLENGTH="{"+r.NS_DAV+"}getcontentlength",r.PROPERTY_ISENCRYPTED="{"+r.NS_DAV+"}is-encrypted",r.PROPERTY_SHARE_PERMISSIONS="{"+r.NS_OCS+"}share-permissions",r.PROPERTY_SHARE_ATTRIBUTES="{"+r.NS_NEXTCLOUD+"}share-attributes",r.PROPERTY_QUOTA_AVAILABLE_BYTES="{"+r.NS_DAV+"}quota-available-bytes",r.PROTOCOL_HTTP="http",r.PROTOCOL_HTTPS="https",r._PROPFIND_PROPERTIES=[[r.NS_DAV,"getlastmodified"],[r.NS_DAV,"getetag"],[r.NS_DAV,"getcontenttype"],[r.NS_DAV,"resourcetype"],[r.NS_OWNCLOUD,"fileid"],[r.NS_OWNCLOUD,"permissions"],[r.NS_OWNCLOUD,"size"],[r.NS_DAV,"getcontentlength"],[r.NS_DAV,"quota-available-bytes"],[r.NS_NEXTCLOUD,"has-preview"],[r.NS_NEXTCLOUD,"mount-type"],[r.NS_NEXTCLOUD,"is-encrypted"],[r.NS_OCS,"share-permissions"],[r.NS_NEXTCLOUD,"share-attributes"]],r.prototype={_root:null,_client:null,_fileInfoParsers:[],_xhrProvider:function(){var t=this._defaultHeaders,r=new XMLHttpRequest,s=r.open;return r.open=function(){var e=s.apply(this,arguments);return _.each(t,(function(e,t){r.setRequestHeader(t,e)})),e},e.registerXHRForErrorProcessing(r),r},_buildUrl:function(){var e=this._buildPath.apply(this,arguments);return"/"===e.charAt([e.length-1])&&(e=e.substr(0,e.length-1)),"/"===e.charAt(0)&&(e=e.substr(1)),this._baseUrl+"/"+e},_buildPath:function(){var t,r=e.joinPaths.apply(this,arguments),s=r.split("/");for(t=0;t<s.length;t++)s[t]=encodeURIComponent(s[t]);return s.join("/")},_parseHeaders:function(e){for(var t=e.split("\n"),r={},s=0;s<t.length;s++){var n=t[s].indexOf(":");if(!(n<0)){var i=t[s].substr(0,n),o=t[s].substr(n+2);r[i]||(r[i]=[]),r[i].push(o)}}return r},_parseEtag:function(e){return'"'===e.charAt(0)?e.split('"')[1]:e},_parseFileInfo:function(s){var n=decodeURIComponent(s.href);if(n.substr(0,this._root.length)===this._root&&(n=n.substr(this._root.length)),"/"===n.charAt(n.length-1)&&(n=n.substr(0,n.length-1)),0===s.propStat.length||"HTTP/1.1 200 OK"!==s.propStat[0].status)return null;var i=s.propStat[0].properties,o={id:i[r.PROPERTY_INTERNAL_FILEID],path:e.dirname(n)||"/",name:e.basename(n),mtime:new Date(i[r.PROPERTY_GETLASTMODIFIED]).getTime()},a=i[r.PROPERTY_GETETAG];_.isUndefined(a)||(o.etag=this._parseEtag(a));var u=i[r.PROPERTY_GETCONTENTLENGTH];_.isUndefined(u)||(o.size=parseInt(u,10)),u=i[r.PROPERTY_SIZE],_.isUndefined(u)||(o.size=parseInt(u,10));var c=i["{"+r.NS_NEXTCLOUD+"}has-preview"];_.isUndefined(c)?o.hasPreview=!0:o.hasPreview="true"===c;var l=i["{"+r.NS_NEXTCLOUD+"}is-encrypted"];_.isUndefined(l)?o.isEncrypted=!1:o.isEncrypted="1"===l;var p=i["{"+r.NS_OWNCLOUD+"}favorite"];_.isUndefined(p)?o.isFavourited=!1:o.isFavourited="1"===p;var h=i[r.PROPERTY_GETCONTENTTYPE];_.isUndefined(h)||(o.mimetype=h);var f=i[r.PROPERTY_RESOURCETYPE];if(!o.mimetype&&f){var d=f[0];d.namespaceURI===r.NS_DAV&&"collection"===d.nodeName.split(":")[1]&&(o.mimetype="httpd/unix-directory")}o.permissions=e.PERMISSION_NONE;var S=i[r.PROPERTY_PERMISSIONS];if(!_.isUndefined(S)){var E=S||"";o.mountType=null;for(var P=0;P<E.length;P++)switch(E.charAt(P)){case"C":case"K":o.permissions|=e.PERMISSION_CREATE;break;case"G":o.permissions|=e.PERMISSION_READ;break;case"W":case"N":case"V":o.permissions|=e.PERMISSION_UPDATE;break;case"D":o.permissions|=e.PERMISSION_DELETE;break;case"R":o.permissions|=e.PERMISSION_SHARE;break;case"M":o.mountType||(o.mountType="external");break;case"S":o.mountType="shared"}}var T=i[r.PROPERTY_SHARE_PERMISSIONS];_.isUndefined(T)||(o.sharePermissions=parseInt(T));var O=i[r.PROPERTY_SHARE_ATTRIBUTES];if(_.isUndefined(O))o.shareAttributes=[];else try{o.shareAttributes=JSON.parse(O)}catch(e){console.warn('Could not parse share attributes returned by server: "'+O+'"'),o.shareAttributes=[]}var g=i["{"+r.NS_NEXTCLOUD+"}mount-type"];_.isUndefined(g)||(o.mountType=g);var v=i["{"+r.NS_DAV+"}quota-available-bytes"];return _.isUndefined(v)||(o.quotaAvailableBytes=v),_.each(this._fileInfoParsers,(function(e){_.extend(o,e(s,o)||{})})),new t(o)},_parseResult:function(e){var t=this;return _.map(e,(function(e){return t._parseFileInfo(e)}))},_isSuccessStatus:function(e){return e>=200&&e<=299},_getSabreException:function(e){var t={},r=e.xhr.responseXML;if(null===r)return t;var s=r.getElementsByTagNameNS("http://sabredav.org/ns","message"),n=r.getElementsByTagNameNS("http://sabredav.org/ns","exception");return s.length&&(t.message=s[0].textContent),n.length&&(t.exception=n[0].textContent),t},getPropfindProperties:function(){return this._propfindProperties||(this._propfindProperties=_.map(r._PROPFIND_PROPERTIES,(function(e){return"{"+e[0]+"}"+e[1]}))),this._propfindProperties},getFolderContents:function(e,t){e||(e=""),t=t||{};var r,s=this,n=$.Deferred(),i=n.promise();return r=_.isUndefined(t.properties)?this.getPropfindProperties():t.properties,this._client.propFind(this._buildUrl(e),r,1).then((function(e){if(s._isSuccessStatus(e.status)){var r=s._parseResult(e.body);t&&t.includeParent||r.shift(),n.resolve(e.status,r)}else e=_.extend(e,s._getSabreException(e)),n.reject(e.status,e)})),i},getFilteredFiles:function(e,t){t=t||{};var r,s=this,i=$.Deferred(),o=i.promise();if(r=_.isUndefined(t.properties)?this.getPropfindProperties():t.properties,!e||!e.systemTagIds&&_.isUndefined(e.favorite)&&!e.circlesIds)throw"Missing filter argument";var a,u="<oc:filter-files ";for(a in this._client.xmlNamespaces)u+=" xmlns:"+this._client.xmlNamespaces[a]+'="'+a+'"';return u+=">\n",u+="    <"+this._client.xmlNamespaces["DAV:"]+":prop>\n",_.each(r,(function(e){var t=s._client.parseClarkNotation(e);u+="        <"+s._client.xmlNamespaces[t.namespace]+":"+t.name+" />\n"})),u+="    </"+this._client.xmlNamespaces["DAV:"]+":prop>\n",u+="    <oc:filter-rules>\n",_.each(e.systemTagIds,(function(e){u+="        <oc:systemtag>"+n()(e)+"</oc:systemtag>\n"})),_.each(e.circlesIds,(function(e){u+="        <oc:circle>"+n()(e)+"</oc:circle>\n"})),e.favorite&&(u+="        <oc:favorite>"+(e.favorite?"1":"0")+"</oc:favorite>\n"),u+="    </oc:filter-rules>\n",u+="</oc:filter-files>\n",this._client.request("REPORT",this._buildUrl(),{},u).then((function(e){if(s._isSuccessStatus(e.status)){var t=s._parseResult(e.body);i.resolve(e.status,t)}else e=_.extend(e,s._getSabreException(e)),i.reject(e.status,e)})),o},getFileInfo:function(e,t){e||(e=""),t=t||{};var r,s=this,n=$.Deferred(),i=n.promise();return r=_.isUndefined(t.properties)?this.getPropfindProperties():t.properties,this._client.propFind(this._buildUrl(e),r,0).then((function(e){s._isSuccessStatus(e.status)?n.resolve(e.status,s._parseResult([e.body])[0]):(e=_.extend(e,s._getSabreException(e)),n.reject(e.status,e))})),i},getFileContents:function(e){if(!e)throw'Missing argument "path"';var t=this,r=$.Deferred(),s=r.promise();return this._client.request("GET",this._buildUrl(e)).then((function(e){t._isSuccessStatus(e.status)?r.resolve(e.status,e.body):(e=_.extend(e,t._getSabreException(e)),r.reject(e.status,e))})),s},putFileContents:function(e,t,r){if(!e)throw'Missing argument "path"';var s=this,n=$.Deferred(),i=n.promise(),o={},a="text/plain;charset=utf-8";return(r=r||{}).contentType&&(a=r.contentType),o["Content-Type"]=a,(_.isUndefined(r.overwrite)||r.overwrite)&&(o["If-None-Match"]="*"),this._client.request("PUT",this._buildUrl(e),o,t||"").then((function(e){s._isSuccessStatus(e.status)?n.resolve(e.status):(e=_.extend(e,s._getSabreException(e)),n.reject(e.status,e))})),i},_simpleCall:function(e,t){if(!t)throw'Missing argument "path"';var r=this,s=$.Deferred(),n=s.promise();return this._client.request(e,this._buildUrl(t)).then((function(e){r._isSuccessStatus(e.status)?s.resolve(e.status):(e=_.extend(e,r._getSabreException(e)),s.reject(e.status,e))})),n},createDirectory:function(e){return this._simpleCall("MKCOL",e)},remove:function(e){return this._simpleCall("DELETE",e)},move:function(e,t,r,s){if(!e)throw'Missing argument "path"';if(!t)throw'Missing argument "destinationPath"';var n=this,i=$.Deferred(),o=i.promise();return s=_.extend({},s,{Destination:this._buildUrl(t)}),r||(s.Overwrite="F"),this._client.request("MOVE",this._buildUrl(e),s).then((function(e){n._isSuccessStatus(e.status)?i.resolve(e.status):(e=_.extend(e,n._getSabreException(e)),i.reject(e.status,e))})),o},copy:function(e,t,r){if(!e)throw'Missing argument "path"';if(!t)throw'Missing argument "destinationPath"';var s=this,n=$.Deferred(),i=n.promise(),o={Destination:this._buildUrl(t)};return r||(o.Overwrite="F"),this._client.request("COPY",this._buildUrl(e),o).then((function(e){s._isSuccessStatus(e.status)?n.resolve(e.status):n.reject(e.status)})),i},addFileInfoParser:function(e){this._fileInfoParsers.push(e)},getClient:function(){return this._client},getUserName:function(){return this._client.userName},getPassword:function(){return this._client.password},getBaseUrl:function(){return this._client.baseUrl},getHost:function(){return this._host}},e.Files||(e.Files={}),e.Files.getClient=function(){if(e.Files._defaultClient)return e.Files._defaultClient;var t=new e.Files.Client({host:e.getHost(),port:e.getPort(),root:e.linkToRemoteBase("dav")+"/files/"+e.getCurrentUser().uid,useHTTPS:"https"===e.getProtocol()});return e.Files._defaultClient=t,t},e.Files.Client=r}(OC,OC.Files.FileInfo)}},r={};function s(e){var n=r[e];if(void 0!==n)return n.exports;var i=r[e]={id:e,loaded:!1,exports:{}};return t[e].call(i.exports,i,i.exports,s),i.loaded=!0,i.exports}s.m=t,s.amdD=function(){throw new Error("define cannot be used indirect")},s.amdO={},e=[],s.O=function(t,r,n,i){if(!r){var o=1/0;for(l=0;l<e.length;l++){r=e[l][0],n=e[l][1],i=e[l][2];for(var a=!0,u=0;u<r.length;u++)(!1&i||o>=i)&&Object.keys(s.O).every((function(e){return s.O[e](r[u])}))?r.splice(u--,1):(a=!1,i<o&&(o=i));if(a){e.splice(l--,1);var c=n();void 0!==c&&(t=c)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[r,n,i]},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,{a:t}),t},s.d=function(e,t){for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},s.j=5578,function(){s.b=document.baseURI||self.location.href;var e={5578:0};s.O.j=function(t){return 0===e[t]};var t=function(t,r){var n,i,o=r[0],a=r[1],u=r[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(n in a)s.o(a,n)&&(s.m[n]=a[n]);if(u)var l=u(s)}for(t&&t(r);c<o.length;c++)i=o[c],s.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return s.O(l)},r=self.webpackChunknextcloud=self.webpackChunknextcloud||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}(),s.nc=void 0;var n=s.O(void 0,[7874],(function(){return s(7913)}));n=s.O(n)}();
//# sourceMappingURL=core-files_client.js.map?v=366b5a754e04c503dcf6