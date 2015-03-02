# ZY
mine commonly used library



### ZY.ajax

#### dataType

通过 dataType 可以设置接收数据的类型，有以下几种： **text html xml json jsonp script**


以上分两种情况：

在**同域**的情况下

> 在同域的情况下，为了能更好的进行控制，使用以上所有类型，
> 都会采用xmlHttpRequest的形式进行请求的发送和接收，然后中根据dataType
> 的不同类型，对 xmlHttpRequest.responseText 或者 xmlHttpRequest.
> responseXML 处理成相应的格式

在**跨域**的情况下

> dataType 为 text html xml json 的请求仍旧会发送xmlHttpRequest请求 
> 如果浏览器不支持，则会报安全错误，如果浏览器支持，而服务器端没有做相
> 应的处理，也会报错。

> dataType 为 jsonp script 的请求会使用插入
> \<script\>标签的形式。jsonp 会通过创建跟 callback 
> 同名的全局函数，来等待服务器端返回的脚本进行调用。
> script 会通过监控 \<script\>
> 的onload事件来处理服务器端脚本加载后的事情（当然也可以不处理）。
