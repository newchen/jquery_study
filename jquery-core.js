;(function (window, undefined) {
	var jQuery = (function () {
		var jQuery = function (selector, context) {
			//就算在外部new jQuery，仍然返回的是jQuery.fn.init对象
			return new jQuery.fn.init(selector, context);
		}

		jQuery.fn = jQuery.prototype = {
			jquery: "1.0",
			init: function (selector, context) {

			},
			selector: ""
			//...  //其它属性或方法
		};

		/*jQuery.fn的作用：作为jQuery.prototype和jQuery.fn.init.prototype的别名，
			1.jQuery.fn名称相比较jQuery.prototype和jQuery.fn.init.prototype更简短一些，
			2.在jQuery中：alert(jQuery.prototype === jQuery.fn.init.prototype);//true
						  alert(jQuery.fn === jQuery.prototype);//true
						  alert(jQuery.fn === jQuery.fn.init.prototype);//true
			3.三者都不对外暴露，因为它们都表示同一个对象的引用，而该对象涉及底层机制，
				但jQuery.fn.extend和jQuery.extend方法对外暴露
			
		*/
		jQuery.fn.init.prototype = jQuery.fn;

		/**
		 	jquery的发展有很大因素是因为它非常易于扩展,究其原因就得益于extend函数
			该函数是一个扩展函数…说是一个扩展函数,其实就是一个浅拷贝和深拷贝的函数而已.
			该函数 确实很强大,而且写的很优雅..
			
			JQuery的extend扩展方法：
      			Jquery的扩展方法extend是我们在写插件的过程中常用的方法，该方法有一些重载原型。
					1，jQuery.extend({...})是给function jQuery添加静态属性或方法。
　　  				2，jQuery().extend({...})是给jQuery对象添加属性或方法。
			==================================================================================
      		一、Jquery的扩展方法原型是:　　　
				extend(dest,src1,src2,src3...);
				它的含义是将src1,src2,src3...合并到dest中,返回值为合并后的dest,
				由此可以看出该方法合并后，是修改了dest的结构的。
				如果想要得到合并的结果却又不想修改dest的结构，可以如下使用：
					var newSrc=$.extend({},src1,src2,src3...)//也就是将"{}"作为dest参数。
				这样就可以将src1,src2,src3...进行合并，然后将合并结果返回给newSrc了。如下例：
					var result=$.extend({},{name:"Tom",age:21},{name:"Jerry",sex:"Boy"})
 				那么合并后的结果
					result={name:"Jerry",age:21,sex:"Boy"}
				也就是说后面的参数如果和前面的参数存在相同的名称，那么后面的会覆盖前面的参数值。
			-------------------------------------------------------------------------------------
      		二、省略dest参数
      			上述的extend方法原型中的dest参数是可以省略的，
      			如果省略了，则该方法就只能有一个src参数，而且是将该src合并到调用extend方法的对象中去，如：
 　　 			
 				1、$.extend(src)
 　　 			该方法就是将src合并到jquery的全局对象中去，如：
					$.extend({
						hello:function(){alert('hello');}
					});
				就是将hello方法合并到jquery的全局对象中。
 　　 			
 				2、$.fn.extend(src)
 　　 			该方法将src合并到jquery的实例对象中去，如:
				$.fn.extend({
					hello:function(){alert('hello');}
				});
 				就是将hello方法合并到jquery的实例对象中。

 　　 			下面例举几个常用的扩展实例：
				$.extend({net:{}});
　　 			这是在jquery全局对象中扩展一个net命名空间。
				
				$.extend($.net,{
					hello:function(){alert('hello');}
				})
				这是将hello方法扩展到之前扩展的Jquery的net命名空间中去。
			-------------------------------------------------------------------------------------
 　　  		三、Jquery的extend方法还有一个重载原型：  
				extend(boolean,dest,src1,src2,src3...)
       			第一个参数boolean代表是否进行深度拷贝，其余参数和前面介绍的一致，什么叫深层拷贝，我们看一个例子：
					var result=$.extend( true, {}, 
						{ name: "John", location: {city: "Boston",county:"USA"}, teacher: {age:23, name:"sady"} }, 
						{ last: "Resig", location: {state: "MA",county:"China"}, student: {grade:"3年级", level:"level"} } 
					);
				第一个深度拷贝参数为true，那么合并后的结果就是： 
 					result={
 						name:"John",
 						last:"Resig",
 						location:{city:"Boston",state:"MA",county:"China"},
 						teacher: {age:23, name:"sady"},
 						student: {grade:"3年级", level:"level"}
 					}
        		也就是说它会将src中的嵌套子对象也进行合并，
        		而如果第一个参数boolean为false，我们看看合并的结果是什么，如下：
					var result=$.extend( false, {}, 
						{ name: "John", location: {city: "Boston",county:"USA"}, teacher: {age:23, name:"sady"} }, 
						{ last: "Resig", location: {state: "MA",county:"China"}, student: {grade:"3年级", level:"level"} } 
					);
      			那么合并后的结果就是:
					result={
						name:"John",
						last:"Resig",
						location:{state:"MA",county:"China"},
						teacher: {age:23, name:"sady"},
 						student: {grade:"3年级", level:"level"}
					}

 				下面我们来看看jQuery中的extend方法的实现源代码：
				　　jQuery.extend = function(){}时，函数体中的this对象指的是function jQuery，因此是在jQuery上添加方法和属性。
				　　jQuery.fn.extend = function(){}时，函数体中的this指的是 jQuery.fn = jQuery.prototype,因此是在原型上添加属性和方法。
		*/ 
		jQuery.extend = jQuery.fn.extend = function() {
			//默认情况下使用的是前面提到的第一种方式：$.extend(dest,src1,src2,src3...);
			//目标对象 
		    var target = arguments[0] || {}, //获取extend传递进来的第一个参数，如果没有,初始化为一个对象.     	      
		    //循环变量,它指向需要复制的第一个对象的位置,默认为1------>第2个参数  
		    //如果传入了deep深度复制参数,则它指向的位置为2  ------>第3个参数
		    i = 1,      	      
		    //实参长度  
		    length = arguments.length,      	      
		    //是否进行深度拷贝，默认不进行深度拷贝，在深度拷贝情况下,会对对象更深层次的属性对象进行合并和覆盖  
		    deep = false,      	      
		    //用于在复制时记录参数对象  
		    options,            
		    //用于在复制时记录对象属性名  
		    name,      	      
		    //用于在复制时记录目标对象的属性值  
		    src,      	      
		    //用于在复制时记录参数对象的属性值  
		    copy;  	      
	  		//如果第一个参数传递过来的是一个bool类型,这个时候用法就是我们前面提到的第三种：$.extend(boolean,dest,src1,src2,src3…)
		    if (typeof target === "boolean") { 
		        //第一个参数判断是否使用深度拷贝方式
		        deep = target;  	          
		        //此时目标对象为第二个实参,如果没有则默认为空对象  
		        target = arguments[1] || {};            
		        //因为有了deep深度复制参数,因此i指向第3个参数
		        i = 2;  
		    }        
		    //当目标对象不是对象且不是函数  target置空  (string 或其他)
		    //这是一种规定,第一个参数要么是bool类型 要么是obj类型.当然在js里 obj类型也包括函数.
		    if (typeof target !== "object" && !jQuery.isFunction(target)) {  	          
		        //设置目标为空对象  
		        target = {};  
		    }  	      
		    /*如果当前参数中只包含一个{Object}  
		    如 $.extend({Object}) 或 $.extend({Boolean}, {Object})  
		    则将该对象中的属性拷贝到当前jQuery对象或实例中  
		    此情况下deep深度复制仍然有效，
		    此时的用法就是前面提到的第二种：1、$.extend(src)   2、$.fn.extend(src)
		    特别注意，此时是将Object对象中的属性拷贝到当前jQuery对象或实例中 */ 
		    if (length === i) {            
		        //target = this;这句代码是整个extend函数的核心  
		        //在这里目标对象被更改,这里的this指向调用者  
		        //在 $.extend()方式中表示jQuery对象本身  
		        //在 $.fn.extend()方式中表示jQuery函数所构造的对象(即jQuery类的实例)  
		        target = this;  	          
		        //自减1(值为0或1),便于在后面的拷贝循环中,可以指向需要复制的对象  
		        --i;  
		    }  	      
		    //循环实参,循环从第1个参数开始,如果是深度复制,则从第2个参数开始  
		    for (; i < length; i++) { //进行复制.变量options是一个临时变量保存当前目标的值. 比如执行 $.extend({},{a:10}); options就等于{a:10} 	          
		        //当前参数不为null,undefined,0,false,空字符串时  
		        //options表示当前参数对象  
		        if ((options = arguments[i]) != null) {           
		            //遍历当前参数对象的属性,属性名记录到name  
		            for (name in options) {  		                  
		                //src用于记录目标对象中的当前属性值  
		                src = target[name];  		                  
		                //copy用于记录参数对象中的当前属性值  
		                copy = options[name];  		                  
		                //如果copy中存在目标对象本身的引用,构成死循环,结束此次遍历  
		                if (target === copy) {  
		                    continue;  
		                }  	                  
		                //如果需要进行深度拷贝,且copy类型为对象或数组  
		                if (deep && copy && (jQuery.isObject(copy) || jQuery.isArray(copy))) {                    
		                    //如果src类型为对象或数组,则clone记录src  
		                    //否则colne记录与copy类型一致的空值(空数组或空对象)  
		                    var clone = src && (jQuery.isObject(src) || jQuery.isArray(src)) ? src : jQuery.isArray(copy) ? [] : {};                     
		                    //对copy迭代深度复制  
		                    target[name] = jQuery.extend(deep, clone, copy);                   
		                    //如果不需要进行深度拷贝  
		                } else if (copy !== undefined) {  		                      
		                    //直接将copy复制给目标对象  
		                    target[name] = copy;
		                }  
		            }  
		        }  
		    }  		      
		    //返回处理后的目标对象  
		    return target;  
		};

		jQuery.fn.extend({//扩展jQuery.fn.init对象的方法，$(selector).method();
			setAttr: function (attr) {//测试函数
				alert(attr);
			}
		});

		jQuery.extend({//扩展jQuery的静态方法,jQuery.method();
			isNull: function (o) {
				return o === null;
			},
			isUndefined: function (o) {
				return typeof o === 'undefined';
			},
			isNumber: function (o) {//console.log(typeof 12 === 'number');//true
				//是number类型 && 是有限数字（或可转换为有限数字:不是NaN（非数字）、正/负无穷大的数），那么返回 true。否则返回 false。
				return typeof o === 'number' && isFinite(o);
			},
			isArray: function(o) {
				return o instanceof Array;
			},
			isBoolean: function (o) {//console.log(typeof false === 'boolean');//true
				return typeof o === 'boolean';
			},
			isFunction: function (o) {//console.log(typeof fun/Function/Array/Date === 'function');//true，(fun为函数，Function/Array/Date为JS内置函数)
				 return typeof o === 'function';
			},
			isObject: function (o) {//使用typeof为object的有：null，数组，对象
				return typeof o === 'object' && !isNull(o) && !(o instanceof Array);
			},
			isString: function (o) {
				return typeof o === 'string';//console.log(typeof 'sds' === 'string'); //true
			}
		});

		return jQuery;
	})();

	window.jQuery = window.$ = jQuery;

})(window);