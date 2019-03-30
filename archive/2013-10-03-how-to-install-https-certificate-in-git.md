title = "How to Install HTTPS Certificate In Git"
description = "How to Install HTTPS Certificate In Git So I Can Use GoAgent When GitHub Is BLOCKED By GFW"
tags = ["HowTo", "Git", "GoAgent"]
layout = "post"
---

Suppose you want to push to a repo on GitHub. Before you are using SSH to access the repo, but now you are behind a HTTP proxy, and SSH won't work.

##Change Repo URL to HTTPS

**First of all**, you need to config the repo using HTTPS instead of SSH. Using following command:

```bash
git remote set-url origin https://USERNAME@github.com/USERNAME/REPO-NAME.git
```

Notice that the URL is not the one GitHub gives to you at project page like `https://github.com/USERNAME/REPO.git`. If you use this URL, push will fail since it's read-only. Add your `username@` between `https://` and `github.com`.

## Config Proxy

**Next**, is to config your proxy by following command:

```bash
git config --global http.proxy PROXY-ADDRESS
```

_For GoAgent user, the proxy address is `localhost:8087`._

## The SSL Problem

Now, if try to push to repo, you might receive Git reporting error like:

> error: SSL certificate problem, verify that the CA cert is OK.
> Details: error:14090086:SSL
> routines:SSL3_GET_SERVER_CERTIFICATE:certificate verify failed while
> accessing https://github.com/USERNAME/REPO.git/info/refs

This is caused by the proxy cannot support HTTPS encryption(like GoAgent), thus leads to HTTPS verification failure.

### How to Solve?

There are two ways to solve this **SSL problem**:

1. Disable SSL verification of Git. No matter you are in the US or China, this turns out to be the **least desirable** way.  
Even thought GoAgent doesn't support SSL because the limitation of GAE, it's still undesirable to "fully trust the other end". What if you have a proxy support SSL later?  
_So forget it._

2. Use following ways to import the SSL provided by your proxy server.

Last step is to add the certificates of proxy to Git. By open the certificates provided by the proxy in notepad, e.g. CA.crt in GoAgent:

    -----BEGIN CERTIFICATE-----
    MIIDUjCCAjoCAQAwDQYJKoZIhvcNAQEFBQAwbzEVMBMGA1UECxMMR29BZ2VudCBS
    ...
    -----END CERTIFICATE-----

Copy it, and paste to the end of file `Git\ssl\certs\cacert.pem`. (You can also import the CA by copy-paste on Linux if you know the CA Git use)

Done! Now you should be able to push to your GitHub repo using the HTTP proxy.
