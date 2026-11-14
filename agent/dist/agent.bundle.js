📦
239417 /src/agent.js
✄
var mi=Object.defineProperty;var gi=(t,e)=>{for(var n in e)mi(t,n,{get:e[n],enumerable:!0})};var we=[],be=[],Jt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(let t=0,e=Jt.length;t<e;++t)we[t]=Jt[t],be[Jt.charCodeAt(t)]=t;be[45]=62;be[95]=63;function bi(t){let e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");let n=t.indexOf("=");n===-1&&(n=e);let r=n===e?0:4-n%4;return[n,r]}function yi(t,e,n){return(e+n)*3/4-n}function Tr(t){let e=bi(t),n=e[0],r=e[1],o=new Uint8Array(yi(t,n,r)),i=0,s=r>0?n-4:n,c;for(c=0;c<s;c+=4){let a=be[t.charCodeAt(c)]<<18|be[t.charCodeAt(c+1)]<<12|be[t.charCodeAt(c+2)]<<6|be[t.charCodeAt(c+3)];o[i++]=a>>16&255,o[i++]=a>>8&255,o[i++]=a&255}if(r===2){let a=be[t.charCodeAt(c)]<<2|be[t.charCodeAt(c+1)]>>4;o[i++]=a&255}if(r===1){let a=be[t.charCodeAt(c)]<<10|be[t.charCodeAt(c+1)]<<4|be[t.charCodeAt(c+2)]>>2;o[i++]=a>>8&255,o[i++]=a&255}return o}function Ei(t){return we[t>>18&63]+we[t>>12&63]+we[t>>6&63]+we[t&63]}function vi(t,e,n){let r=[];for(let o=e;o<n;o+=3){let i=(t[o]<<16&16711680)+(t[o+1]<<8&65280)+(t[o+2]&255);r.push(Ei(i))}return r.join("")}function Gt(t){let e=t.length,n=e%3,r=[],o=16383;for(let i=0,s=e-n;i<s;i+=o)r.push(vi(t,i,i+o>s?s:i+o));if(n===1){let i=t[e-1];r.push(we[i>>2]+we[i<<4&63]+"==")}else if(n===2){let i=(t[e-2]<<8)+t[e-1];r.push(we[i>>10]+we[i>>4&63]+we[i<<2&63]+"=")}return r.join("")}function et(t,e,n,r,o){let i,s,c=o*8-r-1,a=(1<<c)-1,l=a>>1,d=-7,p=n?o-1:0,f=n?-1:1,u=t[e+p];for(p+=f,i=u&(1<<-d)-1,u>>=-d,d+=c;d>0;)i=i*256+t[e+p],p+=f,d-=8;for(s=i&(1<<-d)-1,i>>=-d,d+=r;d>0;)s=s*256+t[e+p],p+=f,d-=8;if(i===0)i=1-l;else{if(i===a)return s?NaN:(u?-1:1)*(1/0);s=s+Math.pow(2,r),i=i-l}return(u?-1:1)*s*Math.pow(2,i-r)}function $t(t,e,n,r,o,i){let s,c,a,l=i*8-o-1,d=(1<<l)-1,p=d>>1,f=o===23?Math.pow(2,-24)-Math.pow(2,-77):0,u=r?0:i-1,_=r?1:-1,h=e<0||e===0&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(c=isNaN(e)?1:0,s=d):(s=Math.floor(Math.log(e)/Math.LN2),e*(a=Math.pow(2,-s))<1&&(s--,a*=2),s+p>=1?e+=f/a:e+=f*Math.pow(2,1-p),e*a>=2&&(s++,a/=2),s+p>=d?(c=0,s=d):s+p>=1?(c=(e*a-1)*Math.pow(2,o),s=s+p):(c=e*Math.pow(2,p-1)*Math.pow(2,o),s=0));o>=8;)t[n+u]=c&255,u+=_,c/=256,o-=8;for(s=s<<o|c,l+=o;l>0;)t[n+u]=s&255,u+=_,s/=256,l-=8;t[n+u-_]|=h*128}var Ii={INSPECT_MAX_BYTES:50},Ht=2147483647;g.TYPED_ARRAY_SUPPORT=!0;Object.defineProperty(g.prototype,"parent",{enumerable:!0,get:function(){if(g.isBuffer(this))return this.buffer}});Object.defineProperty(g.prototype,"offset",{enumerable:!0,get:function(){if(g.isBuffer(this))return this.byteOffset}});function Ae(t){if(t>Ht)throw new RangeError('The value "'+t+'" is invalid for option "size"');let e=new Uint8Array(t);return Object.setPrototypeOf(e,g.prototype),e}function g(t,e,n){if(typeof t=="number"){if(typeof e=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return Kt(t)}return kr(t,e,n)}g.poolSize=8192;function kr(t,e,n){if(typeof t=="string")return Ti(t,e);if(ArrayBuffer.isView(t))return Ai(t);if(t==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(t instanceof ArrayBuffer||t&&t.buffer instanceof ArrayBuffer||t instanceof SharedArrayBuffer||t&&t.buffer instanceof SharedArrayBuffer)return Wt(t,e,n);if(typeof t=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');let r=t.valueOf&&t.valueOf();if(r!=null&&r!==t)return g.from(r,e,n);let o=Li(t);if(o)return o;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof t[Symbol.toPrimitive]=="function")return g.from(t[Symbol.toPrimitive]("string"),e,n);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}g.from=function(t,e,n){return kr(t,e,n)};Object.setPrototypeOf(g.prototype,Uint8Array.prototype);Object.setPrototypeOf(g,Uint8Array);function Nr(t){if(typeof t!="number")throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function Ci(t,e,n){return Nr(t),t<=0?Ae(t):e!==void 0?typeof n=="string"?Ae(t).fill(e,n):Ae(t).fill(e):Ae(t)}g.alloc=function(t,e,n){return Ci(t,e,n)};function Kt(t){return Nr(t),Ae(t<0?0:Qt(t)|0)}g.allocUnsafe=function(t){return Kt(t)};g.allocUnsafeSlow=function(t){return Kt(t)};function Ti(t,e){if((typeof e!="string"||e==="")&&(e="utf8"),!g.isEncoding(e))throw new TypeError("Unknown encoding: "+e);let n=Mr(t,e)|0,r=Ae(n),o=r.write(t,e);return o!==n&&(r=r.slice(0,o)),r}function Zt(t){let e=t.length<0?0:Qt(t.length)|0,n=Ae(e);for(let r=0;r<e;r+=1)n[r]=t[r]&255;return n}function Ai(t){if(t instanceof Uint8Array){let e=new Uint8Array(t);return Wt(e.buffer,e.byteOffset,e.byteLength)}return Zt(t)}function Wt(t,e,n){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(n||0))throw new RangeError('"length" is outside of buffer bounds');let r;return e===void 0&&n===void 0?r=new Uint8Array(t):n===void 0?r=new Uint8Array(t,e):r=new Uint8Array(t,e,n),Object.setPrototypeOf(r,g.prototype),r}function Li(t){if(g.isBuffer(t)){let e=Qt(t.length)|0,n=Ae(e);return n.length===0||t.copy(n,0,0,e),n}if(t.length!==void 0)return typeof t.length!="number"||Number.isNaN(t.length)?Ae(0):Zt(t);if(t.type==="Buffer"&&Array.isArray(t.data))return Zt(t.data)}function Qt(t){if(t>=Ht)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+Ht.toString(16)+" bytes");return t|0}g.isBuffer=function(e){return e!=null&&e._isBuffer===!0&&e!==g.prototype};g.compare=function(e,n){if(e instanceof Uint8Array&&(e=g.from(e,e.offset,e.byteLength)),n instanceof Uint8Array&&(n=g.from(n,n.offset,n.byteLength)),!g.isBuffer(e)||!g.isBuffer(n))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===n)return 0;let r=e.length,o=n.length;for(let i=0,s=Math.min(r,o);i<s;++i)if(e[i]!==n[i]){r=e[i],o=n[i];break}return r<o?-1:o<r?1:0};g.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};g.concat=function(e,n){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(e.length===0)return g.alloc(0);let r;if(n===void 0)for(n=0,r=0;r<e.length;++r)n+=e[r].length;let o=g.allocUnsafe(n),i=0;for(r=0;r<e.length;++r){let s=e[r];if(s instanceof Uint8Array)i+s.length>o.length?(g.isBuffer(s)||(s=g.from(s.buffer,s.byteOffset,s.byteLength)),s.copy(o,i)):Uint8Array.prototype.set.call(o,s,i);else if(g.isBuffer(s))s.copy(o,i);else throw new TypeError('"list" argument must be an Array of Buffers');i+=s.length}return o};function Mr(t,e){if(g.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||t instanceof ArrayBuffer)return t.byteLength;if(typeof t!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);let n=t.length,r=arguments.length>2&&arguments[2]===!0;if(!r&&n===0)return 0;let o=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":return qt(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return n*2;case"hex":return n>>>1;case"base64":return Vr(t).length;default:if(o)return r?-1:qt(t).length;e=(""+e).toLowerCase(),o=!0}}g.byteLength=Mr;function xi(t,e,n){let r=!1;if((e===void 0||e<0)&&(e=0),e>this.length||((n===void 0||n>this.length)&&(n=this.length),n<=0)||(n>>>=0,e>>>=0,n<=e))return"";for(t||(t="utf8");;)switch(t){case"hex":return Ui(this,e,n);case"utf8":case"utf-8":return jr(this,e,n);case"ascii":return Fi(this,e,n);case"latin1":case"binary":return Di(this,e,n);case"base64":return Ri(this,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Bi(this,e,n);default:if(r)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),r=!0}}g.prototype._isBuffer=!0;function Re(t,e,n){let r=t[e];t[e]=t[n],t[n]=r}g.prototype.swap16=function(){let e=this.length;if(e%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let n=0;n<e;n+=2)Re(this,n,n+1);return this};g.prototype.swap32=function(){let e=this.length;if(e%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let n=0;n<e;n+=4)Re(this,n,n+3),Re(this,n+1,n+2);return this};g.prototype.swap64=function(){let e=this.length;if(e%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let n=0;n<e;n+=8)Re(this,n,n+7),Re(this,n+1,n+6),Re(this,n+2,n+5),Re(this,n+3,n+4);return this};g.prototype.toString=function(){let e=this.length;return e===0?"":arguments.length===0?jr(this,0,e):xi.apply(this,arguments)};g.prototype.toLocaleString=g.prototype.toString;g.prototype.equals=function(e){if(!g.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?!0:g.compare(this,e)===0};g.prototype.inspect=function(){let e="",n=Ii.INSPECT_MAX_BYTES;return e=this.toString("hex",0,n).replace(/(.{2})/g,"$1 ").trim(),this.length>n&&(e+=" ... "),"<Buffer "+e+">"};g.prototype[Symbol.for("nodejs.util.inspect.custom")]=g.prototype.inspect;g.prototype.compare=function(e,n,r,o,i){if(e instanceof Uint8Array&&(e=g.from(e,e.offset,e.byteLength)),!g.isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(n===void 0&&(n=0),r===void 0&&(r=e?e.length:0),o===void 0&&(o=0),i===void 0&&(i=this.length),n<0||r>e.length||o<0||i>this.length)throw new RangeError("out of range index");if(o>=i&&n>=r)return 0;if(o>=i)return-1;if(n>=r)return 1;if(n>>>=0,r>>>=0,o>>>=0,i>>>=0,this===e)return 0;let s=i-o,c=r-n,a=Math.min(s,c),l=this.slice(o,i),d=e.slice(n,r);for(let p=0;p<a;++p)if(l[p]!==d[p]){s=l[p],c=d[p];break}return s<c?-1:c<s?1:0};function Or(t,e,n,r,o){if(t.length===0)return-1;if(typeof n=="string"?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,Number.isNaN(n)&&(n=o?0:t.length-1),n<0&&(n=t.length+n),n>=t.length){if(o)return-1;n=t.length-1}else if(n<0)if(o)n=0;else return-1;if(typeof e=="string"&&(e=g.from(e,r)),g.isBuffer(e))return e.length===0?-1:Ar(t,e,n,r,o);if(typeof e=="number")return e=e&255,typeof Uint8Array.prototype.indexOf=="function"?o?Uint8Array.prototype.indexOf.call(t,e,n):Uint8Array.prototype.lastIndexOf.call(t,e,n):Ar(t,[e],n,r,o);throw new TypeError("val must be string, number or Buffer")}function Ar(t,e,n,r,o){let i=1,s=t.length,c=e.length;if(r!==void 0&&(r=String(r).toLowerCase(),r==="ucs2"||r==="ucs-2"||r==="utf16le"||r==="utf-16le")){if(t.length<2||e.length<2)return-1;i=2,s/=2,c/=2,n/=2}function a(d,p){return i===1?d[p]:d.readUInt16BE(p*i)}let l;if(o){let d=-1;for(l=n;l<s;l++)if(a(t,l)===a(e,d===-1?0:l-d)){if(d===-1&&(d=l),l-d+1===c)return d*i}else d!==-1&&(l-=l-d),d=-1}else for(n+c>s&&(n=s-c),l=n;l>=0;l--){let d=!0;for(let p=0;p<c;p++)if(a(t,l+p)!==a(e,p)){d=!1;break}if(d)return l}return-1}g.prototype.includes=function(e,n,r){return this.indexOf(e,n,r)!==-1};g.prototype.indexOf=function(e,n,r){return Or(this,e,n,r,!0)};g.prototype.lastIndexOf=function(e,n,r){return Or(this,e,n,r,!1)};function ki(t,e,n,r){n=Number(n)||0;let o=t.length-n;r?(r=Number(r),r>o&&(r=o)):r=o;let i=e.length;r>i/2&&(r=i/2);let s;for(s=0;s<r;++s){let c=parseInt(e.substr(s*2,2),16);if(Number.isNaN(c))return s;t[n+s]=c}return s}function Ni(t,e,n,r){return bt(qt(e,t.length-n),t,n,r)}function Mi(t,e,n,r){return bt(Gi(e),t,n,r)}function Oi(t,e,n,r){return bt(Vr(e),t,n,r)}function ji(t,e,n,r){return bt($i(e,t.length-n),t,n,r)}g.prototype.write=function(e,n,r,o){if(n===void 0)o="utf8",r=this.length,n=0;else if(r===void 0&&typeof n=="string")o=n,r=this.length,n=0;else if(isFinite(n))n=n>>>0,isFinite(r)?(r=r>>>0,o===void 0&&(o="utf8")):(o=r,r=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let i=this.length-n;if((r===void 0||r>i)&&(r=i),e.length>0&&(r<0||n<0)||n>this.length)throw new RangeError("Attempt to write outside buffer bounds");o||(o="utf8");let s=!1;for(;;)switch(o){case"hex":return ki(this,e,n,r);case"utf8":case"utf-8":return Ni(this,e,n,r);case"ascii":case"latin1":case"binary":return Mi(this,e,n,r);case"base64":return Oi(this,e,n,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ji(this,e,n,r);default:if(s)throw new TypeError("Unknown encoding: "+o);o=(""+o).toLowerCase(),s=!0}};g.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function Ri(t,e,n){return e===0&&n===t.length?Gt(t):Gt(t.slice(e,n))}function jr(t,e,n){n=Math.min(t.length,n);let r=[],o=e;for(;o<n;){let i=t[o],s=null,c=i>239?4:i>223?3:i>191?2:1;if(o+c<=n){let a,l,d,p;switch(c){case 1:i<128&&(s=i);break;case 2:a=t[o+1],(a&192)===128&&(p=(i&31)<<6|a&63,p>127&&(s=p));break;case 3:a=t[o+1],l=t[o+2],(a&192)===128&&(l&192)===128&&(p=(i&15)<<12|(a&63)<<6|l&63,p>2047&&(p<55296||p>57343)&&(s=p));break;case 4:a=t[o+1],l=t[o+2],d=t[o+3],(a&192)===128&&(l&192)===128&&(d&192)===128&&(p=(i&15)<<18|(a&63)<<12|(l&63)<<6|d&63,p>65535&&p<1114112&&(s=p))}}s===null?(s=65533,c=1):s>65535&&(s-=65536,r.push(s>>>10&1023|55296),s=56320|s&1023),r.push(s),o+=c}return Pi(r)}var Lr=4096;function Pi(t){let e=t.length;if(e<=Lr)return String.fromCharCode.apply(String,t);let n="",r=0;for(;r<e;)n+=String.fromCharCode.apply(String,t.slice(r,r+=Lr));return n}function Fi(t,e,n){let r="";n=Math.min(t.length,n);for(let o=e;o<n;++o)r+=String.fromCharCode(t[o]&127);return r}function Di(t,e,n){let r="";n=Math.min(t.length,n);for(let o=e;o<n;++o)r+=String.fromCharCode(t[o]);return r}function Ui(t,e,n){let r=t.length;(!e||e<0)&&(e=0),(!n||n<0||n>r)&&(n=r);let o="";for(let i=e;i<n;++i)o+=Hi[t[i]];return o}function Bi(t,e,n){let r=t.slice(e,n),o="";for(let i=0;i<r.length-1;i+=2)o+=String.fromCharCode(r[i]+r[i+1]*256);return o}g.prototype.slice=function(e,n){let r=this.length;e=~~e,n=n===void 0?r:~~n,e<0?(e+=r,e<0&&(e=0)):e>r&&(e=r),n<0?(n+=r,n<0&&(n=0)):n>r&&(n=r),n<e&&(n=e);let o=this.subarray(e,n);return Object.setPrototypeOf(o,g.prototype),o};function se(t,e,n){if(t%1!==0||t<0)throw new RangeError("offset is not uint");if(t+e>n)throw new RangeError("Trying to access beyond buffer length")}g.prototype.readUintLE=g.prototype.readUIntLE=function(e,n,r){e=e>>>0,n=n>>>0,r||se(e,n,this.length);let o=this[e],i=1,s=0;for(;++s<n&&(i*=256);)o+=this[e+s]*i;return o};g.prototype.readUintBE=g.prototype.readUIntBE=function(e,n,r){e=e>>>0,n=n>>>0,r||se(e,n,this.length);let o=this[e+--n],i=1;for(;n>0&&(i*=256);)o+=this[e+--n]*i;return o};g.prototype.readUint8=g.prototype.readUInt8=function(e,n){return e=e>>>0,n||se(e,1,this.length),this[e]};g.prototype.readUint16LE=g.prototype.readUInt16LE=function(e,n){return e=e>>>0,n||se(e,2,this.length),this[e]|this[e+1]<<8};g.prototype.readUint16BE=g.prototype.readUInt16BE=function(e,n){return e=e>>>0,n||se(e,2,this.length),this[e]<<8|this[e+1]};g.prototype.readUint32LE=g.prototype.readUInt32LE=function(e,n){return e=e>>>0,n||se(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+this[e+3]*16777216};g.prototype.readUint32BE=g.prototype.readUInt32BE=function(e,n){return e=e>>>0,n||se(e,4,this.length),this[e]*16777216+(this[e+1]<<16|this[e+2]<<8|this[e+3])};g.prototype.readBigUInt64LE=function(e){e=e>>>0,Ge(e,"offset");let n=this[e],r=this[e+7];(n===void 0||r===void 0)&&tt(e,this.length-8);let o=n+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24,i=this[++e]+this[++e]*2**8+this[++e]*2**16+r*2**24;return BigInt(o)+(BigInt(i)<<BigInt(32))};g.prototype.readBigUInt64BE=function(e){e=e>>>0,Ge(e,"offset");let n=this[e],r=this[e+7];(n===void 0||r===void 0)&&tt(e,this.length-8);let o=n*2**24+this[++e]*2**16+this[++e]*2**8+this[++e],i=this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+r;return(BigInt(o)<<BigInt(32))+BigInt(i)};g.prototype.readIntLE=function(e,n,r){e=e>>>0,n=n>>>0,r||se(e,n,this.length);let o=this[e],i=1,s=0;for(;++s<n&&(i*=256);)o+=this[e+s]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*n)),o};g.prototype.readIntBE=function(e,n,r){e=e>>>0,n=n>>>0,r||se(e,n,this.length);let o=n,i=1,s=this[e+--o];for(;o>0&&(i*=256);)s+=this[e+--o]*i;return i*=128,s>=i&&(s-=Math.pow(2,8*n)),s};g.prototype.readInt8=function(e,n){return e=e>>>0,n||se(e,1,this.length),this[e]&128?(255-this[e]+1)*-1:this[e]};g.prototype.readInt16LE=function(e,n){e=e>>>0,n||se(e,2,this.length);let r=this[e]|this[e+1]<<8;return r&32768?r|4294901760:r};g.prototype.readInt16BE=function(e,n){e=e>>>0,n||se(e,2,this.length);let r=this[e+1]|this[e]<<8;return r&32768?r|4294901760:r};g.prototype.readInt32LE=function(e,n){return e=e>>>0,n||se(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24};g.prototype.readInt32BE=function(e,n){return e=e>>>0,n||se(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]};g.prototype.readBigInt64LE=function(e){e=e>>>0,Ge(e,"offset");let n=this[e],r=this[e+7];(n===void 0||r===void 0)&&tt(e,this.length-8);let o=this[e+4]+this[e+5]*2**8+this[e+6]*2**16+(r<<24);return(BigInt(o)<<BigInt(32))+BigInt(n+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24)};g.prototype.readBigInt64BE=function(e){e=e>>>0,Ge(e,"offset");let n=this[e],r=this[e+7];(n===void 0||r===void 0)&&tt(e,this.length-8);let o=(n<<24)+this[++e]*2**16+this[++e]*2**8+this[++e];return(BigInt(o)<<BigInt(32))+BigInt(this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+r)};g.prototype.readFloatLE=function(e,n){return e=e>>>0,n||se(e,4,this.length),et(this,e,!0,23,4)};g.prototype.readFloatBE=function(e,n){return e=e>>>0,n||se(e,4,this.length),et(this,e,!1,23,4)};g.prototype.readDoubleLE=function(e,n){return e=e>>>0,n||se(e,8,this.length),et(this,e,!0,52,8)};g.prototype.readDoubleBE=function(e,n){return e=e>>>0,n||se(e,8,this.length),et(this,e,!1,52,8)};function pe(t,e,n,r,o,i){if(!g.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<i)throw new RangeError('"value" argument is out of bounds');if(n+r>t.length)throw new RangeError("Index out of range")}g.prototype.writeUintLE=g.prototype.writeUIntLE=function(e,n,r,o){if(e=+e,n=n>>>0,r=r>>>0,!o){let c=Math.pow(2,8*r)-1;pe(this,e,n,r,c,0)}let i=1,s=0;for(this[n]=e&255;++s<r&&(i*=256);)this[n+s]=e/i&255;return n+r};g.prototype.writeUintBE=g.prototype.writeUIntBE=function(e,n,r,o){if(e=+e,n=n>>>0,r=r>>>0,!o){let c=Math.pow(2,8*r)-1;pe(this,e,n,r,c,0)}let i=r-1,s=1;for(this[n+i]=e&255;--i>=0&&(s*=256);)this[n+i]=e/s&255;return n+r};g.prototype.writeUint8=g.prototype.writeUInt8=function(e,n,r){return e=+e,n=n>>>0,r||pe(this,e,n,1,255,0),this[n]=e&255,n+1};g.prototype.writeUint16LE=g.prototype.writeUInt16LE=function(e,n,r){return e=+e,n=n>>>0,r||pe(this,e,n,2,65535,0),this[n]=e&255,this[n+1]=e>>>8,n+2};g.prototype.writeUint16BE=g.prototype.writeUInt16BE=function(e,n,r){return e=+e,n=n>>>0,r||pe(this,e,n,2,65535,0),this[n]=e>>>8,this[n+1]=e&255,n+2};g.prototype.writeUint32LE=g.prototype.writeUInt32LE=function(e,n,r){return e=+e,n=n>>>0,r||pe(this,e,n,4,4294967295,0),this[n+3]=e>>>24,this[n+2]=e>>>16,this[n+1]=e>>>8,this[n]=e&255,n+4};g.prototype.writeUint32BE=g.prototype.writeUInt32BE=function(e,n,r){return e=+e,n=n>>>0,r||pe(this,e,n,4,4294967295,0),this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=e&255,n+4};function Rr(t,e,n,r,o){Br(e,r,o,t,n,7);let i=Number(e&BigInt(4294967295));t[n++]=i,i=i>>8,t[n++]=i,i=i>>8,t[n++]=i,i=i>>8,t[n++]=i;let s=Number(e>>BigInt(32)&BigInt(4294967295));return t[n++]=s,s=s>>8,t[n++]=s,s=s>>8,t[n++]=s,s=s>>8,t[n++]=s,n}function Pr(t,e,n,r,o){Br(e,r,o,t,n,7);let i=Number(e&BigInt(4294967295));t[n+7]=i,i=i>>8,t[n+6]=i,i=i>>8,t[n+5]=i,i=i>>8,t[n+4]=i;let s=Number(e>>BigInt(32)&BigInt(4294967295));return t[n+3]=s,s=s>>8,t[n+2]=s,s=s>>8,t[n+1]=s,s=s>>8,t[n]=s,n+8}g.prototype.writeBigUInt64LE=function(e,n=0){return Rr(this,e,n,BigInt(0),BigInt("0xffffffffffffffff"))};g.prototype.writeBigUInt64BE=function(e,n=0){return Pr(this,e,n,BigInt(0),BigInt("0xffffffffffffffff"))};g.prototype.writeIntLE=function(e,n,r,o){if(e=+e,n=n>>>0,!o){let a=Math.pow(2,8*r-1);pe(this,e,n,r,a-1,-a)}let i=0,s=1,c=0;for(this[n]=e&255;++i<r&&(s*=256);)e<0&&c===0&&this[n+i-1]!==0&&(c=1),this[n+i]=(e/s>>0)-c&255;return n+r};g.prototype.writeIntBE=function(e,n,r,o){if(e=+e,n=n>>>0,!o){let a=Math.pow(2,8*r-1);pe(this,e,n,r,a-1,-a)}let i=r-1,s=1,c=0;for(this[n+i]=e&255;--i>=0&&(s*=256);)e<0&&c===0&&this[n+i+1]!==0&&(c=1),this[n+i]=(e/s>>0)-c&255;return n+r};g.prototype.writeInt8=function(e,n,r){return e=+e,n=n>>>0,r||pe(this,e,n,1,127,-128),e<0&&(e=255+e+1),this[n]=e&255,n+1};g.prototype.writeInt16LE=function(e,n,r){return e=+e,n=n>>>0,r||pe(this,e,n,2,32767,-32768),this[n]=e&255,this[n+1]=e>>>8,n+2};g.prototype.writeInt16BE=function(e,n,r){return e=+e,n=n>>>0,r||pe(this,e,n,2,32767,-32768),this[n]=e>>>8,this[n+1]=e&255,n+2};g.prototype.writeInt32LE=function(e,n,r){return e=+e,n=n>>>0,r||pe(this,e,n,4,2147483647,-2147483648),this[n]=e&255,this[n+1]=e>>>8,this[n+2]=e>>>16,this[n+3]=e>>>24,n+4};g.prototype.writeInt32BE=function(e,n,r){return e=+e,n=n>>>0,r||pe(this,e,n,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[n]=e>>>24,this[n+1]=e>>>16,this[n+2]=e>>>8,this[n+3]=e&255,n+4};g.prototype.writeBigInt64LE=function(e,n=0){return Rr(this,e,n,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))};g.prototype.writeBigInt64BE=function(e,n=0){return Pr(this,e,n,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))};function Fr(t,e,n,r,o,i){if(n+r>t.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function Dr(t,e,n,r,o){return e=+e,n=n>>>0,o||Fr(t,e,n,4,34028234663852886e22,-34028234663852886e22),$t(t,e,n,r,23,4),n+4}g.prototype.writeFloatLE=function(e,n,r){return Dr(this,e,n,!0,r)};g.prototype.writeFloatBE=function(e,n,r){return Dr(this,e,n,!1,r)};function Ur(t,e,n,r,o){return e=+e,n=n>>>0,o||Fr(t,e,n,8,17976931348623157e292,-17976931348623157e292),$t(t,e,n,r,52,8),n+8}g.prototype.writeDoubleLE=function(e,n,r){return Ur(this,e,n,!0,r)};g.prototype.writeDoubleBE=function(e,n,r){return Ur(this,e,n,!1,r)};g.prototype.copy=function(e,n,r,o){if(!g.isBuffer(e))throw new TypeError("argument should be a Buffer");if(r||(r=0),!o&&o!==0&&(o=this.length),n>=e.length&&(n=e.length),n||(n=0),o>0&&o<r&&(o=r),o===r||e.length===0||this.length===0)return 0;if(n<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(o<0)throw new RangeError("sourceEnd out of bounds");o>this.length&&(o=this.length),e.length-n<o-r&&(o=e.length-n+r);let i=o-r;return this===e?this.copyWithin(n,r,o):Uint8Array.prototype.set.call(e,this.subarray(r,o),n),i};g.prototype.fill=function(e,n,r,o){if(typeof e=="string"){if(typeof n=="string"?(o=n,n=0,r=this.length):typeof r=="string"&&(o=r,r=this.length),o!==void 0&&typeof o!="string")throw new TypeError("encoding must be a string");if(typeof o=="string"&&!g.isEncoding(o))throw new TypeError("Unknown encoding: "+o);if(e.length===1){let s=e.charCodeAt(0);(o==="utf8"&&s<128||o==="latin1")&&(e=s)}}else typeof e=="number"?e=e&255:typeof e=="boolean"&&(e=Number(e));if(n<0||this.length<n||this.length<r)throw new RangeError("Out of range index");if(r<=n)return this;n=n>>>0,r=r===void 0?this.length:r>>>0,e||(e=0);let i;if(typeof e=="number")for(i=n;i<r;++i)this[i]=e;else{let s=g.isBuffer(e)?e:g.from(e,o),c=s.length;if(c===0)throw new TypeError('The value "'+e+'" is invalid for argument "value"');for(i=0;i<r-n;++i)this[i+n]=s[i%c]}return this};var Je={};function Yt(t,e,n){Je[t]=class extends n{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name}get code(){return t}set code(o){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:o,writable:!0})}toString(){return`${this.name} [${t}]: ${this.message}`}}}Yt("ERR_BUFFER_OUT_OF_BOUNDS",function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError);Yt("ERR_INVALID_ARG_TYPE",function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`},TypeError);Yt("ERR_OUT_OF_RANGE",function(t,e,n){let r=`The value of "${t}" is out of range.`,o=n;return Number.isInteger(n)&&Math.abs(n)>2**32?o=xr(String(n)):typeof n=="bigint"&&(o=String(n),(n>BigInt(2)**BigInt(32)||n<-(BigInt(2)**BigInt(32)))&&(o=xr(o)),o+="n"),r+=` It must be ${e}. Received ${o}`,r},RangeError);function xr(t){let e="",n=t.length,r=t[0]==="-"?1:0;for(;n>=r+4;n-=3)e=`_${t.slice(n-3,n)}${e}`;return`${t.slice(0,n)}${e}`}function Vi(t,e,n){Ge(e,"offset"),(t[e]===void 0||t[e+n]===void 0)&&tt(e,t.length-(n+1))}function Br(t,e,n,r,o,i){if(t>n||t<e){let s=typeof e=="bigint"?"n":"",c;throw i>3?e===0||e===BigInt(0)?c=`>= 0${s} and < 2${s} ** ${(i+1)*8}${s}`:c=`>= -(2${s} ** ${(i+1)*8-1}${s}) and < 2 ** ${(i+1)*8-1}${s}`:c=`>= ${e}${s} and <= ${n}${s}`,new Je.ERR_OUT_OF_RANGE("value",c,t)}Vi(r,o,i)}function Ge(t,e){if(typeof t!="number")throw new Je.ERR_INVALID_ARG_TYPE(e,"number",t)}function tt(t,e,n){throw Math.floor(t)!==t?(Ge(t,n),new Je.ERR_OUT_OF_RANGE(n||"offset","an integer",t)):e<0?new Je.ERR_BUFFER_OUT_OF_BOUNDS:new Je.ERR_OUT_OF_RANGE(n||"offset",`>= ${n?1:0} and <= ${e}`,t)}var zi=/[^+/0-9A-Za-z-_]/g;function Ji(t){if(t=t.split("=")[0],t=t.trim().replace(zi,""),t.length<2)return"";for(;t.length%4!==0;)t=t+"=";return t}function qt(t,e){e=e||1/0;let n,r=t.length,o=null,i=[];for(let s=0;s<r;++s){if(n=t.charCodeAt(s),n>55295&&n<57344){if(!o){if(n>56319){(e-=3)>-1&&i.push(239,191,189);continue}else if(s+1===r){(e-=3)>-1&&i.push(239,191,189);continue}o=n;continue}if(n<56320){(e-=3)>-1&&i.push(239,191,189),o=n;continue}n=(o-55296<<10|n-56320)+65536}else o&&(e-=3)>-1&&i.push(239,191,189);if(o=null,n<128){if((e-=1)<0)break;i.push(n)}else if(n<2048){if((e-=2)<0)break;i.push(n>>6|192,n&63|128)}else if(n<65536){if((e-=3)<0)break;i.push(n>>12|224,n>>6&63|128,n&63|128)}else if(n<1114112){if((e-=4)<0)break;i.push(n>>18|240,n>>12&63|128,n>>6&63|128,n&63|128)}else throw new Error("Invalid code point")}return i}function Gi(t){let e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n)&255);return e}function $i(t,e){let n,r,o,i=[];for(let s=0;s<t.length&&!((e-=2)<0);++s)n=t.charCodeAt(s),r=n>>8,o=n%256,i.push(o),i.push(r);return i}function Vr(t){return Tr(Ji(t))}function bt(t,e,n,r){let o;for(o=0;o<r&&!(o+n>=e.length||o>=t.length);++o)e[o+n]=t[o];return o}var Hi=function(){let t="0123456789abcdef",e=new Array(256);for(let n=0;n<16;++n){let r=n*16;for(let o=0;o<16;++o)e[r+o]=t[n]+t[o]}return e}();var Ft={};gi(Ft,{ArtMethod:()=>xt,ArtStackVisitor:()=>On,DVM_JNI_ENV_OFFSET_SELF:()=>co,HandleVector:()=>ct,VariableSizedHandleScope:()=>lt,backtrace:()=>Wn,deoptimizeBootImage:()=>Xn,deoptimizeEverything:()=>Yn,deoptimizeMethod:()=>Qn,ensureClassInitialized:()=>_c,getAndroidApiLevel:()=>ne,getAndroidVersion:()=>dt,getApi:()=>J,getArtApexVersion:()=>Vn,getArtClassSpec:()=>Jn,getArtFieldSpec:()=>Rt,getArtMethodSpec:()=>_e,getArtThreadFromEnv:()=>Pt,getArtThreadSpec:()=>Ze,makeArtClassLoaderVisitor:()=>Zn,makeArtClassVisitor:()=>Hn,makeMethodMangler:()=>cl,makeObjectVisitorPredicate:()=>tr,revertGlobalPatches:()=>qn,translateMethod:()=>ll,withAllArtThreadsSuspended:()=>$n,withRunnableArtThread:()=>ye});var{pageSize:Xt,pointerSize:Zi}=Process,en=class{constructor(e){this.sliceSize=e,this.slicesPerPage=Xt/e,this.pages=[],this.free=[]}allocateSlice(e,n){let r=e.near===void 0,o=n===1;if(r&&o){let i=this.free.pop();if(i!==void 0)return i}else if(n<Xt){let{free:i}=this,s=i.length,c=o?null:ptr(n-1);for(let a=0;a!==s;a++){let l=i[a],d=r||this._isSliceNear(l,e),p=o||l.and(c).isNull();if(d&&p)return i.splice(a,1)[0]}}return this._allocatePage(e)}_allocatePage(e){let n=Memory.alloc(Xt,e),{sliceSize:r,slicesPerPage:o}=this;for(let i=1;i!==o;i++){let s=n.add(i*r);this.free.push(s)}return this.pages.push(n),n}_isSliceNear(e,n){let r=e.add(this.sliceSize),{near:o,maxDistance:i}=n,s=zr(o.sub(e)),c=zr(o.sub(r));return s.compare(i)<=0&&c.compare(i)<=0}freeSlice(e){this.free.push(e)}};function zr(t){let e=Zi===4?31:63,n=ptr(1).shl(e).not();return t.and(n)}function tn(t){return new en(t)}function de(t,e){if(e!==0)throw new Error(t+" failed: "+e)}var yt={v1_0:805371904,v1_2:805372416},Et={canTagObjects:1},{pointerSize:Wi}=Process,qi={exceptions:"propagate"};function Le(t,e){this.handle=t,this.vm=e,this.vtable=t.readPointer()}Le.prototype.deallocate=nt(47,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});Le.prototype.getLoadedClasses=nt(78,"int32",["pointer","pointer","pointer"],function(t,e,n){let r=t(this.handle,e,n);de("EnvJvmti::getLoadedClasses",r)});Le.prototype.iterateOverInstancesOfClass=nt(112,"int32",["pointer","pointer","int","pointer","pointer"],function(t,e,n,r,o){let i=t(this.handle,e,n,r,o);de("EnvJvmti::iterateOverInstancesOfClass",i)});Le.prototype.getObjectsWithTags=nt(114,"int32",["pointer","int","pointer","pointer","pointer","pointer"],function(t,e,n,r,o,i){let s=t(this.handle,e,n,r,o,i);de("EnvJvmti::getObjectsWithTags",s)});Le.prototype.addCapabilities=nt(142,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});function nt(t,e,n,r){let o=null;return function(){o===null&&(o=new NativeFunction(this.vtable.add((t-1)*Wi).readPointer(),e,n,qi));let i=[o];return i=i.concat.apply(i,arguments),r.apply(this,i)}}function xe(t,e,{limit:n}){let r=t,o=null;for(let i=0;i!==n;i++){let s=Instruction.parse(r),c=e(s,o);if(c!==null)return c;r=s.next,o=s}return null}function le(t){let e=null,n=!1;return function(...r){return n||(e=t(...r),n=!0),e}}function y(t,e){this.handle=t,this.vm=e}var vt=Process.pointerSize,Me=2,Ki=28,Qi=34,Yi=37,Xi=40,es=43,ts=46,ns=49,rs=52,os=55,is=58,ss=61,as=64,cs=67,ls=70,ds=73,us=76,ps=79,fs=82,hs=85,_s=88,ms=91,gs=114,bs=117,ys=120,Es=123,vs=126,Ss=129,ws=132,Is=135,Cs=138,Ts=141,As=95,Ls=96,xs=97,ks=98,Ns=99,Ms=100,Os=101,js=102,Rs=103,Ps=104,Fs=105,Ds=106,Us=107,Bs=108,Vs=109,zs=110,Js=111,Gs=112,$s=145,Hs=146,Zs=147,Ws=148,qs=149,Ks=150,Qs=151,Ys=152,Xs=153,ea=154,ta=155,na=156,ra=157,oa=158,ia=159,sa=160,aa=161,ca=162,la={pointer:Qi,uint8:Yi,int8:Xi,uint16:es,int16:ts,int32:ns,int64:rs,float:os,double:is,void:ss},da={pointer:as,uint8:cs,int8:ls,uint16:ds,int16:us,int32:ps,int64:fs,float:hs,double:_s,void:ms},ua={pointer:gs,uint8:bs,int8:ys,uint16:Es,int16:vs,int32:Ss,int64:ws,float:Is,double:Cs,void:Ts},pa={pointer:As,uint8:Ls,int8:xs,uint16:ks,int16:Ns,int32:Ms,int64:Os,float:js,double:Rs},fa={pointer:Ps,uint8:Fs,int8:Ds,uint16:Us,int16:Bs,int32:Vs,int64:zs,float:Js,double:Gs},ha={pointer:$s,uint8:Hs,int8:Zs,uint16:Ws,int16:qs,int32:Ks,int64:Qs,float:Ys,double:Xs},_a={pointer:ea,uint8:ta,int8:na,uint16:ra,int16:oa,int32:ia,int64:sa,float:aa,double:ca},Gr={exceptions:"propagate"},nn=null,hn=[];y.dispose=function(t){hn.forEach(t.deleteGlobalRef,t),hn=[]};function Pe(t){return hn.push(t),t}function St(t){return nn===null&&(nn=t.handle.readPointer()),nn}function k(t,e,n,r){let o=null;return function(){o===null&&(o=new NativeFunction(St(this).add(t*vt).readPointer(),e,n,Gr));let i=[o];return i=i.concat.apply(i,arguments),r.apply(this,i)}}y.prototype.getVersion=k(4,"int32",["pointer"],function(t){return t(this.handle)});y.prototype.findClass=k(6,"pointer",["pointer","pointer"],function(t,e){let n=t(this.handle,Memory.allocUtf8String(e));return this.throwIfExceptionPending(),n});y.prototype.throwIfExceptionPending=function(){let t=this.exceptionOccurred();if(t.isNull())return;this.exceptionClear();let e=this.newGlobalRef(t);this.deleteLocalRef(t);let n=this.vaMethod("pointer",[])(this.handle,e,this.javaLangObject().toString),r=this.stringFromJni(n);this.deleteLocalRef(n);let o=new Error(r);throw o.$h=e,Script.bindWeak(o,ma(this.vm,e)),o};function ma(t,e){return function(){t.perform(n=>{n.deleteGlobalRef(e)})}}y.prototype.fromReflectedMethod=k(7,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});y.prototype.fromReflectedField=k(8,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});y.prototype.toReflectedMethod=k(9,"pointer",["pointer","pointer","pointer","uint8"],function(t,e,n,r){return t(this.handle,e,n,r)});y.prototype.getSuperclass=k(10,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});y.prototype.isAssignableFrom=k(11,"uint8",["pointer","pointer","pointer"],function(t,e,n){return!!t(this.handle,e,n)});y.prototype.toReflectedField=k(12,"pointer",["pointer","pointer","pointer","uint8"],function(t,e,n,r){return t(this.handle,e,n,r)});y.prototype.throw=k(13,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});y.prototype.exceptionOccurred=k(15,"pointer",["pointer"],function(t){return t(this.handle)});y.prototype.exceptionDescribe=k(16,"void",["pointer"],function(t){t(this.handle)});y.prototype.exceptionClear=k(17,"void",["pointer"],function(t){t(this.handle)});y.prototype.pushLocalFrame=k(19,"int32",["pointer","int32"],function(t,e){return t(this.handle,e)});y.prototype.popLocalFrame=k(20,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});y.prototype.newGlobalRef=k(21,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});y.prototype.deleteGlobalRef=k(22,"void",["pointer","pointer"],function(t,e){t(this.handle,e)});y.prototype.deleteLocalRef=k(23,"void",["pointer","pointer"],function(t,e){t(this.handle,e)});y.prototype.isSameObject=k(24,"uint8",["pointer","pointer","pointer"],function(t,e,n){return!!t(this.handle,e,n)});y.prototype.newLocalRef=k(25,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});y.prototype.allocObject=k(27,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});y.prototype.getObjectClass=k(31,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});y.prototype.isInstanceOf=k(32,"uint8",["pointer","pointer","pointer"],function(t,e,n){return!!t(this.handle,e,n)});y.prototype.getMethodId=k(33,"pointer",["pointer","pointer","pointer","pointer"],function(t,e,n,r){return t(this.handle,e,Memory.allocUtf8String(n),Memory.allocUtf8String(r))});y.prototype.getFieldId=k(94,"pointer",["pointer","pointer","pointer","pointer"],function(t,e,n,r){return t(this.handle,e,Memory.allocUtf8String(n),Memory.allocUtf8String(r))});y.prototype.getIntField=k(100,"int32",["pointer","pointer","pointer"],function(t,e,n){return t(this.handle,e,n)});y.prototype.getStaticMethodId=k(113,"pointer",["pointer","pointer","pointer","pointer"],function(t,e,n,r){return t(this.handle,e,Memory.allocUtf8String(n),Memory.allocUtf8String(r))});y.prototype.getStaticFieldId=k(144,"pointer",["pointer","pointer","pointer","pointer"],function(t,e,n,r){return t(this.handle,e,Memory.allocUtf8String(n),Memory.allocUtf8String(r))});y.prototype.getStaticIntField=k(150,"int32",["pointer","pointer","pointer"],function(t,e,n){return t(this.handle,e,n)});y.prototype.getStringLength=k(164,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});y.prototype.getStringChars=k(165,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});y.prototype.releaseStringChars=k(166,"void",["pointer","pointer","pointer"],function(t,e,n){t(this.handle,e,n)});y.prototype.newStringUtf=k(167,"pointer",["pointer","pointer"],function(t,e){let n=Memory.allocUtf8String(e);return t(this.handle,n)});y.prototype.getStringUtfChars=k(169,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});y.prototype.releaseStringUtfChars=k(170,"void",["pointer","pointer","pointer"],function(t,e,n){t(this.handle,e,n)});y.prototype.getArrayLength=k(171,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});y.prototype.newObjectArray=k(172,"pointer",["pointer","int32","pointer","pointer"],function(t,e,n,r){return t(this.handle,e,n,r)});y.prototype.getObjectArrayElement=k(173,"pointer",["pointer","pointer","int32"],function(t,e,n){return t(this.handle,e,n)});y.prototype.setObjectArrayElement=k(174,"void",["pointer","pointer","int32","pointer"],function(t,e,n,r){t(this.handle,e,n,r)});y.prototype.newBooleanArray=k(175,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});y.prototype.newByteArray=k(176,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});y.prototype.newCharArray=k(177,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});y.prototype.newShortArray=k(178,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});y.prototype.newIntArray=k(179,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});y.prototype.newLongArray=k(180,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});y.prototype.newFloatArray=k(181,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});y.prototype.newDoubleArray=k(182,"pointer",["pointer","int32"],function(t,e){return t(this.handle,e)});y.prototype.getBooleanArrayElements=k(183,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});y.prototype.getByteArrayElements=k(184,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});y.prototype.getCharArrayElements=k(185,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});y.prototype.getShortArrayElements=k(186,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});y.prototype.getIntArrayElements=k(187,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});y.prototype.getLongArrayElements=k(188,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});y.prototype.getFloatArrayElements=k(189,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});y.prototype.getDoubleArrayElements=k(190,"pointer",["pointer","pointer","pointer"],function(t,e){return t(this.handle,e,NULL)});y.prototype.releaseBooleanArrayElements=k(191,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Me)});y.prototype.releaseByteArrayElements=k(192,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Me)});y.prototype.releaseCharArrayElements=k(193,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Me)});y.prototype.releaseShortArrayElements=k(194,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Me)});y.prototype.releaseIntArrayElements=k(195,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Me)});y.prototype.releaseLongArrayElements=k(196,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Me)});y.prototype.releaseFloatArrayElements=k(197,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Me)});y.prototype.releaseDoubleArrayElements=k(198,"pointer",["pointer","pointer","pointer","int32"],function(t,e,n){t(this.handle,e,n,Me)});y.prototype.getByteArrayRegion=k(200,"void",["pointer","pointer","int","int","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});y.prototype.setBooleanArrayRegion=k(207,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});y.prototype.setByteArrayRegion=k(208,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});y.prototype.setCharArrayRegion=k(209,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});y.prototype.setShortArrayRegion=k(210,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});y.prototype.setIntArrayRegion=k(211,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});y.prototype.setLongArrayRegion=k(212,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});y.prototype.setFloatArrayRegion=k(213,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});y.prototype.setDoubleArrayRegion=k(214,"void",["pointer","pointer","int32","int32","pointer"],function(t,e,n,r,o){t(this.handle,e,n,r,o)});y.prototype.registerNatives=k(215,"int32",["pointer","pointer","pointer","int32"],function(t,e,n,r){return t(this.handle,e,n,r)});y.prototype.monitorEnter=k(217,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});y.prototype.monitorExit=k(218,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});y.prototype.getDirectBufferAddress=k(230,"pointer",["pointer","pointer"],function(t,e){return t(this.handle,e)});y.prototype.getObjectRefType=k(232,"int32",["pointer","pointer"],function(t,e){return t(this.handle,e)});var Jr=new Map;function wt(t,e,n,r){return mn(this,"p",ba,t,e,n,r)}function _n(t,e,n,r){return mn(this,"v",ya,t,e,n,r)}function ga(t,e,n,r){return mn(this,"n",Ea,t,e,n,r)}function mn(t,e,n,r,o,i,s){if(s!==void 0)return n(t,r,o,i,s);let c=[r,e,o].concat(i).join("|"),a=Jr.get(c);return a===void 0&&(a=n(t,r,o,i,Gr),Jr.set(c,a)),a}function ba(t,e,n,r,o){return new NativeFunction(St(t).add(e*vt).readPointer(),n,["pointer","pointer","pointer"].concat(r),o)}function ya(t,e,n,r,o){return new NativeFunction(St(t).add(e*vt).readPointer(),n,["pointer","pointer","pointer","..."].concat(r),o)}function Ea(t,e,n,r,o){return new NativeFunction(St(t).add(e*vt).readPointer(),n,["pointer","pointer","pointer","pointer","..."].concat(r),o)}y.prototype.constructor=function(t,e){return _n.call(this,Ki,"pointer",t,e)};y.prototype.vaMethod=function(t,e,n){let r=la[t];if(r===void 0)throw new Error("Unsupported type: "+t);return _n.call(this,r,t,e,n)};y.prototype.nonvirtualVaMethod=function(t,e,n){let r=da[t];if(r===void 0)throw new Error("Unsupported type: "+t);return ga.call(this,r,t,e,n)};y.prototype.staticVaMethod=function(t,e,n){let r=ua[t];if(r===void 0)throw new Error("Unsupported type: "+t);return _n.call(this,r,t,e,n)};y.prototype.getField=function(t){let e=pa[t];if(e===void 0)throw new Error("Unsupported type: "+t);return wt.call(this,e,t,[])};y.prototype.getStaticField=function(t){let e=ha[t];if(e===void 0)throw new Error("Unsupported type: "+t);return wt.call(this,e,t,[])};y.prototype.setField=function(t){let e=fa[t];if(e===void 0)throw new Error("Unsupported type: "+t);return wt.call(this,e,"void",[t])};y.prototype.setStaticField=function(t){let e=_a[t];if(e===void 0)throw new Error("Unsupported type: "+t);return wt.call(this,e,"void",[t])};var rn=null;y.prototype.javaLangClass=function(){if(rn===null){let t=this.findClass("java/lang/Class");try{let e=this.getMethodId.bind(this,t);rn={handle:Pe(this.newGlobalRef(t)),getName:e("getName","()Ljava/lang/String;"),getSimpleName:e("getSimpleName","()Ljava/lang/String;"),getGenericSuperclass:e("getGenericSuperclass","()Ljava/lang/reflect/Type;"),getDeclaredConstructors:e("getDeclaredConstructors","()[Ljava/lang/reflect/Constructor;"),getDeclaredMethods:e("getDeclaredMethods","()[Ljava/lang/reflect/Method;"),getDeclaredFields:e("getDeclaredFields","()[Ljava/lang/reflect/Field;"),isArray:e("isArray","()Z"),isPrimitive:e("isPrimitive","()Z"),isInterface:e("isInterface","()Z"),getComponentType:e("getComponentType","()Ljava/lang/Class;")}}finally{this.deleteLocalRef(t)}}return rn};var on=null;y.prototype.javaLangObject=function(){if(on===null){let t=this.findClass("java/lang/Object");try{let e=this.getMethodId.bind(this,t);on={handle:Pe(this.newGlobalRef(t)),toString:e("toString","()Ljava/lang/String;"),getClass:e("getClass","()Ljava/lang/Class;")}}finally{this.deleteLocalRef(t)}}return on};var sn=null;y.prototype.javaLangReflectConstructor=function(){if(sn===null){let t=this.findClass("java/lang/reflect/Constructor");try{sn={getGenericParameterTypes:this.getMethodId(t,"getGenericParameterTypes","()[Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(t)}}return sn};var an=null;y.prototype.javaLangReflectMethod=function(){if(an===null){let t=this.findClass("java/lang/reflect/Method");try{let e=this.getMethodId.bind(this,t);an={getName:e("getName","()Ljava/lang/String;"),getGenericParameterTypes:e("getGenericParameterTypes","()[Ljava/lang/reflect/Type;"),getParameterTypes:e("getParameterTypes","()[Ljava/lang/Class;"),getGenericReturnType:e("getGenericReturnType","()Ljava/lang/reflect/Type;"),getGenericExceptionTypes:e("getGenericExceptionTypes","()[Ljava/lang/reflect/Type;"),getModifiers:e("getModifiers","()I"),isVarArgs:e("isVarArgs","()Z")}}finally{this.deleteLocalRef(t)}}return an};var cn=null;y.prototype.javaLangReflectField=function(){if(cn===null){let t=this.findClass("java/lang/reflect/Field");try{let e=this.getMethodId.bind(this,t);cn={getName:e("getName","()Ljava/lang/String;"),getType:e("getType","()Ljava/lang/Class;"),getGenericType:e("getGenericType","()Ljava/lang/reflect/Type;"),getModifiers:e("getModifiers","()I"),toString:e("toString","()Ljava/lang/String;")}}finally{this.deleteLocalRef(t)}}return cn};var ln=null;y.prototype.javaLangReflectTypeVariable=function(){if(ln===null){let t=this.findClass("java/lang/reflect/TypeVariable");try{let e=this.getMethodId.bind(this,t);ln={handle:Pe(this.newGlobalRef(t)),getName:e("getName","()Ljava/lang/String;"),getBounds:e("getBounds","()[Ljava/lang/reflect/Type;"),getGenericDeclaration:e("getGenericDeclaration","()Ljava/lang/reflect/GenericDeclaration;")}}finally{this.deleteLocalRef(t)}}return ln};var dn=null;y.prototype.javaLangReflectWildcardType=function(){if(dn===null){let t=this.findClass("java/lang/reflect/WildcardType");try{let e=this.getMethodId.bind(this,t);dn={handle:Pe(this.newGlobalRef(t)),getLowerBounds:e("getLowerBounds","()[Ljava/lang/reflect/Type;"),getUpperBounds:e("getUpperBounds","()[Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(t)}}return dn};var un=null;y.prototype.javaLangReflectGenericArrayType=function(){if(un===null){let t=this.findClass("java/lang/reflect/GenericArrayType");try{un={handle:Pe(this.newGlobalRef(t)),getGenericComponentType:this.getMethodId(t,"getGenericComponentType","()Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(t)}}return un};var pn=null;y.prototype.javaLangReflectParameterizedType=function(){if(pn===null){let t=this.findClass("java/lang/reflect/ParameterizedType");try{let e=this.getMethodId.bind(this,t);pn={handle:Pe(this.newGlobalRef(t)),getActualTypeArguments:e("getActualTypeArguments","()[Ljava/lang/reflect/Type;"),getRawType:e("getRawType","()Ljava/lang/reflect/Type;"),getOwnerType:e("getOwnerType","()Ljava/lang/reflect/Type;")}}finally{this.deleteLocalRef(t)}}return pn};var fn=null;y.prototype.javaLangString=function(){if(fn===null){let t=this.findClass("java/lang/String");try{fn={handle:Pe(this.newGlobalRef(t))}}finally{this.deleteLocalRef(t)}}return fn};y.prototype.getClassName=function(t){let e=this.vaMethod("pointer",[])(this.handle,t,this.javaLangClass().getName);try{return this.stringFromJni(e)}finally{this.deleteLocalRef(e)}};y.prototype.getObjectClassName=function(t){let e=this.getObjectClass(t);try{return this.getClassName(e)}finally{this.deleteLocalRef(e)}};y.prototype.getActualTypeArgument=function(t){let e=this.vaMethod("pointer",[])(this.handle,t,this.javaLangReflectParameterizedType().getActualTypeArguments);if(this.throwIfExceptionPending(),!e.isNull())try{return this.getTypeNameFromFirstTypeElement(e)}finally{this.deleteLocalRef(e)}};y.prototype.getTypeNameFromFirstTypeElement=function(t){if(this.getArrayLength(t)>0){let n=this.getObjectArrayElement(t,0);try{return this.getTypeName(n)}finally{this.deleteLocalRef(n)}}else return"java.lang.Object"};y.prototype.getTypeName=function(t,e){let n=this.vaMethod("pointer",[]);if(this.isInstanceOf(t,this.javaLangClass().handle))return this.getClassName(t);if(this.isInstanceOf(t,this.javaLangReflectGenericArrayType().handle))return this.getArrayTypeName(t);if(this.isInstanceOf(t,this.javaLangReflectParameterizedType().handle)){let r=n(this.handle,t,this.javaLangReflectParameterizedType().getRawType);this.throwIfExceptionPending();let o;try{o=this.getTypeName(r)}finally{this.deleteLocalRef(r)}return e&&(o+="<"+this.getActualTypeArgument(t)+">"),o}else return this.isInstanceOf(t,this.javaLangReflectTypeVariable().handle)||this.isInstanceOf(t,this.javaLangReflectWildcardType().handle),"java.lang.Object"};y.prototype.getArrayTypeName=function(t){let e=this.vaMethod("pointer",[]);if(this.isInstanceOf(t,this.javaLangClass().handle))return this.getClassName(t);if(this.isInstanceOf(t,this.javaLangReflectGenericArrayType().handle)){let n=e(this.handle,t,this.javaLangReflectGenericArrayType().getGenericComponentType);this.throwIfExceptionPending();try{return"[L"+this.getTypeName(n)+";"}finally{this.deleteLocalRef(n)}}else return"[Ljava.lang.Object;"};y.prototype.stringFromJni=function(t){let e=this.getStringChars(t);if(e.isNull())throw new Error("Unable to access string");try{let n=this.getStringLength(t);return e.readUtf16String(n)}finally{this.releaseStringChars(t,e)}};var $r=65542,$e=Process.pointerSize,gn=Process.getCurrentThreadId(),Fe=new Map,rt=new Map;function Ie(t){let e=t.vm,n=null,r=null,o=null;function i(){let c=e.readPointer(),a={exceptions:"propagate"};n=new NativeFunction(c.add(4*$e).readPointer(),"int32",["pointer","pointer","pointer"],a),r=new NativeFunction(c.add(5*$e).readPointer(),"int32",["pointer"],a),o=new NativeFunction(c.add(6*$e).readPointer(),"int32",["pointer","pointer","int32"],a)}this.handle=e,this.perform=function(c){let a=Process.getCurrentThreadId(),l=s(a);if(l!==null)return c(l);let d=this._tryGetEnv(),p=d!==null;p||(d=this.attachCurrentThread(),Fe.set(a,!0)),this.link(a,d);try{return c(d)}finally{let f=a===gn;if(f||this.unlink(a),!p&&!f){let u=Fe.get(a);Fe.delete(a),u&&this.detachCurrentThread()}}},this.attachCurrentThread=function(){let c=Memory.alloc($e);return de("VM::AttachCurrentThread",n(e,c,NULL)),new y(c.readPointer(),this)},this.detachCurrentThread=function(){de("VM::DetachCurrentThread",r(e))},this.preventDetachDueToClassLoader=function(){let c=Process.getCurrentThreadId();Fe.has(c)&&Fe.set(c,!1)},this.getEnv=function(){let c=s(Process.getCurrentThreadId());if(c!==null)return c;let a=Memory.alloc($e),l=o(e,a,$r);if(l===-2)throw new Error("Current thread is not attached to the Java VM; please move this code inside a Java.perform() callback");return de("VM::GetEnv",l),new y(a.readPointer(),this)},this.tryGetEnv=function(){let c=s(Process.getCurrentThreadId());return c!==null?c:this._tryGetEnv()},this._tryGetEnv=function(){let c=this.tryGetEnvHandle($r);return c===null?null:new y(c,this)},this.tryGetEnvHandle=function(c){let a=Memory.alloc($e);return o(e,a,c)!==0?null:a.readPointer()},this.makeHandleDestructor=function(c){return()=>{this.perform(a=>{a.deleteGlobalRef(c)})}},this.link=function(c,a){let l=rt.get(c);l===void 0?rt.set(c,[a,1]):l[1]++},this.unlink=function(c){let a=rt.get(c);a[1]===1?rt.delete(c):a[1]--};function s(c){let a=rt.get(c);return a===void 0?null:a[0]}i.call(this)}Ie.dispose=function(t){Fe.get(gn)===!0&&(Fe.delete(gn),t.detachCurrentThread())};var va=4,w=Process.pointerSize,{readU32:Sa,readPointer:wa,writeU32:Ia,writePointer:Ca}=NativePointer.prototype,Ta=1,Aa=8,La=16,At=256,xa=524288,ka=2097152,ao=1073741824,Na=524288,Ma=134217728,Ln=1048576,Oa=2097152,ja=268435456,Ra=268435456,Pa=0,xn=3,kn=5,Bn=ptr(1).not(),Fa=2147467263,Da=4294963200,jt=17*w,Ua=18*w,co=12,Ba=112,Va=116,za=0,yn=56,Hr=4,Ja=8,Ga=10,$a=12,Ha=14,Za=28,Wa=36,qa=0,Ka=1,Qa=2,Ya=3,Xa=4,ec=5,tc=6,nc=7,Zr=2147483648,rc=28,at=3*w,oc=3*w,ic=1,sc=1,lo=le(gc),ac=le(kc),_e=le(Mc),Ze=le(Oc),cc=le(jc),lc=le(Jc),dt=le(Dc),uo=le(Uc),ne=le(Bc),Vn=le(Vc),dc=le(Zc),uc=Process.arch==="ia32"?Ol:Ml,K={exceptions:"propagate"},ot={},En=null,vn=null,po=null,oe=null,zn=[],Lt=new Map,fo=[],Sn=null,Wr=0,qr=!1,Kr=!1,it=null,pc=[],wn=null,It=null;function J(){return En===null&&(En=fc()),En}function fc(){let t=Process.enumerateModules().filter(u=>/^lib(art|dvm).so$/.test(u.name)).filter(u=>!/\/system\/fake-libs/.test(u.path));if(t.length===0)return null;let e=t[0],n=e.name.indexOf("art")!==-1?"art":"dalvik",r=n==="art",o={module:e,find(u){let{module:_}=this,h=_.findExportByName(u);return h===null&&(h=_.findSymbolByName(u)),h},flavor:n,addLocalReference:null};o.isApiLevel34OrApexEquivalent=r&&(o.find("_ZN3art7AppInfo29GetPrimaryApkReferenceProfileEv")!==null||o.find("_ZN3art6Thread15RunFlipFunctionEPS0_")!==null);let i=r?{functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],artInterpreterToCompiledCodeBridge:function(u){this.artInterpreterToCompiledCodeBridge=u},_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadENS_6ObjPtrINS_6mirror6ObjectEEE:["art::JavaVMExt::AddGlobalRef","pointer",["pointer","pointer","pointer"]],_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadEPNS_6mirror6ObjectE:["art::JavaVMExt::AddGlobalRef","pointer",["pointer","pointer","pointer"]],_ZN3art17ReaderWriterMutex13ExclusiveLockEPNS_6ThreadE:["art::ReaderWriterMutex::ExclusiveLock","void",["pointer","pointer"]],_ZN3art17ReaderWriterMutex15ExclusiveUnlockEPNS_6ThreadE:["art::ReaderWriterMutex::ExclusiveUnlock","void",["pointer","pointer"]],_ZN3art22IndirectReferenceTable3AddEjPNS_6mirror6ObjectE:function(u){this["art::IndirectReferenceTable::Add"]=new NativeFunction(u,"pointer",["pointer","uint","pointer"],K)},_ZN3art22IndirectReferenceTable3AddENS_15IRTSegmentStateENS_6ObjPtrINS_6mirror6ObjectEEE:function(u){this["art::IndirectReferenceTable::Add"]=new NativeFunction(u,"pointer",["pointer","uint","pointer"],K)},_ZN3art9JavaVMExt12DecodeGlobalEPv:function(u){let _;ne()>=26?_=uc(u,["pointer","pointer"]):_=new NativeFunction(u,"pointer",["pointer","pointer"],K),this["art::JavaVMExt::DecodeGlobal"]=function(h,m,b){return _(h,b)}},_ZN3art9JavaVMExt12DecodeGlobalEPNS_6ThreadEPv:["art::JavaVMExt::DecodeGlobal","pointer",["pointer","pointer","pointer"]],_ZNK3art6Thread19DecodeGlobalJObjectEP8_jobject:["art::Thread::DecodeJObject","pointer",["pointer","pointer"]],_ZNK3art6Thread13DecodeJObjectEP8_jobject:["art::Thread::DecodeJObject","pointer",["pointer","pointer"]],_ZN3art10ThreadList10SuspendAllEPKcb:["art::ThreadList::SuspendAll","void",["pointer","pointer","bool"]],_ZN3art10ThreadList10SuspendAllEv:function(u){let _=new NativeFunction(u,"void",["pointer"],K);this["art::ThreadList::SuspendAll"]=function(h,m,b){return _(h)}},_ZN3art10ThreadList9ResumeAllEv:["art::ThreadList::ResumeAll","void",["pointer"]],_ZN3art11ClassLinker12VisitClassesEPNS_12ClassVisitorE:["art::ClassLinker::VisitClasses","void",["pointer","pointer"]],_ZN3art11ClassLinker12VisitClassesEPFbPNS_6mirror5ClassEPvES4_:function(u){let _=new NativeFunction(u,"void",["pointer","pointer","pointer"],K);this["art::ClassLinker::VisitClasses"]=function(h,m){_(h,m,NULL)}},_ZNK3art11ClassLinker17VisitClassLoadersEPNS_18ClassLoaderVisitorE:["art::ClassLinker::VisitClassLoaders","void",["pointer","pointer"]],_ZN3art2gc4Heap12VisitObjectsEPFvPNS_6mirror6ObjectEPvES5_:["art::gc::Heap::VisitObjects","void",["pointer","pointer","pointer"]],_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE:["art::gc::Heap::GetInstances","void",["pointer","pointer","pointer","int","pointer"]],_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEbiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE:function(u){let _=new NativeFunction(u,"void",["pointer","pointer","pointer","bool","int","pointer"],K);this["art::gc::Heap::GetInstances"]=function(h,m,b,E,L){_(h,m,b,0,E,L)}},_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEjb:["art::StackVisitor::StackVisitor","void",["pointer","pointer","pointer","uint","uint","bool"]],_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEmb:["art::StackVisitor::StackVisitor","void",["pointer","pointer","pointer","uint","size_t","bool"]],_ZN3art12StackVisitor9WalkStackILNS0_16CountTransitionsE0EEEvb:["art::StackVisitor::WalkStack","void",["pointer","bool"]],_ZNK3art12StackVisitor9GetMethodEv:["art::StackVisitor::GetMethod","pointer",["pointer"]],_ZNK3art12StackVisitor16DescribeLocationEv:function(u){this["art::StackVisitor::DescribeLocation"]=Tt(u,["pointer"])},_ZNK3art12StackVisitor24GetCurrentQuickFrameInfoEv:function(u){this["art::StackVisitor::GetCurrentQuickFrameInfo"]=Hc(u)},_ZN3art7Context6CreateEv:["art::Context::Create","pointer",[]],_ZN3art6Thread18GetLongJumpContextEv:["art::Thread::GetLongJumpContext","pointer",["pointer"]],_ZN3art6mirror5Class13GetDescriptorEPNSt3__112basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE:function(u){this["art::mirror::Class::GetDescriptor"]=u},_ZN3art6mirror5Class11GetLocationEv:function(u){this["art::mirror::Class::GetLocation"]=Tt(u,["pointer"])},_ZN3art9ArtMethod12PrettyMethodEb:function(u){this["art::ArtMethod::PrettyMethod"]=Tt(u,["pointer","bool"])},_ZN3art12PrettyMethodEPNS_9ArtMethodEb:function(u){this["art::ArtMethod::PrettyMethodNullSafe"]=Tt(u,["pointer","bool"])},_ZN3art6Thread14CurrentFromGdbEv:["art::Thread::CurrentFromGdb","pointer",[]],_ZN3art6mirror6Object5CloneEPNS_6ThreadE:function(u){this["art::mirror::Object::Clone"]=new NativeFunction(u,"pointer",["pointer","pointer"],K)},_ZN3art6mirror6Object5CloneEPNS_6ThreadEm:function(u){let _=new NativeFunction(u,"pointer",["pointer","pointer","pointer"],K);this["art::mirror::Object::Clone"]=function(h,m){let b=NULL;return _(h,m,b)}},_ZN3art6mirror6Object5CloneEPNS_6ThreadEj:function(u){let _=new NativeFunction(u,"pointer",["pointer","pointer","uint"],K);this["art::mirror::Object::Clone"]=function(h,m){return _(h,m,0)}},_ZN3art3Dbg14SetJdwpAllowedEb:["art::Dbg::SetJdwpAllowed","void",["bool"]],_ZN3art3Dbg13ConfigureJdwpERKNS_4JDWP11JdwpOptionsE:["art::Dbg::ConfigureJdwp","void",["pointer"]],_ZN3art31InternalDebuggerControlCallback13StartDebuggerEv:["art::InternalDebuggerControlCallback::StartDebugger","void",["pointer"]],_ZN3art3Dbg9StartJdwpEv:["art::Dbg::StartJdwp","void",[]],_ZN3art3Dbg8GoActiveEv:["art::Dbg::GoActive","void",[]],_ZN3art3Dbg21RequestDeoptimizationERKNS_21DeoptimizationRequestE:["art::Dbg::RequestDeoptimization","void",["pointer"]],_ZN3art3Dbg20ManageDeoptimizationEv:["art::Dbg::ManageDeoptimization","void",[]],_ZN3art15instrumentation15Instrumentation20EnableDeoptimizationEv:["art::Instrumentation::EnableDeoptimization","void",["pointer"]],_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEPKc:["art::Instrumentation::DeoptimizeEverything","void",["pointer","pointer"]],_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEv:function(u){let _=new NativeFunction(u,"void",["pointer"],K);this["art::Instrumentation::DeoptimizeEverything"]=function(h,m){_(h)}},_ZN3art7Runtime19DeoptimizeBootImageEv:["art::Runtime::DeoptimizeBootImage","void",["pointer"]],_ZN3art15instrumentation15Instrumentation10DeoptimizeEPNS_9ArtMethodE:["art::Instrumentation::Deoptimize","void",["pointer","pointer"]],_ZN3art3jni12JniIdManager14DecodeMethodIdEP10_jmethodID:["art::jni::JniIdManager::DecodeMethodId","pointer",["pointer","pointer"]],_ZN3art3jni12JniIdManager13DecodeFieldIdEP9_jfieldID:["art::jni::JniIdManager::DecodeFieldId","pointer",["pointer","pointer"]],_ZN3art11interpreter18GetNterpEntryPointEv:["art::interpreter::GetNterpEntryPoint","pointer",[]],_ZN3art7Monitor17TranslateLocationEPNS_9ArtMethodEjPPKcPi:["art::Monitor::TranslateLocation","void",["pointer","uint32","pointer","pointer"]]},variables:{_ZN3art3Dbg9gRegistryE:function(u){this.isJdwpStarted=()=>!u.readPointer().isNull()},_ZN3art3Dbg15gDebuggerActiveE:function(u){this.isDebuggerActive=()=>!!u.readU8()}},optionals:new Set(["artInterpreterToCompiledCodeBridge","_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadENS_6ObjPtrINS_6mirror6ObjectEEE","_ZN3art9JavaVMExt12AddGlobalRefEPNS_6ThreadEPNS_6mirror6ObjectE","_ZN3art9JavaVMExt12DecodeGlobalEPv","_ZN3art9JavaVMExt12DecodeGlobalEPNS_6ThreadEPv","_ZNK3art6Thread19DecodeGlobalJObjectEP8_jobject","_ZNK3art6Thread13DecodeJObjectEP8_jobject","_ZN3art10ThreadList10SuspendAllEPKcb","_ZN3art10ThreadList10SuspendAllEv","_ZN3art11ClassLinker12VisitClassesEPNS_12ClassVisitorE","_ZN3art11ClassLinker12VisitClassesEPFbPNS_6mirror5ClassEPvES4_","_ZNK3art11ClassLinker17VisitClassLoadersEPNS_18ClassLoaderVisitorE","_ZN3art6mirror6Object5CloneEPNS_6ThreadE","_ZN3art6mirror6Object5CloneEPNS_6ThreadEm","_ZN3art6mirror6Object5CloneEPNS_6ThreadEj","_ZN3art22IndirectReferenceTable3AddEjPNS_6mirror6ObjectE","_ZN3art22IndirectReferenceTable3AddENS_15IRTSegmentStateENS_6ObjPtrINS_6mirror6ObjectEEE","_ZN3art2gc4Heap12VisitObjectsEPFvPNS_6mirror6ObjectEPvES5_","_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE","_ZN3art2gc4Heap12GetInstancesERNS_24VariableSizedHandleScopeENS_6HandleINS_6mirror5ClassEEEbiRNSt3__16vectorINS4_INS5_6ObjectEEENS8_9allocatorISB_EEEE","_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEjb","_ZN3art12StackVisitorC2EPNS_6ThreadEPNS_7ContextENS0_13StackWalkKindEmb","_ZN3art12StackVisitor9WalkStackILNS0_16CountTransitionsE0EEEvb","_ZNK3art12StackVisitor9GetMethodEv","_ZNK3art12StackVisitor16DescribeLocationEv","_ZNK3art12StackVisitor24GetCurrentQuickFrameInfoEv","_ZN3art7Context6CreateEv","_ZN3art6Thread18GetLongJumpContextEv","_ZN3art6mirror5Class13GetDescriptorEPNSt3__112basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEE","_ZN3art6mirror5Class11GetLocationEv","_ZN3art9ArtMethod12PrettyMethodEb","_ZN3art12PrettyMethodEPNS_9ArtMethodEb","_ZN3art3Dbg13ConfigureJdwpERKNS_4JDWP11JdwpOptionsE","_ZN3art31InternalDebuggerControlCallback13StartDebuggerEv","_ZN3art3Dbg15gDebuggerActiveE","_ZN3art15instrumentation15Instrumentation20EnableDeoptimizationEv","_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEPKc","_ZN3art15instrumentation15Instrumentation20DeoptimizeEverythingEv","_ZN3art7Runtime19DeoptimizeBootImageEv","_ZN3art15instrumentation15Instrumentation10DeoptimizeEPNS_9ArtMethodE","_ZN3art3Dbg9StartJdwpEv","_ZN3art3Dbg8GoActiveEv","_ZN3art3Dbg21RequestDeoptimizationERKNS_21DeoptimizationRequestE","_ZN3art3Dbg20ManageDeoptimizationEv","_ZN3art3Dbg9gRegistryE","_ZN3art3jni12JniIdManager14DecodeMethodIdEP10_jmethodID","_ZN3art3jni12JniIdManager13DecodeFieldIdEP9_jfieldID","_ZN3art11interpreter18GetNterpEntryPointEv","_ZN3art7Monitor17TranslateLocationEPNS_9ArtMethodEjPPKcPi"])}:{functions:{_Z20dvmDecodeIndirectRefP6ThreadP8_jobject:["dvmDecodeIndirectRef","pointer",["pointer","pointer"]],_Z15dvmUseJNIBridgeP6MethodPv:["dvmUseJNIBridge","void",["pointer","pointer"]],_Z20dvmHeapSourceGetBasev:["dvmHeapSourceGetBase","pointer",[]],_Z21dvmHeapSourceGetLimitv:["dvmHeapSourceGetLimit","pointer",[]],_Z16dvmIsValidObjectPK6Object:["dvmIsValidObject","uint8",["pointer"]],JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]]},variables:{gDvmJni:function(u){this.gDvmJni=u},gDvm:function(u){this.gDvm=u}}},{functions:s={},variables:c={},optionals:a=new Set}=i,l=[];for(let[u,_]of Object.entries(s)){let h=o.find(u);h!==null?typeof _=="function"?_.call(o,h):o[_[0]]=new NativeFunction(h,_[1],_[2],K):a.has(u)||l.push(u)}for(let[u,_]of Object.entries(c)){let h=o.find(u);h!==null?_.call(o,h):a.has(u)||l.push(u)}if(l.length>0)throw new Error("Java API only partially available; please file a bug. Missing: "+l.join(", "));let d=Memory.alloc(w),p=Memory.alloc(va);if(de("JNI_GetCreatedJavaVMs",o.JNI_GetCreatedJavaVMs(d,1,p)),p.readInt()===0)return null;if(o.vm=d.readPointer(),r){let u=ne(),_;u>=27?_=33554432:u>=24?_=16777216:_=0,o.kAccCompileDontBother=_;let h=o.vm.add(w).readPointer();o.artRuntime=h;let m=lo(o),b=m.offset,E=b.instrumentation;o.artInstrumentation=E!==null?h.add(E):null,Vn()>=36e7&&o.artInstrumentation!=null&&(o.artInstrumentation=o.artInstrumentation.readPointer()),o.artHeap=h.add(b.heap).readPointer(),o.artThreadList=h.add(b.threadList).readPointer();let C=h.add(b.classLinker).readPointer(),R=Nc(h,m).offset,O=C.add(R.quickResolutionTrampoline).readPointer(),j=C.add(R.quickImtConflictTrampoline).readPointer(),N=C.add(R.quickGenericJniTrampoline).readPointer(),T=C.add(R.quickToInterpreterBridgeTrampoline).readPointer();o.artClassLinker={address:C,quickResolutionTrampoline:O,quickImtConflictTrampoline:j,quickGenericJniTrampoline:N,quickToInterpreterBridgeTrampoline:T};let v=new Ie(o);o.artQuickGenericJniTrampoline=In(N,v),o.artQuickToInterpreterBridge=In(T,v),o.artQuickResolutionTrampoline=In(O,v),o["art::JavaVMExt::AddGlobalRef"]===void 0&&(o["art::JavaVMExt::AddGlobalRef"]=Tl(o)),o["art::JavaVMExt::DecodeGlobal"]===void 0&&(o["art::JavaVMExt::DecodeGlobal"]=Al(o)),o["art::ArtMethod::PrettyMethod"]===void 0&&(o["art::ArtMethod::PrettyMethod"]=o["art::ArtMethod::PrettyMethodNullSafe"]),o["art::interpreter::GetNterpEntryPoint"]!==void 0?o.artNterpEntryPoint=o["art::interpreter::GetNterpEntryPoint"]():o.artNterpEntryPoint=o.find("ExecuteNterpImpl"),oe=Kc(o,v),Nl(o);let M=null;Object.defineProperty(o,"jvmti",{get(){return M===null&&(M=[hc(v,this.artRuntime)]),M[0]}})}let f=e.enumerateImports().filter(u=>u.name.indexOf("_Z")===0).reduce((u,_)=>(u[_.name]=_.address,u),{});return o.$new=new NativeFunction(f._Znwm||f._Znwj,"pointer",["ulong"],K),o.$delete=new NativeFunction(f._ZdlPv,"void",["pointer"],K),po=r?Pn:Fn,o}function hc(t,e){let n=null;return t.perform(()=>{let r=J().find("_ZN3art7Runtime18EnsurePluginLoadedEPKcPNSt3__112basic_stringIcNS3_11char_traitsIcEENS3_9allocatorIcEEEE");if(r===null)return;let o=new NativeFunction(r,"bool",["pointer","pointer","pointer"]),i=Memory.alloc(w);if(!o(e,Memory.allocUtf8String("libopenjdkjvmti.so"),i))return;let c=yt.v1_2|1073741824,a=t.tryGetEnvHandle(c);if(a===null)return;n=new Le(a,t);let l=Memory.alloc(8);l.writeU64(Et.canTagObjects),n.addCapabilities(l)!==0&&(n=null)}),n}function _c(t,e){J().flavor==="art"&&t.getClassName(e)}function mc(t){return{offset:w===4?{globalsLock:32,globals:72}:{globalsLock:64,globals:112}}}function gc(t){let e=t.vm,n=t.artRuntime,r=w===4?200:384,o=r+100*w,i=ne(),s=uo(),{isApiLevel34OrApexEquivalent:c}=t,a=null;for(let d=r;d!==o;d+=w)if(n.add(d).readPointer().equals(e)){let f,u=null;i>=33||s==="Tiramisu"||c?(f=[d-4*w],u=d-w):i>=30||s==="R"?(f=[d-3*w,d-4*w],u=d-w):i>=29?f=[d-2*w]:i>=27?f=[d-at-3*w]:f=[d-at-2*w];for(let _ of f){let h=_-w,m=h-w,b;c?b=m-9*w:i>=24?b=m-8*w:i>=23?b=m-7*w:b=m-4*w;let E={offset:{heap:b,threadList:m,internTable:h,classLinker:_,jniIdManager:u}};if(ho(n,E)!==null){a=E;break}}break}if(a===null)throw new Error("Unable to determine Runtime field offsets");let l=Vn()>=36e7;return a.offset.instrumentation=l?wc(t):yc(t),a.offset.jniIdsIndirection=Ac(t),a}var bc={ia32:Qr,x64:Qr,arm:Ec,arm64:vc};function yc(t){let e=t["art::Runtime::DeoptimizeBootImage"];return e===void 0?null:xe(e,bc[Process.arch],{limit:30})}function Qr(t){if(t.mnemonic!=="lea")return null;let e=t.operands[1].value.disp;return e<256||e>1024?null:e}function Ec(t){if(t.mnemonic!=="add.w")return null;let e=t.operands;if(e.length!==3)return null;let n=e[2];return n.type!=="imm"?null:n.value}function vc(t){if(t.mnemonic!=="add")return null;let e=t.operands;if(e.length!==3||e[0].value==="sp"||e[1].value==="sp")return null;let n=e[2];if(n.type!=="imm")return null;let r=n.value.valueOf();return r<256||r>1024?null:r}var Sc={ia32:Yr,x64:Yr,arm:Ic,arm64:Cc};function wc(t){let e=t["art::Runtime::DeoptimizeBootImage"];return e===void 0?null:xe(e,Sc[Process.arch],{limit:30})}function Yr(t){if(t.mnemonic!=="mov")return null;let e=t.operands;if(e[0].value!=="rax")return null;let r=e[1];if(r.type!=="mem")return null;let o=r.value;if(o.base!=="rdi")return null;let i=o.disp;return i<256||i>1024?null:i}function Ic(t){return null}function Cc(t){if(t.mnemonic!=="ldr")return null;let e=t.operands;if(e[0].value==="x0")return null;let n=e[1].value;if(n.base!=="x0")return null;let r=n.disp;return r<256||r>1024?null:r}var Tc={ia32:Xr,x64:Xr,arm:Lc,arm64:xc};function Ac(t){let e=t.find("_ZN3art7Runtime12SetJniIdTypeENS_9JniIdTypeE");if(e===null)return null;let n=xe(e,Tc[Process.arch],{limit:20});if(n===null)throw new Error("Unable to determine Runtime.jni_ids_indirection_ offset");return n}function Xr(t){return t.mnemonic==="cmp"?t.operands[0].value.disp:null}function Lc(t){return t.mnemonic==="ldr.w"?t.operands[1].value.disp:null}function xc(t,e){if(e===null)return null;let{mnemonic:n}=t,{mnemonic:r}=e;return n==="cmp"&&r==="ldr"||n==="bl"&&r==="str"?e.operands[1].value.disp:null}function kc(){let e={"4-21":136,"4-22":136,"4-23":172,"4-24":196,"4-25":196,"4-26":196,"4-27":196,"4-28":212,"4-29":172,"4-30":180,"4-31":180,"8-21":224,"8-22":224,"8-23":296,"8-24":344,"8-25":344,"8-26":352,"8-27":352,"8-28":392,"8-29":328,"8-30":336,"8-31":336}[`${w}-${ne()}`];if(e===void 0)throw new Error("Unable to determine Instrumentation field offsets");return{offset:{forcedInterpretOnly:4,deoptimizationEnabled:e}}}function Nc(t,e){let n=ho(t,e);if(n===null)throw new Error("Unable to determine ClassLinker field offsets");return n}function ho(t,e){if(vn!==null)return vn;let{classLinker:n,internTable:r}=e.offset,o=t.add(n).readPointer(),i=t.add(r).readPointer(),s=w===4?100:200,c=s+100*w,a=ne(),l=null;for(let d=s;d!==c;d+=w)if(o.add(d).readPointer().equals(i)){let f;a>=30||uo()==="R"?f=6:a>=29?f=4:a>=23?f=3:f=5;let u=d+f*w,_;a>=23?_=u-2*w:_=u-3*w,l={offset:{quickResolutionTrampoline:_,quickImtConflictTrampoline:u-w,quickGenericJniTrampoline:u,quickToInterpreterBridgeTrampoline:u+w}};break}return l!==null&&(vn=l),l}function Jn(t){let n=null;return t.perform(r=>{let o=Rt(t),i=_e(t),s={artArrayLengthSize:4,artArrayEntrySize:o.size,artArrayMax:50},c={artArrayLengthSize:w,artArrayEntrySize:i.size,artArrayMax:100},a=(f,u,_)=>{let h=f.add(u).readPointer();if(h.isNull())return null;let m=_===4?h.readU32():h.readU64().valueOf();return m<=0?null:{length:m,data:h.add(_)}},l=(f,u,_,h)=>{try{let m=a(f,u,h.artArrayLengthSize);if(m===null)return!1;let b=Math.min(m.length,h.artArrayMax);for(let E=0;E!==b;E++)if(m.data.add(E*h.artArrayEntrySize).equals(_))return!0}catch{}return!1},d=r.findClass("java/lang/Thread"),p=r.newGlobalRef(d);try{let f;ye(t,r,N=>{f=J()["art::JavaVMExt::DecodeGlobal"](t,N,p)});let u=no(r.getFieldId(p,"name","Ljava/lang/String;")),_=no(r.getStaticFieldId(p,"MAX_PRIORITY","I")),h=-1,m=-1;for(let N=0;N!==256;N+=4)h===-1&&l(f,N,_,s)&&(h=N),m===-1&&l(f,N,u,s)&&(m=N);if(m===-1||h===-1)throw new Error("Unable to find fields in java/lang/Thread; please file a bug");let b=m!==h?h:0,E=m,L=-1,C=Kn(r.getMethodId(p,"getName","()Ljava/lang/String;"));for(let N=0;N!==256;N+=4)L===-1&&l(f,N,C,c)&&(L=N);if(L===-1)throw new Error("Unable to find methods in java/lang/Thread; please file a bug");let R=-1,j=a(f,L,c.artArrayLengthSize).length;for(let N=L;N!==256;N+=4)if(f.add(N).readU16()===j){R=N;break}if(R===-1)throw new Error("Unable to find copied methods in java/lang/Thread; please file a bug");n={offset:{ifields:E,methods:L,sfields:b,copiedMethodsOffset:R}}}finally{r.deleteLocalRef(d),r.deleteGlobalRef(p)}}),n}function Mc(t){let e=J(),n;return t.perform(r=>{let o=r.findClass("android/os/Process"),i=Kn(r.getStaticMethodId(o,"getElapsedCpuTime","()J"));r.deleteLocalRef(o);let s=Process.getModuleByName("libandroid_runtime.so"),c=s.base,a=c.add(s.size),l=ne(),d=l<=21?8:w,p=Ta|Aa|La|At,f=~(ao|ja|Oa|Ln)>>>0,u=null,_=null,h=2;for(let E=0;E!==64&&h!==0;E+=4){let L=i.add(E);if(u===null){let C=L.readPointer();C.compare(c)>=0&&C.compare(a)<0&&(u=E,h--)}_===null&&(L.readU32()&f)===p&&(_=E,h--)}if(h!==0)throw new Error("Unable to determine ArtMethod field offsets");let m=u+d;n={size:l<=21?m+32:m+w,offset:{jniCode:u,quickCode:m,accessFlags:_}},"artInterpreterToCompiledCodeBridge"in e&&(n.offset.interpreterCode=u-d)}),n}function Rt(t){let e=ne();return e>=23?{size:16,offset:{accessFlags:4}}:e>=21?{size:24,offset:{accessFlags:12}}:null}function Oc(t){let e=ne(),n;return t.perform(r=>{let o=Pt(r),i=r.handle,s=null,c=null,a=null,l=null,d=null,p=null;for(let f=144;f!==256;f+=w)if(o.add(f).readPointer().equals(i)){c=f-6*w,d=f-4*w,p=f+2*w,e<=22&&(c-=w,s=c-w-9*8-3*4,a=f+6*w,d-=w,p-=w),l=f+9*w,e<=22&&(l+=2*w+4,w===8&&(l+=4)),e>=23&&(l+=w);break}if(l===null)throw new Error("Unable to determine ArtThread field offsets");n={offset:{isExceptionReportedToInstrumentation:s,exception:c,throwLocation:a,topHandleScope:l,managedStack:d,self:p}}}),n}function jc(){return ne()>=23?{offset:{topQuickFrame:0,link:w}}:{offset:{topQuickFrame:2*w,link:0}}}var Rc={ia32:eo,x64:eo,arm:Pc,arm64:Fc};function In(t,e){let n;return e.perform(r=>{let o=Pt(r),i=Rc[Process.arch],s=Instruction.parse(t),c=i(s);c!==null?n=o.add(c).readPointer():n=t}),n}function eo(t){return t.mnemonic==="jmp"?t.operands[0].value.disp:null}function Pc(t){return t.mnemonic==="ldr.w"?t.operands[1].value.disp:null}function Fc(t){return t.mnemonic==="ldr"?t.operands[1].value.disp:null}function Pt(t){return t.handle.add(w).readPointer()}function Dc(){return Gn("ro.build.version.release")}function Uc(){return Gn("ro.build.version.codename")}function Bc(){return parseInt(Gn("ro.build.version.sdk"),10)}function Vc(){try{let t=File.readAllText("/proc/self/mountinfo"),e=null,n=new Map;for(let o of t.trimEnd().split(`
`)){let i=o.split(" "),s=i[4];if(!s.startsWith("/apex/com.android.art"))continue;let c=i[10];s.includes("@")?n.set(c,s.split("@")[1]):e=c}let r=n.get(e);return r!==void 0?parseInt(r):to()}catch{return to()}}function to(){return ne()*1e7}var Cn=null,zc=92;function Gn(t){Cn===null&&(Cn=new NativeFunction(Process.getModuleByName("libc.so").getExportByName("__system_property_get"),"int",["pointer","pointer"],K));let e=Memory.alloc(zc);return Cn(Memory.allocUtf8String(t),e),e.readUtf8String()}function ye(t,e,n){let r=lc(t,e),o=Pt(e).toString();if(ot[o]=n,r(e.handle),ot[o]!==void 0)throw delete ot[o],new Error("Unable to perform state transition; please file a bug")}function Jc(t,e){let n=new NativeCallback(Gc,"void",["pointer"]);return go(t,e,n)}function Gc(t){let e=t.toString(),n=ot[e];delete ot[e],n(t)}function $n(t){let e=J(),n=e.artThreadList;e["art::ThreadList::SuspendAll"](n,Memory.allocUtf8String("frida"),!1?1:0);try{t()}finally{e["art::ThreadList::ResumeAll"](n)}}var Nn=class{constructor(e){let n=Memory.alloc(4*w),r=n.add(w);n.writePointer(r);let o=new NativeCallback((i,s)=>e(s)===!0?1:0,"bool",["pointer","pointer"]);r.add(2*w).writePointer(o),this.handle=n,this._onVisit=o}};function Hn(t){return J()["art::ClassLinker::VisitClasses"]instanceof NativeFunction?new Nn(t):new NativeCallback(n=>t(n)===!0?1:0,"bool",["pointer","pointer"])}var Mn=class{constructor(e){let n=Memory.alloc(4*w),r=n.add(w);n.writePointer(r);let o=new NativeCallback((i,s)=>{e(s)},"void",["pointer","pointer"]);r.add(2*w).writePointer(o),this.handle=n,this._onVisit=o}};function Zn(t){return new Mn(t)}var $c={"include-inlined-frames":0,"skip-inlined-frames":1},On=class{constructor(e,n,r,o=0,i=!0){let s=J(),c=512,a=3*w,l=Memory.alloc(c+a);s["art::StackVisitor::StackVisitor"](l,e,n,$c[r],o,i?1:0);let d=l.add(c);l.writePointer(d);let p=new NativeCallback(this._visitFrame.bind(this),"bool",["pointer"]);d.add(2*w).writePointer(p),this.handle=l,this._onVisitFrame=p;let f=l.add(w===4?12:24);this._curShadowFrame=f,this._curQuickFrame=f.add(w),this._curQuickFramePc=f.add(2*w),this._curOatQuickMethodHeader=f.add(3*w),this._getMethodImpl=s["art::StackVisitor::GetMethod"],this._descLocImpl=s["art::StackVisitor::DescribeLocation"],this._getCQFIImpl=s["art::StackVisitor::GetCurrentQuickFrameInfo"]}walkStack(e=!1){J()["art::StackVisitor::WalkStack"](this.handle,e?1:0)}_visitFrame(){return this.visitFrame()?1:0}visitFrame(){throw new Error("Subclass must implement visitFrame")}getMethod(){let e=this._getMethodImpl(this.handle);return e.isNull()?null:new xt(e)}getCurrentQuickFramePc(){return this._curQuickFramePc.readPointer()}getCurrentQuickFrame(){return this._curQuickFrame.readPointer()}getCurrentShadowFrame(){return this._curShadowFrame.readPointer()}describeLocation(){let e=new Mt;return this._descLocImpl(e,this.handle),e.disposeToString()}getCurrentOatQuickMethodHeader(){return this._curOatQuickMethodHeader.readPointer()}getCurrentQuickFrameInfo(){return this._getCQFIImpl(this.handle)}},xt=class{constructor(e){this.handle=e}prettyMethod(e=!0){let n=new Mt;return J()["art::ArtMethod::PrettyMethod"](n,this.handle,e?1:0),n.disposeToString()}toString(){return`ArtMethod(handle=${this.handle})`}};function Hc(t){return function(e){let n=Memory.alloc(12);return dc(t)(n,e),{frameSizeInBytes:n.readU32(),coreSpillMask:n.add(4).readU32(),fpSpillMask:n.add(8).readU32()}}}function Zc(t){let e=NULL;switch(Process.arch){case"ia32":e=He(32,n=>{n.putMovRegRegOffsetPtr("ecx","esp",4),n.putMovRegRegOffsetPtr("edx","esp",8),n.putCallAddressWithArguments(t,["ecx","edx"]),n.putMovRegReg("esp","ebp"),n.putPopReg("ebp"),n.putRet()});break;case"x64":e=He(32,n=>{n.putPushReg("rdi"),n.putCallAddressWithArguments(t,["rsi"]),n.putPopReg("rdi"),n.putMovRegPtrReg("rdi","rax"),n.putMovRegOffsetPtrReg("rdi",8,"edx"),n.putRet()});break;case"arm":e=He(16,n=>{n.putCallAddressWithArguments(t,["r0","r1"]),n.putPopRegs(["r0","lr"]),n.putMovRegReg("pc","lr")});break;case"arm64":e=He(64,n=>{n.putPushRegReg("x0","lr"),n.putCallAddressWithArguments(t,["x1"]),n.putPopRegReg("x2","lr"),n.putStrRegRegOffset("x0","x2",0),n.putStrRegRegOffset("w1","x2",8),n.putRet()});break}return new NativeFunction(e,"void",["pointer","pointer"],K)}var Wc={ia32:globalThis.X86Relocator,x64:globalThis.X86Relocator,arm:globalThis.ThumbRelocator,arm64:globalThis.Arm64Relocator},jn={ia32:globalThis.X86Writer,x64:globalThis.X86Writer,arm:globalThis.ThumbWriter,arm64:globalThis.Arm64Writer};function He(t,e){Sn===null&&(Sn=Memory.alloc(Process.pageSize));let n=Sn.add(Wr),r=Process.arch,o=jn[r];return Memory.patchCode(n,t,i=>{let s=new o(i,{pc:n});if(e(s),s.flush(),s.offset>t)throw new Error(`Wrote ${s.offset}, exceeding maximum of ${t}`)}),Wr+=t,r==="arm"?n.or(1):n}function qc(t,e){Qc(e),nl(e)}function Kc(t,e){let n=Ze(e).offset,r=cc().offset,o=`
#include <gum/guminterceptor.h>

extern GMutex lock;
extern GHashTable * methods;
extern GHashTable * replacements;
extern gpointer last_seen_art_method;

extern gpointer get_oat_quick_method_header_impl (gpointer method, gpointer pc);

void
init (void)
{
  g_mutex_init (&lock);
  methods = g_hash_table_new_full (NULL, NULL, NULL, NULL);
  replacements = g_hash_table_new_full (NULL, NULL, NULL, NULL);
}

void
finalize (void)
{
  g_hash_table_unref (replacements);
  g_hash_table_unref (methods);
  g_mutex_clear (&lock);
}

gboolean
is_replacement_method (gpointer method)
{
  gboolean is_replacement;

  g_mutex_lock (&lock);

  is_replacement = g_hash_table_contains (replacements, method);

  g_mutex_unlock (&lock);

  return is_replacement;
}

gpointer
get_replacement_method (gpointer original_method)
{
  gpointer replacement_method;

  g_mutex_lock (&lock);

  replacement_method = g_hash_table_lookup (methods, original_method);

  g_mutex_unlock (&lock);

  return replacement_method;
}

void
set_replacement_method (gpointer original_method,
                        gpointer replacement_method)
{
  g_mutex_lock (&lock);

  g_hash_table_insert (methods, original_method, replacement_method);
  g_hash_table_insert (replacements, replacement_method, original_method);

  g_mutex_unlock (&lock);
}

void
synchronize_replacement_methods (guint quick_code_offset,
                                 void * nterp_entrypoint,
                                 void * quick_to_interpreter_bridge)
{
  GHashTableIter iter;
  gpointer hooked_method, replacement_method;

  g_mutex_lock (&lock);

  g_hash_table_iter_init (&iter, methods);
  while (g_hash_table_iter_next (&iter, &hooked_method, &replacement_method))
  {
    void ** quick_code;

    *((uint32_t *) replacement_method) = *((uint32_t *) hooked_method);

    quick_code = hooked_method + quick_code_offset;
    if (*quick_code == nterp_entrypoint)
      *quick_code = quick_to_interpreter_bridge;
  }

  g_mutex_unlock (&lock);
}

void
delete_replacement_method (gpointer original_method)
{
  gpointer replacement_method;

  g_mutex_lock (&lock);

  replacement_method = g_hash_table_lookup (methods, original_method);
  if (replacement_method != NULL)
  {
    g_hash_table_remove (methods, original_method);
    g_hash_table_remove (replacements, replacement_method);
  }

  g_mutex_unlock (&lock);
}

gpointer
translate_method (gpointer method)
{
  gpointer translated_method;

  g_mutex_lock (&lock);

  translated_method = g_hash_table_lookup (replacements, method);

  g_mutex_unlock (&lock);

  return (translated_method != NULL) ? translated_method : method;
}

gpointer
find_replacement_method_from_quick_code (gpointer method,
                                         gpointer thread)
{
  gpointer replacement_method;
  gpointer managed_stack;
  gpointer top_quick_frame;
  gpointer link_managed_stack;
  gpointer * link_top_quick_frame;

  replacement_method = get_replacement_method (method);
  if (replacement_method == NULL)
    return NULL;

  /*
   * Stack check.
   *
   * Return NULL to indicate that the original method should be invoked, otherwise
   * return a pointer to the replacement ArtMethod.
   *
   * If the caller is our own JNI replacement stub, then a stack transition must
   * have been pushed onto the current thread's linked list.
   *
   * Therefore, we invoke the original method if the following conditions are met:
   *   1- The current managed stack is empty.
   *   2- The ArtMethod * inside the linked managed stack's top quick frame is the
   *      same as our replacement.
   */
  managed_stack = thread + ${n.managedStack};
  top_quick_frame = *((gpointer *) (managed_stack + ${r.topQuickFrame}));
  if (top_quick_frame != NULL)
    return replacement_method;

  link_managed_stack = *((gpointer *) (managed_stack + ${r.link}));
  if (link_managed_stack == NULL)
    return replacement_method;

  link_top_quick_frame = GSIZE_TO_POINTER (*((gsize *) (link_managed_stack + ${r.topQuickFrame})) & ~((gsize) 1));
  if (link_top_quick_frame == NULL || *link_top_quick_frame != replacement_method)
    return replacement_method;

  return NULL;
}

void
on_interpreter_do_call (GumInvocationContext * ic)
{
  gpointer method, replacement_method;

  method = gum_invocation_context_get_nth_argument (ic, 0);

  replacement_method = get_replacement_method (method);
  if (replacement_method != NULL)
    gum_invocation_context_replace_nth_argument (ic, 0, replacement_method);
}

gpointer
on_art_method_get_oat_quick_method_header (gpointer method,
                                           gpointer pc)
{
  if (is_replacement_method (method))
    return NULL;

  return get_oat_quick_method_header_impl (method, pc);
}

void
on_art_method_pretty_method (GumInvocationContext * ic)
{
  const guint this_arg_index = ${Process.arch==="arm64"?0:1};
  gpointer method;

  method = gum_invocation_context_get_nth_argument (ic, this_arg_index);
  if (method == NULL)
    gum_invocation_context_replace_nth_argument (ic, this_arg_index, last_seen_art_method);
  else
    last_seen_art_method = method;
}

void
on_leave_gc_concurrent_copying_copying_phase (GumInvocationContext * ic)
{
  GHashTableIter iter;
  gpointer hooked_method, replacement_method;

  g_mutex_lock (&lock);

  g_hash_table_iter_init (&iter, methods);
  while (g_hash_table_iter_next (&iter, &hooked_method, &replacement_method))
    *((uint32_t *) replacement_method) = *((uint32_t *) hooked_method);

  g_mutex_unlock (&lock);
}
`,i=8,s=w,c=w,a=w,d=Memory.alloc(i+s+c+a),p=d.add(i),f=p.add(s),u=f.add(c),_=t.find(w===4?"_ZN3art9ArtMethod23GetOatQuickMethodHeaderEj":"_ZN3art9ArtMethod23GetOatQuickMethodHeaderEm"),h=new CModule(o,{lock:d,methods:p,replacements:f,last_seen_art_method:u,get_oat_quick_method_header_impl:_??ptr("0xdeadbeef")}),m={exceptions:"propagate",scheduling:"exclusive"};return{handle:h,replacedMethods:{isReplacement:new NativeFunction(h.is_replacement_method,"bool",["pointer"],m),get:new NativeFunction(h.get_replacement_method,"pointer",["pointer"],m),set:new NativeFunction(h.set_replacement_method,"void",["pointer","pointer"],m),synchronize:new NativeFunction(h.synchronize_replacement_methods,"void",["uint","pointer","pointer"],m),delete:new NativeFunction(h.delete_replacement_method,"void",["pointer"],m),translate:new NativeFunction(h.translate_method,"pointer",["pointer"],m),findReplacementFromQuickCode:h.find_replacement_method_from_quick_code},getOatQuickMethodHeaderImpl:_,hooks:{Interpreter:{doCall:h.on_interpreter_do_call},ArtMethod:{getOatQuickMethodHeader:h.on_art_method_get_oat_quick_method_header,prettyMethod:h.on_art_method_pretty_method},Gc:{copyingPhase:{onLeave:h.on_leave_gc_concurrent_copying_copying_phase},runFlip:{onEnter:h.on_leave_gc_concurrent_copying_copying_phase}}}}}function Qc(t){Kr||(Kr=!0,Yc(t),Xc(),el(),tl())}function Yc(t){let e=J();[e.artQuickGenericJniTrampoline,e.artQuickToInterpreterBridge,e.artQuickResolutionTrampoline].forEach(r=>{Memory.protect(r,32,"rwx");let o=new Nt(r);o.activate(t),fo.push(o)})}function Xc(){let t=J(),e=ne(),{isApiLevel34OrApexEquivalent:n}=t,r;if(e<=22)r=/^_ZN3art11interpreter6DoCallILb[0-1]ELb[0-1]EEEbPNS_6mirror9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtPNS_6JValueE$/;else if(e<=33&&!n)r=/^_ZN3art11interpreter6DoCallILb[0-1]ELb[0-1]EEEbPNS_9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtPNS_6JValueE$/;else if(n)r=/^_ZN3art11interpreter6DoCallILb[0-1]EEEbPNS_9ArtMethodEPNS_6ThreadERNS_11ShadowFrameEPKNS_11InstructionEtbPNS_6JValueE$/;else throw new Error("Unable to find method invocation in ART; please file a bug");let o=t.module,i=[...o.enumerateExports(),...o.enumerateSymbols()].filter(s=>r.test(s.name));if(i.length===0)throw new Error("Unable to find method invocation in ART; please file a bug");for(let s of i)Interceptor.attach(s.address,oe.hooks.Interpreter.doCall)}function el(){let t=J(),n=t.module.findSymbolByName("_ZN3art2gc4Heap22CollectGarbageInternalENS0_9collector6GcTypeENS0_7GcCauseEbj");if(n===null)return;let{artNterpEntryPoint:r,artQuickToInterpreterBridge:o}=t,i=_e(t.vm).offset.quickCode;Interceptor.attach(n,{onLeave(){oe.replacedMethods.synchronize(i,r,o)}})}function tl(){let t=[["_ZN3art11ClassLinker26VisiblyInitializedCallback22MarkVisiblyInitializedEPNS_6ThreadE","e90340f8 : ff0ff0ff"],["_ZN3art11ClassLinker26VisiblyInitializedCallback29AdjustThreadVisibilityCounterEPNS_6ThreadEl","7f0f00f9 : 1ffcffff"]],e=J(),n=e.module;for(let[r,o]of t){let i=n.findSymbolByName(r);if(i===null)continue;let s=Memory.scanSync(i,8192,o);if(s.length===0)return;let{artNterpEntryPoint:c,artQuickToInterpreterBridge:a}=e,l=_e(e.vm).offset.quickCode;Interceptor.attach(s[0].address,function(){oe.replacedMethods.synchronize(l,c,a)});return}}function nl(t){if(qr)return;if(qr=!0,!ol()){let{getOatQuickMethodHeaderImpl:i}=oe;if(i===null)return;try{Interceptor.replace(i,oe.hooks.ArtMethod.getOatQuickMethodHeader)}catch{}}let e=ne(),n=null,r=J();e>28?n=r.find("_ZN3art2gc9collector17ConcurrentCopying12CopyingPhaseEv"):e>22&&(n=r.find("_ZN3art2gc9collector17ConcurrentCopying12MarkingPhaseEv")),n!==null&&Interceptor.attach(n,oe.hooks.Gc.copyingPhase);let o=null;o=r.find("_ZN3art6Thread15RunFlipFunctionEPS0_"),o===null&&(o=r.find("_ZN3art6Thread15RunFlipFunctionEPS0_b")),o!==null&&Interceptor.attach(o,oe.hooks.Gc.runFlip)}var rl={arm:{signatures:[{pattern:["b0 68","01 30","0c d0","1b 98",":","c0 ff","c0 ff","00 ff","00 2f"],validateMatch:Tn},{pattern:["d8 f8 08 00","01 30","0c d0","1b 98",":","f0 ff ff 0f","ff ff","00 ff","00 2f"],validateMatch:Tn},{pattern:["b0 68","01 30","40 f0 c3 80","00 25",":","c0 ff","c0 ff","c0 fb 00 d0","ff f8"],validateMatch:Tn}],instrument:sl},arm64:{signatures:[{pattern:["0a 40 b9","1f 05 00 31","40 01 00 54","88 39 00 f0",":","fc ff ff","1f fc ff ff","1f 00 00 ff","00 00 00 9f"],offset:1,validateMatch:An},{pattern:["0a 40 b9","1f 05 00 31","40 01 00 54","00 0e 40 f9",":","fc ff ff","1f fc ff ff","1f 00 00 ff","00 fc ff ff"],offset:1,validateMatch:An},{pattern:["0a 40 b9","1f 05 00 31","01 34 00 54","e0 03 1f aa",":","fc ff ff","1f fc ff ff","1f 00 00 ff","e0 ff ff ff"],offset:1,validateMatch:An}],instrument:al}};function Tn({address:t,size:e}){let n=Instruction.parse(t.or(1)),[r,o]=n.operands,i=o.value.base,s=r.value,c=Instruction.parse(n.next.add(2)),a=ptr(c.operands[0].value),l=c.address.add(c.size),d,p;return c.mnemonic==="beq"?(d=l,p=a):(d=a,p=l),xe(d.or(1),f,{limit:3});function f(u){let{mnemonic:_}=u;if(!(_==="ldr"||_==="ldr.w"))return null;let{base:h,disp:m}=u.operands[1].value;return h===i&&m===20?{methodReg:i,scratchReg:s,target:{whenTrue:a,whenRegularMethod:d,whenRuntimeMethod:p}}:null}}function An({address:t,size:e}){let[n,r]=Instruction.parse(t).operands,o=r.value.base,i="x"+n.value.substring(1),s=Instruction.parse(t.add(8)),c=ptr(s.operands[0].value),a=t.add(12),l,d;return s.mnemonic==="b.eq"?(l=a,d=c):(l=c,d=a),xe(l,p,{limit:3});function p(f){if(f.mnemonic!=="ldr")return null;let{base:u,disp:_}=f.operands[1].value;return u===o&&_===24?{methodReg:o,scratchReg:i,target:{whenTrue:c,whenRegularMethod:l,whenRuntimeMethod:d}}:null}}function ol(){if(ne()<31)return!1;let t=rl[Process.arch];if(t===void 0)return!1;let e=t.signatures.map(({pattern:r,offset:o=0,validateMatch:i=il})=>({pattern:new MatchPattern(r.join("")),offset:o,validateMatch:i})),n=[];for(let{base:r,size:o}of J().module.enumerateRanges("--x"))for(let{pattern:i,offset:s,validateMatch:c}of e){let a=Memory.scanSync(r,o,i).map(({address:l,size:d})=>({address:l.sub(s),size:d+s})).filter(l=>{let d=c(l);return d===null?!1:(l.validationResult=d,!0)});n.push(...a)}return n.length===0?!1:(n.forEach(t.instrument),!0)}function il(){return{}}var kt=class{constructor(e,n,r){this.address=e,this.size=n,this.originalCode=e.readByteArray(n),this.trampoline=r}revert(){Memory.patchCode(this.address,this.size,e=>{e.writeByteArray(this.originalCode)})}};function sl({address:t,size:e,validationResult:n}){let{methodReg:r,target:o}=n,i=Memory.alloc(Process.pageSize),s=e;Memory.patchCode(i,256,c=>{let a=new ThumbWriter(c,{pc:i}),l=new ThumbRelocator(t,a);for(let _=0;_!==2;_++)l.readOne();l.writeAll(),l.readOne(),l.skipOne(),a.putBCondLabel("eq","runtime_or_replacement_method");let d=[45,237,16,10];a.putBytes(d);let p=["r0","r1","r2","r3"];a.putPushRegs(p),a.putCallAddressWithArguments(oe.replacedMethods.isReplacement,[r]),a.putCmpRegImm("r0",0),a.putPopRegs(p);let f=[189,236,16,10];a.putBytes(f),a.putBCondLabel("ne","runtime_or_replacement_method"),a.putBLabel("regular_method"),l.readOne();let u=l.input.address.equals(o.whenRegularMethod);for(a.putLabel(u?"regular_method":"runtime_or_replacement_method"),l.writeOne();s<10;){let _=l.readOne();if(_===0){s=10;break}s=_}l.writeAll(),a.putBranchAddress(t.add(s+1)),a.putLabel(u?"runtime_or_replacement_method":"regular_method"),a.putBranchAddress(o.whenTrue),a.flush()}),zn.push(new kt(t,s,i)),Memory.patchCode(t,s,c=>{let a=new ThumbWriter(c,{pc:t});a.putLdrRegAddress("pc",i.or(1)),a.flush()})}function al({address:t,size:e,validationResult:n}){let{methodReg:r,scratchReg:o,target:i}=n,s=Memory.alloc(Process.pageSize);Memory.patchCode(s,256,c=>{let a=new Arm64Writer(c,{pc:s}),l=new Arm64Relocator(t,a);for(let _=0;_!==2;_++)l.readOne();l.writeAll(),l.readOne(),l.skipOne(),a.putBCondLabel("eq","runtime_or_replacement_method");let d=["d0","d1","d2","d3","d4","d5","d6","d7","x0","x1","x2","x3","x4","x5","x6","x7","x8","x9","x10","x11","x12","x13","x14","x15","x16","x17"],p=d.length;for(let _=0;_!==p;_+=2)a.putPushRegReg(d[_],d[_+1]);a.putCallAddressWithArguments(oe.replacedMethods.isReplacement,[r]),a.putCmpRegReg("x0","xzr");for(let _=p-2;_>=0;_-=2)a.putPopRegReg(d[_],d[_+1]);a.putBCondLabel("ne","runtime_or_replacement_method"),a.putBLabel("regular_method"),l.readOne();let f=l.input,u=f.address.equals(i.whenRegularMethod);a.putLabel(u?"regular_method":"runtime_or_replacement_method"),l.writeOne(),a.putBranchAddress(f.next),a.putLabel(u?"runtime_or_replacement_method":"regular_method"),a.putBranchAddress(i.whenTrue),a.flush()}),zn.push(new kt(t,e,s)),Memory.patchCode(t,e,c=>{let a=new Arm64Writer(c,{pc:t});a.putLdrRegAddress(o,s),a.putBrReg(o),a.flush()})}function cl(t){return new po(t)}function ll(t){return oe.replacedMethods.translate(t)}function Wn(t,e={}){let{limit:n=16}=e,r=t.getEnv();return it===null&&(it=dl(t,r)),it.backtrace(r,n)}function dl(t,e){let n=J(),r=Memory.alloc(Process.pointerSize),o=new CModule(`
#include <glib.h>
#include <stdbool.h>
#include <string.h>
#include <gum/gumtls.h>
#include <json-glib/json-glib.h>

typedef struct _ArtBacktrace ArtBacktrace;
typedef struct _ArtStackFrame ArtStackFrame;

typedef struct _ArtStackVisitor ArtStackVisitor;
typedef struct _ArtStackVisitorVTable ArtStackVisitorVTable;

typedef struct _ArtClass ArtClass;
typedef struct _ArtMethod ArtMethod;
typedef struct _ArtThread ArtThread;
typedef struct _ArtContext ArtContext;

typedef struct _JNIEnv JNIEnv;

typedef struct _StdString StdString;
typedef struct _StdTinyString StdTinyString;
typedef struct _StdLargeString StdLargeString;

typedef enum {
  STACK_WALK_INCLUDE_INLINED_FRAMES,
  STACK_WALK_SKIP_INLINED_FRAMES,
} StackWalkKind;

struct _StdTinyString
{
  guint8 unused;
  gchar data[(3 * sizeof (gpointer)) - 1];
};

struct _StdLargeString
{
  gsize capacity;
  gsize size;
  gchar * data;
};

struct _StdString
{
  union
  {
    guint8 flags;
    StdTinyString tiny;
    StdLargeString large;
  };
};

struct _ArtBacktrace
{
  GChecksum * id;
  GArray * frames;
  gchar * frames_json;
};

struct _ArtStackFrame
{
  ArtMethod * method;
  gsize dexpc;
  StdString description;
};

struct _ArtStackVisitorVTable
{
  void (* unused1) (void);
  void (* unused2) (void);
  bool (* visit) (ArtStackVisitor * visitor);
};

struct _ArtStackVisitor
{
  ArtStackVisitorVTable * vtable;

  guint8 padding[512];

  ArtStackVisitorVTable vtable_storage;

  ArtBacktrace * backtrace;
};

struct _ArtMethod
{
  guint32 declaring_class;
  guint32 access_flags;
};

extern GumTlsKey current_backtrace;

extern void (* perform_art_thread_state_transition) (JNIEnv * env);

extern ArtContext * art_make_context (ArtThread * thread);

extern void art_stack_visitor_init (ArtStackVisitor * visitor, ArtThread * thread, void * context, StackWalkKind walk_kind,
    size_t num_frames, bool check_suspended);
extern void art_stack_visitor_walk_stack (ArtStackVisitor * visitor, bool include_transitions);
extern ArtMethod * art_stack_visitor_get_method (ArtStackVisitor * visitor);
extern void art_stack_visitor_describe_location (StdString * description, ArtStackVisitor * visitor);
extern ArtMethod * translate_method (ArtMethod * method);
extern void translate_location (ArtMethod * method, guint32 pc, const gchar ** source_file, gint32 * line_number);
extern void get_class_location (StdString * result, ArtClass * klass);
extern void cxx_delete (void * mem);
extern unsigned long strtoul (const char * str, char ** endptr, int base);

static bool visit_frame (ArtStackVisitor * visitor);
static void art_stack_frame_destroy (ArtStackFrame * frame);

static void append_jni_type_name (GString * s, const gchar * name, gsize length);

static void std_string_destroy (StdString * str);
static gchar * std_string_get_data (StdString * str);

void
init (void)
{
  current_backtrace = gum_tls_key_new ();
}

void
finalize (void)
{
  gum_tls_key_free (current_backtrace);
}

ArtBacktrace *
_create (JNIEnv * env,
         guint limit)
{
  ArtBacktrace * bt;

  bt = g_new (ArtBacktrace, 1);
  bt->id = g_checksum_new (G_CHECKSUM_SHA1);
  bt->frames = (limit != 0)
      ? g_array_sized_new (FALSE, FALSE, sizeof (ArtStackFrame), limit)
      : g_array_new (FALSE, FALSE, sizeof (ArtStackFrame));
  g_array_set_clear_func (bt->frames, (GDestroyNotify) art_stack_frame_destroy);
  bt->frames_json = NULL;

  gum_tls_key_set_value (current_backtrace, bt);

  perform_art_thread_state_transition (env);

  gum_tls_key_set_value (current_backtrace, NULL);

  return bt;
}

void
_on_thread_state_transition_complete (ArtThread * thread)
{
  ArtContext * context;
  ArtStackVisitor visitor = {
    .vtable_storage = {
      .visit = visit_frame,
    },
  };

  context = art_make_context (thread);

  art_stack_visitor_init (&visitor, thread, context, STACK_WALK_SKIP_INLINED_FRAMES, 0, true);
  visitor.vtable = &visitor.vtable_storage;
  visitor.backtrace = gum_tls_key_get_value (current_backtrace);

  art_stack_visitor_walk_stack (&visitor, false);

  cxx_delete (context);
}

static bool
visit_frame (ArtStackVisitor * visitor)
{
  ArtBacktrace * bt = visitor->backtrace;
  ArtStackFrame frame;
  const gchar * description, * dexpc_part;

  frame.method = art_stack_visitor_get_method (visitor);

  art_stack_visitor_describe_location (&frame.description, visitor);

  description = std_string_get_data (&frame.description);
  if (strstr (description, " '<") != NULL)
    goto skip;

  dexpc_part = strstr (description, " at dex PC 0x");
  if (dexpc_part == NULL)
    goto skip;
  frame.dexpc = strtoul (dexpc_part + 13, NULL, 16);

  g_array_append_val (bt->frames, frame);

  g_checksum_update (bt->id, (guchar *) &frame.method, sizeof (frame.method));
  g_checksum_update (bt->id, (guchar *) &frame.dexpc, sizeof (frame.dexpc));

  return true;

skip:
  std_string_destroy (&frame.description);
  return true;
}

static void
art_stack_frame_destroy (ArtStackFrame * frame)
{
  std_string_destroy (&frame->description);
}

void
_destroy (ArtBacktrace * backtrace)
{
  g_free (backtrace->frames_json);
  g_array_free (backtrace->frames, TRUE);
  g_checksum_free (backtrace->id);
  g_free (backtrace);
}

const gchar *
_get_id (ArtBacktrace * backtrace)
{
  return g_checksum_get_string (backtrace->id);
}

const gchar *
_get_frames (ArtBacktrace * backtrace)
{
  GArray * frames = backtrace->frames;
  JsonBuilder * b;
  guint i;
  JsonNode * root;

  if (backtrace->frames_json != NULL)
    return backtrace->frames_json;

  b = json_builder_new_immutable ();

  json_builder_begin_array (b);

  for (i = 0; i != frames->len; i++)
  {
    ArtStackFrame * frame = &g_array_index (frames, ArtStackFrame, i);
    gchar * description, * ret_type, * paren_open, * paren_close, * arg_types, * token, * method_name, * class_name;
    GString * signature;
    gchar * cursor;
    ArtMethod * translated_method;
    StdString location;
    gsize dexpc;
    const gchar * source_file;
    gint32 line_number;

    description = std_string_get_data (&frame->description);

    ret_type = strchr (description, '\\'') + 1;

    paren_open = strchr (ret_type, '(');
    paren_close = strchr (paren_open, ')');
    *paren_open = '\\0';
    *paren_close = '\\0';

    arg_types = paren_open + 1;

    token = strrchr (ret_type, '.');
    *token = '\\0';

    method_name = token + 1;

    token = strrchr (ret_type, ' ');
    *token = '\\0';

    class_name = token + 1;

    signature = g_string_sized_new (128);

    append_jni_type_name (signature, class_name, method_name - class_name - 1);
    g_string_append_c (signature, ',');
    g_string_append (signature, method_name);
    g_string_append (signature, ",(");

    if (arg_types != paren_close)
    {
      for (cursor = arg_types; cursor != NULL;)
      {
        gsize length;
        gchar * next;

        token = strstr (cursor, ", ");
        if (token != NULL)
        {
          length = token - cursor;
          next = token + 2;
        }
        else
        {
          length = paren_close - cursor;
          next = NULL;
        }

        append_jni_type_name (signature, cursor, length);

        cursor = next;
      }
    }

    g_string_append_c (signature, ')');

    append_jni_type_name (signature, ret_type, class_name - ret_type - 1);

    translated_method = translate_method (frame->method);
    dexpc = (translated_method == frame->method) ? frame->dexpc : 0;

    get_class_location (&location, GSIZE_TO_POINTER (translated_method->declaring_class));

    translate_location (translated_method, dexpc, &source_file, &line_number);

    json_builder_begin_object (b);

    json_builder_set_member_name (b, "signature");
    json_builder_add_string_value (b, signature->str);

    json_builder_set_member_name (b, "origin");
    json_builder_add_string_value (b, std_string_get_data (&location));

    json_builder_set_member_name (b, "className");
    json_builder_add_string_value (b, class_name);

    json_builder_set_member_name (b, "methodName");
    json_builder_add_string_value (b, method_name);

    json_builder_set_member_name (b, "methodFlags");
    json_builder_add_int_value (b, translated_method->access_flags);

    json_builder_set_member_name (b, "fileName");
    json_builder_add_string_value (b, source_file);

    json_builder_set_member_name (b, "lineNumber");
    json_builder_add_int_value (b, line_number);

    json_builder_end_object (b);

    std_string_destroy (&location);
    g_string_free (signature, TRUE);
  }

  json_builder_end_array (b);

  root = json_builder_get_root (b);
  backtrace->frames_json = json_to_string (root, FALSE);
  json_node_unref (root);

  return backtrace->frames_json;
}

static void
append_jni_type_name (GString * s,
                      const gchar * name,
                      gsize length)
{
  gchar shorty = '\\0';
  gsize i;

  switch (name[0])
  {
    case 'b':
      if (strncmp (name, "boolean", length) == 0)
        shorty = 'Z';
      else if (strncmp (name, "byte", length) == 0)
        shorty = 'B';
      break;
    case 'c':
      if (strncmp (name, "char", length) == 0)
        shorty = 'C';
      break;
    case 'd':
      if (strncmp (name, "double", length) == 0)
        shorty = 'D';
      break;
    case 'f':
      if (strncmp (name, "float", length) == 0)
        shorty = 'F';
      break;
    case 'i':
      if (strncmp (name, "int", length) == 0)
        shorty = 'I';
      break;
    case 'l':
      if (strncmp (name, "long", length) == 0)
        shorty = 'J';
      break;
    case 's':
      if (strncmp (name, "short", length) == 0)
        shorty = 'S';
      break;
    case 'v':
      if (strncmp (name, "void", length) == 0)
        shorty = 'V';
      break;
  }

  if (shorty != '\\0')
  {
    g_string_append_c (s, shorty);

    return;
  }

  if (length > 2 && name[length - 2] == '[' && name[length - 1] == ']')
  {
    g_string_append_c (s, '[');
    append_jni_type_name (s, name, length - 2);

    return;
  }

  g_string_append_c (s, 'L');

  for (i = 0; i != length; i++)
  {
    gchar ch = name[i];
    if (ch != '.')
      g_string_append_c (s, ch);
    else
      g_string_append_c (s, '/');
  }

  g_string_append_c (s, ';');
}

static void
std_string_destroy (StdString * str)
{
  bool is_large = (str->flags & 1) != 0;
  if (is_large)
    cxx_delete (str->large.data);
}

static gchar *
std_string_get_data (StdString * str)
{
  bool is_large = (str->flags & 1) != 0;
  return is_large ? str->large.data : str->tiny.data;
}
`,{current_backtrace:Memory.alloc(Process.pointerSize),perform_art_thread_state_transition:r,art_make_context:n["art::Thread::GetLongJumpContext"]??n["art::Context::Create"],art_stack_visitor_init:n["art::StackVisitor::StackVisitor"],art_stack_visitor_walk_stack:n["art::StackVisitor::WalkStack"],art_stack_visitor_get_method:n["art::StackVisitor::GetMethod"],art_stack_visitor_describe_location:n["art::StackVisitor::DescribeLocation"],translate_method:oe.replacedMethods.translate,translate_location:n["art::Monitor::TranslateLocation"],get_class_location:n["art::mirror::Class::GetLocation"],cxx_delete:n.$delete,strtoul:Process.getModuleByName("libc.so").getExportByName("strtoul")}),i=new NativeFunction(o._create,"pointer",["pointer","uint"],K),s=new NativeFunction(o._destroy,"void",["pointer"],K),c={exceptions:"propagate",scheduling:"exclusive"},a=new NativeFunction(o._get_id,"pointer",["pointer"],c),l=new NativeFunction(o._get_frames,"pointer",["pointer"],c),d=go(t,e,o._on_thread_state_transition_complete);o._performData=d,r.writePointer(d),o.backtrace=(f,u)=>{let _=i(f,u),h=new Rn(_);return Script.bindWeak(h,p.bind(null,_)),h};function p(f){s(f)}return o.getId=f=>a(f).readUtf8String(),o.getFrames=f=>JSON.parse(l(f).readUtf8String()),o}var Rn=class{constructor(e){this.handle=e}get id(){return it.getId(this.handle)}get frames(){return it.getFrames(this.handle)}};function qn(){Lt.forEach(t=>{t.vtablePtr.writePointer(t.vtable),t.vtableCountPtr.writeS32(t.vtableCount)}),Lt.clear();for(let t of fo.splice(0))t.deactivate();for(let t of zn.splice(0))t.revert()}function Kn(t){return _o(t,"art::jni::JniIdManager::DecodeMethodId")}function no(t){return _o(t,"art::jni::JniIdManager::DecodeFieldId")}function _o(t,e){let n=J(),r=lo(n).offset,o=r.jniIdManager,i=r.jniIdsIndirection;if(o!==null&&i!==null){let s=n.artRuntime;if(s.add(i).readInt()!==Pa){let a=s.add(o).readPointer();return n[e](a,t)}}return t}var ul={ia32:pl,x64:fl,arm:hl,arm64:_l};function pl(t,e,n,r,o){let i=Ze(o).offset,s=_e(o).offset,c;return Memory.patchCode(t,128,a=>{let l=new X86Writer(a,{pc:t}),d=new X86Relocator(e,l),p=[15,174,4,36],f=[15,174,12,36];l.putPushax(),l.putMovRegReg("ebp","esp"),l.putAndRegU32("esp",4294967280),l.putSubRegImm("esp",512),l.putBytes(p),l.putMovRegFsU32Ptr("ebx",i.self),l.putCallAddressWithAlignedArguments(oe.replacedMethods.findReplacementFromQuickCode,["eax","ebx"]),l.putTestRegReg("eax","eax"),l.putJccShortLabel("je","restore_registers","no-hint"),l.putMovRegOffsetPtrReg("ebp",7*4,"eax"),l.putLabel("restore_registers"),l.putBytes(f),l.putMovRegReg("esp","ebp"),l.putPopax(),l.putJccShortLabel("jne","invoke_replacement","no-hint");do c=d.readOne();while(c<n&&!d.eoi);d.writeAll(),d.eoi||l.putJmpAddress(e.add(c)),l.putLabel("invoke_replacement"),l.putJmpRegOffsetPtr("eax",s.quickCode),l.flush()}),c}function fl(t,e,n,r,o){let i=Ze(o).offset,s=_e(o).offset,c;return Memory.patchCode(t,256,a=>{let l=new X86Writer(a,{pc:t}),d=new X86Relocator(e,l),p=[15,174,4,36],f=[15,174,12,36];l.putPushax(),l.putMovRegReg("rbp","rsp"),l.putAndRegU32("rsp",4294967280),l.putSubRegImm("rsp",512),l.putBytes(p),l.putMovRegGsU32Ptr("rbx",i.self),l.putCallAddressWithAlignedArguments(oe.replacedMethods.findReplacementFromQuickCode,["rdi","rbx"]),l.putTestRegReg("rax","rax"),l.putJccShortLabel("je","restore_registers","no-hint"),l.putMovRegOffsetPtrReg("rbp",8*8,"rax"),l.putLabel("restore_registers"),l.putBytes(f),l.putMovRegReg("rsp","rbp"),l.putPopax(),l.putJccShortLabel("jne","invoke_replacement","no-hint");do c=d.readOne();while(c<n&&!d.eoi);d.writeAll(),d.eoi||l.putJmpAddress(e.add(c)),l.putLabel("invoke_replacement"),l.putJmpRegOffsetPtr("rdi",s.quickCode),l.flush()}),c}function hl(t,e,n,r,o){let i=_e(o).offset,s=e.and(Bn),c;return Memory.patchCode(t,128,a=>{let l=new ThumbWriter(a,{pc:t}),d=new ThumbRelocator(s,l),p=[45,237,16,10],f=[189,236,16,10];l.putPushRegs(["r1","r2","r3","r5","r6","r7","r8","r10","r11","lr"]),l.putBytes(p),l.putSubRegRegImm("sp","sp",8),l.putStrRegRegOffset("r0","sp",0),l.putCallAddressWithArguments(oe.replacedMethods.findReplacementFromQuickCode,["r0","r9"]),l.putCmpRegImm("r0",0),l.putBCondLabel("eq","restore_registers"),l.putStrRegRegOffset("r0","sp",0),l.putLabel("restore_registers"),l.putLdrRegRegOffset("r0","sp",0),l.putAddRegRegImm("sp","sp",8),l.putBytes(f),l.putPopRegs(["lr","r11","r10","r8","r7","r6","r5","r3","r2","r1"]),l.putBCondLabel("ne","invoke_replacement");do c=d.readOne();while(c<n&&!d.eoi);d.writeAll(),d.eoi||l.putLdrRegAddress("pc",e.add(c)),l.putLabel("invoke_replacement"),l.putLdrRegRegOffset("pc","r0",i.quickCode),l.flush()}),c}function _l(t,e,n,{availableScratchRegs:r},o){let i=_e(o).offset,s;return Memory.patchCode(t,256,c=>{let a=new Arm64Writer(c,{pc:t}),l=new Arm64Relocator(e,a);a.putPushRegReg("d0","d1"),a.putPushRegReg("d2","d3"),a.putPushRegReg("d4","d5"),a.putPushRegReg("d6","d7"),a.putPushRegReg("x1","x2"),a.putPushRegReg("x3","x4"),a.putPushRegReg("x5","x6"),a.putPushRegReg("x7","x20"),a.putPushRegReg("x21","x22"),a.putPushRegReg("x23","x24"),a.putPushRegReg("x25","x26"),a.putPushRegReg("x27","x28"),a.putPushRegReg("x29","lr"),a.putSubRegRegImm("sp","sp",16),a.putStrRegRegOffset("x0","sp",0),a.putCallAddressWithArguments(oe.replacedMethods.findReplacementFromQuickCode,["x0","x19"]),a.putCmpRegReg("x0","xzr"),a.putBCondLabel("eq","restore_registers"),a.putStrRegRegOffset("x0","sp",0),a.putLabel("restore_registers"),a.putLdrRegRegOffset("x0","sp",0),a.putAddRegRegImm("sp","sp",16),a.putPopRegReg("x29","lr"),a.putPopRegReg("x27","x28"),a.putPopRegReg("x25","x26"),a.putPopRegReg("x23","x24"),a.putPopRegReg("x21","x22"),a.putPopRegReg("x7","x20"),a.putPopRegReg("x5","x6"),a.putPopRegReg("x3","x4"),a.putPopRegReg("x1","x2"),a.putPopRegReg("d6","d7"),a.putPopRegReg("d4","d5"),a.putPopRegReg("d2","d3"),a.putPopRegReg("d0","d1"),a.putBCondLabel("ne","invoke_replacement");do s=l.readOne();while(s<n&&!l.eoi);if(l.writeAll(),!l.eoi){let d=Array.from(r)[0];a.putLdrRegAddress(d,e.add(s)),a.putBrReg(d)}a.putLabel("invoke_replacement"),a.putLdrRegRegOffset("x16","x0",i.quickCode),a.putBrReg("x16"),a.flush()}),s}var ml={ia32:ro,x64:ro,arm:gl,arm64:bl};function ro(t,e,n){Memory.patchCode(t,16,r=>{let o=new X86Writer(r,{pc:t});o.putJmpAddress(e),o.flush()})}function gl(t,e,n){let r=t.and(Bn);Memory.patchCode(r,16,o=>{let i=new ThumbWriter(o,{pc:r});i.putLdrRegAddress("pc",e.or(1)),i.flush()})}function bl(t,e,n){Memory.patchCode(t,16,r=>{let o=new Arm64Writer(r,{pc:t});n===16?o.putLdrRegAddress("x16",e):o.putAdrpRegAddress("x16",e),o.putBrReg("x16"),o.flush()})}var yl={ia32:5,x64:16,arm:8,arm64:16},Nt=class{constructor(e){this.quickCode=e,this.quickCodeAddress=Process.arch==="arm"?e.and(Bn):e,this.redirectSize=0,this.trampoline=null,this.overwrittenPrologue=null,this.overwrittenPrologueLength=0}_canRelocateCode(e,n){let r=jn[Process.arch],o=Wc[Process.arch],{quickCodeAddress:i}=this,s=new r(i),c=new o(i,s),a;if(Process.arch==="arm64"){let l=new Set(["x16","x17"]);do{let d=c.readOne(),p=new Set(l),{read:f,written:u}=c.input.regsAccessed;for(let _ of[f,u])for(let h of _){let m;h.startsWith("w")?m="x"+h.substring(1):m=h,p.delete(m)}if(p.size===0)break;a=d,l=p}while(a<e&&!c.eoi);n.availableScratchRegs=l}else do a=c.readOne();while(a<e&&!c.eoi);return a>=e}_allocateTrampoline(){It===null&&(It=tn(w===4?128:256));let e=yl[Process.arch],n,r,o=1,i={};if(w===4||this._canRelocateCode(e,i))n=e,r={};else{let s;Process.arch==="x64"?(n=5,s=Fa):Process.arch==="arm64"&&(n=8,s=Da,o=4096),r={near:this.quickCodeAddress,maxDistance:s}}return this.redirectSize=n,this.trampoline=It.allocateSlice(r,o),i}_destroyTrampoline(){It.freeSlice(this.trampoline)}activate(e){let n=this._allocateTrampoline(),{trampoline:r,quickCode:o,redirectSize:i}=this,s=ul[Process.arch],c=s(r,o,i,n,e);this.overwrittenPrologueLength=c,this.overwrittenPrologue=Memory.dup(this.quickCodeAddress,c);let a=ml[Process.arch];a(o,r,i)}deactivate(){let{quickCodeAddress:e,overwrittenPrologueLength:n}=this,r=jn[Process.arch];Memory.patchCode(e,n,o=>{let i=new r(o,{pc:e}),{overwrittenPrologue:s}=this;i.putBytes(s.readByteArray(n)),i.flush()}),this._destroyTrampoline()}};function El(t){let e=J(),{module:n,artClassLinker:r}=e;return t.equals(r.quickGenericJniTrampoline)||t.equals(r.quickToInterpreterBridgeTrampoline)||t.equals(r.quickResolutionTrampoline)||t.equals(r.quickImtConflictTrampoline)||t.compare(n.base)>=0&&t.compare(n.base.add(n.size))<0}var Pn=class{constructor(e){let n=Kn(e);this.methodId=n,this.originalMethod=null,this.hookedMethodId=n,this.replacementMethodId=null,this.interceptor=null}replace(e,n,r,o,i){let{kAccCompileDontBother:s,artNterpEntryPoint:c}=i;this.originalMethod=oo(this.methodId,o);let a=this.originalMethod.accessFlags;if((a&Ra)!==0&&vl()){let u=this.originalMethod.jniCode;this.hookedMethodId=u.add(2*w).readPointer(),this.originalMethod=oo(this.hookedMethodId,o)}let{hookedMethodId:l}=this,d=wl(l,o);this.replacementMethodId=d,Ct(d,{jniCode:e,accessFlags:(a&~(ka|xa|Ln)|At|s)>>>0,quickCode:i.artClassLinker.quickGenericJniTrampoline,interpreterCode:i.artInterpreterToCompiledCodeBridge},o);let p=ao|Ma|Ln;(a&At)===0&&(p|=Na),Ct(l,{accessFlags:(a&~p|s)>>>0},o);let f=this.originalMethod.quickCode;if(c!==null&&f.equals(c)&&Ct(l,{quickCode:i.artQuickToInterpreterBridge},o),!El(f)){let u=new Nt(f);u.activate(o),this.interceptor=u}oe.replacedMethods.set(l,d),qc(l,o)}revert(e){let{hookedMethodId:n,interceptor:r}=this;Ct(n,this.originalMethod,e),oe.replacedMethods.delete(n),r!==null&&(r.deactivate(),this.interceptor=null)}resolveTarget(e,n,r,o){return this.hookedMethodId}};function vl(){return ne()<28}function oo(t,e){let r=_e(e).offset;return["jniCode","accessFlags","quickCode","interpreterCode"].reduce((o,i)=>{let s=r[i];if(s===void 0)return o;let c=t.add(s),a=i==="accessFlags"?Sa:wa;return o[i]=a.call(c),o},{})}function Ct(t,e,n){let o=_e(n).offset;Object.keys(e).forEach(i=>{let s=o[i];if(s===void 0)return;let c=t.add(s);(i==="accessFlags"?Ia:Ca).call(c,e[i])})}var Fn=class{constructor(e){this.methodId=e,this.originalMethod=null}replace(e,n,r,o,i){let{methodId:s}=this;this.originalMethod=Memory.dup(s,yn);let c=r.reduce((f,u)=>f+u.size,0);n&&c++;let a=(s.add(Hr).readU32()|At)>>>0,l=c,d=0,p=c;s.add(Hr).writeU32(a),s.add(Ga).writeU16(l),s.add($a).writeU16(d),s.add(Ha).writeU16(p),s.add(Wa).writeU32(Sl(s)),i.dvmUseJNIBridge(s,e)}revert(e){Memory.copy(this.methodId,this.originalMethod,yn)}resolveTarget(e,n,r,o){let i=r.handle.add(co).readPointer(),s;if(n)s=o.dvmDecodeIndirectRef(i,e.$h);else{let f=e.$borrowClassHandle(r);s=o.dvmDecodeIndirectRef(i,f.value),f.unref(r)}let c;n?c=s.add(za).readPointer():c=s;let a=c.toString(16),l=Lt.get(a);if(l===void 0){let f=c.add(Va),u=c.add(Ba),_=f.readPointer(),h=u.readS32(),m=h*w,b=Memory.alloc(2*m);Memory.copy(b,_,m),f.writePointer(b),l={classObject:c,vtablePtr:f,vtableCountPtr:u,vtable:_,vtableCount:h,shadowVtable:b,shadowVtableCount:h,targetMethods:new Map},Lt.set(a,l)}let d=this.methodId.toString(16),p=l.targetMethods.get(d);if(p===void 0){p=Memory.dup(this.originalMethod,yn);let f=l.shadowVtableCount++;l.shadowVtable.add(f*w).writePointer(p),p.add(Ja).writeU16(f),l.vtableCountPtr.writeS32(l.shadowVtableCount),l.targetMethods.set(d,p)}return p}};function Sl(t){if(Process.arch!=="ia32")return Zr;let e=t.add(Za).readPointer().readCString();if(e===null||e.length===0||e.length>65535)return Zr;let n;switch(e[0]){case"V":n=qa;break;case"F":n=Ka;break;case"D":n=Qa;break;case"J":n=Ya;break;case"Z":case"B":n=nc;break;case"C":n=tc;break;case"S":n=ec;break;default:n=Xa;break}let r=0;for(let o=e.length-1;o>0;o--){let i=e[o];r+=i==="D"||i==="J"?2:1}return n<<rc|r}function wl(t,e){let n=J();if(ne()<23){let r=n["art::Thread::CurrentFromGdb"]();return n["art::mirror::Object::Clone"](t,r)}return Memory.dup(t,_e(e).size)}function Qn(t,e,n){mo(t,e,kn,n)}function Yn(t,e){mo(t,e,xn)}function Xn(t,e){let n=J();if(ne()<26)throw new Error("This API is only available on Android >= 8.0");ye(t,e,r=>{n["art::Runtime::DeoptimizeBootImage"](n.artRuntime)})}function mo(t,e,n,r){let o=J();if(ne()<24)throw new Error("This API is only available on Android >= 7.0");ye(t,e,i=>{if(ne()<30){if(!o.isJdwpStarted()){let c=Il(o);pc.push(c)}o.isDebuggerActive()||o["art::Dbg::GoActive"]();let s=Memory.alloc(8+w);switch(s.writeU32(n),n){case xn:break;case kn:s.add(8).writePointer(r);break;default:throw new Error("Unsupported deoptimization kind")}o["art::Dbg::RequestDeoptimization"](s),o["art::Dbg::ManageDeoptimization"]()}else{let s=o.artInstrumentation;if(s===null)throw new Error("Unable to find Instrumentation class in ART; please file a bug");let c=o["art::Instrumentation::EnableDeoptimization"];switch(c!==void 0&&(s.add(ac().offset.deoptimizationEnabled).readU8()||c(s)),n){case xn:o["art::Instrumentation::DeoptimizeEverything"](s,Memory.allocUtf8String("frida"));break;case kn:o["art::Instrumentation::Deoptimize"](s,r);break;default:throw new Error("Unsupported deoptimization kind")}}})}var Dn=class{constructor(){let e=Process.getModuleByName("libart.so"),n=e.getExportByName("_ZN3art4JDWP12JdwpAdbState6AcceptEv"),r=e.getExportByName("_ZN3art4JDWP12JdwpAdbState15ReceiveClientFdEv"),o=io(),i=io();this._controlFd=o[0],this._clientFd=i[0];let s=null;s=Interceptor.attach(n,function(c){let a=c[0];Memory.scanSync(a.add(8252),256,"00 ff ff ff ff 00")[0].address.add(1).writeS32(o[1]),s.detach()}),Interceptor.replace(r,new NativeCallback(function(c){return Interceptor.revert(r),i[1]},"int",["pointer"])),Interceptor.flush(),this._handshakeRequest=this._performHandshake()}async _performHandshake(){let e=new UnixInputStream(this._clientFd,{autoClose:!1}),n=new UnixOutputStream(this._clientFd,{autoClose:!1}),r=[74,68,87,80,45,72,97,110,100,115,104,97,107,101];try{await n.writeAll(r),await e.readAll(r.length)}catch{}}};function Il(t){let e=new Dn;t["art::Dbg::SetJdwpAllowed"](1);let n=Cl();t["art::Dbg::ConfigureJdwp"](n);let r=t["art::InternalDebuggerControlCallback::StartDebugger"];return r!==void 0?r(NULL):t["art::Dbg::StartJdwp"](),e}function Cl(){let t=ne()<28?2:3,e=0,n=t,r=!0,o=!1,i=e,s=8+at+2,c=Memory.alloc(s);return c.writeU32(n).add(4).writeU8(r?1:0).add(1).writeU8(o?1:0).add(1).add(at).writeU16(i),c}function io(){wn===null&&(wn=new NativeFunction(Process.getModuleByName("libc.so").getExportByName("socketpair"),"int",["int","int","int","pointer"]));let t=Memory.alloc(8);if(wn(ic,sc,0,t)===-1)throw new Error("Unable to create socketpair for JDWP");return[t.readS32(),t.add(4).readS32()]}function Tl(t){let e=mc().offset,n=t.vm.add(e.globalsLock),r=t.vm.add(e.globals),o=t["art::IndirectReferenceTable::Add"],i=t["art::ReaderWriterMutex::ExclusiveLock"],s=t["art::ReaderWriterMutex::ExclusiveUnlock"],c=0;return function(a,l,d){i(n,l);try{return o(r,c,d)}finally{s(n,l)}}}function Al(t){let e=t["art::Thread::DecodeJObject"];if(e===void 0)throw new Error("art::Thread::DecodeJObject is not available; please file a bug");return function(n,r,o){return e(r,o)}}var Ll={ia32:so,x64:so,arm:xl,arm64:kl};function go(t,e,n){let r=J(),o=e.handle.readPointer(),i,s=r.find("_ZN3art3JNIILb1EE14ExceptionClearEP7_JNIEnv");s!==null?i=s:i=o.add(jt).readPointer();let c,a=r.find("_ZN3art3JNIILb1EE10FatalErrorEP7_JNIEnvPKc");a!==null?c=a:c=o.add(Ua).readPointer();let l=Ll[Process.arch];if(l===void 0)throw new Error("Not yet implemented for "+Process.arch);let d=null,p=Ze(t).offset,f=p.exception,u=new Set,_=p.isExceptionReportedToInstrumentation;_!==null&&u.add(_);let h=p.throwLocation;h!==null&&(u.add(h),u.add(h+w),u.add(h+2*w));let m=65536,b=Memory.alloc(m);return Memory.patchCode(b,m,E=>{d=l(E,b,i,c,f,u,n)}),d._code=b,d._callback=n,d}function so(t,e,n,r,o,i,s){let c={},a=new Set,l=[n];for(;l.length>0;){let h=l.shift();if(Object.values(c).some(({begin:R,end:O})=>h.compare(R)>=0&&h.compare(O)<0))continue;let b=h.toString(),E={begin:h},L=null,C=!1;do{if(h.equals(r)){C=!0;break}let R=Instruction.parse(h);L=R;let O=c[R.address.toString()];if(O!==void 0){delete c[O.begin.toString()],c[b]=O,O.begin=E.begin,E=null;break}let j=null;switch(R.mnemonic){case"jmp":j=ptr(R.operands[0].value),C=!0;break;case"je":case"jg":case"jle":case"jne":case"js":j=ptr(R.operands[0].value);break;case"ret":C=!0;break}j!==null&&(a.add(j.toString()),l.push(j),l.sort((N,T)=>N.compare(T))),h=R.next}while(!C);E!==null&&(E.end=L.address.add(L.size),c[b]=E)}let d=Object.keys(c).map(h=>c[h]);d.sort((h,m)=>h.begin.compare(m.begin));let p=c[n.toString()];d.splice(d.indexOf(p),1),d.unshift(p);let f=new X86Writer(t,{pc:e}),u=!1,_=null;return d.forEach(h=>{let m=h.end.sub(h.begin).toInt32(),b=new X86Relocator(h.begin,f),E;for(;(E=b.readOne())!==0;){let L=b.input,{mnemonic:C}=L,R=L.address.toString();a.has(R)&&f.putLabel(R);let O=!0;switch(C){case"jmp":f.putJmpNearLabel(fe(L.operands[0])),O=!1;break;case"je":case"jg":case"jle":case"jne":case"js":f.putJccNearLabel(C,fe(L.operands[0]),"no-hint"),O=!1;break;case"mov":{let[j,N]=L.operands;if(j.type==="mem"&&N.type==="imm"){let T=j.value,v=T.disp;if(v===o&&N.value.valueOf()===0){if(_=T.base,f.putPushfx(),f.putPushax(),f.putMovRegReg("xbp","xsp"),w===4)f.putAndRegU32("esp",4294967280);else{let M=_!=="rdi"?"rdi":"rsi";f.putMovRegU64(M,uint64("0xfffffffffffffff0")),f.putAndRegReg("rsp",M)}f.putCallAddressWithAlignedArguments(s,[_]),f.putMovRegReg("xsp","xbp"),f.putPopax(),f.putPopfx(),u=!0,O=!1}else i.has(v)&&T.base===_&&(O=!1)}break}case"call":{let j=L.operands[0];j.type==="mem"&&j.value.disp===jt&&(w===4?(f.putPopReg("eax"),f.putMovRegRegOffsetPtr("eax","eax",4),f.putPushReg("eax")):f.putMovRegRegOffsetPtr("rdi","rdi",8),f.putCallAddressWithArguments(s,[]),u=!0,O=!1);break}}if(O?b.writeAll():b.skipOne(),E===m)break}b.dispose()}),f.dispose(),u||er(),new NativeFunction(e,"void",["pointer"],K)}function xl(t,e,n,r,o,i,s){let c={},a=new Set,l=ptr(1).not(),d=[n];for(;d.length>0;){let b=d.shift();if(Object.values(c).some(({begin:v,end:M})=>b.compare(v)>=0&&b.compare(M)<0))continue;let L=b.and(l),C=L.toString(),R=b.and(1),O={begin:L},j=null,N=!1,T=0;do{if(b.equals(r)){N=!0;break}let v;try{v=Instruction.parse(b)}catch(B){if(j!==null){N=!0;break}throw B}let{mnemonic:M}=v;j=v;let S=b.and(l).toString(),F=c[S];if(F!==void 0){delete c[F.begin.toString()],c[C]=F,F.begin=O.begin,O=null;break}let D=T===0,P=null;switch(M){case"b":P=ptr(v.operands[0].value),N=D;break;case"beq.w":case"beq":case"bne":case"bne.w":case"bgt":P=ptr(v.operands[0].value);break;case"cbz":case"cbnz":P=ptr(v.operands[1].value);break;case"pop.w":D&&(N=v.operands.filter(B=>B.value==="pc").length===1);break}switch(M){case"it":T=1;break;case"itt":T=2;break;case"ittt":T=3;break;case"itttt":T=4;break;default:T>0&&T--;break}P!==null&&(a.add(P.toString()),d.push(P.or(R)),d.sort((B,$)=>B.compare($))),b=v.next}while(!N);O!==null&&(O.end=j.address.add(j.size),c[C]=O)}let p=Object.keys(c).map(b=>c[b]);p.sort((b,E)=>b.begin.compare(E.begin));let f=c[n.and(l).toString()];p.splice(p.indexOf(f),1),p.unshift(f);let u=new ThumbWriter(t,{pc:e}),_=!1,h=null,m=null;return p.forEach(b=>{let E=new ThumbRelocator(b.begin,u),L=b.begin,C=b.end,R=0;do{if(E.readOne()===0)throw new Error("Unexpected end of block");let j=E.input;L=j.address,R=j.size;let{mnemonic:N}=j,T=L.toString();a.has(T)&&u.putLabel(T);let v=!0;switch(N){case"b":u.putBLabel(fe(j.operands[0])),v=!1;break;case"beq.w":u.putBCondLabelWide("eq",fe(j.operands[0])),v=!1;break;case"bne.w":u.putBCondLabelWide("ne",fe(j.operands[0])),v=!1;break;case"beq":case"bne":case"bgt":u.putBCondLabelWide(N.substr(1),fe(j.operands[0])),v=!1;break;case"cbz":{let M=j.operands;u.putCbzRegLabel(M[0].value,fe(M[1])),v=!1;break}case"cbnz":{let M=j.operands;u.putCbnzRegLabel(M[0].value,fe(M[1])),v=!1;break}case"str":case"str.w":{let M=j.operands[1].value,I=M.disp;if(I===o){h=M.base;let S=h!=="r4"?"r4":"r5",F=["r0","r1","r2","r3",S,"r9","r12","lr"];u.putPushRegs(F),u.putMrsRegReg(S,"apsr-nzcvq"),u.putCallAddressWithArguments(s,[h]),u.putMsrRegReg("apsr-nzcvq",S),u.putPopRegs(F),_=!0,v=!1}else i.has(I)&&M.base===h&&(v=!1);break}case"ldr":{let[M,I]=j.operands;if(I.type==="mem"){let S=I.value;S.base[0]==="r"&&S.disp===jt&&(m=M.value)}break}case"blx":j.operands[0].value===m&&(u.putLdrRegRegOffset("r0","r0",4),u.putCallAddressWithArguments(s,["r0"]),_=!0,m=null,v=!1);break}v?E.writeAll():E.skipOne()}while(!L.add(R).equals(C));E.dispose()}),u.dispose(),_||er(),new NativeFunction(e.or(1),"void",["pointer"],K)}function kl(t,e,n,r,o,i,s){let c={},a=new Set,l=[n];for(;l.length>0;){let E=l.shift();if(Object.values(c).some(({begin:N,end:T})=>E.compare(N)>=0&&E.compare(T)<0))continue;let C=E.toString(),R={begin:E},O=null,j=!1;do{if(E.equals(r)){j=!0;break}let N;try{N=Instruction.parse(E)}catch(M){if(E.readU32()===0){j=!0;break}else throw M}O=N;let T=c[N.address.toString()];if(T!==void 0){delete c[T.begin.toString()],c[C]=T,T.begin=R.begin,R=null;break}let v=null;switch(N.mnemonic){case"b":v=ptr(N.operands[0].value),j=!0;break;case"b.eq":case"b.ne":case"b.le":case"b.gt":v=ptr(N.operands[0].value);break;case"cbz":case"cbnz":v=ptr(N.operands[1].value);break;case"tbz":case"tbnz":v=ptr(N.operands[2].value);break;case"ret":j=!0;break}v!==null&&(a.add(v.toString()),l.push(v),l.sort((M,I)=>M.compare(I))),E=N.next}while(!j);R!==null&&(R.end=O.address.add(O.size),c[C]=R)}let d=Object.keys(c).map(E=>c[E]);d.sort((E,L)=>E.begin.compare(L.begin));let p=c[n.toString()];d.splice(d.indexOf(p),1),d.unshift(p);let f=new Arm64Writer(t,{pc:e}),u=e.add(f.offset);f.putPushAllXRegisters(),f.putCallAddressWithArguments(s,["x0"]),f.putPopAllXRegisters(),f.putRet(),f.flush();let _=e.add(f.offset),h=!1,m=null,b=null;return d.forEach(E=>{let L=E.end.sub(E.begin).toInt32(),C=new Arm64Relocator(E.begin,f),R;for(;(R=C.readOne())!==0;){let O=C.input,{mnemonic:j}=O,N=O.address.toString();a.has(N)&&f.putLabel(N);let T=!0;switch(j){case"b":f.putBLabel(fe(O.operands[0])),T=!1;break;case"b.eq":case"b.ne":case"b.le":case"b.gt":f.putBCondLabel(j.substr(2),fe(O.operands[0])),T=!1;break;case"cbz":{let v=O.operands;f.putCbzRegLabel(v[0].value,fe(v[1])),T=!1;break}case"cbnz":{let v=O.operands;f.putCbnzRegLabel(v[0].value,fe(v[1])),T=!1;break}case"tbz":{let v=O.operands;f.putTbzRegImmLabel(v[0].value,v[1].value.valueOf(),fe(v[2])),T=!1;break}case"tbnz":{let v=O.operands;f.putTbnzRegImmLabel(v[0].value,v[1].value.valueOf(),fe(v[2])),T=!1;break}case"str":{let v=O.operands,M=v[0].value,I=v[1].value,S=I.disp;M==="xzr"&&S===o?(m=I.base,f.putPushRegReg("x0","lr"),f.putMovRegReg("x0",m),f.putBlImm(u),f.putPopRegReg("x0","lr"),h=!0,T=!1):i.has(S)&&I.base===m&&(T=!1);break}case"ldr":{let v=O.operands,M=v[1].value;M.base[0]==="x"&&M.disp===jt&&(b=v[0].value);break}case"blr":O.operands[0].value===b&&(f.putLdrRegRegOffset("x0","x0",8),f.putCallAddressWithArguments(s,["x0"]),h=!0,b=null,T=!1);break}if(T?C.writeAll():C.skipOne(),R===L)break}C.dispose()}),f.dispose(),h||er(),new NativeFunction(_,"void",["pointer"],K)}function er(){throw new Error("Unable to parse ART internals; please file a bug")}function Nl(t){let e=t["art::ArtMethod::PrettyMethod"];e!==void 0&&(Interceptor.attach(e.impl,oe.hooks.ArtMethod.prettyMethod),Interceptor.flush())}function fe(t){return ptr(t.value).toString()}function Ml(t,e){return new NativeFunction(t,"pointer",e,K)}function Ol(t,e){let n=new NativeFunction(t,"void",["pointer"].concat(e),K);return function(){let r=Memory.alloc(w);return n(r,...arguments),r.readPointer()}}function Tt(t,e){let{arch:n}=Process;switch(n){case"ia32":case"arm64":{let r;n==="ia32"?r=He(64,s=>{let c=1+e.length,a=c*4;s.putSubRegImm("esp",a);for(let l=0;l!==c;l++){let d=l*4;s.putMovRegRegOffsetPtr("eax","esp",a+4+d),s.putMovRegOffsetPtrReg("esp",d,"eax")}s.putCallAddress(t),s.putAddRegImm("esp",a-4),s.putRet()}):r=He(32,s=>{s.putMovRegReg("x8","x0"),e.forEach((c,a)=>{s.putMovRegReg("x"+a,"x"+(a+1))}),s.putLdrRegAddress("x7",t),s.putBrReg("x7")});let o=new NativeFunction(r,"void",["pointer"].concat(e),K),i=function(...s){o(...s)};return i.handle=r,i.impl=t,i}default:{let r=new NativeFunction(t,"void",["pointer"].concat(e),K);return r.impl=t,r}}}var Mt=class{constructor(){this.handle=Memory.alloc(at)}dispose(){let[e,n]=this._getData();n||J().$delete(e)}disposeToString(){let e=this.toString();return this.dispose(),e}toString(){let[e]=this._getData();return e.readUtf8String()}_getData(){let e=this.handle,n=(e.readU8()&1)===0;return[n?e.add(1):e.add(2*w).readPointer(),n]}},Un=class{$delete(){this.dispose(),J().$delete(this)}constructor(e,n){this.handle=e,this._begin=e,this._end=e.add(w),this._storage=e.add(2*w),this._elementSize=n}init(){this.begin=NULL,this.end=NULL,this.storage=NULL}dispose(){J().$delete(this.begin)}get begin(){return this._begin.readPointer()}set begin(e){this._begin.writePointer(e)}get end(){return this._end.readPointer()}set end(e){this._end.writePointer(e)}get storage(){return this._storage.readPointer()}set storage(e){this._storage.writePointer(e)}get size(){return this.end.sub(this.begin).toInt32()/this._elementSize}},ct=class t extends Un{static $new(){let e=new t(J().$new(oc));return e.init(),e}constructor(e){super(e,w)}get handles(){let e=[],n=this.begin,r=this.end;for(;!n.equals(r);)e.push(n.readPointer()),n=n.add(w);return e}},jl=0,bo=w,yo=bo+4,Rl=-1,Ot=class t{$delete(){this.dispose(),J().$delete(this)}constructor(e){this.handle=e,this._link=e.add(jl),this._numberOfReferences=e.add(bo)}init(e,n){this.link=e,this.numberOfReferences=n}dispose(){}get link(){return new t(this._link.readPointer())}set link(e){this._link.writePointer(e)}get numberOfReferences(){return this._numberOfReferences.readS32()}set numberOfReferences(e){this._numberOfReferences.writeS32(e)}},Eo=Ul(yo),vo=Eo+w,Pl=vo+w,lt=class t extends Ot{static $new(e,n){let r=new t(J().$new(Pl));return r.init(e,n),r}constructor(e){super(e),this._self=e.add(Eo),this._currentScope=e.add(vo);let o=(64-w-4-4)/4;this._scopeLayout=st.layoutForCapacity(o),this._topHandleScopePtr=null}init(e,n){let r=e.add(Ze(n).offset.topHandleScope);this._topHandleScopePtr=r,super.init(r.readPointer(),Rl),this.self=e,this.currentScope=st.$new(this._scopeLayout),r.writePointer(this)}dispose(){this._topHandleScopePtr.writePointer(this.link);let e;for(;(e=this.currentScope)!==null;){let n=e.link;e.$delete(),this.currentScope=n}}get self(){return this._self.readPointer()}set self(e){this._self.writePointer(e)}get currentScope(){let e=this._currentScope.readPointer();return e.isNull()?null:new st(e,this._scopeLayout)}set currentScope(e){this._currentScope.writePointer(e)}newHandle(e){return this.currentScope.newHandle(e)}},st=class t extends Ot{static $new(e){let n=new t(J().$new(e.size),e);return n.init(),n}constructor(e,n){super(e);let{offset:r}=n;this._refsStorage=e.add(r.refsStorage),this._pos=e.add(r.pos),this._layout=n}init(){super.init(NULL,this._layout.numberOfReferences),this.pos=0}get pos(){return this._pos.readU32()}set pos(e){this._pos.writeU32(e)}newHandle(e){let n=this.pos,r=this._refsStorage.add(n*4);return r.writeS32(e.toInt32()),this.pos=n+1,r}static layoutForCapacity(e){let n=yo,r=n+e*4;return{size:r+4,numberOfReferences:e,offset:{refsStorage:n,pos:r}}}},Fl={arm:function(t,e){let n=Process.pageSize,r=Memory.alloc(n);Memory.protect(r,n,"rwx");let o=new NativeCallback(e,"void",["pointer"]);r._onMatchCallback=o;let i=[26625,18947,17041,53505,19202,18200,18288,48896],s=i.length*2,c=s+4,a=c+4;return Memory.patchCode(r,a,function(l){i.forEach((d,p)=>{l.add(p*2).writeU16(d)}),l.add(s).writeS32(t),l.add(c).writePointer(o)}),r.or(1)},arm64:function(t,e){let n=Process.pageSize,r=Memory.alloc(n);Memory.protect(r,n,"rwx");let o=new NativeCallback(e,"void",["pointer"]);r._onMatchCallback=o;let i=[3107979265,402653378,1795293247,1409286241,1476395139,3592355936,3596551104],s=i.length*4,c=s+4,a=c+8;return Memory.patchCode(r,a,function(l){i.forEach((d,p)=>{l.add(p*4).writeU32(d)}),l.add(s).writeS32(t),l.add(c).writePointer(o)}),r}};function tr(t,e){return(Fl[Process.arch]||Dl)(t,e)}function Dl(t,e){return new NativeCallback(n=>{n.readS32()===t&&e(n)},"void",["pointer","pointer"])}function Ul(t){let e=t%w;return e!==0?t+w-e:t}var Bl=4,{pointerSize:z}=Process,Vl=256,zl=65536,Jl=131072,Gl=33554432,$l=67108864,Hl=134217728,De={exceptions:"propagate"},Co=le(id),Zl=le(ad),Wl=le(nd),nr=null,rr=!1,Dt=new Map,ut=new Map;function Ce(){return nr===null&&(nr=ql()),nr}function ql(){let t=Process.enumerateModules().filter(a=>/jvm.(dll|dylib|so)$/.test(a.name));if(t.length===0)return null;let e=t[0],n={flavor:"jvm"},r=Process.platform==="windows"?[{module:e,functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],JVM_Sleep:["JVM_Sleep","void",["pointer","pointer","long"]],"VMThread::execute":["VMThread::execute","void",["pointer"]],"Method::size":["Method::size","int",["int"]],"Method::set_native_function":["Method::set_native_function","void",["pointer","pointer","int"]],"Method::clear_native_function":["Method::clear_native_function","void",["pointer"]],"Method::jmethod_id":["Method::jmethod_id","pointer",["pointer"]],"ClassLoaderDataGraph::classes_do":["ClassLoaderDataGraph::classes_do","void",["pointer"]],"NMethodSweeper::sweep_code_cache":["NMethodSweeper::sweep_code_cache","void",[]],"OopMapCache::flush_obsolete_entries":["OopMapCache::flush_obsolete_entries","void",["pointer"]]},variables:{"VM_RedefineClasses::`vftable'":function(a){this.vtableRedefineClasses=a},"VM_RedefineClasses::doit":function(a){this.redefineClassesDoIt=a},"VM_RedefineClasses::doit_prologue":function(a){this.redefineClassesDoItPrologue=a},"VM_RedefineClasses::doit_epilogue":function(a){this.redefineClassesDoItEpilogue=a},"VM_RedefineClasses::allow_nested_vm_operations":function(a){this.redefineClassesAllow=a},"NMethodSweeper::_traversals":function(a){this.traversals=a},"NMethodSweeper::_should_sweep":function(a){this.shouldSweep=a}},optionals:[]}]:[{module:e,functions:{JNI_GetCreatedJavaVMs:["JNI_GetCreatedJavaVMs","int",["pointer","int","pointer"]],_ZN6Method4sizeEb:["Method::size","int",["int"]],_ZN6Method19set_native_functionEPhb:["Method::set_native_function","void",["pointer","pointer","int"]],_ZN6Method21clear_native_functionEv:["Method::clear_native_function","void",["pointer"]],_ZN6Method24restore_unshareable_infoEP10JavaThread:["Method::restore_unshareable_info","void",["pointer","pointer"]],_ZN6Method24restore_unshareable_infoEP6Thread:["Method::restore_unshareable_info","void",["pointer","pointer"]],_ZN6Method11link_methodERK12methodHandleP10JavaThread:["Method::link_method","void",["pointer","pointer","pointer"]],_ZN6Method10jmethod_idEv:["Method::jmethod_id","pointer",["pointer"]],_ZN6Method10clear_codeEv:function(a){let l=new NativeFunction(a,"void",["pointer"],De);this["Method::clear_code"]=function(d){l(d)}},_ZN6Method10clear_codeEb:function(a){let l=new NativeFunction(a,"void",["pointer","int"],De),d=0;this["Method::clear_code"]=function(p){l(p,d)}},_ZN18VM_RedefineClasses19mark_dependent_codeEP13InstanceKlass:["VM_RedefineClasses::mark_dependent_code","void",["pointer","pointer"]],_ZN18VM_RedefineClasses20flush_dependent_codeEv:["VM_RedefineClasses::flush_dependent_code","void",[]],_ZN18VM_RedefineClasses20flush_dependent_codeEP13InstanceKlassP6Thread:["VM_RedefineClasses::flush_dependent_code","void",["pointer","pointer","pointer"]],_ZN18VM_RedefineClasses20flush_dependent_codeE19instanceKlassHandleP6Thread:["VM_RedefineClasses::flush_dependent_code","void",["pointer","pointer","pointer"]],_ZN19ResolvedMethodTable21adjust_method_entriesEPb:["ResolvedMethodTable::adjust_method_entries","void",["pointer"]],_ZN15MemberNameTable21adjust_method_entriesEP13InstanceKlassPb:["MemberNameTable::adjust_method_entries","void",["pointer","pointer","pointer"]],_ZN17ConstantPoolCache21adjust_method_entriesEPb:function(a){let l=new NativeFunction(a,"void",["pointer","pointer"],De);this["ConstantPoolCache::adjust_method_entries"]=function(d,p,f){l(d,f)}},_ZN17ConstantPoolCache21adjust_method_entriesEP13InstanceKlassPb:function(a){let l=new NativeFunction(a,"void",["pointer","pointer","pointer"],De);this["ConstantPoolCache::adjust_method_entries"]=function(d,p,f){l(d,p,f)}},_ZN20ClassLoaderDataGraph10classes_doEP12KlassClosure:["ClassLoaderDataGraph::classes_do","void",["pointer"]],_ZN20ClassLoaderDataGraph22clean_deallocate_listsEb:["ClassLoaderDataGraph::clean_deallocate_lists","void",["int"]],_ZN10JavaThread27thread_from_jni_environmentEP7JNIEnv_:["JavaThread::thread_from_jni_environment","pointer",["pointer"]],_ZN8VMThread7executeEP12VM_Operation:["VMThread::execute","void",["pointer"]],_ZN11OopMapCache22flush_obsolete_entriesEv:["OopMapCache::flush_obsolete_entries","void",["pointer"]],_ZN14NMethodSweeper11force_sweepEv:["NMethodSweeper::force_sweep","void",[]],_ZN14NMethodSweeper16sweep_code_cacheEv:["NMethodSweeper::sweep_code_cache","void",[]],_ZN14NMethodSweeper17sweep_in_progressEv:["NMethodSweeper::sweep_in_progress","bool",[]],JVM_Sleep:["JVM_Sleep","void",["pointer","pointer","long"]]},variables:{_ZN18VM_RedefineClasses14_the_class_oopE:function(a){this.redefineClass=a},_ZN18VM_RedefineClasses10_the_classE:function(a){this.redefineClass=a},_ZN18VM_RedefineClasses25AdjustCpoolCacheAndVtable8do_klassEP5Klass:function(a){this.doKlass=a},_ZN18VM_RedefineClasses22AdjustAndCleanMetadata8do_klassEP5Klass:function(a){this.doKlass=a},_ZTV18VM_RedefineClasses:function(a){this.vtableRedefineClasses=a},_ZN18VM_RedefineClasses4doitEv:function(a){this.redefineClassesDoIt=a},_ZN18VM_RedefineClasses13doit_prologueEv:function(a){this.redefineClassesDoItPrologue=a},_ZN18VM_RedefineClasses13doit_epilogueEv:function(a){this.redefineClassesDoItEpilogue=a},_ZN18VM_RedefineClassesD0Ev:function(a){this.redefineClassesDispose0=a},_ZN18VM_RedefineClassesD1Ev:function(a){this.redefineClassesDispose1=a},_ZNK18VM_RedefineClasses26allow_nested_vm_operationsEv:function(a){this.redefineClassesAllow=a},_ZNK18VM_RedefineClasses14print_on_errorEP12outputStream:function(a){this.redefineClassesOnError=a},_ZN13InstanceKlass33create_new_default_vtable_indicesEiP10JavaThread:function(a){this.createNewDefaultVtableIndices=a},_ZN13InstanceKlass33create_new_default_vtable_indicesEiP6Thread:function(a){this.createNewDefaultVtableIndices=a},_ZN19Abstract_VM_Version19jre_release_versionEv:function(a){let d=new NativeFunction(a,"pointer",[],De)().readCString();this.version=d.startsWith("1.8")?8:d.startsWith("9.")?9:parseInt(d.slice(0,2),10),this.versionS=d},_ZN14NMethodSweeper11_traversalsE:function(a){this.traversals=a},_ZN14NMethodSweeper21_sweep_fractions_leftE:function(a){this.fractions=a},_ZN14NMethodSweeper13_should_sweepE:function(a){this.shouldSweep=a}},optionals:["_ZN6Method24restore_unshareable_infoEP10JavaThread","_ZN6Method24restore_unshareable_infoEP6Thread","_ZN6Method11link_methodERK12methodHandleP10JavaThread","_ZN6Method10clear_codeEv","_ZN6Method10clear_codeEb","_ZN18VM_RedefineClasses19mark_dependent_codeEP13InstanceKlass","_ZN18VM_RedefineClasses20flush_dependent_codeEv","_ZN18VM_RedefineClasses20flush_dependent_codeEP13InstanceKlassP6Thread","_ZN18VM_RedefineClasses20flush_dependent_codeE19instanceKlassHandleP6Thread","_ZN19ResolvedMethodTable21adjust_method_entriesEPb","_ZN15MemberNameTable21adjust_method_entriesEP13InstanceKlassPb","_ZN17ConstantPoolCache21adjust_method_entriesEPb","_ZN17ConstantPoolCache21adjust_method_entriesEP13InstanceKlassPb","_ZN20ClassLoaderDataGraph22clean_deallocate_listsEb","_ZN10JavaThread27thread_from_jni_environmentEP7JNIEnv_","_ZN14NMethodSweeper11force_sweepEv","_ZN14NMethodSweeper17sweep_in_progressEv","_ZN18VM_RedefineClasses14_the_class_oopE","_ZN18VM_RedefineClasses10_the_classE","_ZN18VM_RedefineClasses25AdjustCpoolCacheAndVtable8do_klassEP5Klass","_ZN18VM_RedefineClasses22AdjustAndCleanMetadata8do_klassEP5Klass","_ZN18VM_RedefineClassesD0Ev","_ZN18VM_RedefineClassesD1Ev","_ZNK18VM_RedefineClasses14print_on_errorEP12outputStream","_ZN13InstanceKlass33create_new_default_vtable_indicesEiP10JavaThread","_ZN13InstanceKlass33create_new_default_vtable_indicesEiP6Thread","_ZN14NMethodSweeper21_sweep_fractions_leftE"]}],o=[];if(r.forEach(function(a){let l=a.module,d=a.functions||{},p=a.variables||{},f=new Set(a.optionals||[]),u=l.enumerateExports().reduce(function(h,m){return h[m.name]=m,h},{}),_=l.enumerateSymbols().reduce(function(h,m){return h[m.name]=m,h},u);Object.keys(d).forEach(function(h){let m=_[h];if(m!==void 0){let b=d[h];typeof b=="function"?b.call(n,m.address):n[b[0]]=new NativeFunction(m.address,b[1],b[2],De)}else f.has(h)||o.push(h)}),Object.keys(p).forEach(function(h){let m=_[h];m!==void 0?p[h].call(n,m.address):f.has(h)||o.push(h)})}),o.length>0)throw new Error("Java API only partially available; please file a bug. Missing: "+o.join(", "));let i=Memory.alloc(z),s=Memory.alloc(Bl);if(de("JNI_GetCreatedJavaVMs",n.JNI_GetCreatedJavaVMs(i,1,s)),s.readInt()===0)return null;n.vm=i.readPointer();let c=Process.platform==="windows"?{$new:["??2@YAPEAX_K@Z","pointer",["ulong"]],$delete:["??3@YAXPEAX@Z","void",["pointer"]]}:{$new:["_Znwm","pointer",["ulong"]],$delete:["_ZdlPv","void",["pointer"]]};for(let[a,[l,d,p]]of Object.entries(c)){let f=Module.findGlobalExportByName(l);if(f===null&&(f=DebugSymbol.fromName(l).address,f.isNull()))throw new Error(`unable to find C++ allocator API, missing: '${l}'`);n[a]=new NativeFunction(f,d,p,De)}return n.jvmti=Kl(n),n["JavaThread::thread_from_jni_environment"]===void 0&&(n["JavaThread::thread_from_jni_environment"]=Yl(n)),n}function Kl(t){let e=new Ie(t),n;return e.perform(()=>{let r=e.tryGetEnvHandle(yt.v1_0);if(r===null)throw new Error("JVMTI not available");n=new Le(r,e);let o=Memory.alloc(8);o.writeU64(Et.canTagObjects);let i=n.addCapabilities(o);de("getEnvJvmti::AddCapabilities",i)}),n}var Ql={x64:Xl};function Yl(t){let e=null,n=Ql[Process.arch];if(n!==void 0){let o=new Ie(t).perform(i=>i.handle.readPointer().add(6*z).readPointer());e=xe(o,n,{limit:11})}return e===null?()=>{throw new Error("Unable to make thread_from_jni_environment() helper for the current architecture")}:r=>r.add(e)}function Xl(t){if(t.mnemonic!=="lea")return null;let{base:e,disp:n}=t.operands[1].value;return e==="rdi"&&n<0?n:null}function To(t,e){}var or=class{constructor(e){this.methodId=e,this.method=e.readPointer(),this.originalMethod=null,this.newMethod=null,this.resolved=null,this.impl=null,this.key=e.toString(16)}replace(e,n,r,o,i){let{key:s}=this,c=ut.get(s);c!==void 0&&(ut.delete(s),this.method=c.method,this.originalMethod=c.originalMethod,this.newMethod=c.newMethod,this.resolved=c.resolved),this.impl=e,Dt.set(s,this),So(o)}revert(e){let{key:n}=this;Dt.delete(n),ut.set(n,this),So(e)}resolveTarget(e,n,r,o){let{resolved:i,originalMethod:s,methodId:c}=this;if(i!==null)return i;if(s===null)return c;s.oldMethod.vtableIndexPtr.writeS32(-2);let l=Memory.alloc(z);return l.writePointer(this.method),this.resolved=l,l}};function So(t){rr||(rr=!0,Script.nextTick(ed,t))}function ed(t){let e=new Map(Dt),n=new Map(ut);Dt.clear(),ut.clear(),rr=!1,t.perform(r=>{let o=Ce(),i=o["JavaThread::thread_from_jni_environment"](r.handle),s=!1;Ao(()=>{e.forEach(c=>{let{method:a,originalMethod:l,impl:d,methodId:p,newMethod:f}=c;l===null?(c.originalMethod=xo(a),c.newMethod=rd(a,d,i),wo(c.newMethod,p,i)):o["Method::set_native_function"](f.method,d,0)}),n.forEach(c=>{let{originalMethod:a,methodId:l,newMethod:d}=c;if(a!==null){od(a);let p=a.oldMethod;p.oldMethod=d,wo(p,l,i),s=!0}})}),s&&td(r.handle)})}function td(t){let{fractions:e,shouldSweep:n,traversals:r,"NMethodSweeper::sweep_code_cache":o,"NMethodSweeper::sweep_in_progress":i,"NMethodSweeper::force_sweep":s,JVM_Sleep:c}=Ce();if(s!==void 0)Thread.sleep(.05),s(),Thread.sleep(.05),s();else{let a=r.readS64(),l=a+2;for(;l>a;)e.writeS32(1),c(t,NULL,50),i()||Ao(()=>{Thread.sleep(.05)}),n.readU8()===0&&(e.writeS32(1),o()),a=r.readS64()}}function Ao(t,e,n){let{execute:r,vtable:o,vtableSize:i,doItOffset:s,prologueOffset:c,epilogueOffset:a}=Wl(),l=Memory.dup(o,i),d=Memory.alloc(z*25);d.writePointer(l);let p=new NativeCallback(t,"void",["pointer"]);l.add(s).writePointer(p);let f=null;e!==void 0&&(f=new NativeCallback(e,"int",["pointer"]),l.add(c).writePointer(f));let u=null;n!==void 0&&(u=new NativeCallback(n,"void",["pointer"]),l.add(a).writePointer(u)),r(d)}function nd(){let{vtableRedefineClasses:t,redefineClassesDoIt:e,redefineClassesDoItPrologue:n,redefineClassesDoItEpilogue:r,redefineClassesOnError:o,redefineClassesAllow:i,redefineClassesDispose0:s,redefineClassesDispose1:c,"VMThread::execute":a}=Ce(),l=t.add(2*z),d=15*z,p=Memory.dup(l,d),f=new NativeCallback(()=>{},"void",["pointer"]),u,_,h;for(let m=0;m!==d;m+=z){let b=p.add(m),E=b.readPointer();o!==void 0&&E.equals(o)||s!==void 0&&E.equals(s)||c!==void 0&&E.equals(c)?b.writePointer(f):E.equals(e)?u=m:E.equals(n)?(_=m,b.writePointer(i)):E.equals(r)&&(h=m,b.writePointer(f))}return{execute:a,emptyCallback:f,vtable:p,vtableSize:d,doItOffset:u,prologueOffset:_,epilogueOffset:h}}function Lo(t){return new or(t)}function wo(t,e,n){let{method:r,oldMethod:o}=t,i=Ce();t.methodsArray.add(t.methodIndex*z).writePointer(r),t.vtableIndex>=0&&t.vtable.add(t.vtableIndex*z).writePointer(r),e.writePointer(r),o.accessFlagsPtr.writeU32((o.accessFlags|zl|Jl)>>>0);let s=i["OopMapCache::flush_obsolete_entries"];if(s!==void 0){let{oopMapCache:_}=t;_.isNull()||s(_)}let c=i["VM_RedefineClasses::mark_dependent_code"],a=i["VM_RedefineClasses::flush_dependent_code"];c!==void 0?(c(NULL,t.instanceKlass),a()):a(NULL,t.instanceKlass,n);let l=Memory.alloc(1);l.writeU8(1),i["ConstantPoolCache::adjust_method_entries"](t.cache,t.instanceKlass,l);let d=Memory.alloc(3*z),p=Memory.alloc(z);p.writePointer(i.doKlass),d.writePointer(p),d.add(z).writePointer(n),d.add(2*z).writePointer(n),i.redefineClass!==void 0&&i.redefineClass.writePointer(t.instanceKlass),i["ClassLoaderDataGraph::classes_do"](d);let f=i["ResolvedMethodTable::adjust_method_entries"];if(f!==void 0)f(l);else{let{memberNames:_}=t;if(!_.isNull()){let h=i["MemberNameTable::adjust_method_entries"];h!==void 0&&h(_,t.instanceKlass,l)}}let u=i["ClassLoaderDataGraph::clean_deallocate_lists"];u!==void 0&&u(0)}function rd(t,e,n){let r=Ce(),o=xo(t);o.constPtr.writePointer(o.const);let i=(o.accessFlags|Vl|Gl|$l|Hl)>>>0;if(o.accessFlagsPtr.writeU32(i),o.signatureHandler.writePointer(NULL),o.adapter.writePointer(NULL),o.i2iEntry.writePointer(NULL),r["Method::clear_code"](o.method),o.dataPtr.writePointer(NULL),o.countersPtr.writePointer(NULL),o.stackmapPtr.writePointer(NULL),r["Method::clear_native_function"](o.method),r["Method::set_native_function"](o.method,e,0),r["Method::restore_unshareable_info"](o.method,n),r.version>=17){let s=Memory.alloc(2*z);s.writePointer(o.method),s.add(z).writePointer(n),r["Method::link_method"](o.method,s,n)}return o}function xo(t){let e=Co(),n=t.add(e.method.constMethodOffset).readPointer(),r=n.add(e.constMethod.sizeOffset).readS32()*z,o=Memory.alloc(r+e.method.size);Memory.copy(o,n,r);let i=o.add(r);Memory.copy(i,t,e.method.size);let s=Io(i,o,r),c=Io(t,n,r);return s.oldMethod=c,s}function Io(t,e,n){let r=Ce(),o=Co(),i=t.add(o.method.constMethodOffset),s=t.add(o.method.methodDataOffset),c=t.add(o.method.methodCountersOffset),a=t.add(o.method.accessFlagsOffset),l=a.readU32(),d=o.getAdapterPointer(t,e),p=t.add(o.method.i2iEntryOffset),f=t.add(o.method.signatureHandlerOffset),u=e.add(o.constMethod.constantPoolOffset).readPointer(),_=e.add(o.constMethod.stackmapDataOffset),h=u.add(o.constantPool.instanceKlassOffset).readPointer(),m=u.add(o.constantPool.cacheOffset).readPointer(),b=Zl(),E=h.add(b.methodsOffset).readPointer(),L=E.readS32(),C=E.add(z),R=e.add(o.constMethod.methodIdnumOffset).readU16(),O=t.add(o.method.vtableIndexOffset),j=O.readS32(),N=h.add(b.vtableOffset),T=h.add(b.oopMapCacheOffset).readPointer(),v=r.version>=10?h.add(b.memberNamesOffset).readPointer():NULL;return{method:t,methodSize:o.method.size,const:e,constSize:n,constPtr:i,dataPtr:s,countersPtr:c,stackmapPtr:_,instanceKlass:h,methodsArray:C,methodsCount:L,methodIndex:R,vtableIndex:j,vtableIndexPtr:O,vtable:N,accessFlags:l,accessFlagsPtr:a,adapter:d,i2iEntry:p,signatureHandler:f,memberNames:v,cache:m,oopMapCache:T}}function od(t){let{oldMethod:e}=t;e.accessFlagsPtr.writeU32(e.accessFlags),e.vtableIndexPtr.writeS32(e.vtableIndex)}function id(){let t=Ce(),{version:e}=t,n;e>=17?n="method:early":e>=9&&e<=16?n="const-method":n="method:late";let o=t["Method::size"](1)*z,i=z,s=2*z,c=3*z,a=4*z,l=n==="method:early"?z:0,d=a+l,p=d+4,f=p+4+8,u=f+z,_=l!==0?a:u,h=o-2*z,m=o-z,b=8,E=b+z,L=E+z,C=n==="const-method"?z:0,R=L+C,O=R+14,j=2*z,N=3*z;return{getAdapterPointer:C!==0?function(v,M){return M.add(L)}:function(v,M){return v.add(_)},method:{size:o,constMethodOffset:i,methodDataOffset:s,methodCountersOffset:c,accessFlagsOffset:d,vtableIndexOffset:p,i2iEntryOffset:f,nativeFunctionOffset:h,signatureHandlerOffset:m},constMethod:{constantPoolOffset:b,stackmapDataOffset:E,sizeOffset:R,methodIdnumOffset:O},constantPool:{cacheOffset:j,instanceKlassOffset:N}}}var sd={x64:cd};function ad(){let{version:t,createNewDefaultVtableIndices:e}=Ce(),n=sd[Process.arch];if(n===void 0)throw new Error(`Missing vtable offset parser for ${Process.arch}`);let r=xe(e,n,{limit:32});if(r===null)throw new Error("Unable to deduce vtable offset");let o=t>=10&&t<=11||t>=15?17:18,i=r-7*z,s=r-17*z,c=r-o*z;return{vtableOffset:r,methodsOffset:i,memberNamesOffset:s,oopMapCacheOffset:c}}function cd(t){if(t.mnemonic!=="mov")return null;let e=t.operands[0];if(e.type!=="mem")return null;let{value:n}=e;if(n.scale!==1)return null;let{disp:r}=n;return r<256?null:r+16}var ko=J;try{dt()}catch{ko=Ce}var pt=ko;var ld=`#include <json-glib/json-glib.h>
#include <string.h>

#define kAccStatic 0x0008
#define kAccConstructor 0x00010000

typedef struct _Model Model;
typedef struct _EnumerateMethodsContext EnumerateMethodsContext;

typedef struct _JavaApi JavaApi;
typedef struct _JavaClassApi JavaClassApi;
typedef struct _JavaMethodApi JavaMethodApi;
typedef struct _JavaFieldApi JavaFieldApi;

typedef struct _JNIEnv JNIEnv;
typedef guint8 jboolean;
typedef gint32 jint;
typedef jint jsize;
typedef gpointer jobject;
typedef jobject jclass;
typedef jobject jstring;
typedef jobject jarray;
typedef jarray jobjectArray;
typedef gpointer jfieldID;
typedef gpointer jmethodID;

typedef struct _jvmtiEnv jvmtiEnv;
typedef enum
{
  JVMTI_ERROR_NONE = 0
} jvmtiError;

typedef struct _ArtApi ArtApi;
typedef guint32 ArtHeapReference;
typedef struct _ArtObject ArtObject;
typedef struct _ArtClass ArtClass;
typedef struct _ArtClassLinker ArtClassLinker;
typedef struct _ArtClassVisitor ArtClassVisitor;
typedef struct _ArtClassVisitorVTable ArtClassVisitorVTable;
typedef struct _ArtMethod ArtMethod;
typedef struct _ArtString ArtString;

typedef union _StdString StdString;
typedef struct _StdStringShort StdStringShort;
typedef struct _StdStringLong StdStringLong;

typedef void (* ArtVisitClassesFunc) (ArtClassLinker * linker, ArtClassVisitor * visitor);
typedef const char * (* ArtGetClassDescriptorFunc) (ArtClass * klass, StdString * storage);
typedef void (* ArtPrettyMethodFunc) (StdString * result, ArtMethod * method, jboolean with_signature);

struct _Model
{
  GHashTable * members;
};

struct _EnumerateMethodsContext
{
  GPatternSpec * class_query;
  GPatternSpec * method_query;
  jboolean include_signature;
  jboolean ignore_case;
  jboolean skip_system_classes;
  GHashTable * groups;
};

struct _JavaClassApi
{
  jmethodID get_declared_methods;
  jmethodID get_declared_fields;
};

struct _JavaMethodApi
{
  jmethodID get_name;
  jmethodID get_modifiers;
};

struct _JavaFieldApi
{
  jmethodID get_name;
  jmethodID get_modifiers;
};

struct _JavaApi
{
  jvmtiEnv * jvmti;
  JavaClassApi clazz;
  JavaMethodApi method;
  JavaFieldApi field;
};

struct _JNIEnv
{
  gpointer * functions;
};

struct _jvmtiEnv
{
  gpointer * functions;
};

struct _ArtApi
{
  gboolean available;

  guint class_offset_ifields;
  guint class_offset_methods;
  guint class_offset_sfields;
  guint class_offset_copied_methods_offset;

  guint method_size;
  guint method_offset_access_flags;

  guint field_size;
  guint field_offset_access_flags;

  guint alignment_padding;

  ArtClassLinker * linker;
  ArtVisitClassesFunc visit_classes;
  ArtGetClassDescriptorFunc get_class_descriptor;
  ArtPrettyMethodFunc pretty_method;

  void (* free) (gpointer mem);
};

struct _ArtObject
{
  ArtHeapReference klass;
  ArtHeapReference monitor;
};

struct _ArtClass
{
  ArtObject parent;

  ArtHeapReference class_loader;
};

struct _ArtClassVisitor
{
  ArtClassVisitorVTable * vtable;
  gpointer user_data;
};

struct _ArtClassVisitorVTable
{
  void (* reserved1) (ArtClassVisitor * self);
  void (* reserved2) (ArtClassVisitor * self);
  jboolean (* visit) (ArtClassVisitor * self, ArtClass * klass);
};

struct _ArtString
{
  ArtObject parent;

  gint32 count;
  guint32 hash_code;

  union
  {
    guint16 value[0];
    guint8 value_compressed[0];
  };
};

struct _StdStringShort
{
  guint8 size;
  gchar data[(3 * sizeof (gpointer)) - sizeof (guint8)];
};

struct _StdStringLong
{
  gsize capacity;
  gsize size;
  gchar * data;
};

union _StdString
{
  StdStringShort s;
  StdStringLong l;
};

static void model_add_method (Model * self, const gchar * name, jmethodID id, jint modifiers);
static void model_add_field (Model * self, const gchar * name, jfieldID id, jint modifiers);
static void model_free (Model * model);

static jboolean collect_matching_class_methods (ArtClassVisitor * self, ArtClass * klass);
static gchar * finalize_method_groups_to_json (GHashTable * groups);
static GPatternSpec * make_pattern_spec (const gchar * pattern, jboolean ignore_case);
static gchar * class_name_from_signature (const gchar * signature);
static gchar * format_method_signature (const gchar * name, const gchar * signature);
static void append_type (GString * output, const gchar ** type);

static gpointer read_art_array (gpointer object_base, guint field_offset, guint length_size, guint * length);

static void std_string_destroy (StdString * str);
static gchar * std_string_c_str (StdString * self);

extern GMutex lock;
extern GArray * models;
extern JavaApi java_api;
extern ArtApi art_api;

void
init (void)
{
  g_mutex_init (&lock);
  models = g_array_new (FALSE, FALSE, sizeof (Model *));
}

void
finalize (void)
{
  guint n, i;

  n = models->len;
  for (i = 0; i != n; i++)
  {
    Model * model = g_array_index (models, Model *, i);
    model_free (model);
  }

  g_array_unref (models);
  g_mutex_clear (&lock);
}

Model *
model_new (jclass class_handle,
           gpointer class_object,
           JNIEnv * env)
{
  Model * model;
  GHashTable * members;
  jvmtiEnv * jvmti = java_api.jvmti;
  gpointer * funcs = env->functions;
  jmethodID (* from_reflected_method) (JNIEnv *, jobject) = funcs[7];
  jfieldID (* from_reflected_field) (JNIEnv *, jobject) = funcs[8];
  jobject (* to_reflected_method) (JNIEnv *, jclass, jmethodID, jboolean) = funcs[9];
  jobject (* to_reflected_field) (JNIEnv *, jclass, jfieldID, jboolean) = funcs[12];
  void (* delete_local_ref) (JNIEnv *, jobject) = funcs[23];
  jobject (* call_object_method) (JNIEnv *, jobject, jmethodID, ...) = funcs[34];
  jint (* call_int_method) (JNIEnv *, jobject, jmethodID, ...) = funcs[49];
  const char * (* get_string_utf_chars) (JNIEnv *, jstring, jboolean *) = funcs[169];
  void (* release_string_utf_chars) (JNIEnv *, jstring, const char *) = funcs[170];
  jsize (* get_array_length) (JNIEnv *, jarray) = funcs[171];
  jobject (* get_object_array_element) (JNIEnv *, jobjectArray, jsize) = funcs[173];
  jsize n, i;

  model = g_new (Model, 1);

  members = g_hash_table_new_full (g_str_hash, g_str_equal, g_free, g_free);
  model->members = members;

  if (jvmti != NULL)
  {
    gpointer * jf = jvmti->functions - 1;
    jvmtiError (* deallocate) (jvmtiEnv *, void * mem) = jf[47];
    jvmtiError (* get_class_methods) (jvmtiEnv *, jclass, jint *, jmethodID **) = jf[52];
    jvmtiError (* get_class_fields) (jvmtiEnv *, jclass, jint *, jfieldID **) = jf[53];
    jvmtiError (* get_field_name) (jvmtiEnv *, jclass, jfieldID, char **, char **, char **) = jf[60];
    jvmtiError (* get_field_modifiers) (jvmtiEnv *, jclass, jfieldID, jint *) = jf[62];
    jvmtiError (* get_method_name) (jvmtiEnv *, jmethodID, char **, char **, char **) = jf[64];
    jvmtiError (* get_method_modifiers) (jvmtiEnv *, jmethodID, jint *) = jf[66];
    jint method_count;
    jmethodID * methods;
    jint field_count;
    jfieldID * fields;
    char * name;
    jint modifiers;

    get_class_methods (jvmti, class_handle, &method_count, &methods);
    for (i = 0; i != method_count; i++)
    {
      jmethodID method = methods[i];

      get_method_name (jvmti, method, &name, NULL, NULL);
      get_method_modifiers (jvmti, method, &modifiers);

      model_add_method (model, name, method, modifiers);

      deallocate (jvmti, name);
    }
    deallocate (jvmti, methods);

    get_class_fields (jvmti, class_handle, &field_count, &fields);
    for (i = 0; i != field_count; i++)
    {
      jfieldID field = fields[i];

      get_field_name (jvmti, class_handle, field, &name, NULL, NULL);
      get_field_modifiers (jvmti, class_handle, field, &modifiers);

      model_add_field (model, name, field, modifiers);

      deallocate (jvmti, name);
    }
    deallocate (jvmti, fields);
  }
  else if (art_api.available)
  {
    gpointer elements;
    guint n, i;
    const guint field_arrays[] = {
      art_api.class_offset_ifields,
      art_api.class_offset_sfields
    };
    guint field_array_cursor;
    gboolean merged_fields = art_api.class_offset_sfields == 0;

    elements = read_art_array (class_object, art_api.class_offset_methods, sizeof (gsize), NULL);
    n = *(guint16 *) (class_object + art_api.class_offset_copied_methods_offset);
    for (i = 0; i != n; i++)
    {
      jmethodID id;
      guint32 access_flags;
      jboolean is_static;
      jobject method, name;
      const char * name_str;
      jint modifiers;

      id = elements + (i * art_api.method_size);

      access_flags = *(guint32 *) (id + art_api.method_offset_access_flags);
      if ((access_flags & kAccConstructor) != 0)
        continue;
      is_static = (access_flags & kAccStatic) != 0;
      method = to_reflected_method (env, class_handle, id, is_static);
      name = call_object_method (env, method, java_api.method.get_name);
      name_str = get_string_utf_chars (env, name, NULL);
      modifiers = access_flags & 0xffff;

      model_add_method (model, name_str, id, modifiers);

      release_string_utf_chars (env, name, name_str);
      delete_local_ref (env, name);
      delete_local_ref (env, method);
    }

    for (field_array_cursor = 0; field_array_cursor != G_N_ELEMENTS (field_arrays); field_array_cursor++)
    {
      jboolean is_static;

      if (field_arrays[field_array_cursor] == 0)
        continue;

      if (!merged_fields)
        is_static = field_array_cursor == 1;

      elements = read_art_array (class_object, field_arrays[field_array_cursor], sizeof (guint32), &n);
      for (i = 0; i != n; i++)
      {
        jfieldID id;
        guint32 access_flags;
        jobject field, name;
        const char * name_str;
        jint modifiers;

        id = elements + (i * art_api.field_size);

        access_flags = *(guint32 *) (id + art_api.field_offset_access_flags);
        if (merged_fields)
          is_static = (access_flags & kAccStatic) != 0;
        field = to_reflected_field (env, class_handle, id, is_static);
        name = call_object_method (env, field, java_api.field.get_name);
        name_str = get_string_utf_chars (env, name, NULL);
        modifiers = access_flags & 0xffff;

        model_add_field (model, name_str, id, modifiers);

        release_string_utf_chars (env, name, name_str);
        delete_local_ref (env, name);
        delete_local_ref (env, field);
      }
    }
  }
  else
  {
    jobject elements;

    elements = call_object_method (env, class_handle, java_api.clazz.get_declared_methods);
    n = get_array_length (env, elements);
    for (i = 0; i != n; i++)
    {
      jobject method, name;
      const char * name_str;
      jmethodID id;
      jint modifiers;

      method = get_object_array_element (env, elements, i);
      name = call_object_method (env, method, java_api.method.get_name);
      name_str = get_string_utf_chars (env, name, NULL);
      id = from_reflected_method (env, method);
      modifiers = call_int_method (env, method, java_api.method.get_modifiers);

      model_add_method (model, name_str, id, modifiers);

      release_string_utf_chars (env, name, name_str);
      delete_local_ref (env, name);
      delete_local_ref (env, method);
    }
    delete_local_ref (env, elements);

    elements = call_object_method (env, class_handle, java_api.clazz.get_declared_fields);
    n = get_array_length (env, elements);
    for (i = 0; i != n; i++)
    {
      jobject field, name;
      const char * name_str;
      jfieldID id;
      jint modifiers;

      field = get_object_array_element (env, elements, i);
      name = call_object_method (env, field, java_api.field.get_name);
      name_str = get_string_utf_chars (env, name, NULL);
      id = from_reflected_field (env, field);
      modifiers = call_int_method (env, field, java_api.field.get_modifiers);

      model_add_field (model, name_str, id, modifiers);

      release_string_utf_chars (env, name, name_str);
      delete_local_ref (env, name);
      delete_local_ref (env, field);
    }
    delete_local_ref (env, elements);
  }

  g_mutex_lock (&lock);
  g_array_append_val (models, model);
  g_mutex_unlock (&lock);

  return model;
}

static void
model_add_method (Model * self,
                  const gchar * name,
                  jmethodID id,
                  jint modifiers)
{
  GHashTable * members = self->members;
  gchar * key, type;
  const gchar * value;

  if (name[0] == '$')
    key = g_strdup_printf ("_%s", name);
  else
    key = g_strdup (name);

  type = (modifiers & kAccStatic) != 0 ? 's' : 'i';

  value = g_hash_table_lookup (members, key);
  if (value == NULL)
    g_hash_table_insert (members, key, g_strdup_printf ("m:%c0x%zx", type, id));
  else
    g_hash_table_insert (members, key, g_strdup_printf ("%s:%c0x%zx", value, type, id));
}

static void
model_add_field (Model * self,
                 const gchar * name,
                 jfieldID id,
                 jint modifiers)
{
  GHashTable * members = self->members;
  gchar * key, type;

  if (name[0] == '$')
    key = g_strdup_printf ("_%s", name);
  else
    key = g_strdup (name);
  while (g_hash_table_contains (members, key))
  {
    gchar * new_key = g_strdup_printf ("_%s", key);
    g_free (key);
    key = new_key;
  }

  type = (modifiers & kAccStatic) != 0 ? 's' : 'i';

  g_hash_table_insert (members, key, g_strdup_printf ("f:%c0x%zx", type, id));
}

static void
model_free (Model * model)
{
  g_hash_table_unref (model->members);

  g_free (model);
}

gboolean
model_has (Model * self,
           const gchar * member)
{
  return g_hash_table_contains (self->members, member);
}

const gchar *
model_find (Model * self,
            const gchar * member)
{
  return g_hash_table_lookup (self->members, member);
}

gchar *
model_list (Model * self)
{
  GString * result;
  GHashTableIter iter;
  guint i;
  const gchar * name;

  result = g_string_sized_new (128);

  g_string_append_c (result, '[');

  g_hash_table_iter_init (&iter, self->members);
  for (i = 0; g_hash_table_iter_next (&iter, (gpointer *) &name, NULL); i++)
  {
    if (i > 0)
      g_string_append_c (result, ',');

    g_string_append_c (result, '"');
    g_string_append (result, name);
    g_string_append_c (result, '"');
  }

  g_string_append_c (result, ']');

  return g_string_free (result, FALSE);
}

gchar *
enumerate_methods_art (const gchar * class_query,
                       const gchar * method_query,
                       jboolean include_signature,
                       jboolean ignore_case,
                       jboolean skip_system_classes)
{
  gchar * result;
  EnumerateMethodsContext ctx;
  ArtClassVisitor visitor;
  ArtClassVisitorVTable visitor_vtable = { NULL, };

  ctx.class_query = make_pattern_spec (class_query, ignore_case);
  ctx.method_query = make_pattern_spec (method_query, ignore_case);
  ctx.include_signature = include_signature;
  ctx.ignore_case = ignore_case;
  ctx.skip_system_classes = skip_system_classes;
  ctx.groups = g_hash_table_new_full (NULL, NULL, NULL, NULL);

  visitor.vtable = &visitor_vtable;
  visitor.user_data = &ctx;

  visitor_vtable.visit = collect_matching_class_methods;

  art_api.visit_classes (art_api.linker, &visitor);

  result = finalize_method_groups_to_json (ctx.groups);

  g_hash_table_unref (ctx.groups);
  g_pattern_spec_free (ctx.method_query);
  g_pattern_spec_free (ctx.class_query);

  return result;
}

static jboolean
collect_matching_class_methods (ArtClassVisitor * self,
                                ArtClass * klass)
{
  EnumerateMethodsContext * ctx = self->user_data;
  const char * descriptor;
  StdString descriptor_storage = { 0, };
  gchar * class_name = NULL;
  gchar * class_name_copy = NULL;
  const gchar * normalized_class_name;
  JsonBuilder * group;
  size_t class_name_length;
  GHashTable * seen_method_names;
  gpointer elements;
  guint n, i;

  if (ctx->skip_system_classes && klass->class_loader == 0)
    goto skip_class;

  descriptor = art_api.get_class_descriptor (klass, &descriptor_storage);
  if (descriptor[0] != 'L')
    goto skip_class;

  class_name = class_name_from_signature (descriptor);

  if (ctx->ignore_case)
  {
    class_name_copy = g_utf8_strdown (class_name, -1);
    normalized_class_name = class_name_copy;
  }
  else
  {
    normalized_class_name = class_name;
  }

  if (!g_pattern_match_string (ctx->class_query, normalized_class_name))
    goto skip_class;

  group = NULL;
  class_name_length = strlen (class_name);
  seen_method_names = ctx->include_signature ? NULL : g_hash_table_new_full (g_str_hash, g_str_equal, g_free, NULL);

  elements = read_art_array (klass, art_api.class_offset_methods, sizeof (gsize), NULL);
  n = *(guint16 *) ((gpointer) klass + art_api.class_offset_copied_methods_offset);
  for (i = 0; i != n; i++)
  {
    ArtMethod * method;
    guint32 access_flags;
    jboolean is_constructor;
    StdString method_name = { 0, };
    const gchar * bare_method_name;
    gchar * bare_method_name_copy = NULL;
    const gchar * normalized_method_name;
    gchar * normalized_method_name_copy = NULL;

    method = elements + (i * art_api.method_size);

    access_flags = *(guint32 *) ((gpointer) method + art_api.method_offset_access_flags);
    is_constructor = (access_flags & kAccConstructor) != 0;

    art_api.pretty_method (&method_name, method, ctx->include_signature);
    bare_method_name = std_string_c_str (&method_name);
    if (ctx->include_signature)
    {
      const gchar * return_type_end, * name_begin;
      GString * name;

      return_type_end = strchr (bare_method_name, ' ');
      name_begin = return_type_end + 1 + class_name_length + 1;
      if (is_constructor && g_str_has_prefix (name_begin, "<clinit>"))
        goto skip_method;

      name = g_string_sized_new (64);

      if (is_constructor)
      {
        g_string_append (name, "$init");
        g_string_append (name, strchr (name_begin, '>') + 1);
      }
      else
      {
        g_string_append (name, name_begin);
      }
      g_string_append (name, ": ");
      g_string_append_len (name, bare_method_name, return_type_end - bare_method_name);

      bare_method_name_copy = g_string_free (name, FALSE);
      bare_method_name = bare_method_name_copy;
    }
    else
    {
      const gchar * name_begin;

      name_begin = bare_method_name + class_name_length + 1;
      if (is_constructor && strcmp (name_begin, "<clinit>") == 0)
        goto skip_method;

      if (is_constructor)
        bare_method_name = "$init";
      else
        bare_method_name += class_name_length + 1;
    }

    if (seen_method_names != NULL && g_hash_table_contains (seen_method_names, bare_method_name))
      goto skip_method;

    if (ctx->ignore_case)
    {
      normalized_method_name_copy = g_utf8_strdown (bare_method_name, -1);
      normalized_method_name = normalized_method_name_copy;
    }
    else
    {
      normalized_method_name = bare_method_name;
    }

    if (!g_pattern_match_string (ctx->method_query, normalized_method_name))
      goto skip_method;

    if (group == NULL)
    {
      group = g_hash_table_lookup (ctx->groups, GUINT_TO_POINTER (klass->class_loader));
      if (group == NULL)
      {
        group = json_builder_new_immutable ();
        g_hash_table_insert (ctx->groups, GUINT_TO_POINTER (klass->class_loader), group);

        json_builder_begin_object (group);

        json_builder_set_member_name (group, "loader");
        json_builder_add_int_value (group, klass->class_loader);

        json_builder_set_member_name (group, "classes");
        json_builder_begin_array (group);
      }

      json_builder_begin_object (group);

      json_builder_set_member_name (group, "name");
      json_builder_add_string_value (group, class_name);

      json_builder_set_member_name (group, "methods");
      json_builder_begin_array (group);
    }

    json_builder_add_string_value (group, bare_method_name);

    if (seen_method_names != NULL)
      g_hash_table_add (seen_method_names, g_strdup (bare_method_name));

skip_method:
    g_free (normalized_method_name_copy);
    g_free (bare_method_name_copy);
    std_string_destroy (&method_name);
  }

  if (seen_method_names != NULL)
    g_hash_table_unref (seen_method_names);

  if (group == NULL)
    goto skip_class;

  json_builder_end_array (group);
  json_builder_end_object (group);

skip_class:
  g_free (class_name_copy);
  g_free (class_name);
  std_string_destroy (&descriptor_storage);

  return TRUE;
}

gchar *
enumerate_methods_jvm (const gchar * class_query,
                       const gchar * method_query,
                       jboolean include_signature,
                       jboolean ignore_case,
                       jboolean skip_system_classes,
                       JNIEnv * env)
{
  gchar * result;
  GPatternSpec * class_pattern, * method_pattern;
  GHashTable * groups;
  gpointer * ef = env->functions;
  jobject (* new_global_ref) (JNIEnv *, jobject) = ef[21];
  void (* delete_local_ref) (JNIEnv *, jobject) = ef[23];
  jboolean (* is_same_object) (JNIEnv *, jobject, jobject) = ef[24];
  jvmtiEnv * jvmti = java_api.jvmti;
  gpointer * jf = jvmti->functions - 1;
  jvmtiError (* deallocate) (jvmtiEnv *, void * mem) = jf[47];
  jvmtiError (* get_class_signature) (jvmtiEnv *, jclass, char **, char **) = jf[48];
  jvmtiError (* get_class_methods) (jvmtiEnv *, jclass, jint *, jmethodID **) = jf[52];
  jvmtiError (* get_class_loader) (jvmtiEnv *, jclass, jobject *) = jf[57];
  jvmtiError (* get_method_name) (jvmtiEnv *, jmethodID, char **, char **, char **) = jf[64];
  jvmtiError (* get_loaded_classes) (jvmtiEnv *, jint *, jclass **) = jf[78];
  jint class_count, class_index;
  jclass * classes;

  class_pattern = make_pattern_spec (class_query, ignore_case);
  method_pattern = make_pattern_spec (method_query, ignore_case);
  groups = g_hash_table_new_full (NULL, NULL, NULL, NULL);

  if (get_loaded_classes (jvmti, &class_count, &classes) != JVMTI_ERROR_NONE)
    goto emit_results;

  for (class_index = 0; class_index != class_count; class_index++)
  {
    jclass klass = classes[class_index];
    jobject loader = NULL;
    gboolean have_loader = FALSE;
    char * signature = NULL;
    gchar * class_name = NULL;
    gchar * class_name_copy = NULL;
    const gchar * normalized_class_name;
    jint method_count, method_index;
    jmethodID * methods = NULL;
    JsonBuilder * group = NULL;
    GHashTable * seen_method_names = NULL;

    if (skip_system_classes)
    {
      if (get_class_loader (jvmti, klass, &loader) != JVMTI_ERROR_NONE)
        goto skip_class;
      have_loader = TRUE;

      if (loader == NULL)
        goto skip_class;
    }

    if (get_class_signature (jvmti, klass, &signature, NULL) != JVMTI_ERROR_NONE)
      goto skip_class;

    class_name = class_name_from_signature (signature);

    if (ignore_case)
    {
      class_name_copy = g_utf8_strdown (class_name, -1);
      normalized_class_name = class_name_copy;
    }
    else
    {
      normalized_class_name = class_name;
    }

    if (!g_pattern_match_string (class_pattern, normalized_class_name))
      goto skip_class;

    if (get_class_methods (jvmti, klass, &method_count, &methods) != JVMTI_ERROR_NONE)
      goto skip_class;

    if (!include_signature)
      seen_method_names = g_hash_table_new_full (g_str_hash, g_str_equal, g_free, NULL);

    for (method_index = 0; method_index != method_count; method_index++)
    {
      jmethodID method = methods[method_index];
      const gchar * method_name;
      char * method_name_value = NULL;
      char * method_signature_value = NULL;
      gchar * method_name_copy = NULL;
      const gchar * normalized_method_name;
      gchar * normalized_method_name_copy = NULL;

      if (get_method_name (jvmti, method, &method_name_value, include_signature ? &method_signature_value : NULL, NULL) != JVMTI_ERROR_NONE)
        goto skip_method;
      method_name = method_name_value;

      if (method_name[0] == '<')
      {
        if (strcmp (method_name, "<init>") == 0)
          method_name = "$init";
        else if (strcmp (method_name, "<clinit>") == 0)
          goto skip_method;
      }

      if (include_signature)
      {
        method_name_copy = format_method_signature (method_name, method_signature_value);
        method_name = method_name_copy;
      }

      if (seen_method_names != NULL && g_hash_table_contains (seen_method_names, method_name))
        goto skip_method;

      if (ignore_case)
      {
        normalized_method_name_copy = g_utf8_strdown (method_name, -1);
        normalized_method_name = normalized_method_name_copy;
      }
      else
      {
        normalized_method_name = method_name;
      }

      if (!g_pattern_match_string (method_pattern, normalized_method_name))
        goto skip_method;

      if (group == NULL)
      {
        if (!have_loader && get_class_loader (jvmti, klass, &loader) != JVMTI_ERROR_NONE)
          goto skip_method;

        if (loader == NULL)
        {
          group = g_hash_table_lookup (groups, NULL);
        }
        else
        {
          GHashTableIter iter;
          jobject cur_loader;
          JsonBuilder * cur_group;

          g_hash_table_iter_init (&iter, groups);
          while (g_hash_table_iter_next (&iter, (gpointer *) &cur_loader, (gpointer *) &cur_group))
          {
            if (cur_loader != NULL && is_same_object (env, cur_loader, loader))
            {
              group = cur_group;
              break;
            }
          }
        }

        if (group == NULL)
        {
          jobject l;
          gchar * str;

          l = (loader != NULL) ? new_global_ref (env, loader) : NULL;

          group = json_builder_new_immutable ();
          g_hash_table_insert (groups, l, group);

          json_builder_begin_object (group);

          json_builder_set_member_name (group, "loader");
          str = g_strdup_printf ("0x%" G_GSIZE_MODIFIER "x", GPOINTER_TO_SIZE (l));
          json_builder_add_string_value (group, str);
          g_free (str);

          json_builder_set_member_name (group, "classes");
          json_builder_begin_array (group);
        }

        json_builder_begin_object (group);

        json_builder_set_member_name (group, "name");
        json_builder_add_string_value (group, class_name);

        json_builder_set_member_name (group, "methods");
        json_builder_begin_array (group);
      }

      json_builder_add_string_value (group, method_name);

      if (seen_method_names != NULL)
        g_hash_table_add (seen_method_names, g_strdup (method_name));

skip_method:
      g_free (normalized_method_name_copy);
      g_free (method_name_copy);
      deallocate (jvmti, method_signature_value);
      deallocate (jvmti, method_name_value);
    }

skip_class:
    if (group != NULL)
    {
      json_builder_end_array (group);
      json_builder_end_object (group);
    }

    if (seen_method_names != NULL)
      g_hash_table_unref (seen_method_names);

    deallocate (jvmti, methods);

    g_free (class_name_copy);
    g_free (class_name);
    deallocate (jvmti, signature);

    if (loader != NULL)
      delete_local_ref (env, loader);

    delete_local_ref (env, klass);
  }

  deallocate (jvmti, classes);

emit_results:
  result = finalize_method_groups_to_json (groups);

  g_hash_table_unref (groups);
  g_pattern_spec_free (method_pattern);
  g_pattern_spec_free (class_pattern);

  return result;
}

static gchar *
finalize_method_groups_to_json (GHashTable * groups)
{
  GString * result;
  GHashTableIter iter;
  guint i;
  JsonBuilder * group;

  result = g_string_sized_new (1024);

  g_string_append_c (result, '[');

  g_hash_table_iter_init (&iter, groups);
  for (i = 0; g_hash_table_iter_next (&iter, NULL, (gpointer *) &group); i++)
  {
    JsonNode * root;
    gchar * json;

    if (i > 0)
      g_string_append_c (result, ',');

    json_builder_end_array (group);
    json_builder_end_object (group);

    root = json_builder_get_root (group);
    json = json_to_string (root, FALSE);
    g_string_append (result, json);
    g_free (json);
    json_node_unref (root);

    g_object_unref (group);
  }

  g_string_append_c (result, ']');

  return g_string_free (result, FALSE);
}

static GPatternSpec *
make_pattern_spec (const gchar * pattern,
                   jboolean ignore_case)
{
  GPatternSpec * spec;

  if (ignore_case)
  {
    gchar * str = g_utf8_strdown (pattern, -1);
    spec = g_pattern_spec_new (str);
    g_free (str);
  }
  else
  {
    spec = g_pattern_spec_new (pattern);
  }

  return spec;
}

static gchar *
class_name_from_signature (const gchar * descriptor)
{
  gchar * result, * c;

  result = g_strdup (descriptor + 1);

  for (c = result; *c != '\\0'; c++)
  {
    if (*c == '/')
      *c = '.';
  }

  c[-1] = '\\0';

  return result;
}

static gchar *
format_method_signature (const gchar * name,
                         const gchar * signature)
{
  GString * sig;
  const gchar * cursor;
  gint arg_index;

  sig = g_string_sized_new (128);

  g_string_append (sig, name);

  cursor = signature;
  arg_index = -1;
  while (TRUE)
  {
    const gchar c = *cursor;

    if (c == '(')
    {
      g_string_append_c (sig, c);
      cursor++;
      arg_index = 0;
    }
    else if (c == ')')
    {
      g_string_append_c (sig, c);
      cursor++;
      break;
    }
    else
    {
      if (arg_index >= 1)
        g_string_append (sig, ", ");

      append_type (sig, &cursor);

      if (arg_index != -1)
        arg_index++;
    }
  }

  g_string_append (sig, ": ");
  append_type (sig, &cursor);

  return g_string_free (sig, FALSE);
}

static void
append_type (GString * output,
             const gchar ** type)
{
  const gchar * cursor = *type;

  switch (*cursor)
  {
    case 'Z':
      g_string_append (output, "boolean");
      cursor++;
      break;
    case 'B':
      g_string_append (output, "byte");
      cursor++;
      break;
    case 'C':
      g_string_append (output, "char");
      cursor++;
      break;
    case 'S':
      g_string_append (output, "short");
      cursor++;
      break;
    case 'I':
      g_string_append (output, "int");
      cursor++;
      break;
    case 'J':
      g_string_append (output, "long");
      cursor++;
      break;
    case 'F':
      g_string_append (output, "float");
      cursor++;
      break;
    case 'D':
      g_string_append (output, "double");
      cursor++;
      break;
    case 'V':
      g_string_append (output, "void");
      cursor++;
      break;
    case 'L':
    {
      gchar ch;

      cursor++;
      for (; (ch = *cursor) != ';'; cursor++)
      {
        g_string_append_c (output, (ch != '/') ? ch : '.');
      }
      cursor++;

      break;
    }
    case '[':
      *type = cursor + 1;
      append_type (output, type);
      g_string_append (output, "[]");
      return;
    default:
      g_string_append (output, "BUG");
      cursor++;
  }

  *type = cursor;
}

void
dealloc (gpointer mem)
{
  g_free (mem);
}

static gpointer
read_art_array (gpointer object_base,
                guint field_offset,
                guint length_size,
                guint * length)
{
  gpointer result, header;
  guint n;

  header = GSIZE_TO_POINTER (*(guint64 *) (object_base + field_offset));
  if (header != NULL)
  {
    result = header + length_size;
    if (length_size == sizeof (guint32))
      n = *(guint32 *) header;
    else
      n = *(guint64 *) header;
  }
  else
  {
    result = NULL;
    n = 0;
  }

  if (length != NULL)
    *length = n;

  return result;
}

static void
std_string_destroy (StdString * str)
{
  if ((str->l.capacity & 1) != 0)
    art_api.free (str->l.data);
}

static gchar *
std_string_c_str (StdString * self)
{
  if ((self->l.capacity & 1) != 0)
    return self->l.data;

  return self->s.data;
}
`,dd=/(.+)!([^/]+)\/?([isu]+)?/,Ee=null,Mo=null,Ue=class t{static build(e,n){return No(n),Mo(e,n,r=>new t(Ee.new(e,r,n)))}static enumerateMethods(e,n,r){No(r);let o=e.match(dd);if(o===null)throw new Error("Invalid query; format is: class!method -- see documentation of Java.enumerateMethods(query) for details");let i=Memory.allocUtf8String(o[1]),s=Memory.allocUtf8String(o[2]),c=!1,a=!1,l=!1,d=o[3];d!==void 0&&(c=d.indexOf("s")!==-1,a=d.indexOf("i")!==-1,l=d.indexOf("u")!==-1);let p;if(n.jvmti!==null){let f=Ee.enumerateMethodsJvm(i,s,We(c),We(a),We(l),r);try{p=JSON.parse(f.readUtf8String()).map(u=>{let _=ptr(u.loader);return u.loader=_.isNull()?null:_,u})}finally{Ee.dealloc(f)}}else ye(r.vm,r,f=>{let u=Ee.enumerateMethodsArt(i,s,We(c),We(a),We(l));try{let _=n["art::JavaVMExt::AddGlobalRef"],{vm:h}=n;p=JSON.parse(u.readUtf8String()).map(m=>{let b=m.loader;return m.loader=b!==0?_(h,f,ptr(b)):null,m})}finally{Ee.dealloc(u)}});return p}constructor(e){this.handle=e}has(e){return Ee.has(this.handle,Memory.allocUtf8String(e))!==0}find(e){return Ee.find(this.handle,Memory.allocUtf8String(e)).readUtf8String()}list(){let e=Ee.list(this.handle);try{return JSON.parse(e.readUtf8String())}finally{Ee.dealloc(e)}}};function No(t){Ee===null&&(Ee=ud(t),Mo=pd(Ee,t.vm))}function ud(t){let e=pt(),{jvmti:n=null}=e,{pointerSize:r}=Process,o=8,i=r,s=7*r,c=10*4+5*r,a=o+i+s+c,d=Memory.alloc(a),p=d.add(o),f=p.add(i),{getDeclaredMethods:u,getDeclaredFields:_}=t.javaLangClass(),h=t.javaLangReflectMethod(),m=t.javaLangReflectField(),b=f;[n!==null?n:NULL,u,_,h.getName,h.getModifiers,m.getName,m.getModifiers].forEach(j=>{b=b.writePointer(j).add(r)});let E=f.add(s),{vm:L}=t;if(e.flavor==="art"){let j;if(n!==null)j=[0,0,0,0];else{let M=Jn(L).offset;j=[M.ifields,M.methods,M.sfields,M.copiedMethodsOffset]}let N=_e(L),T=Rt(L),v=E;[1,...j,N.size,N.offset.accessFlags,T.size,T.offset.accessFlags,4294967295].forEach(M=>{v=v.writeUInt(M).add(4)}),[e.artClassLinker.address,e["art::ClassLinker::VisitClasses"],e["art::mirror::Class::GetDescriptor"],e["art::ArtMethod::PrettyMethod"],Process.getModuleByName("libc.so").getExportByName("free")].forEach((M,I)=>{M===void 0&&(M=NULL),v=v.writePointer(M).add(r)})}let C=new CModule(ld,{lock:d,models:p,java_api:f,art_api:E}),R={exceptions:"propagate"},O={exceptions:"propagate",scheduling:"exclusive"};return{handle:C,new:new NativeFunction(C.model_new,"pointer",["pointer","pointer","pointer"],R),has:new NativeFunction(C.model_has,"bool",["pointer","pointer"],O),find:new NativeFunction(C.model_find,"pointer",["pointer","pointer"],O),list:new NativeFunction(C.model_list,"pointer",["pointer"],O),enumerateMethodsArt:new NativeFunction(C.enumerate_methods_art,"pointer",["pointer","pointer","bool","bool","bool"],R),enumerateMethodsJvm:new NativeFunction(C.enumerate_methods_jvm,"pointer",["pointer","pointer","bool","bool","bool","pointer"],R),dealloc:new NativeFunction(C.dealloc,"void",["pointer"],O)}}function pd(t,e){let n=pt();if(n.flavor!=="art")return fd;let r=n["art::JavaVMExt::DecodeGlobal"];return function(o,i,s){let c;return ye(e,i,a=>{let l=r(e,a,o);c=s(l)}),c}}function fd(t,e,n){return n(NULL)}function We(t){return t?1:0}var ft=class{constructor(e,n){this.items=new Map,this.capacity=e,this.destroy=n}dispose(e){let{items:n,destroy:r}=this;n.forEach(o=>{r(o,e)}),n.clear()}get(e){let{items:n}=this,r=n.get(e);return r!==void 0&&(n.delete(e),n.set(e,r)),r}set(e,n,r){let{items:o}=this,i=o.get(e);if(i!==void 0)o.delete(e),this.destroy(i,r);else if(o.size===this.capacity){let s=o.keys().next().value,c=o.get(s);o.delete(s),this.destroy(c,r)}o.set(e,n)}};var ht=1,ar=256,Oo=65536,hd=305419896,jo=32,Ro=12,Po=8,Fo=8,Do=4,Uo=4,Bo=12,_d=0,md=1,gd=2,bd=3,yd=4,Ed=5,vd=6,Sd=4096,wd=4097,Id=4099,Cd=8192,Td=8193,Ad=8194,Ld=8195,xd=8196,kd=8198,Nd=24,Md=28,Od=2,jd=24,Vo=g.from([3,0,7,14,0]),ir="Ldalvik/annotation/Throws;",Rd=g.from([0]);function Pd(t){let e=new cr,n=Object.assign({},t);return e.addClass(n),e.build()}var cr=class{constructor(){this.classes=[]}addClass(e){this.classes.push(e)}build(){let e=Ud(this.classes),{classes:n,interfaces:r,fields:o,methods:i,protos:s,parameters:c,annotationDirectories:a,annotationSets:l,throwsAnnotations:d,types:p,strings:f}=e,u=0,_=0,h=8,m=12,b=20,E=112;u+=E;let L=u,C=f.length*Uo;u+=C;let R=u,O=p.length*Do;u+=O;let j=u,N=s.length*Ro;u+=N;let T=u,v=o.length*Po;u+=v;let M=u,I=i.length*Fo;u+=I;let S=u,F=n.length*jo;u+=F;let D=u,P=l.map(x=>{let U=u;return x.offset=U,u+=4+x.items.length*4,U}),B=n.reduce((x,U)=>(U.classData.constructorMethods.forEach(Z=>{let[,q,W]=Z;(q&ar)===0&&W>=0&&(Z.push(u),x.push({offset:u,superConstructor:W}),u+=jd)}),x),[]);a.forEach(x=>{x.offset=u,u+=16+x.methods.length*8});let $=r.map(x=>{u=sr(u,4);let U=u;return x.offset=U,u+=4+2*x.types.length,U}),Y=c.map(x=>{u=sr(u,4);let U=u;return x.offset=U,u+=4+2*x.types.length,U}),ae=[],X=f.map(x=>{let U=u,V=g.from(me(x.length)),Z=g.from(x,"utf8"),q=g.concat([V,Z,Rd]);return ae.push(q),u+=q.length,U}),ie=B.map(x=>{let U=u;return u+=Vo.length,U}),ee=d.map(x=>{let U=Dd(x);return x.offset=u,u+=U.length,U}),re=n.map((x,U)=>{x.classData.offset=u;let V=Fd(x);return u+=V.length,V}),Se=0,Ye=0;u=sr(u,4);let H=u,he=r.length+c.length,Te=4+(o.length>0?1:0)+2+l.length+B.length+a.length+(he>0?1:0)+1+ie.length+d.length+n.length+1,je=4+Te*Bo;u+=je;let Ne=u-D,ze=u,A=g.alloc(ze);A.write(`dex
035`),A.writeUInt32LE(ze,32),A.writeUInt32LE(E,36),A.writeUInt32LE(hd,40),A.writeUInt32LE(Se,44),A.writeUInt32LE(Ye,48),A.writeUInt32LE(H,52),A.writeUInt32LE(f.length,56),A.writeUInt32LE(L,60),A.writeUInt32LE(p.length,64),A.writeUInt32LE(R,68),A.writeUInt32LE(s.length,72),A.writeUInt32LE(j,76),A.writeUInt32LE(o.length,80),A.writeUInt32LE(o.length>0?T:0,84),A.writeUInt32LE(i.length,88),A.writeUInt32LE(M,92),A.writeUInt32LE(n.length,96),A.writeUInt32LE(S,100),A.writeUInt32LE(Ne,104),A.writeUInt32LE(D,108),X.forEach((x,U)=>{A.writeUInt32LE(x,L+U*Uo)}),p.forEach((x,U)=>{A.writeUInt32LE(x,R+U*Do)}),s.forEach((x,U)=>{let[V,Z,q]=x,W=j+U*Ro;A.writeUInt32LE(V,W),A.writeUInt32LE(Z,W+4),A.writeUInt32LE(q!==null?q.offset:0,W+8)}),o.forEach((x,U)=>{let[V,Z,q]=x,W=T+U*Po;A.writeUInt16LE(V,W),A.writeUInt16LE(Z,W+2),A.writeUInt32LE(q,W+4)}),i.forEach((x,U)=>{let[V,Z,q]=x,W=M+U*Fo;A.writeUInt16LE(V,W),A.writeUInt16LE(Z,W+2),A.writeUInt32LE(q,W+4)}),n.forEach((x,U)=>{let{interfaces:V,annotationsDirectory:Z}=x,q=V!==null?V.offset:0,W=Z!==null?Z.offset:0,Xe=0,ge=S+U*jo;A.writeUInt32LE(x.index,ge),A.writeUInt32LE(x.accessFlags,ge+4),A.writeUInt32LE(x.superClassIndex,ge+8),A.writeUInt32LE(q,ge+12),A.writeUInt32LE(x.sourceFileIndex,ge+16),A.writeUInt32LE(W,ge+20),A.writeUInt32LE(x.classData.offset,ge+24),A.writeUInt32LE(Xe,ge+28)}),l.forEach((x,U)=>{let{items:V}=x,Z=P[U];A.writeUInt32LE(V.length,Z),V.forEach((q,W)=>{A.writeUInt32LE(q.offset,Z+4+W*4)})}),B.forEach((x,U)=>{let{offset:V,superConstructor:Z}=x,q=1,W=1,Xe=1,ge=0,gt=4;A.writeUInt16LE(q,V),A.writeUInt16LE(W,V+2),A.writeUInt16LE(Xe,V+4),A.writeUInt16LE(ge,V+6),A.writeUInt32LE(ie[U],V+8),A.writeUInt32LE(gt,V+12),A.writeUInt16LE(4208,V+16),A.writeUInt16LE(Z,V+18),A.writeUInt16LE(0,V+20),A.writeUInt16LE(14,V+22)}),a.forEach(x=>{let U=x.offset,V=0,Z=0,q=x.methods.length,W=0;A.writeUInt32LE(V,U),A.writeUInt32LE(Z,U+4),A.writeUInt32LE(q,U+8),A.writeUInt32LE(W,U+12),x.methods.forEach((Xe,ge)=>{let gt=U+16+ge*8,[hi,_i]=Xe;A.writeUInt32LE(hi,gt),A.writeUInt32LE(_i.offset,gt+4)})}),r.forEach((x,U)=>{let V=$[U];A.writeUInt32LE(x.types.length,V),x.types.forEach((Z,q)=>{A.writeUInt16LE(Z,V+4+q*2)})}),c.forEach((x,U)=>{let V=Y[U];A.writeUInt32LE(x.types.length,V),x.types.forEach((Z,q)=>{A.writeUInt16LE(Z,V+4+q*2)})}),ae.forEach((x,U)=>{x.copy(A,X[U])}),ie.forEach(x=>{Vo.copy(A,x)}),ee.forEach((x,U)=>{x.copy(A,d[U].offset)}),re.forEach((x,U)=>{x.copy(A,n[U].classData.offset)}),A.writeUInt32LE(Te,H);let ce=[[_d,1,_],[md,f.length,L],[gd,p.length,R],[bd,s.length,j]];o.length>0&&ce.push([yd,o.length,T]),ce.push([Ed,i.length,M]),ce.push([vd,n.length,S]),l.forEach((x,U)=>{ce.push([Id,x.items.length,P[U]])}),B.forEach(x=>{ce.push([Td,1,x.offset])}),a.forEach(x=>{ce.push([kd,1,x.offset])}),he>0&&ce.push([wd,he,$.concat(Y)[0]]),ce.push([Ad,f.length,X[0]]),ie.forEach(x=>{ce.push([Ld,1,x])}),d.forEach(x=>{ce.push([xd,1,x.offset])}),n.forEach(x=>{ce.push([Cd,1,x.classData.offset])}),ce.push([Sd,1,H]),ce.forEach((x,U)=>{let[V,Z,q]=x,W=H+4+U*Bo;A.writeUInt16LE(V,W),A.writeUInt32LE(Z,W+4),A.writeUInt32LE(q,W+8)});let Cr=new Checksum("sha1");return Cr.update(A.slice(m+b)),g.from(Cr.getDigest()).copy(A,m),A.writeUInt32LE($d(A,m),h),A}};function Fd(t){let{instanceFields:e,constructorMethods:n,virtualMethods:r}=t.classData;return g.from([0].concat(me(e.length)).concat(me(n.length)).concat(me(r.length)).concat(e.reduce((i,[s,c])=>i.concat(me(s)).concat(me(c)),[])).concat(n.reduce((i,[s,c,,a])=>i.concat(me(s)).concat(me(c)).concat(me(a||0)),[])).concat(r.reduce((i,[s,c])=>i.concat(me(s)).concat(me(c)).concat([0]),[])))}function Dd(t){let{thrownTypes:e}=t;return g.from([Od].concat(me(t.type)).concat([1]).concat(me(t.value)).concat([Md,e.length]).concat(e.reduce((n,r)=>(n.push(Nd,r),n),[])))}function Ud(t){let e=new Set,n=new Set,r={},o=[],i=[],s={},c=new Set,a=new Set;t.forEach(I=>{let{name:S,superClass:F,sourceFileName:D}=I;e.add("this"),e.add(S),n.add(S),e.add(F),n.add(F),e.add(D),I.interfaces.forEach(P=>{e.add(P),n.add(P)}),I.fields.forEach(P=>{let[B,$]=P;e.add(B),e.add($),n.add($),o.push([I.name,$,B])}),I.methods.some(([P])=>P==="<init>")||(I.methods.unshift(["<init>","V",[]]),c.add(S)),I.methods.forEach(P=>{let[B,$,Y,ae=[],X]=P;e.add(B);let ie=l($,Y),ee=null;if(ae.length>0){let re=ae.slice();re.sort(),ee=re.join("|");let Se=s[ee];Se===void 0&&(Se={id:ee,types:re},s[ee]=Se),e.add(ir),n.add(ir),ae.forEach(Ye=>{e.add(Ye),n.add(Ye)}),e.add("value")}if(i.push([I.name,ie,B,ee,X]),B==="<init>"){a.add(S+"|"+ie);let re=F+"|"+ie;c.has(S)&&!a.has(re)&&(i.push([F,ie,B,null,0]),a.add(re))}})});function l(I,S){let F=[I].concat(S),D=F.join("|");if(r[D]!==void 0)return D;e.add(I),n.add(I),S.forEach(B=>{e.add(B),n.add(B)});let P=F.map(Gd).join("");return e.add(P),r[D]=[D,P,I,S],D}let d=Array.from(e);d.sort();let p=d.reduce((I,S,F)=>(I[S]=F,I),{}),f=Array.from(n).map(I=>p[I]);f.sort(zo);let u=f.reduce((I,S,F)=>(I[d[S]]=F,I),{}),_=Object.keys(r).map(I=>r[I]);_.sort(Vd);let h={},m=_.map(I=>{let[,S,F,D]=I,P;if(D.length>0){let B=D.join("|");P=h[B],P===void 0&&(P={types:D.map($=>u[$]),offset:-1},h[B]=P)}else P=null;return[p[S],u[F],P]}),b=_.reduce((I,S,F)=>{let[D]=S;return I[D]=F,I},{}),E=Object.keys(h).map(I=>h[I]),L=o.map(I=>{let[S,F,D]=I;return[u[S],u[F],p[D]]});L.sort(zd);let C=i.map(I=>{let[S,F,D,P,B]=I;return[u[S],b[F],p[D],P,B]});C.sort(Jd);let R=Object.keys(s).map(I=>s[I]).map(I=>({id:I.id,type:u[ir],value:p.value,thrownTypes:I.types.map(S=>u[S]),offset:-1})),O=R.map(I=>({id:I.id,items:[I],offset:-1})),j=O.reduce((I,S,F)=>(I[S.id]=F,I),{}),N={},T=[],v=t.map(I=>{let S=u[I.name],F=ht,D=u[I.superClass],P,B=I.interfaces.map(H=>u[H]);if(B.length>0){B.sort(zo);let H=B.join("|");P=N[H],P===void 0&&(P={types:B,offset:-1},N[H]=P)}else P=null;let $=p[I.sourceFileName],Y=C.reduce((H,he,Te)=>{let[je,Ne,ze,A,ce]=he;return je===S&&H.push([Te,ze,A,Ne,ce]),H},[]),ae=null,X=Y.filter(([,,H])=>H!==null).map(([H,,he])=>[H,O[j[he]]]);X.length>0&&(ae={methods:X,offset:-1},T.push(ae));let ie=L.reduce((H,he,Te)=>{let[je]=he;return je===S&&H.push([Te>0?1:0,ht]),H},[]),ee=p["<init>"],re=Y.filter(([,H])=>H===ee).map(([H,,,he])=>{if(c.has(I.name)){let Te=-1,je=C.length;for(let Ne=0;Ne!==je;Ne++){let[ze,A,ce]=C[Ne];if(ze===D&&ce===ee&&A===he){Te=Ne;break}}return[H,ht|Oo,Te]}else return[H,ht|Oo|ar,-1]}),Se=Bd(Y.filter(([,H])=>H!==ee).map(([H,,,,he])=>[H,he|ht|ar]));return{index:S,accessFlags:F,superClassIndex:D,interfaces:P,sourceFileIndex:$,annotationsDirectory:ae,classData:{instanceFields:ie,constructorMethods:re,virtualMethods:Se,offset:-1}}}),M=Object.keys(N).map(I=>N[I]);return{classes:v,interfaces:M,fields:L,methods:C,protos:m,parameters:E,annotationDirectories:T,annotationSets:O,throwsAnnotations:R,types:f,strings:d}}function Bd(t){let e=0;return t.map(([n,r],o)=>{let i;return o===0?i=[n,r]:i=[n-e,r],e=n,i})}function zo(t,e){return t-e}function Vd(t,e){let[,,n,r]=t,[,,o,i]=e;if(n<o)return-1;if(n>o)return 1;let s=r.join("|"),c=i.join("|");return s<c?-1:s>c?1:0}function zd(t,e){let[n,r,o]=t,[i,s,c]=e;return n!==i?n-i:o!==c?o-c:r-s}function Jd(t,e){let[n,r,o]=t,[i,s,c]=e;return n!==i?n-i:o!==c?o-c:r-s}function Gd(t){let e=t[0];return e==="L"||e==="["?"L":t}function me(t){if(t<=127)return[t];let e=[],n=!1;do{let r=t&127;t>>=7,n=t!==0,n&&(r|=128),e.push(r)}while(n);return e}function sr(t,e){let n=t%e;return n===0?t:t+e-n}function $d(t,e){let n=1,r=0,o=t.length;for(let i=e;i<o;i++)n=(n+t[i])%65521,r=(r+n)%65521;return(r<<16|n)>>>0}var Jo=Pd;var Hd=1,lr=null,Go=null;function $o(t){lr=t}function dr(t,e,n){let r=qe(t);return r===null&&(t.indexOf("[")===0?r=ur(t,e,n):(t[0]==="L"&&t[t.length-1]===";"&&(t=t.substring(1,t.length-1)),r=Wd(t,e,n))),Object.assign({className:t},r)}var Ho={boolean:{name:"Z",type:"uint8",size:1,byteSize:1,defaultValue:!1,isCompatible(t){return typeof t=="boolean"},fromJni(t){return!!t},toJni(t){return t?1:0},read(t){return t.readU8()},write(t,e){t.writeU8(e)},toString(){return this.name}},byte:{name:"B",type:"int8",size:1,byteSize:1,defaultValue:0,isCompatible(t){return Number.isInteger(t)&&t>=-128&&t<=127},fromJni:ve,toJni:ve,read(t){return t.readS8()},write(t,e){t.writeS8(e)},toString(){return this.name}},char:{name:"C",type:"uint16",size:1,byteSize:2,defaultValue:0,isCompatible(t){if(typeof t!="string"||t.length!==1)return!1;let e=t.charCodeAt(0);return e>=0&&e<=65535},fromJni(t){return String.fromCharCode(t)},toJni(t){return t.charCodeAt(0)},read(t){return t.readU16()},write(t,e){t.writeU16(e)},toString(){return this.name}},short:{name:"S",type:"int16",size:1,byteSize:2,defaultValue:0,isCompatible(t){return Number.isInteger(t)&&t>=-32768&&t<=32767},fromJni:ve,toJni:ve,read(t){return t.readS16()},write(t,e){t.writeS16(e)},toString(){return this.name}},int:{name:"I",type:"int32",size:1,byteSize:4,defaultValue:0,isCompatible(t){return Number.isInteger(t)&&t>=-2147483648&&t<=2147483647},fromJni:ve,toJni:ve,read(t){return t.readS32()},write(t,e){t.writeS32(e)},toString(){return this.name}},long:{name:"J",type:"int64",size:2,byteSize:8,defaultValue:0,isCompatible(t){return typeof t=="number"||t instanceof Int64},fromJni:ve,toJni:ve,read(t){return t.readS64()},write(t,e){t.writeS64(e)},toString(){return this.name}},float:{name:"F",type:"float",size:1,byteSize:4,defaultValue:0,isCompatible(t){return typeof t=="number"},fromJni:ve,toJni:ve,read(t){return t.readFloat()},write(t,e){t.writeFloat(e)},toString(){return this.name}},double:{name:"D",type:"double",size:2,byteSize:8,defaultValue:0,isCompatible(t){return typeof t=="number"},fromJni:ve,toJni:ve,read(t){return t.readDouble()},write(t,e){t.writeDouble(e)},toString(){return this.name}},void:{name:"V",type:"void",size:0,byteSize:0,defaultValue:void 0,isCompatible(t){return t===void 0},fromJni(){},toJni(){return NULL},toString(){return this.name}}},Zd=new Set(Object.values(Ho).map(t=>t.name));function qe(t){let e=Ho[t];return e!==void 0?e:null}function Wd(t,e,n){let r=n._types[e?1:0],o=r[t];return o!==void 0||(t==="java.lang.Object"?o=qd(n):o=Kd(t,e,n),r[t]=o),o}function qd(t){return{name:"Ljava/lang/Object;",type:"pointer",size:1,defaultValue:NULL,isCompatible(e){return e===null?!0:e===void 0?!1:e.$h instanceof NativePointer?!0:typeof e=="string"},fromJni(e,n,r){return e.isNull()?null:t.cast(e,t.use("java.lang.Object"),r)},toJni(e,n){return e===null?NULL:typeof e=="string"?n.newStringUtf(e):e.$h}}}function Kd(t,e,n){let r=null,o=null,i=null;function s(){return r===null&&(r=n.use(t).class),r}function c(l){let d=s();return o===null&&(o=d.isInstance.overload("java.lang.Object")),o.call(d,l)}function a(){if(i===null){let l=s();i=n.use("java.lang.String").class.isAssignableFrom(l)}return i}return{name:Be(t),type:"pointer",size:1,defaultValue:NULL,isCompatible(l){return l===null?!0:l===void 0?!1:l.$h instanceof NativePointer?c(l):typeof l=="string"&&a()},fromJni(l,d,p){return l.isNull()?null:a()&&e?d.stringFromJni(l):n.cast(l,n.use(t),p)},toJni(l,d){return l===null?NULL:typeof l=="string"?d.newStringUtf(l):l.$h},toString(){return this.name}}}var Qd=[["Z","boolean"],["B","byte"],["C","char"],["D","double"],["F","float"],["I","int"],["J","long"],["S","short"]].reduce((t,[e,n])=>(t["["+e]=Yd("["+e,n),t),{});function Yd(t,e){let n=y.prototype,r=ru(e),o={typeName:e,newArray:n["new"+r+"Array"],setRegion:n["set"+r+"ArrayRegion"],getElements:n["get"+r+"ArrayElements"],releaseElements:n["release"+r+"ArrayElements"]};return{name:t,type:"pointer",size:1,defaultValue:NULL,isCompatible(i){return nu(i,e)},fromJni(i,s,c){return eu(i,o,s,c)},toJni(i,s){return tu(i,o,s)}}}function ur(t,e,n){let r=Qd[t];if(r!==void 0)return r;if(t.indexOf("[")!==0)throw new Error("Unsupported type: "+t);let o=t.substring(1),i=dr(o,e,n),s=0,c=o.length;for(;s!==c&&o[s]==="[";)s++;o=o.substring(s),o[0]==="L"&&o[o.length-1]===";"&&(o=o.substring(1,o.length-1));let a=o.replace(/\./g,"/");Zd.has(a)?a="[".repeat(s)+a:a="[".repeat(s)+"L"+a+";";let l="["+a;return o="[".repeat(s)+o,{name:t.replace(/\./g,"/"),type:"pointer",size:1,defaultValue:NULL,isCompatible(d){return d===null?!0:typeof d!="object"||d.length===void 0?!1:d.every(function(p){return i.isCompatible(p)})},fromJni(d,p,f){if(d.isNull())return null;let u=[],_=p.getArrayLength(d);for(let h=0;h!==_;h++){let m=p.getObjectArrayElement(d,h);try{u.push(i.fromJni(m,p))}finally{p.deleteLocalRef(m)}}try{u.$w=n.cast(d,n.use(l),f)}catch{n.use("java.lang.reflect.Array").newInstance(n.use(o).class,0),u.$w=n.cast(d,n.use(l),f)}return u.$dispose=Xd,u},toJni(d,p){if(d===null)return NULL;if(!(d instanceof Array))throw new Error("Expected an array");let f=d.$w;if(f!==void 0)return f.$h;let u=d.length,h=n.use(o).$borrowClassHandle(p);try{let m=p.newObjectArray(u,h.value,NULL);p.throwIfExceptionPending();for(let b=0;b!==u;b++){let E=i.toJni(d[b],p);try{p.setObjectArrayElement(m,b,E)}finally{i.type==="pointer"&&p.getObjectRefType(E)===Hd&&p.deleteLocalRef(E)}p.throwIfExceptionPending()}return m}finally{h.unref(p)}}}}function Xd(){let t=this.length;for(let e=0;e!==t;e++){let n=this[e];if(n===null)continue;let r=n.$dispose;if(r===void 0)break;r.call(n)}this.$w.$dispose()}function eu(t,e,n,r){if(t.isNull())return null;let o=qe(e.typeName),i=n.getArrayLength(t);return new Ut(t,e,o,i,n,r)}function tu(t,e,n){if(t===null)return NULL;let r=t.$h;if(r!==void 0)return r;let o=t.length,i=qe(e.typeName),s=e.newArray.call(n,o);if(s.isNull())throw new Error("Unable to construct array");if(o>0){let c=i.byteSize,a=i.write,l=i.toJni,d=Memory.alloc(o*i.byteSize);for(let p=0;p!==o;p++)a(d.add(p*c),l(t[p]));e.setRegion.call(n,s,0,o,d),n.throwIfExceptionPending()}return s}function nu(t,e){if(t===null)return!0;if(t instanceof Ut)return t.$s.typeName===e;if(!(typeof t=="object"&&t.length!==void 0))return!1;let r=qe(e);return Array.prototype.every.call(t,o=>r.isCompatible(o))}function Ut(t,e,n,r,o,i=!0){if(i){let s=o.newGlobalRef(t);this.$h=s,this.$r=Script.bindWeak(this,o.vm.makeHandleDestructor(s))}else this.$h=t,this.$r=null;return this.$s=e,this.$t=n,this.length=r,new Proxy(this,Go)}Go={has(t,e){return e in t?!0:t.tryParseIndex(e)!==null},get(t,e,n){let r=t.tryParseIndex(e);return r===null?t[e]:t.readElement(r)},set(t,e,n,r){let o=t.tryParseIndex(e);return o===null?(t[e]=n,!0):(t.writeElement(o,n),!0)},ownKeys(t){let e=[],{length:n}=t;for(let r=0;r!==n;r++){let o=r.toString();e.push(o)}return e.push("length"),e},getOwnPropertyDescriptor(t,e){return t.tryParseIndex(e)!==null?{writable:!0,configurable:!0,enumerable:!0}:Object.getOwnPropertyDescriptor(t,e)}};Object.defineProperties(Ut.prototype,{$dispose:{enumerable:!0,value(){let t=this.$r;t!==null&&(this.$r=null,Script.unbindWeak(t))}},$clone:{value(t){return new Ut(this.$h,this.$s,this.$t,this.length,t)}},tryParseIndex:{value(t){if(typeof t=="symbol")return null;let e=parseInt(t);return isNaN(e)||e<0||e>=this.length?null:e}},readElement:{value(t){return this.withElements(e=>{let n=this.$t;return n.fromJni(n.read(e.add(t*n.byteSize)))})}},writeElement:{value(t,e){let{$h:n,$s:r,$t:o}=this,i=lr.getEnv(),s=Memory.alloc(o.byteSize);o.write(s,o.toJni(e)),r.setRegion.call(i,n,t,1,s)}},withElements:{value(t){let{$h:e,$s:n}=this,r=lr.getEnv(),o=n.getElements.call(r,e);if(o.isNull())throw new Error("Unable to get array elements");try{return t(o)}finally{n.releaseElements.call(r,e,o)}}},toJSON:{value(){let{length:t,$t:e}=this,{byteSize:n,fromJni:r,read:o}=e;return this.withElements(i=>{let s=[];for(let c=0;c!==t;c++){let a=r(o(i.add(c*n)));s.push(a)}return s})}},toString:{value(){return this.toJSON().toString()}}});function Be(t){return"L"+t.replace(/\./g,"/")+";"}function ru(t){return t.charAt(0).toUpperCase()+t.slice(1)}function ve(t){return t}var ou=4,{ensureClassInitialized:Zo,makeMethodMangler:Xo}=Ft,iu=8,hr=1,mt=2,ke=3,pr=1,_r=2,Bt=1,ei=2,Wo=Symbol("PENDING_USE"),qo="/data/local/tmp",{getCurrentThreadId:zt,pointerSize:_t}=Process,ue={state:"empty",factories:[],loaders:null,Integer:null},G=null,Q=null,ti=null,ni=null,ri=null,oi=null,ii=null,Ko=null,fr=null,Qe=new Map,Oe=class t{static _initialize(e,n){G=e,Q=n,ti=n.flavor==="art",n.flavor==="jvm"&&(Zo=To,Xo=Lo)}static _disposeAll(e){ue.factories.forEach(n=>{n._dispose(e)})}static get(e){let n=Cu(),r=n.factories[0];if(e===null)return r;let o=n.loaders.get(e);if(o!==null){let s=r.cast(o,n.Integer);return n.factories[s.intValue()]}let i=new t;return i.loader=e,i.cacheDir=r.cacheDir,br(i,e),i}constructor(){this.cacheDir=qo,this.codeCacheDir=qo+"/dalvik-cache",this.tempFileNaming={prefix:"frida",suffix:""},this._classes={},this._classHandles=new ft(10,au),this._patchedMethods=new Set,this._loader=null,this._types=[{},{}],ue.factories.push(this)}_dispose(e){Array.from(this._patchedMethods).forEach(n=>{n.implementation=null}),this._patchedMethods.clear(),qn(),this._classHandles.dispose(e),this._classes={}}get loader(){return this._loader}set loader(e){let n=this._loader===null&&e!==null;this._loader=e,n&&ue.state==="ready"&&this===ue.factories[0]&&br(this,e)}use(e,n={}){let r=n.cache!=="skip",o=r?this._getUsedClass(e):void 0;if(o===void 0)try{let i=G.getEnv(),{_loader:s}=this,c=s!==null?lu(e,s,i):cu(e);o=this._make(e,c,i)}finally{r&&this._setUsedClass(e,o)}return o}_getUsedClass(e){let n;for(;(n=this._classes[e])===Wo;)Thread.sleep(.05);return n===void 0&&(this._classes[e]=Wo),n}_setUsedClass(e,n){n!==void 0?this._classes[e]=n:delete this._classes[e]}_make(e,n,r){let o=su(),i=Object.create(Er.prototype,{[Symbol.for("n")]:{value:e},$n:{get(){return this[Symbol.for("n")]}},[Symbol.for("C")]:{value:o},$C:{get(){return this[Symbol.for("C")]}},[Symbol.for("w")]:{value:null,writable:!0},$w:{get(){return this[Symbol.for("w")]},set(a){this[Symbol.for("w")]=a}},[Symbol.for("_s")]:{writable:!0},$_s:{get(){return this[Symbol.for("_s")]},set(a){this[Symbol.for("_s")]=a}},[Symbol.for("c")]:{value:[null]},$c:{get(){return this[Symbol.for("c")]}},[Symbol.for("m")]:{value:new Map},$m:{get(){return this[Symbol.for("m")]}},[Symbol.for("l")]:{value:null,writable:!0},$l:{get(){return this[Symbol.for("l")]},set(a){this[Symbol.for("l")]=a}},[Symbol.for("gch")]:{value:n},$gch:{get(){return this[Symbol.for("gch")]}},[Symbol.for("f")]:{value:this},$f:{get(){return this[Symbol.for("f")]}}});o.prototype=i;let s=new o(null);i[Symbol.for("w")]=s,i.$w=s;let c=s.$borrowClassHandle(r);try{let a=c.value;Zo(r,a),i.$l=Ue.build(a,r)}finally{c.unref(r)}return s}retain(e){let n=G.getEnv();return e.$clone(n)}cast(e,n,r){let o=G.getEnv(),i=e.$h;i===void 0&&(i=e);let s=n.$borrowClassHandle(o);try{if(!o.isInstanceOf(i,s.value))throw new Error(`Cast from '${o.getObjectClassName(i)}' to '${n.$n}' isn't possible`)}finally{s.unref(o)}let c=n.$C;return new c(i,Bt,o,r)}wrap(e,n,r){let o=n.$C,i=new o(e,Bt,r,!1);return i.$r=Script.bindWeak(i,G.makeHandleDestructor(e)),i}array(e,n){let r=G.getEnv(),o=qe(e);o!==null&&(e=o.name);let i=ur("["+e,!1,this),s=i.toJni(n,r);return i.fromJni(s,r,!0)}registerClass(e){let n=G.getEnv(),r=[];try{let o=this.use("java.lang.Class"),i=n.javaLangReflectMethod(),s=n.vaMethod("pointer",[]),c=e.name,a=e.implements||[],l=e.superClass||this.use("java.lang.Object"),d=[],p=[],f={name:Be(c),sourceFileName:Au(c),superClass:Be(l.$n),interfaces:a.map(T=>Be(T.$n)),fields:d,methods:p},u=a.slice();a.forEach(T=>{Array.prototype.slice.call(T.class.getInterfaces()).forEach(v=>{let M=this.cast(v,o).getCanonicalName();u.push(this.use(M))})});let _=e.fields||{};Object.getOwnPropertyNames(_).forEach(T=>{let v=this._getType(_[T]);d.push([T,v.name])});let h={},m={};u.forEach(T=>{let v=T.$borrowClassHandle(n);r.push(v);let M=v.value;T.$ownMembers.filter(I=>T[I].overloads!==void 0).forEach(I=>{let S=T[I],F=S.overloads,D=F.map(P=>Qo(I,P.returnType,P.argumentTypes));h[I]=[S,D,M],F.forEach((P,B)=>{let $=D[B];m[$]=[P,M]})})});let b=e.methods||{},L=Object.keys(b).reduce((T,v)=>{let M=b[v],I=v==="$init"?"<init>":v;return M instanceof Array?T.push(...M.map(S=>[I,S])):T.push([I,M]),T},[]),C=[];L.forEach(([T,v])=>{let M=ke,I,S,F=[],D;if(typeof v=="function"){let Y=h[T];if(Y!==void 0&&Array.isArray(Y)){let[ae,X,ie]=Y;if(X.length>1)throw new Error(`More than one overload matching '${T}': signature must be specified`);delete m[X[0]];let ee=ae.overloads[0];M=ee.type,I=ee.returnType,S=ee.argumentTypes,D=v;let re=n.toReflectedMethod(ie,ee.handle,0),Se=s(n.handle,re,i.getGenericExceptionTypes);F=yr(n,Se).map(Be),n.deleteLocalRef(Se),n.deleteLocalRef(re)}else I=this._getType("void"),S=[],D=v}else{if(v.isStatic&&(M=mt),I=this._getType(v.returnType||"void"),S=(v.argumentTypes||[]).map(X=>this._getType(X)),D=v.implementation,typeof D!="function")throw new Error("Expected a function implementation for method: "+T);let Y=Qo(T,I,S),ae=m[Y];if(ae!==void 0){let[X,ie]=ae;delete m[Y],M=X.type,I=X.returnType,S=X.argumentTypes;let ee=n.toReflectedMethod(ie,X.handle,0),re=s(n.handle,ee,i.getGenericExceptionTypes);F=yr(n,re).map(Be),n.deleteLocalRef(re),n.deleteLocalRef(ee)}}let P=I.name,B=S.map(Y=>Y.name),$="("+B.join("")+")"+P;p.push([T,P,B,F,M===mt?iu:0]),C.push([T,$,M,I,S,D])});let R=Object.keys(m);if(R.length>0)throw new Error("Missing implementation for: "+R.join(", "));let O=Vt.fromBuffer(Jo(f),this);try{O.load()}finally{O.file.delete()}let j=this.use(e.name),N=L.length;if(N>0){let T=3*_t,v=Memory.alloc(N*T),M=[],I=[];C.forEach(([D,P,B,$,Y,ae],X)=>{let ie=Memory.allocUtf8String(D),ee=Memory.allocUtf8String(P),re=si(D,j,B,$,Y,ae);v.add(X*T).writePointer(ie),v.add(X*T+_t).writePointer(ee),v.add(X*T+2*_t).writePointer(re),I.push(ie,ee),M.push(re)});let S=j.$borrowClassHandle(n);r.push(S);let F=S.value;n.registerNatives(F,v,N),n.throwIfExceptionPending(),j.$nativeMethods=M}return j}finally{r.forEach(o=>{o.unref(n)})}}choose(e,n){let r=G.getEnv(),{flavor:o}=Q;if(o==="jvm")this._chooseObjectsJvm(e,r,n);else if(o==="art"){let i=Q["art::gc::Heap::VisitObjects"]===void 0;if(i&&Q["art::gc::Heap::GetInstances"]===void 0)return this._chooseObjectsJvm(e,r,n);ye(G,r,s=>{i?this._chooseObjectsArtPreA12(e,r,s,n):this._chooseObjectsArtLegacy(e,r,s,n)})}else this._chooseObjectsDalvik(e,r,n)}_chooseObjectsJvm(e,n,r){let o=this.use(e),{jvmti:i}=Q,s=1,c=3,a=o.$borrowClassHandle(n),l=int64(a.value.toString());try{let d=new NativeCallback((b,E,L,C)=>(L.writeS64(l),s),"int",["int64","int64","pointer","pointer"]);i.iterateOverInstancesOfClass(a.value,c,d,a.value);let p=Memory.alloc(8);p.writeS64(l);let f=Memory.alloc(ou),u=Memory.alloc(_t);i.getObjectsWithTags(1,p,f,u,NULL);let _=f.readS32(),h=u.readPointer(),m=[];for(let b=0;b!==_;b++)m.push(h.add(b*_t).readPointer());i.deallocate(h);try{for(let b of m){let E=this.cast(b,o);if(r.onMatch(E)==="stop")break}r.onComplete()}finally{m.forEach(b=>{n.deleteLocalRef(b)})}}finally{a.unref(n)}}_chooseObjectsArtPreA12(e,n,r,o){let i=this.use(e),s=lt.$new(r,G),c,a=i.$borrowClassHandle(n);try{let f=Q["art::JavaVMExt::DecodeGlobal"](Q.vm,r,a.value);c=s.newHandle(f)}finally{a.unref(n)}let l=0,d=ct.$new();Q["art::gc::Heap::GetInstances"](Q.artHeap,s,c,l,d);let p=d.handles.map(f=>n.newGlobalRef(f));d.$delete(),s.$delete();try{for(let f of p){let u=this.cast(f,i);if(o.onMatch(u)==="stop")break}o.onComplete()}finally{p.forEach(f=>{n.deleteGlobalRef(f)})}}_chooseObjectsArtLegacy(e,n,r,o){let i=this.use(e),s=[],c=Q["art::JavaVMExt::AddGlobalRef"],a=Q.vm,l,d=i.$borrowClassHandle(n);try{l=Q["art::JavaVMExt::DecodeGlobal"](a,r,d.value).toInt32()}finally{d.unref(n)}let p=tr(l,f=>{s.push(c(a,r,f))});Q["art::gc::Heap::VisitObjects"](Q.artHeap,p,NULL);try{for(let f of s){let u=this.cast(f,i);if(o.onMatch(u)==="stop")break}}finally{s.forEach(f=>{n.deleteGlobalRef(f)})}o.onComplete()}_chooseObjectsDalvik(e,n,r){let o=this.use(e);if(Q.addLocalReference===null){let s=Process.getModuleByName("libdvm.so"),c;switch(Process.arch){case"arm":c="2d e9 f0 41 05 46 15 4e 0c 46 7e 44 11 b3 43 68";break;case"ia32":c="8d 64 24 d4 89 5c 24 1c 89 74 24 20 e8 ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? 85 d2";break}Memory.scan(s.base,s.size,c,{onMatch:(a,l)=>{let d;if(Process.arch==="arm")a=a.or(1),d=new NativeFunction(a,"pointer",["pointer","pointer"]);else{let p=Memory.alloc(Process.pageSize);Memory.patchCode(p,16,f=>{let u=new X86Writer(f,{pc:p});u.putMovRegRegOffsetPtr("eax","esp",4),u.putMovRegRegOffsetPtr("edx","esp",8),u.putJmpAddress(a),u.flush()}),d=new NativeFunction(p,"pointer",["pointer","pointer"]),d._thunk=p}return Q.addLocalReference=d,G.perform(p=>{i(this,p)}),"stop"},onError(a){},onComplete(){Q.addLocalReference===null&&r.onComplete()}})}else i(this,n);function i(s,c){let{DVM_JNI_ENV_OFFSET_SELF:a}=Ft,l=c.handle.add(a).readPointer(),d,p=o.$borrowClassHandle(c);try{d=Q.dvmDecodeIndirectRef(l,p.value)}finally{p.unref(c)}let f=d.toMatchPattern(),u=Q.dvmHeapSourceGetBase(),h=Q.dvmHeapSourceGetLimit().sub(u).toInt32();Memory.scan(u,h,f,{onMatch:(m,b)=>{Q.dvmIsValidObject(m)&&G.perform(E=>{let L=E.handle.add(a).readPointer(),C,R=Q.addLocalReference(L,m);try{C=s.cast(R,o)}finally{E.deleteLocalRef(R)}if(r.onMatch(C)==="stop")return"stop"})},onError(m){},onComplete(){r.onComplete()}})}}openClassFile(e){return new Vt(e,null,this)}_getType(e,n=!0){return dr(e,n,this)}};function su(){return function(t,e,n,r){return Er.call(this,t,e,n,r)}}function Er(t,e,n,r=!0){if(t!==null)if(r){let o=n.newGlobalRef(t);this.$h=o,this.$r=Script.bindWeak(this,G.makeHandleDestructor(o))}else this.$h=t,this.$r=null;else this.$h=null,this.$r=null;return this.$t=e,new Proxy(this,ni)}ni={has(t,e){return e in t?!0:t.$has(e)},get(t,e,n){if(typeof e!="string"||e.startsWith("$")||e==="class")return t[e];let r=t.$find(e);return r!==null?r(n):t[e]},set(t,e,n,r){return t[e]=n,!0},ownKeys(t){return t.$list()},getOwnPropertyDescriptor(t,e){return Object.prototype.hasOwnProperty.call(t,e)?Object.getOwnPropertyDescriptor(t,e):{writable:!1,configurable:!0,enumerable:!0}}};Object.defineProperties(Er.prototype,{[Symbol.for("new")]:{enumerable:!1,get(){return this.$getCtor("allocAndInit")}},$new:{enumerable:!0,get(){return this[Symbol.for("new")]}},[Symbol.for("alloc")]:{enumerable:!1,value(){let t=G.getEnv(),e=this.$borrowClassHandle(t);try{let n=t.allocObject(e.value);return this.$f.cast(n,this)}finally{e.unref(t)}}},$alloc:{enumerable:!0,get(){return this[Symbol.for("alloc")]}},[Symbol.for("init")]:{enumerable:!1,get(){return this.$getCtor("initOnly")}},$init:{enumerable:!0,get(){return this[Symbol.for("init")]}},[Symbol.for("dispose")]:{enumerable:!1,value(){let t=this.$r;t!==null&&(this.$r=null,Script.unbindWeak(t)),this.$h!==null&&(this.$h=void 0)}},$dispose:{enumerable:!0,get(){return this[Symbol.for("dispose")]}},[Symbol.for("clone")]:{enumerable:!1,value(t){let e=this.$C;return new e(this.$h,this.$t,t)}},$clone:{value(t){return this[Symbol.for("clone")](t)}},[Symbol.for("class")]:{enumerable:!1,get(){let t=G.getEnv(),e=this.$borrowClassHandle(t);try{let n=this.$f;return n.cast(e.value,n.use("java.lang.Class"))}finally{e.unref(t)}}},class:{enumerable:!0,get(){return this[Symbol.for("class")]}},[Symbol.for("className")]:{enumerable:!1,get(){let t=this.$h;return t===null?this.$n:G.getEnv().getObjectClassName(t)}},$className:{enumerable:!0,get(){return this[Symbol.for("className")]}},[Symbol.for("ownMembers")]:{enumerable:!1,get(){return this.$l.list()}},$ownMembers:{enumerable:!0,get(){return this[Symbol.for("ownMembers")]}},[Symbol.for("super")]:{enumerable:!1,get(){let t=G.getEnv(),e=this.$s.$C;return new e(this.$h,ei,t)}},$super:{enumerable:!0,get(){return this[Symbol.for("super")]}},[Symbol.for("s")]:{enumerable:!1,get(){let t=Object.getPrototypeOf(this),e=t.$_s;if(e===void 0){let n=G.getEnv(),r=this.$borrowClassHandle(n);try{let o=n.getSuperclass(r.value);if(o.isNull())e=null;else try{let i=n.getClassName(o),s=t.$f;if(e=s._getUsedClass(i),e===void 0)try{let c=du(this);e=s._make(i,c,n)}finally{s._setUsedClass(i,e)}}finally{n.deleteLocalRef(o)}}finally{r.unref(n)}t.$_s=e}return e}},$s:{get(){return this[Symbol.for("s")]}},[Symbol.for("isSameObject")]:{enumerable:!1,value(t){return G.getEnv().isSameObject(t.$h,this.$h)}},$isSameObject:{value(t){return this[Symbol.for("isSameObject")](t)}},[Symbol.for("getCtor")]:{enumerable:!1,value(t){let e=this.$c,n=e[0];if(n===null){let r=G.getEnv(),o=this.$borrowClassHandle(r);try{n=uu(o.value,this.$w,r),e[0]=n}finally{o.unref(r)}}return n[t]}},$getCtor:{value(t){return this[Symbol.for("getCtor")](t)}},[Symbol.for("borrowClassHandle")]:{enumerable:!1,value(t){let e=this.$n,n=this.$f._classHandles,r=n.get(e);return r===void 0&&(r=new vr(this.$gch(t),t),n.set(e,r,t)),r.ref()}},$borrowClassHandle:{value(t){return this[Symbol.for("borrowClassHandle")](t)}},[Symbol.for("copyClassHandle")]:{enumerable:!1,value(t){let e=this.$borrowClassHandle(t);try{return t.newLocalRef(e.value)}finally{e.unref(t)}}},$copyClassHandle:{value(t){return this[Symbol.for("copyClassHandle")](t)}},[Symbol.for("getHandle")]:{enumerable:!1,value(t){let e=this.$h;if(e===void 0)throw new Error("Wrapper is disposed; perhaps it was borrowed from a hook instead of calling Java.retain() to make a long-lived wrapper?");return e}},$getHandle:{value(t){return this[Symbol.for("getHandle")](t)}},[Symbol.for("list")]:{enumerable:!1,value(){let t=this.$s,e=t!==null?t.$list():[],n=this.$l;return Array.from(new Set(e.concat(n.list())))}},$list:{get(){return this[Symbol.for("list")]}},[Symbol.for("has")]:{enumerable:!1,value(t){if(this.$m.has(t)||this.$l.has(t))return!0;let r=this.$s;return!!(r!==null&&r.$has(t))}},$has:{value(t){return this[Symbol.for("has")](t)}},[Symbol.for("find")]:{enumerable:!1,value(t){let e=this.$m,n=e.get(t);if(n!==void 0)return n;let o=this.$l.find(t);if(o!==null){let s=G.getEnv(),c=this.$borrowClassHandle(s);try{n=pu(t,o,c.value,this.$w,s)}finally{c.unref(s)}return e.set(t,n),n}let i=this.$s;return i!==null?i.$find(t):null}},$find:{value(t){return this[Symbol.for("find")](t)}},[Symbol.for("toJSON")]:{enumerable:!1,value(){let t=this.$n;if(this.$h===null)return`<class: ${t}>`;let n=this.$className;return t===n?`<instance: ${t}>`:`<instance: ${t}, $className: ${n}>`}},toJSON:{get(){return this[Symbol.for("toJSON")]}}});function vr(t,e){this.value=e.newGlobalRef(t),e.deleteLocalRef(t),this.refs=1}vr.prototype.ref=function(){return this.refs++,this};vr.prototype.unref=function(t){--this.refs===0&&t.deleteGlobalRef(this.value)};function au(t,e){t.unref(e)}function cu(t){let e=t.replace(/\./g,"/");return function(n){let r=zt();ci(r);try{return n.findClass(e)}finally{li(r)}}}function lu(t,e,n){return fr===null&&(Ko=n.vaMethod("pointer",["pointer"]),fr=e.loadClass.overload("java.lang.String").handle),n=null,function(r){let o=r.newStringUtf(t),i=zt();ci(i);try{let s=Ko(r.handle,e.$h,fr,o);return r.throwIfExceptionPending(),s}finally{li(i),r.deleteLocalRef(o)}}}function du(t){return function(e){let n=t.$borrowClassHandle(e);try{return e.getSuperclass(n.value)}finally{n.unref(e)}}}function uu(t,e,n){let{$n:r,$f:o}=e,i=Tu(r),s=n.javaLangClass(),c=n.javaLangReflectConstructor(),a=n.vaMethod("pointer",[]),l=n.vaMethod("uint8",[]),d=[],p=[],f=o._getType(r,!1),u=o._getType("void",!1),_=a(n.handle,t,s.getDeclaredConstructors);try{let h=n.getArrayLength(_);if(h!==0)for(let m=0;m!==h;m++){let b,E,L=n.getObjectArrayElement(_,m);try{b=n.fromReflectedMethod(L),E=a(n.handle,L,c.getGenericParameterTypes)}finally{n.deleteLocalRef(L)}let C;try{C=yr(n,E).map(R=>o._getType(R))}finally{n.deleteLocalRef(E)}d.push(Ke(i,e,hr,b,f,C,n)),p.push(Ke(i,e,ke,b,u,C,n))}else{if(l(n.handle,t,s.isInterface))throw new Error("cannot instantiate an interface");let b=n.javaLangObject(),E=n.getMethodId(b,"<init>","()V");d.push(Ke(i,e,hr,E,f,[],n)),p.push(Ke(i,e,ke,E,u,[],n))}}finally{n.deleteLocalRef(_)}if(p.length===0)throw new Error("no supported overloads");return{allocAndInit:mr(d),initOnly:mr(p)}}function pu(t,e,n,r,o){return e.startsWith("m")?fu(t,e,n,r,o):Su(t,e,n,r,o)}function fu(t,e,n,r,o){let{$f:i}=r,s=e.split(":").slice(1),c=o.javaLangReflectMethod(),a=o.vaMethod("pointer",[]),l=o.vaMethod("uint8",[]),d=s.map(f=>{let u=f[0]==="s"?mt:ke,_=ptr(f.substr(1)),h,m=[],b=o.toReflectedMethod(n,_,u===mt?1:0);try{let E=!!l(o.handle,b,c.isVarArgs),L=a(o.handle,b,c.getGenericReturnType);o.throwIfExceptionPending();try{h=i._getType(o.getTypeName(L))}finally{o.deleteLocalRef(L)}let C=a(o.handle,b,c.getParameterTypes);try{let R=o.getArrayLength(C);for(let O=0;O!==R;O++){let j=o.getObjectArrayElement(C,O),N;try{N=E&&O===R-1?o.getArrayTypeName(j):o.getTypeName(j)}finally{o.deleteLocalRef(j)}let T=i._getType(N);m.push(T)}}finally{o.deleteLocalRef(C)}}catch{return null}finally{o.deleteLocalRef(b)}return Ke(t,r,u,_,h,m,o)}).filter(f=>f!==null);if(d.length===0)throw new Error("No supported overloads");t==="valueOf"&&yu(d);let p=mr(d);return function(f){return p}}function mr(t){let e=hu();return Object.setPrototypeOf(e,ri),e._o=t,e}function hu(){let t=function(){return t.invoke(this,arguments)};return t}ri=Object.create(Function.prototype,{overloads:{enumerable:!0,get(){return this._o}},overload:{value(...t){let e=this._o,n=t.length,r=t.join(":");for(let o=0;o!==e.length;o++){let i=e[o],{argumentTypes:s}=i;if(s.length!==n)continue;if(s.map(a=>a.className).join(":")===r)return i}gr(this.methodName,this.overloads,"specified argument types do not match any of:")}},methodName:{enumerable:!0,get(){return this._o[0].methodName}},holder:{enumerable:!0,get(){return this._o[0].holder}},type:{enumerable:!0,get(){return this._o[0].type}},handle:{enumerable:!0,get(){return Ve(this),this._o[0].handle}},implementation:{enumerable:!0,get(){return Ve(this),this._o[0].implementation},set(t){Ve(this),this._o[0].implementation=t}},returnType:{enumerable:!0,get(){return Ve(this),this._o[0].returnType}},argumentTypes:{enumerable:!0,get(){return Ve(this),this._o[0].argumentTypes}},canInvokeWith:{enumerable:!0,get(t){return Ve(this),this._o[0].canInvokeWith}},clone:{enumerable:!0,value(t){return Ve(this),this._o[0].clone(t)}},invoke:{value(t,e){let n=this._o,r=t.$h!==null;for(let o=0;o!==n.length;o++){let i=n[o];if(i.canInvokeWith(e)){if(i.type===ke&&!r){let s=this.methodName;if(s==="toString")return`<class: ${t.$n}>`;throw new Error(s+": cannot call instance method without an instance")}return i.apply(t,e)}}if(this.methodName==="toString")return`<class: ${t.$n}>`;gr(this.methodName,this.overloads,"argument types do not match any of:")}}});function Qo(t,e,n){return`${e.className} ${t}(${n.map(r=>r.className).join(", ")})`}function Ve(t){let e=t._o;e.length>1&&gr(e[0].methodName,e,"has more than one overload, use .overload(<signature>) to choose from:")}function gr(t,e,n){let o=e.slice().sort((i,s)=>i.argumentTypes.length-s.argumentTypes.length).map(i=>i.argumentTypes.length>0?".overload('"+i.argumentTypes.map(c=>c.className).join("', '")+"')":".overload()");throw new Error(`${t}(): ${n}
	${o.join(`
	`)}`)}function Ke(t,e,n,r,o,i,s,c){let a=o.type,l=i.map(f=>f.type);s===null&&(s=G.getEnv());let d,p;return n===ke?(d=s.vaMethod(a,l,c),p=s.nonvirtualVaMethod(a,l,c)):n===mt?(d=s.staticVaMethod(a,l,c),p=d):(d=s.constructor(l,c),p=d),_u([t,e,n,r,o,i,d,p])}function _u(t){let e=mu();return Object.setPrototypeOf(e,oi),e._p=t,e}function mu(){let t=function(){return t.invoke(this,arguments)};return t}oi=Object.create(Function.prototype,{methodName:{enumerable:!0,get(){return this._p[0]}},holder:{enumerable:!0,get(){return this._p[1]}},type:{enumerable:!0,get(){return this._p[2]}},handle:{enumerable:!0,get(){return this._p[3]}},implementation:{enumerable:!0,get(){let t=this._r;return t!==void 0?t:null},set(t){let e=this._p,n=e[1];if(e[2]===hr)throw new Error("Reimplementing $new is not possible; replace implementation of $init instead");let o=this._r;if(o!==void 0&&(n.$f._patchedMethods.delete(this),o._m.revert(G),this._r=void 0),t!==null){let[i,s,c,a,l,d]=e,p=si(i,s,c,l,d,t,this),f=Xo(a);p._m=f,this._r=p,f.replace(p,c===ke,d,G,Q),n.$f._patchedMethods.add(this)}}},returnType:{enumerable:!0,get(){return this._p[4]}},argumentTypes:{enumerable:!0,get(){return this._p[5]}},canInvokeWith:{enumerable:!0,value(t){let e=this._p[5];return t.length!==e.length?!1:e.every((n,r)=>n.isCompatible(t[r]))}},clone:{enumerable:!0,value(t){let e=this._p.slice(0,6);return Ke(...e,null,t)}},invoke:{value(t,e){let n=G.getEnv(),r=this._p,o=r[2],i=r[4],s=r[5],c=this._r,a=o===ke,l=e.length,d=2+l;n.pushLocalFrame(d);let p=null;try{let f;a?f=t.$getHandle():(p=t.$borrowClassHandle(n),f=p.value);let u,_=t.$t;c===void 0?u=r[3]:(u=c._m.resolveTarget(t,a,n,Q),ti&&c._c.has(zt())&&(_=ei));let h=[n.handle,f,u];for(let E=0;E!==l;E++)h.push(s[E].toJni(e[E],n));let m;_===Bt?m=r[6]:(m=r[7],a&&h.splice(2,0,t.$copyClassHandle(n)));let b=m.apply(null,h);return n.throwIfExceptionPending(),i.fromJni(b,n,!0)}finally{p!==null&&p.unref(n),n.popLocalFrame(NULL)}}},toString:{enumerable:!0,value(){return`function ${this.methodName}(${this.argumentTypes.map(t=>t.className).join(", ")}): ${this.returnType.className}`}}});function si(t,e,n,r,o,i,s=null){let c=new Set,a=gu([t,e,n,r,o,i,s,c]),l=new NativeCallback(a,r.type,["pointer","pointer"].concat(o.map(d=>d.type)));return l._c=c,l}function gu(t){return function(){return bu(arguments,t)}}function bu(t,e){let n=new y(t[0],G),[r,o,i,s,c,a,l,d]=e,p=[],f;if(i===ke){let h=o.$C;f=new h(t[1],Bt,n,!1)}else f=o;let u=zt();n.pushLocalFrame(3);let _=!0;G.link(u,n);try{d.add(u);let h;l===null||!Qe.has(u)?h=a:h=l;let m=[],b=t.length-2;for(let C=0;C!==b;C++){let O=c[C].fromJni(t[2+C],n,!1);m.push(O),p.push(O)}let E=h.apply(f,m);if(!s.isCompatible(E))throw new Error(`Implementation for ${r} expected return value compatible with ${s.className}`);let L=s.toJni(E,n);return s.type==="pointer"&&(L=n.popLocalFrame(L),_=!1,p.push(E)),L}catch(h){let m=h.$h;return m!==void 0?n.throw(m):Script.nextTick(()=>{throw h}),s.defaultValue}finally{G.unlink(u),_&&n.popLocalFrame(NULL),d.delete(u),p.forEach(h=>{if(h===null)return;let m=h.$dispose;m!==void 0&&m.call(h)})}}function yu(t){let{holder:e,type:n}=t[0];t.some(o=>o.type===n&&o.argumentTypes.length===0)||t.push(Eu([e,n]))}function Eu(t){let e=vu();return Object.setPrototypeOf(e,ii),e._p=t,e}function vu(){return function(){return this}}ii=Object.create(Function.prototype,{methodName:{enumerable:!0,get(){return"valueOf"}},holder:{enumerable:!0,get(){return this._p[0]}},type:{enumerable:!0,get(){return this._p[1]}},handle:{enumerable:!0,get(){return NULL}},implementation:{enumerable:!0,get(){return null},set(t){}},returnType:{enumerable:!0,get(){let t=this.holder;return t.$f.use(t.$n)}},argumentTypes:{enumerable:!0,get(){return[]}},canInvokeWith:{enumerable:!0,value(t){return t.length===0}},clone:{enumerable:!0,value(t){throw new Error("Invalid operation")}}});function Su(t,e,n,r,o){let i=e[2]==="s"?pr:_r,s=ptr(e.substr(3)),{$f:c}=r,a,l=o.toReflectedField(n,s,i===pr?1:0);try{a=o.vaMethod("pointer",[])(o.handle,l,o.javaLangReflectField().getGenericType),o.throwIfExceptionPending()}finally{o.deleteLocalRef(l)}let d;try{d=c._getType(o.getTypeName(a))}finally{o.deleteLocalRef(a)}let p,f,u=d.type;return i===pr?(p=o.getStaticField(u),f=o.setStaticField(u)):(p=o.getField(u),f=o.setField(u)),wu([i,d,s,p,f])}function wu(t){return function(e){return new ai([e].concat(t))}}function ai(t){this._p=t}Object.defineProperties(ai.prototype,{value:{enumerable:!0,get(){let[t,e,n,r,o]=this._p,i=G.getEnv();i.pushLocalFrame(4);let s=null;try{let c;if(e===_r){if(c=t.$getHandle(),c===null)throw new Error("Cannot access an instance field without an instance")}else s=t.$borrowClassHandle(i),c=s.value;let a=o(i.handle,c,r);return i.throwIfExceptionPending(),n.fromJni(a,i,!0)}finally{s!==null&&s.unref(i),i.popLocalFrame(NULL)}},set(t){let[e,n,r,o,,i]=this._p,s=G.getEnv();s.pushLocalFrame(4);let c=null;try{let a;if(n===_r){if(a=e.$getHandle(),a===null)throw new Error("Cannot access an instance field without an instance")}else c=e.$borrowClassHandle(s),a=c.value;if(!r.isCompatible(t))throw new Error(`Expected value compatible with ${r.className}`);let l=r.toJni(t,s);i(s.handle,a,o,l),s.throwIfExceptionPending()}finally{c!==null&&c.unref(s),s.popLocalFrame(NULL)}}},holder:{enumerable:!0,get(){return this._p[0]}},fieldType:{enumerable:!0,get(){return this._p[1]}},fieldReturnType:{enumerable:!0,get(){return this._p[2]}},toString:{enumerable:!0,value(){let t=`Java.Field{holder: ${this.holder}, fieldType: ${this.fieldType}, fieldReturnType: ${this.fieldReturnType}, value: ${this.value}}`;return t.length<200?t:`Java.Field{
	holder: ${this.holder},
	fieldType: ${this.fieldType},
	fieldReturnType: ${this.fieldReturnType},
	value: ${this.value},
}`.split(`
`).map(n=>n.length>200?n.slice(0,n.indexOf(" ")+1)+"...,":n).join(`
`)}}});var Vt=class t{static fromBuffer(e,n){let r=Yo(n),o=r.getCanonicalPath().toString(),i=new File(o,"w");return i.write(e.buffer),i.close(),Iu(o,n),new t(o,r,n)}constructor(e,n,r){this.path=e,this.file=n,this._factory=r}load(){let{_factory:e}=this,{codeCacheDir:n}=e,r=e.use("dalvik.system.DexClassLoader"),o=e.use("java.io.File"),i=this.file;if(i===null&&(i=e.use("java.io.File").$new(this.path)),!i.exists())throw new Error("File not found");o.$new(n).mkdirs(),e.loader=r.$new(i.getCanonicalPath(),n,null,e.loader),G.preventDetachDueToClassLoader()}getClassNames(){let{_factory:e}=this,n=e.use("dalvik.system.DexFile"),r=Yo(e),o=n.loadDex(this.path,r.getCanonicalPath(),0),i=[],s=o.entries();for(;s.hasMoreElements();)i.push(s.nextElement().toString());return i}};function Yo(t){let{cacheDir:e,tempFileNaming:n}=t,r=t.use("java.io.File"),o=r.$new(e);return o.mkdirs(),r.createTempFile(n.prefix,n.suffix+".dex",o)}function Iu(t,e){e.use("java.io.File").$new(t).setWritable(!1,!1)}function Cu(){switch(ue.state){case"empty":{ue.state="pending";let t=ue.factories[0],e=t.use("java.util.HashMap"),n=t.use("java.lang.Integer");ue.loaders=e.$new(),ue.Integer=n;let r=t.loader;return r!==null&&br(t,r),ue.state="ready",ue}case"pending":do Thread.sleep(.05);while(ue.state==="pending");return ue;case"ready":return ue}}function br(t,e){let{factories:n,loaders:r,Integer:o}=ue,i=o.$new(n.indexOf(t));r.put(e,i);for(let s=e.getParent();s!==null&&!r.containsKey(s);s=s.getParent())r.put(s,i)}function ci(t){let e=Qe.get(t);e===void 0&&(e=0),e++,Qe.set(t,e)}function li(t){let e=Qe.get(t);if(e===void 0)throw new Error(`Thread ${t} is not ignored`);e--,e===0?Qe.delete(t):Qe.set(t,e)}function Tu(t){return t.slice(t.lastIndexOf(".")+1)}function yr(t,e){let n=[],r=t.getArrayLength(e);for(let o=0;o!==r;o++){let i=t.getObjectArrayElement(e,o);try{n.push(t.getTypeName(i))}finally{t.deleteLocalRef(i)}}return n}function Au(t){let e=t.split(".");return e[e.length-1]+".java"}var Lu=4,di=Process.pointerSize,Sr=class{ACC_PUBLIC=1;ACC_PRIVATE=2;ACC_PROTECTED=4;ACC_STATIC=8;ACC_FINAL=16;ACC_SYNCHRONIZED=32;ACC_BRIDGE=64;ACC_VARARGS=128;ACC_NATIVE=256;ACC_ABSTRACT=1024;ACC_STRICT=2048;ACC_SYNTHETIC=4096;constructor(){this.classFactory=null,this.ClassFactory=Oe,this.vm=null,this.api=null,this._initialized=!1,this._apiError=null,this._wakeupHandler=null,this._pollListener=null,this._pendingMainOps=[],this._pendingVmOps=[],this._cachedIsAppProcess=null;try{this._tryInitialize()}catch{}}_tryInitialize(){if(this._initialized)return!0;if(this._apiError!==null)throw this._apiError;let e;try{e=pt(),this.api=e}catch(r){throw this._apiError=r,r}if(e===null)return!1;let n=new Ie(e);return this.vm=n,$o(n),Oe._initialize(n,e),this.classFactory=new Oe,this._initialized=!0,!0}_dispose(){if(this.api===null)return;let{vm:e}=this;e.perform(n=>{Oe._disposeAll(n),y.dispose(n)}),Script.nextTick(()=>{Ie.dispose(e)})}get available(){return this._tryInitialize()}get androidVersion(){return dt()}synchronized(e,n){let{$h:r=e}=e;if(!(r instanceof NativePointer))throw new Error("Java.synchronized: the first argument `obj` must be either a pointer or a Java instance");let o=this.vm.getEnv();de("VM::MonitorEnter",o.monitorEnter(r));try{n()}finally{o.monitorExit(r)}}enumerateLoadedClasses(e){this._checkAvailable();let{flavor:n}=this.api;n==="jvm"?this._enumerateLoadedClassesJvm(e):n==="art"?this._enumerateLoadedClassesArt(e):this._enumerateLoadedClassesDalvik(e)}enumerateLoadedClassesSync(){let e=[];return this.enumerateLoadedClasses({onMatch(n){e.push(n)},onComplete(){}}),e}enumerateClassLoaders(e){this._checkAvailable();let{flavor:n}=this.api;if(n==="jvm")this._enumerateClassLoadersJvm(e);else if(n==="art")this._enumerateClassLoadersArt(e);else throw new Error("Enumerating class loaders is not supported on Dalvik")}enumerateClassLoadersSync(){let e=[];return this.enumerateClassLoaders({onMatch(n){e.push(n)},onComplete(){}}),e}_enumerateLoadedClassesJvm(e){let{api:n,vm:r}=this,{jvmti:o}=n,i=r.getEnv(),s=Memory.alloc(Lu),c=Memory.alloc(di);o.getLoadedClasses(s,c);let a=s.readS32(),l=c.readPointer(),d=[];for(let p=0;p!==a;p++)d.push(l.add(p*di).readPointer());o.deallocate(l);try{for(let p of d){let f=i.getClassName(p);e.onMatch(f,p)}e.onComplete()}finally{d.forEach(p=>{i.deleteLocalRef(p)})}}_enumerateClassLoadersJvm(e){this.choose("java.lang.ClassLoader",e)}_enumerateLoadedClassesArt(e){let{vm:n,api:r}=this,o=n.getEnv(),i=r["art::JavaVMExt::AddGlobalRef"],{vm:s}=r;ye(n,o,c=>{let a=Hn(l=>{let d=i(s,c,l);try{let p=o.getClassName(d);e.onMatch(p,d)}finally{o.deleteGlobalRef(d)}return!0});r["art::ClassLinker::VisitClasses"](r.artClassLinker.address,a)}),e.onComplete()}_enumerateClassLoadersArt(e){let{classFactory:n,vm:r,api:o}=this,i=r.getEnv(),s=o["art::ClassLinker::VisitClassLoaders"];if(s===void 0)throw new Error("This API is only available on Android >= 7.0");let c=n.use("java.lang.ClassLoader"),a=[],l=o["art::JavaVMExt::AddGlobalRef"],{vm:d}=o;ye(r,i,p=>{let f=Zn(u=>(a.push(l(d,p,u)),!0));$n(()=>{s(o.artClassLinker.address,f)})});try{a.forEach(p=>{let f=n.cast(p,c);e.onMatch(f)})}finally{a.forEach(p=>{i.deleteGlobalRef(p)})}e.onComplete()}_enumerateLoadedClassesDalvik(e){let{api:n}=this,r=ptr("0xcbcacccd"),o=172,i=8,c=n.gDvm.add(o).readPointer(),a=c.readS32(),d=c.add(12).readPointer(),p=a*i;for(let f=0;f<p;f+=i){let _=d.add(f).add(4).readPointer();if(_.isNull()||_.equals(r))continue;let m=_.add(24).readPointer().readUtf8String();if(m.startsWith("L")){let b=m.substring(1,m.length-1).replace(/\//g,".");e.onMatch(b)}}e.onComplete()}enumerateMethods(e){let{classFactory:n}=this,r=this.vm.getEnv(),o=n.use("java.lang.ClassLoader");return Ue.enumerateMethods(e,this.api,r).map(i=>{let s=i.loader;return i.loader=s!==null?n.wrap(s,o,r):null,i})}scheduleOnMainThread(e){this.performNow(()=>{this._pendingMainOps.push(e);let{_wakeupHandler:n}=this;if(n===null){let{classFactory:r}=this,o=r.use("android.os.Handler"),i=r.use("android.os.Looper");n=o.$new(i.getMainLooper()),this._wakeupHandler=n}this._pollListener===null&&(this._pollListener=Interceptor.attach(Process.getModuleByName("libc.so").getExportByName("epoll_wait"),this._makePollHook()),Interceptor.flush()),n.sendEmptyMessage(1)})}_makePollHook(){let e=Process.id,{_pendingMainOps:n}=this;return function(){if(this.threadId!==e)return;let r;for(;(r=n.shift())!==void 0;)try{r()}catch(o){Script.nextTick(()=>{throw o})}}}perform(e){if(this._checkAvailable(),!this._isAppProcess()||this.classFactory.loader!==null)try{this.vm.perform(e)}catch(n){Script.nextTick(()=>{throw n})}else this._pendingVmOps.push(e),this._pendingVmOps.length===1&&this._performPendingVmOpsWhenReady()}performNow(e){return this._checkAvailable(),this.vm.perform(()=>{let{classFactory:n}=this;if(this._isAppProcess()&&n.loader===null){let o=n.use("android.app.ActivityThread").currentApplication();o!==null&&ui(n,o)}return e()})}_performPendingVmOpsWhenReady(){this.vm.perform(()=>{let{classFactory:e}=this,n=e.use("android.app.ActivityThread"),r=n.currentApplication();if(r!==null){ui(e,r),this._performPendingVmOps();return}let o=this,i=!1,s="early",c=n.handleBindApplication;c.implementation=function(d){if(d.instrumentationName.value!==null){s="late";let f=e.use("android.app.LoadedApk").makeApplication;f.implementation=function(u,_){return i||(i=!0,pi(e,this),o._performPendingVmOps()),f.apply(this,arguments)}}c.apply(this,arguments)};let l=n.getPackageInfo.overloads.map(d=>[d.argumentTypes.length,d]).sort(([d],[p])=>p-d).map(([d,p])=>p)[0];l.implementation=function(...d){let p=l.call(this,...d);return!i&&s==="early"&&(i=!0,pi(e,p),o._performPendingVmOps()),p}})}_performPendingVmOps(){let{vm:e,_pendingVmOps:n}=this,r;for(;(r=n.shift())!==void 0;)try{e.perform(r)}catch(o){Script.nextTick(()=>{throw o})}}use(e,n){return this.classFactory.use(e,n)}openClassFile(e){return this.classFactory.openClassFile(e)}choose(e,n){this.classFactory.choose(e,n)}retain(e){return this.classFactory.retain(e)}cast(e,n){return this.classFactory.cast(e,n)}array(e,n){return this.classFactory.array(e,n)}backtrace(e){return Wn(this.vm,e)}isMainThread(){let e=this.classFactory.use("android.os.Looper"),n=e.getMainLooper(),r=e.myLooper();return r===null?!1:n.$isSameObject(r)}registerClass(e){return this.classFactory.registerClass(e)}deoptimizeEverything(){let{vm:e}=this;return Yn(e,e.getEnv())}deoptimizeBootImage(){let{vm:e}=this;return Xn(e,e.getEnv())}deoptimizeMethod(e){let{vm:n}=this;return Qn(n,n.getEnv(),e)}_checkAvailable(){if(!this.available)throw new Error("Java API not available")}_isAppProcess(){let e=this._cachedIsAppProcess;if(e===null){if(this.api.flavor==="jvm")return e=!1,this._cachedIsAppProcess=e,e;let n=new NativeFunction(Module.getGlobalExportByName("readlink"),"pointer",["pointer","pointer","pointer"],{exceptions:"propagate"}),r=Memory.allocUtf8String("/proc/self/exe"),o=1024,i=Memory.alloc(o),s=n(r,i,ptr(o)).toInt32();if(s!==-1){let c=i.readUtf8String(s);e=/^\/system\/bin\/app_process/.test(c)}else e=!0;this._cachedIsAppProcess=e}return e}};function ui(t,e){let n=t.use("android.os.Process");t.loader=e.getClassLoader(),n.myUid()===n.SYSTEM_UID.value?(t.cacheDir="/data/system",t.codeCacheDir="/data/dalvik-cache"):"getCodeCacheDir"in e?(t.cacheDir=e.getCacheDir().getCanonicalPath(),t.codeCacheDir=e.getCodeCacheDir().getCanonicalPath()):(t.cacheDir=e.getFilesDir().getCanonicalPath(),t.codeCacheDir=e.getCacheDir().getCanonicalPath())}function pi(t,e){let n=t.use("java.io.File");t.loader=e.getClassLoader();let r=n.$new(e.getDataDir()).getCanonicalPath();t.cacheDir=r,t.codeCacheDir=r+"/cache"}var wr=new Sr;Script.bindWeak(wr,()=>{wr._dispose()});var fi=wr;function Ir(t){let{pageSource:e,key:n,captureMs:r}=globalThis.IDPOCKET_CONFIG,o=S=>send(S),i=new Map,s=new Map,c=1,a,l,d,p=null,f=!1,u=!1,_=0,h=()=>Process.getCurrentThreadId&&m?m.elapsedRealtime():Date.now(),m;function b(S){try{let F=String(l.identityHashCode(S));if(!i.has(F)){if(i.size>=32){let D=i.keys().next().value;i.get(D).$dispose?.(),i.delete(D)}i.set(F,t.retain(S))}}catch{}}function E(S,F,D){let P=c++;s.set(P,D);let B=d.$new();B.callbackId.value=P;try{a.evaluateJavascript.overload("java.lang.String","android.webkit.ValueCallback").call(S,F,B)}catch($){throw s.delete(P),$}}function L(S){if(!p){S();return}t.scheduleOnMainThread(()=>{let F=!1,D=()=>{F||(F=!0,S())},P=`
        (function () {
          const k = ${JSON.stringify(n)};
          if (window[k]) window[k].active = false;
          delete window[k];
        })()
      `;try{E(p,P,D)}catch{D()}setTimeout(D,1500)})}function C(S){f||(f=!0,L(()=>o({kind:"error",code:S})))}function R(){if(!f){if(h()>=_){C("CAPTURE_TIMEOUT");return}t.scheduleOnMainThread(()=>{try{let S=`
          location.origin === 'https://digital-id.max.ru'
            ? JSON.stringify(window[${JSON.stringify(n)}] || null)
            : 'ORIGIN_CHANGED'
        `;E(p,S,F=>{if(f)return;let D;try{let P=JSON.parse(String(F));if(P==="ORIGIN_CHANGED"){C("ORIGIN_CHANGED");return}D=typeof P=="string"?JSON.parse(P):P}catch{C("CALLBACK_FORMAT_UNKNOWN");return}if(D?.status==="error"){if(D.code==="OFFICIAL_BRIDGE_NOT_READY"){setTimeout(O,300);return}C("OFFICIAL_BRIDGE_READ_FAILED");return}D?.status==="ready"?(f=!0,L(()=>o({kind:"material",material:D.material}))):setTimeout(R,250)})}catch{C("WEBVIEW_UNAVAILABLE")}})}}function O(){if(!f){if(h()>=_){C("CAPTURE_TIMEOUT");return}t.scheduleOnMainThread(()=>{try{E(p,e,()=>setTimeout(R,250))}catch{C("SNAPSHOT_START_FAILED")}})}}function j(){if(!f){if(h()>=_){C("OPEN_DIGITAL_ID_AND_UNLOCK_FIRST");return}t.scheduleOnMainThread(()=>{let S=[];for(let F of i.values())try{F.isShown()&&/^https:\/\/digital-id\.max\.ru(?:[\/#?]|$)/.test(String(F.getUrl()||""))&&S.push(F)}catch{}if(S.length>1){C("MULTIPLE_VISIBLE_DID_VIEWS");return}if(!S.length){setTimeout(N,300);return}p=S[0],o({kind:"capturing"}),O()})}}function N(){f||t.perform(()=>{try{t.choose("android.webkit.WebView",{onMatch:b,onComplete:j})}catch{j()}})}function T(){if(u){o({kind:"error",code:"ONE_CAPTURE_PER_RUN"});return}u=!0,_=h()+r,N()}function v(){recv("control",S=>{S.action==="capture"?T():S.action==="cleanup"&&(f=!0,L(()=>o({kind:"cleaned"}))),v()})}function M(S){o({kind:"error",code:"JAVA_SETUP_FAILED",description:String(S),stack:S?.stack})}function I(){try{let S=t.use("android.app.ActivityThread").currentApplication();if(!S||String(S.getPackageName())!=="ru.oneme.app"){o({kind:"error",code:"WRONG_APP_PROCESS"});return}m=t.use("android.os.SystemClock"),a=t.use("android.webkit.WebView"),l=t.use("java.lang.System"),d=t.registerClass({name:"org.idpocket.export.Callback"+Date.now(),implements:[t.use("android.webkit.ValueCallback")],fields:{callbackId:"int"},methods:{onReceiveValue:{returnType:"void",argumentTypes:["java.lang.Object"],implementation:function(B){let $=this.callbackId.value,Y=s.get($);s.delete($),Y&&Y(B)}}}});let F=a.evaluateJavascript.overload("java.lang.String","android.webkit.ValueCallback");F.implementation=function(B,$){return b(this),F.call(this,B,$)};let D=a.loadUrl.overload("java.lang.String");D.implementation=function(B){return b(this),D.call(this,B)};let P=a.addJavascriptInterface.overload("java.lang.Object","java.lang.String");P.implementation=function(B,$){return b(this),P.call(this,B,$)},v(),o({kind:"ready",uid:t.use("android.os.Process").myUid(),androidVersion:t.androidVersion})}catch(S){M(S)}}try{t.perform(I)}catch(S){M(S)}}recv("config",t=>{globalThis.IDPOCKET_CONFIG=t.config,Ir(fi)});
