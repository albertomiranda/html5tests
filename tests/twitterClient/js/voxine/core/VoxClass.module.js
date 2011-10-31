define([], function(){
    (function(){
            var sMap = null;
            if((sMap || (typeof djConfig != "undefined" && djConfig.scopeMap)) && (typeof window != "undefined")){
                    var scopeDef = "", scopePrefix = "", scopeSuffix = "", scopeMap = {}, scopeMapRev = {};
                    sMap = sMap || djConfig.scopeMap;
                    for(var i = 0; i < sMap.length; i++){
                            var newScope = sMap[i];
                            scopeDef += "var " + newScope[0] + " = {}; " + newScope[1] + " = " + newScope[0] + ";" + newScope[1] + "._scopeName = '" + newScope[1] + "';";
                            scopePrefix += (i == 0 ? "" : ",") + newScope[0];
                            scopeSuffix += (i == 0 ? "" : ",") + newScope[1];
                            scopeMap[newScope[0]] = newScope[1];
                            scopeMapRev[newScope[1]] = newScope[0];
                    }

                    eval(scopeDef + "voxo._scopeArgs = [" + scopeSuffix + "];");

                    voxo._scopePrefixArgs = scopePrefix;
                    voxo._scopePrefix = "(function(" + scopePrefix + "){";
                    voxo._scopeSuffix = "})(" + scopeSuffix + ")";
                    voxo._scopeMap = scopeMap;
                    voxo._scopeMapRev = scopeMapRev;
            }

            (function(){
                    if(typeof voxo == "undefined"){
                            voxo = {
                                    _scopeName: "voxo",
                                    _scopePrefix: "",
                                    _scopePrefixArgs: "",
                                    _scopeSuffix: "",
                                    _scopeMap: {},
                                    _scopeMapRev: {}
                            };
                    }

                    var d = voxo;

                    if(!d._scopeArgs){
                            d._scopeArgs = [voxo];
                    }

                    d.global = this;

                    d.config = {
                            isDebug: false,
                            debugAtAllCosts: false
                    };

                    var extraNames, extraLen, empty = {};
                    for(var i in {toString: 1}){ extraNames = []; break; }
                    voxo._extraNames = extraNames = extraNames || ["hasOwnProperty", "valueOf", "isPrototypeOf",
                            "propertyIsEnumerable", "toLocaleString", "toString", "constructor"];
                    extraLen = extraNames.length;

                    voxo._mixin = function(/*Object*/ target, /*Object*/ source){
                            var name, s, i;
                            for(name in source){
                                    s = source[name];
                                    if(!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))){
                                            target[name] = s;
                                    }
                            }
                            if(extraLen && source){
                                    for(i = 0; i < extraLen; ++i){
                                            name = extraNames[i];
                                            s = source[name];
                                            if(!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))){
                                                    target[name] = s;
                                            }
                                    }
                            }
                                            return target; // Object
                    }

                    voxo.mixin = function(/*Object*/obj, /*Object...*/props){
                            if(!obj){ obj = {}; }
                            for(var i=1, l=arguments.length; i<l; i++){
                                    d._mixin(obj, arguments[i]);
                            }
                            return obj; // Object
                    }

                    voxo._getProp = function(/*Array*/parts, /*Boolean*/create, /*Object*/context){
                            var obj=context || d.global;
                            for(var i=0, p; obj && (p=parts[i]); i++){
                                    if(i == 0 && d._scopeMap[p]){
                                            p = d._scopeMap[p];
                                    }
                                    obj = (p in obj ? obj[p] : (create ? obj[p]={} : undefined));
                            }
                            return obj; // mixed
                    }

                    voxo.setObject = function(/*String*/name, /*Object*/value, /*Object?*/context){
                            var parts=name.split("."), p=parts.pop(), obj=d._getProp(parts, true, context);
                            return obj && p ? (obj[p]=value) : undefined; // Object
                    }

                    voxo.getObject = function(/*String*/name, /*Boolean?*/create, /*Object?*/context){
                            return d._getProp(name.split("."), create, context); // Object
                    }

                    voxo.exists = function(/*String*/name, /*Object?*/obj){
                            return d.getObject(name, false, obj) !== undefined; // Boolean
                    }

                    d.deprecated = d.experimental = function(){};

                })();
                (function(){
                        var d = voxo;
                        d.mixin(d, {
                                _loadedModules: {},
                                _inFlightCount: 0,
                                _hasResource: {},

                                _modulePrefixes: {
                                        voxo: 	{	name: "voxo", value: "." }
                                },
                                _moduleHasPrefix: function(/*String*/module){
                                        var mp = d._modulePrefixes;
                                        return !!(mp[module] && mp[module].value); // Boolean
                                },

                                _getModulePrefix: function(/*String*/module){
                                        var mp = d._modulePrefixes;
                                        if(d._moduleHasPrefix(module)){
                                                return mp[module].value; // String
                                        }
                                        return module; // String
                                },

                                _loadedUrls: [],
                                _postLoad: false,
                                _loaders: [],
                                _unloaders: [],
                                _loadNotifying: false
                        });

                        voxo._loadPath = function(/*String*/relpath, /*String?*/module, /*Function?*/cb){
                            var uri = ((relpath.charAt(0) == '/' || relpath.match(/^\w+:/)) ? "" : d.baseUrl) + relpath;
                            try{
                                    currentModule = module;
                                    return !module ? d._loadUri(uri, cb) : d._loadUriAndCheck(uri, module, cb); // Boolean
                            }catch(e){
                                    console.error(e);
                                    return false; // Boolean
                            }finally{
                                    currentModule = null;
                            }
                        }

                        voxo._loadUri = function(/*String*/uri, /*Function?*/cb){
                                if(d._loadedUrls[uri]){
                                        return true; // Boolean
                                }
                                d._inFlightCount++; // block addOnLoad calls that arrive while we're busy downloading
                                var contents = d._getText(uri, true);
                                if(contents){ // not 404, et al
                                        d._loadedUrls[uri] = true;
                                        d._loadedUrls.push(uri);
                                        if(cb){
                                                //conditional to support script-inject i18n bundle format
                                                contents = /^define\(/.test(contents) ? contents : '('+contents+')';
                                        }else{
                                                contents = d._scopePrefix + contents + d._scopeSuffix;
                                        }
                                        if(!d.isIE){ contents += "\r\n//@ sourceURL=" + uri; } // debugging assist for Firebug
                                        var value = d["eval"](contents);
                                        if(cb){ cb(value); }
                                }
                                if(--d._inFlightCount == 0 && d._postLoad && d._loaders.length){
                                        setTimeout(function(){
                                                if(d._inFlightCount == 0){
                                                        d._callLoaded();
                                                }
                                        }, 0);
                                }
                                return !!contents; // Boolean: contents? true : false
                        }

                        voxo._loadUriAndCheck = function(/*String*/uri, /*String*/moduleName, /*Function?*/cb){
                                var ok = false;
                                try{
                                        ok = d._loadUri(uri, cb);
                                }catch(e){
                                        console.error("failed loading " + uri + " with error: " + e);
                                }
                                return !!(ok && d._loadedModules[moduleName]); // Boolean
                        }

                        voxo.loaded = function(){
                                d._loadNotifying = true;
                                d._postLoad = true;
                                var mll = d._loaders;
                                d._loaders = [];
                                for(var x = 0; x < mll.length; x++){
                                        mll[x]();
                                }
                                d._loadNotifying = false;
                                if(d._postLoad && d._inFlightCount == 0 && mll.length){
                                        d._callLoaded();
                                }
                        }

                        voxo.unloaded = function(){
                                var mll = d._unloaders;
                                while(mll.length){
                                        (mll.pop())();
                                }
                        }

                        d._onto = function(arr, obj, fn){
                                if(!fn){
                                        arr.push(obj);
                                }else if(fn){
                                        var func = (typeof fn == "string") ? obj[fn] : fn;
                                        arr.push(function(){ func.call(obj); });
                                }
                        }

                        voxo.ready = voxo.addOnLoad = function(/*Object*/obj, /*String|Function?*/functionName){
                                if(d._postLoad && d._inFlightCount == 0 && !d._loadNotifying){
                                        d._callLoaded();
                                }
                        }

                        var dca = d.config.addOnLoad;
                        if(dca){
                                d.addOnLoad[(dca instanceof Array ? "apply" : "call")](d, dca);
                        }

                        voxo._modulesLoaded = function(){
                                if(d._postLoad){ return; }
                                if(d._inFlightCount > 0){
                                        console.warn("files still in flight!");
                                        return;
                                }
                                d._callLoaded();
                        }

                        voxo._callLoaded = function(){
                                if(typeof setTimeout == "object" || (d.config.useXDomain && d.isOpera)){
                                        setTimeout(
                                                d.isAIR ? function(){ d.loaded(); } : d._scopeName + ".loaded();",
                                                0);
                                }else{
                                        d.loaded();
                                }
                        }

                        voxo._getModuleSymbols = function(/*String*/modulename){
                                var syms = modulename.split(".");
                                for(var i = syms.length; i>0; i--){
                                        var parentModule = syms.slice(0, i).join(".");
                                        if(i == 1 && !d._moduleHasPrefix(parentModule)){
                                                // Support default module directory (sibling of voxo) for top-level modules
                                                syms[0] = "../" + syms[0];
                                        }else{
                                                var parentModulePath = d._getModulePrefix(parentModule);
                                                if(parentModulePath != parentModule){
                                                        syms.splice(0, i, parentModulePath);
                                                        break;
                                                }
                                        }
                                }
                                return syms; // Array
                        }

                        voxo._global_omit_module_check = false;

                        voxo.loadInit = function(/*Function*/init){
                                init();
                        }

                        voxo._loadModule = voxo.require = function(/*String*/moduleName, /*Boolean?*/omitModuleCheck){
                                omitModuleCheck = d._global_omit_module_check || omitModuleCheck;

                                //Check if it is already loaded.
                                var module = d._loadedModules[moduleName];
                                if(module){
                                        return module;
                                }

                                // convert periods to slashes
                                var relpath = d._getModuleSymbols(moduleName).join("/") + '.js';
                                var modArg = !omitModuleCheck ? moduleName : null;
                                var ok = d._loadPath(relpath, modArg);
                                if(!ok && !omitModuleCheck){
                                        throw new Error("Could not load '" + moduleName + "'; last tried '" + relpath + "'");
                                }
                                if(!omitModuleCheck && !d._isXDomain){
                                        // pass in false so we can give better error
                                        module = d._loadedModules[moduleName];
                                        if(!module){
                                                throw new Error("symbol '" + moduleName + "' is not defined after loading '" + relpath + "'");
                                        }
                                }

                                return module;
                        }

                        voxo.provide = function(/*String*/ resourceName){
                                return (d._loadedModules[resourceName] = d.getObject(resourceName, true)); // Object
                        }

                        //Start of old bootstrap2:
                        voxo.platformRequire = function(/*Object*/modMap){
                                var result = common.concat(modMap[d._name] || modMap["default"] || []);

                                for(var x=0; x<result.length; x++){
                                        var curr = result[x];
                                        if(curr.constructor == Array){
                                                d._loadModule.apply(d, curr);
                                        }else{
                                                d._loadModule(curr);
                                        }
                                }
                        }

                        voxo.requireIf = function(/*Boolean*/ condition, /*String*/ resourceName){
                                if(condition === true){
                                        // FIXME: why do we support chained require()'s here? does the build system?
                                        var args = [];
                                        for(var i = 1; i < arguments.length; i++){
                                                args.push(arguments[i]);
                                        }
                                        d.require.apply(d, args);
                                }
                        }

                        voxo.requireAfterIf = d.requireIf;

                        voxo.registerModulePath = function(/*String*/module, /*String*/prefix){
                        };

                        var ore = new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),
                                ire = new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");

                        voxo._Url = function(/*voxo._Url|String...*/){
                                var n = null,
                                        _a = arguments,
                                        uri = [_a[0]];
                                // resolve uri components relative to each other
                                for(var i = 1; i<_a.length; i++){
                                        if(!_a[i]){ continue; }
                                        var relobj = new d._Url(_a[i]+""),
                                                uriobj = new d._Url(uri[0]+"");

                                        if(
                                                relobj.path == "" &&
                                                !relobj.scheme &&
                                                !relobj.authority &&
                                                !relobj.query
                                        ){
                                                if(relobj.fragment != n){
                                                        uriobj.fragment = relobj.fragment;
                                                }
                                                relobj = uriobj;
                                        }else if(!relobj.scheme){
                                                relobj.scheme = uriobj.scheme;

                                                if(!relobj.authority){
                                                        relobj.authority = uriobj.authority;

                                                        if(relobj.path.charAt(0) != "/"){
                                                                var path = uriobj.path.substring(0,
                                                                        uriobj.path.lastIndexOf("/") + 1) + relobj.path;

                                                                var segs = path.split("/");
                                                                for(var j = 0; j < segs.length; j++){
                                                                        if(segs[j] == "."){
                                                                                // flatten "./" references
                                                                                if(j == segs.length - 1){
                                                                                        segs[j] = "";
                                                                                }else{
                                                                                        segs.splice(j, 1);
                                                                                        j--;
                                                                                }
                                                                        }else if(j > 0 && !(j == 1 && segs[0] == "") &&
                                                                                segs[j] == ".." && segs[j-1] != ".."){
                                                                                // flatten "../" references
                                                                                if(j == (segs.length - 1)){
                                                                                        segs.splice(j, 1);
                                                                                        segs[j - 1] = "";
                                                                                }else{
                                                                                        segs.splice(j - 1, 2);
                                                                                        j -= 2;
                                                                                }
                                                                        }
                                                                }
                                                                relobj.path = segs.join("/");
                                                        }
                                                }
                                        }

                                        uri = [];
                                        if(relobj.scheme){
                                                uri.push(relobj.scheme, ":");
                                        }
                                        if(relobj.authority){
                                                uri.push("//", relobj.authority);
                                        }
                                        uri.push(relobj.path);
                                        if(relobj.query){
                                                uri.push("?", relobj.query);
                                        }
                                        if(relobj.fragment){
                                                uri.push("#", relobj.fragment);
                                        }
                                }

                                this.uri = uri.join("");

                                // break the uri into its main components
                                var r = this.uri.match(ore);

                                this.scheme = r[2] || (r[1] ? "" : n);
                                this.authority = r[4] || (r[3] ? "" : n);
                                this.path = r[5]; // can never be undefined
                                this.query = r[7] || (r[6] ? "" : n);
                                this.fragment  = r[9] || (r[8] ? "" : n);

                                if(this.authority != n){
                                        // server based naming authority
                                        r = this.authority.match(ire);

                                        this.user = r[3] || n;
                                        this.password = r[4] || n;
                                        this.host = r[6] || r[7]; // ipv6 || ipv4
                                        this.port = r[9] || n;
                                }
                        }

                        voxo._Url.prototype.toString = function(){ return this.uri; };

                        voxo.moduleUrl = function(/*String*/module, /*voxo._Url||String*/url){
                                var loc = d._getModuleSymbols(module).join('/');
                                if(!loc){ return null; }
                                if(loc.lastIndexOf("/") != loc.length-1){
                                        loc += "/";
                                }
                                var colonIndex = loc.indexOf(":");
                                if(loc.charAt(0) != "/" && (colonIndex == -1 || colonIndex > loc.indexOf("/"))){
                                        loc = d.baseUrl + loc;
                                }

                                return new d._Url(loc, url); // voxo._Url
                        };
                })();

            if(!voxo._hasResource["voxo._base.declare"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
            voxo._hasResource["voxo._base.declare"] = true;
            voxo.provide("voxo._base.declare");
            (function(){
                    var d = voxo, mix = d._mixin, op = Object.prototype, opts = op.toString,
                            xtor = new Function, counter = 0, cname = "constructor";

                    function err(msg, cls){ throw new Error("declare" + (cls ? " " + cls : "") + ": " + msg); }
                    //@declare
                    function c3mro(bases, className){
                            var result = [], roots = [{cls: 0, refs: []}], nameMap = {}, clsCount = 1,
                                    l = bases.length, i = 0, j, lin, base, top, proto, rec, name, refs;

                            // build a list of bases naming them if needed
                            for(; i < l; ++i){
                                    base = bases[i];
                                    if(!base){
                                            err("mixin #" + i + " is unknown. Did you use voxo.require to pull it in?", className);
                                    }else if(opts.call(base) != "[object Function]"){
                                            err("mixin #" + i + " is not a callable constructor.", className);
                                    }
                                    lin = base._meta ? base._meta.bases : [base];
                                    top = 0;
                                    // add bases to the name map
                                    for(j = lin.length - 1; j >= 0; --j){
                                            proto = lin[j].prototype;
                                            if(!proto.hasOwnProperty("declaredClass")){
                                                    proto.declaredClass = "uniqName_" + (counter++);
                                            }
                                            name = proto.declaredClass;
                                            if(!nameMap.hasOwnProperty(name)){
                                                    nameMap[name] = {count: 0, refs: [], cls: lin[j]};
                                                    ++clsCount;
                                            }
                                            rec = nameMap[name];
                                            if(top && top !== rec){
                                                    rec.refs.push(top);
                                                    ++top.count;
                                            }
                                            top = rec;
                                    }
                                    ++top.count;
                                    roots[0].refs.push(top);
                            }

                            // remove classes without external references recursively
                            while(roots.length){
                                    top = roots.pop();
                                    result.push(top.cls);
                                    --clsCount;
                                    // optimization: follow a single-linked chain
                                    while(refs = top.refs, refs.length == 1){
                                            top = refs[0];
                                            if(!top || --top.count){
                                                    // branch or end of chain => do not end to roots
                                                    top = 0;
                                                    break;
                                            }
                                            result.push(top.cls);
                                            --clsCount;
                                    }
                                    if(top){
                                            // branch
                                            for(i = 0, l = refs.length; i < l; ++i){
                                                    top = refs[i];
                                                    if(!--top.count){
                                                            roots.push(top);
                                                    }
                                            }
                                    }
                            }
                            if(clsCount){
                                    err("can't build consistent linearization", className);
                            }

                            // calculate the superclass offset
                            base = bases[0];
                            result[0] = base ?
                                    base._meta && base === result[result.length - base._meta.bases.length] ?
                                            base._meta.bases.length : 1 : 0;

                            return result;
                    }

                    function inherited(args, a, f){
                            var name, chains, bases, caller, meta, base, proto, opf, pos,
                                    cache = this._inherited = this._inherited || {};

                            // crack arguments
                            if(typeof args == "string"){
                                    name = args;
                                    args = a;
                                    a = f;
                            }
                            f = 0;

                            caller = args.callee;
                            name = name || caller.nom;
                            if(!name){
                                    err("can't deduce a name to call inherited()", this.declaredClass);
                            }

                            meta = this.constructor._meta;
                            bases = meta.bases;

                            pos = cache.p;
                            if(name != cname){
                                    // method
                                    if(cache.c !== caller){
                                            // cache bust
                                            pos = 0;
                                            base = bases[0];
                                            meta = base._meta;
                                            if(meta.hidden[name] !== caller){
                                                    // error detection
                                                    chains = meta.chains;
                                                    if(chains && typeof chains[name] == "string"){
                                                            err("calling chained method with inherited: " + name, this.declaredClass);
                                                    }
                                                    // find caller
                                                    do{
                                                            meta = base._meta;
                                                            proto = base.prototype;
                                                            if(meta && (proto[name] === caller && proto.hasOwnProperty(name) || meta.hidden[name] === caller)){
                                                                    break;
                                                            }
                                                    }while(base = bases[++pos]); // intentional assignment
                                                    pos = base ? pos : -1;
                                            }
                                    }
                                    // find next
                                    base = bases[++pos];
                                    if(base){
                                            proto = base.prototype;
                                            if(base._meta && proto.hasOwnProperty(name)){
                                                    f = proto[name];
                                            }else{
                                                    opf = op[name];
                                                    do{
                                                            proto = base.prototype;
                                                            f = proto[name];
                                                            if(f && (base._meta ? proto.hasOwnProperty(name) : f !== opf)){
                                                                    break;
                                                            }
                                                    }while(base = bases[++pos]); // intentional assignment
                                            }
                                    }
                                    f = base && f || op[name];
                            }else{
                                    // constructor
                                    if(cache.c !== caller){
                                            // cache bust
                                            pos = 0;
                                            meta = bases[0]._meta;
                                            if(meta && meta.ctor !== caller){
                                                    // error detection
                                                    chains = meta.chains;
                                                    if(!chains || chains.constructor !== "manual"){
                                                            err("calling chained constructor with inherited", this.declaredClass);
                                                    }
                                                    // find caller
                                                    while(base = bases[++pos]){ // intentional assignment
                                                            meta = base._meta;
                                                            if(meta && meta.ctor === caller){
                                                                    break;
                                                            }
                                                    }
                                                    pos = base ? pos : -1;
                                            }
                                    }
                                    // find next
                                    while(base = bases[++pos]){	// intentional assignment
                                            meta = base._meta;
                                            f = meta ? meta.ctor : base;
                                            if(f){
                                                    break;
                                            }
                                    }
                                    f = base && f;
                            }

                            // cache the found super method
                            cache.c = f;
                            cache.p = pos;

                            // now we have the result
                            if(f){
                                    return a === true ? f : f.apply(this, a || args);
                            }
                            // intentionally if a super method was not found
                    }

                    function getInherited(name, args){
                            if(typeof name == "string"){
                                    return this.inherited(name, args, true);
                            }
                            return this.inherited(name, true);
                    }

                    // emulation of "instanceof"
                    function isInstanceOf(cls){
                            var bases = this.constructor._meta.bases;
                            for(var i = 0, l = bases.length; i < l; ++i){
                                    if(bases[i] === cls){
                                            return true;
                                    }
                            }
                            return this instanceof cls;
                    }

                    function mixOwn(target, source){
                            var name, i = 0, l = d._extraNames.length;
                            // add props adding metadata for incoming functions skipping a constructor
                            for(name in source){
                                    if(name != cname && source.hasOwnProperty(name)){
                                            target[name] = source[name];
                                    }
                            }
                            // process unenumerable methods on IE
                            for(; i < l; ++i){
                                    name = d._extraNames[i];
                                    if(name != cname && source.hasOwnProperty(name)){
                                            target[name] = source[name];
                                    }
                            }
                    }

                    // implementation of safe mixin function
                    function safeMixin(target, source){
                            var name, t, i = 0, l = d._extraNames.length;
                            // add props adding metadata for incoming functions skipping a constructor
                            for(name in source){
                                    t = source[name];
                                    if((t !== op[name] || !(name in op)) && name != cname){
                                            if(opts.call(t) == "[object Function]"){
                                                    // non-trivial function method => attach its name
                                                    t.nom = name;
                                            }
                                            target[name] = t;
                                    }
                            }
                            // process unenumerable methods on IE
                            for(; i < l; ++i){
                                    name = d._extraNames[i];
                                    t = source[name];
                                    if((t !== op[name] || !(name in op)) && name != cname){
                                            if(opts.call(t) == "[object Function]"){
                                                    // non-trivial function method => attach its name
                                                    t.nom = name;
                                            }
                                            target[name] = t;
                                    }
                            }
                            return target;
                    }

                    function extend(source){
                            safeMixin(this.prototype, source);
                            return this;
                    }

                    //@voxo.declare()
                    function chainedConstructor(bases, ctorSpecial){
                            return function(){
                                    var a = arguments, args = a, a0 = a[0], f, i, m,
                                            l = bases.length, preArgs;

                                    if(!(this instanceof a.callee)){
                                            // not called via new, so force it
                                            return applyNew(a);
                                    }
                                    if(ctorSpecial && (a0 && a0.preamble || this.preamble)){
                                            // full blown ritual
                                            preArgs = new Array(bases.length);
                                            // prepare parameters
                                            preArgs[0] = a;
                                            for(i = 0;;){
                                                    // process the preamble of the 1st argument
                                                    a0 = a[0];
                                                    if(a0){
                                                            f = a0.preamble;
                                                            if(f){
                                                                    a = f.apply(this, a) || a;
                                                            }
                                                    }
                                                    // process the preamble of this class
                                                    f = bases[i].prototype;
                                                    f = f.hasOwnProperty("preamble") && f.preamble;
                                                    if(f){
                                                            a = f.apply(this, a) || a;
                                                    }
                                                    if(++i == l){
                                                            break;
                                                    }
                                                    preArgs[i] = a;
                                            }
                                    }
                                    // 2) call all non-trivial constructors using prepared arguments
                                    for(i = l - 1; i >= 0; --i){
                                            f = bases[i];
                                            m = f._meta;
                                            f = m ? m.ctor : f;
                                            if(f){
                                                    f.apply(this, preArgs ? preArgs[i] : a);
                                            }
                                    }
                                    // 3) continue the original ritual: call the postscript
                                    f = this.postscript;
                                    if(f){
                                            f.apply(this, args);
                                    }
                            };
                    }


                    // chained constructor compatible with the legacy voxo.declare()
                    function singleConstructor(ctor, ctorSpecial){
                            return function(){
                                    var a = arguments, t = a, a0 = a[0], f;

                                    if(!(this instanceof a.callee)){
                                            // not called via new, so force it
                                            return applyNew(a);
                                    }
                                    if(ctorSpecial){
                                            // full blown ritual
                                            if(a0){
                                                    // process the preamble of the 1st argument
                                                    f = a0.preamble;
                                                    if(f){
                                                            t = f.apply(this, t) || t;
                                                    }
                                            }
                                            f = this.preamble;
                                            if(f){
                                                    // process the preamble of this class
                                                    f.apply(this, t);
                                            }
                                    }
                                    // 2) call a constructor
                                    if(ctor){
                                            ctor.apply(this, a);
                                    }
                                    // 3) continue the original ritual: call the postscript
                                    f = this.postscript;
                                    if(f){
                                            f.apply(this, a);
                                    }
                            };
                    }

                    // plain vanilla constructor (can use inherited() to call its base constructor)
                    function simpleConstructor(bases){
                            return function(){
                                    var a = arguments, i = 0, f, m;

                                    if(!(this instanceof a.callee)){
                                            // not called via new, so force it
                                            return applyNew(a);
                                    }
                                    for(; f = bases[i]; ++i){ // intentional assignment
                                            m = f._meta;
                                            f = m ? m.ctor : f;
                                            if(f){
                                                    f.apply(this, a);
                                                    break;
                                            }
                                    }
                                    // 3) call the postscript
                                    f = this.postscript;
                                    if(f){
                                            f.apply(this, a);
                                    }
                            };
                    }

                    function chain(name, bases, reversed){
                            return function(){
                                    var b, m, f, i = 0, step = 1;
                                    if(reversed){
                                            i = bases.length - 1;
                                            step = -1;
                                    }
                                    for(; b = bases[i]; i += step){ // intentional assignment
                                            m = b._meta;
                                            f = (m ? m.hidden : b.prototype)[name];
                                            if(f){
                                                    f.apply(this, arguments);
                                            }
                                    }
                            };
                    }

                    // forceNew(ctor)
                    function forceNew(ctor){
                            // create object with correct prototype using a do-nothing
                            // constructor
                            xtor.prototype = ctor.prototype;
                            var t = new xtor;
                            xtor.prototype = null;	// clean up
                            return t;
                    }
                    //@chainedConstructor -> @voxo.declare
                    function applyNew(args){
                            var ctor = args.callee, t = forceNew(ctor);
                            // execute the real constructor on the new object
                            ctor.apply(t, args);
                            return t;
                    }
            /**
             * Declare Function
             */
                    d.declare = function(className, superclass, props){
                            // crack parameters
                            if(typeof className != "string"){
                                    props = superclass;
                                    superclass = className;
                                    className = "";
                            }
                            props = props || {};

                            var proto, i, t, ctor, name, bases, chains, mixins = 1, parents = superclass;

                            //@author juan.arribillaga
                            var objectPrototype = Object.prototype.toString;


                            // build a prototype
                            if(objectPrototype.call(superclass) == "[object Array]"){
                                    // C3 MRO
                                    bases = c3mro(superclass, className);
                                    t = bases[0];
                                    mixins = bases.length - t;
                                    superclass = bases[mixins];
                            }else{
                                    bases = [0];
                                    if(superclass){
                                            if(objectPrototype.call(superclass) == "[object Function]"){
                                                    t = superclass._meta;
                                                    bases = bases.concat(t ? t.bases : superclass);
                                            }else{
                                                    err("base class is not a callable constructor.", className);
                                            }
                                    }else if(superclass !== null){
                                            err("unknown base class. Did you required it?", className);
                                    }
                            }
                            if(superclass){
                                    for(i = mixins - 1;; --i){
                                            proto = forceNew(superclass);
                                            if(!i){
                                                    // stop if nothing to add (the last base)
                                                    break;
                                            }
                                            // mix in properties
                                            t = bases[i];
                                            (t._meta ? mixOwn : mix)(proto, t.prototype);
                                            // chain in new constructor
                                            ctor = new Function;
                                            ctor.superclass = superclass;
                                            ctor.prototype = proto;
                                            superclass = proto.constructor = ctor;
                                    }
                            }else{
                                    proto = {};
                            }
                            // add all properties
                            safeMixin(proto, props);
                            // add constructor
                            t = props.constructor;
                            if(t !== op.constructor){
                                    t.nom = cname;
                                    proto.constructor = t;
                            }

                            // collect chains and flags
                            for(i = mixins - 1; i; --i){ // intentional assignment
                                    t = bases[i]._meta;
                                    if(t && t.chains){
                                            chains = mix(chains || {}, t.chains);
                                    }
                            }
                            if(proto["-chains-"]){
                                    chains = mix(chains || {}, proto["-chains-"]);
                            }

                            // build ctor
                            t = !chains || !chains.hasOwnProperty(cname);
                            bases[0] = ctor = (chains && chains.constructor === "manual") ? simpleConstructor(bases) :
                                    (bases.length == 1 ? singleConstructor(props.constructor, t) : chainedConstructor(bases, t));

                            // add meta information to the constructor
                            ctor._meta  = {bases: bases, hidden: props, chains: chains,
                                    parents: parents, ctor: props.constructor};
                            ctor.superclass = superclass && superclass.prototype;
                            ctor.extend = extend;
                            ctor.prototype = proto;
                            proto.constructor = ctor;

                            // add "standard" methods to the prototype
                            proto.getInherited = getInherited;
                            proto.inherited = inherited;
                            proto.isInstanceOf = isInstanceOf;

                            // add name if specified
                            if(className){
                                    proto.declaredClass = className;
                                    d.setObject(className, ctor);
                            }

                            // build chains and add them to the prototype
                            if(chains){
                                    for(name in chains){
                                            if(proto[name] && typeof chains[name] == "string" && name != cname){
                                                    t = proto[name] = chain(name, bases, chains[name] === "after");
                                                    t.nom = name;
                                            }
                                    }
                            }
                            return ctor;	// Function
                    };
                    d.safeMixin = safeMixin;
            })();

        }

        if (!voxo._hasResource["voxo._base"]) {
        voxo._hasResource["voxo._base"] = true;
        voxo.provide("voxo._base");
        }

        if(voxo.isBrowser && (document.readyState === "complete" || voxo.config.afterOnLoad)){
                window.setTimeout(voxo._loadInit, 100);
        }
    })();

    var Class = function(classname, inheritsfrom, functions) {
        return voxo.declare(classname, inheritsfrom, functions);
    };
    return {
        Class: Class
    }
})
