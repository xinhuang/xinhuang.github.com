---
layout: post
title: "How to Config GoAgent For SBT"
description: ""
category: 
tags: [HowTo, GoAgent, SBT]
---
{% include JB/setup %}

## Proxy Setting For SBT

SBT proxy configuration is supported through Java options. Passing Java following definitions:

    -Dhttp.proxyHost=yourserver 
    -Dhttp.proxyPort=8080 
    -Dhttp.proxyUser=username 
    -Dhttp.proxyPassword=password

### Windows

    set JAVA_OPTS="%JAVA_OPTS% -Dhttp.proxyHost=localhost -Dhttp.proxyPort=8087"

### Linux like system:

    export JAVA_OPTS="$JAVA_OPTS -Dhttp.proxyHost=localhost -Dhttp.proxyPort=8087"

Then run `sbt`, and it will use the proxy.

## OpenSSL

### Windows

No need, as long as you installed GoAgent CA into system.
    
### Linux

After configuring SBT, you might observe in GoAgent log, all pom URLs tried by sbt returns HTTP 404, even the file exists.    
When try to `wget www.google.com` via GoAgent, GoAgent reports it's because SSL failure.  

Since GoAgent is using OpenSSL, we need to import GoAgent certificate into OpenSSL.    
Using following command:

    openssl x509 -noout -hash -in <GoAgent/local/CA.crt>
    
After that HTTP 404 should disappear.

Also turning off HTTPS in proxy.ini works.
