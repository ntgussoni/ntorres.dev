---
date: 11/05/2020
title: "Send emails through serverless function in Vercel"
description: "How to create a simple serverless function to send emails in 100 lines of code"
image: posts/serverless-email.png
categories:
  - technology
  - serverless
  - vercel
---

If you need to send emails in your personal website, a serverless function will be more than enough.
ntorres.dev is deployed on vercel, which makes it really easy to deploy serverless functions.

In this post we'll create and deploy a serverless function and a simple contact form

Enable access. While it might not seem like the most secure thing to do, it’s required to let Nodemailer use your Gmail account for mailing purposes.

Also, make sure you complete the Captcha Enable challenge, as following only the step above might not give Nodemailer the sufficient permissions.

Finally, if your account has two-factor authentication set up and you don’t want to disable it, you’ll need to create an “application-specific password”.
