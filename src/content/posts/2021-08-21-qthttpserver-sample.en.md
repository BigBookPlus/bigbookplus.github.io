---
title: "2021-08-21-qthttpserver-sample"
description: "假设[http://127.0.0.1:8888/post/](http://127.0.0.1:8888/post/)是一个能够接受POST请求的路径，我们想要向它提交一段json数据，用Qt可以这样实现："
date: 2021-08-21
lang: en
slug: "qthttpserver-sample"
tags: ["C-Cpp", "Qt", "QtHttpServer", "CMake", "Http POST"]
featured: false
draft: false
---

## Client HTTP POST

假设[http://127.0.0.1:8888/post/](http://127.0.0.1:8888/post/)是一个能够接受POST请求的路径，我们想要向它提交一段json数据，用Qt可以这样实现：

Suppose we want to make an HTTP POST with json body to [http://127.0.0.1:8888/post/](http://127.0.0.1:8888/post/).

```cpp
QCoreApplication app(argc, argv);
QNetworkAccessManager *mgr = new QNetworkAccessManager;
const QUrl url(QStringLiteral("http://127.0.0.1:8888/post/"));
QNetworkRequest request(url);
request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json; charset=utf-8");
QJsonObject obj;
obj["key1"] = "value1";
obj["key2"] = "value2";
QJsonDocument doc(obj);
QByteArray data = doc.toJson();
QNetworkReply *reply = mgr->post(request, data);

QObject::connect(reply, &QNetworkReply::finished, [=](){
    if(reply->error() == QNetworkReply::NoError){
        QString contents = QString::fromUtf8(reply->readAll());
        qDebug() << contents;
    }
    else{
        QString err = reply->errorString();
        qDebug() << err;
    }
    reply->deleteLater();
    mgr->deleteLater();
});
```

## Http Server

而这个本地的Server，亦可使用QtHttpServer方便实现：

Server can be implemented by QtHttpServer easily, too.

```cpp
QHttpServer http_server;
http_server.route("/", []() {
return "Hello QtHttpServer";
});
http_server.route("/post/", QHttpServerRequest::Method::POST,
[](const QHttpServerRequest &request)
{
    qDebug() << "received requestBody" << request.body();
    return QJsonObject
    {
    {"message", "finish"}
    };
});
http_server.listen(QHostAddress::Any, 8888);
```

## Code is available

Please refer to my project: [qthttpserver-sample-with-client](https://github.com/BigBookPlus/qthttpserver-sample-with-client.git)

## Reference

[How to send a POST request in Qt with the JSON body](https://stackoverflow.com/questions/60107604/how-to-send-a-post-request-in-qt-with-the-json-body)

[qt-labs/qthttpserver](https://github.com/qt-labs/qthttpserver)
