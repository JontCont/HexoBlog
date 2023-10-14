---
title: C# net5.0 - WSDL 簡易測試
date: 2022-04-02 16:57:24
categories: 
  - 後端技術
  - C#
tags: 
  - C#
  - VSC
description:
keyword: 'C#, WSDL'
cover: /img/dotnet/bg/cs_bg_006_WSDL.png
---
# 前言

近期執行專案時候，常常遇到對方使用的是 WSDL。當時剛入行軟體工程師非常震驚這是甚麼東西，WSDL 如何傳遞、如何使用，直到後期有發現不錯用的工具SoapUI 主要給 WSDL這個使用。接下來會直接讓各位參考如何執行簡易版的WSDL。

最近有製作簡易版本的response 工具，可以提供參考。

## 使用工具、指令
- VSC : [點擊我](https://code.visualstudio.com/)
- 使用 Command : ```dotnet new console -f net5.0```
- Github 參考 : [點擊我](https://github.com/JontCont/dotnetCore_WSDL)
  
## Web服務描述語言，Web Services Description Language
基於 XML 用於 描述 、通訊(訪問) Web Services 的語言。常見相關名稱
- Web Services
- SOAP (Simple Object Access Protocol)
- UDDI (Universal Description, Discovery, and Integration)


# 使用方式
這邊只會使用 請求、回覆。若要看WSDL製作本篇不展示。

## 連線方式
筆者案例是使用xml部分，需要使用 text/xml 才能啟動功能，如果是postman 必須要把 request 更改 ```row``` -> ``` text ``` 才能使用功能。下方要注意幾點。
1. 需要確認 wsdl 是否有開啟 (可使用 SoapUI 測試)
2. 需使用 POST　取得資料 (筆者遇到的案子為例)

下方範例是主要讓 Request 內容可以呈現狀態、訊息。完成後，簡易的版本就完成了。
```cs
    public static class RequestExtension
    {
        //set config
        //example WSDL : http://localhost/jwsdata/services/Data?wsdl
        public static string url = "http://localhost/jwsdata/services/Data?wsdl";
        public static string XmlString = @""; // 輸入要request 內容


        // request result
        public static ResponseResult result { get; set; } =new ResponseResult();
        public class ResponseResult
        {
            public bool status { get; set; } = false;
            public string message { get; set; } = "";
        }


        // request WSDL
        public static async Task<ResponseResult> RequestWSDL()
        {
            //取得當前 html 字串
            HttpClient client = new();
            client
                .DefaultRequestHeaders
                .Accept
                .Add(
                    new MediaTypeWithQualityHeaderValue("text/xml")
                );//ACCEPT header

            try{
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);
                request.Content = 
                    new StringContent(XmlString, Encoding.UTF8, "text/xml");//CONTENT-TYPE header

                HttpResponseMessage response =  await client.SendAsync(request);
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();

                return new ResponseResult{
                    status = true,
                    message = responseBody,
                };

            }catch(Exception ex){
                return new ResponseResult{
                    status = false,
                    message = ex.Message,
                };
            }
        }//RequestWSDL
```

## 加入結果  
```cs
class Program
{
    static async Task Main(string[] args)
    {
        var responseResult = await RequestExtension.RequestWSDL();
        Console.WriteLine($"status : {responseResult.status} , message : {responseResult.message}");
    }

}
```

## 轉換傳輸資料
這邊使用方式僅供參考並非最佳解。使用目的是處理資料時候，需要輸入xml 指定名稱過度麻煩，這邊加入方式class 定義出來，解析內容轉出要得傳輸資料。

處理方式也很簡單，可以透由 replace 字串取代即可產出自動輸入值。如果要產出 class 名稱也是用下方類似做法。
```cs
    public static string Convert<T>(T obj){
        Type t = typeof(T);
        PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(t);
        StringBuilder strBuilder = new StringBuilder();
        foreach (PropertyDescriptor property in properties)
        {
            if (property.GetValue(obj) is null ||string.IsNullOrEmpty(property.GetValue(obj).ToString())) { continue; }
            strBuilder.AppendLine(
                @$"<xsd:{property.Name}>{property.GetValue(obj)}</xsd:{property.Name}>"
            );
        }
        return strBuilder.ToString();
    }
```


## 結論
本文是用快速開發方式建置，可以快速得知功能是否正常。目的是開發方便而已(參考資料)。net5.0 以後有些淘汰型的request、response function用法可能需要參考本文的作法。今天快速建立出 WSDL 環境提供給各位參考， 後續再補充完整 WSDL。




