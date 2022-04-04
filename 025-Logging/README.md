# Logging
It's not glamorous, but it's an essential part of any robust application.  We'll want to know how many requests/users we're servicing, be able to research problems, and generally assess the health of the system.  You might also run into security and auditing requirements that dictate what you should log for compliance purposes.  It's rare that someone will complain about having too many logs, though if you're generating them then you'll need to store them somewhere.  That can get a bit costly depending on how you do it and how long you store them for.  So, more logs is not always better but they are more helpful if you have a way to search them.

## Log Formats
So far we've just logged plain human readable strings.  While this is "fine" and suitable for providing information to users, it doesn't scale very well and can be hard to search.  A better idea is to log key value pairs, or JSON, because it's easy to parse by tools and therefore can be made easily searchable based on fields.  You should always include the date/time, log level, and relevant information in your logs.  What information is relevant depends on the application but in the web service realm that's usually something like method, requestId, user, IP address, route, environment, response time, status code, "message", etc.

## Log Levels
The global `console` object gives us four log levels : 
1. debug
2. info
3. warn
4. error

They are pretty much how they sound.  `debug` level should be used for verbose logging that you would only use in a development or testing scenario, never in production.  `info` level, which `console.log()` defaults to, should be used for informational messages.  `warn` should be used for potentially bad things such as logging that an exception occurred and was handled, or that something wasn't quite right and your logic did it's best with what it had.  `error` is for... errors.  When something goes horribly wrong and your logic has no way to fix it, `error` is the correct level to be logging at.  

## Winston
Winston is a logging framework that goes far beyond what `console` can do.  It introduces more logging levels, supports multiple "transports", and is easily configurable / extensible.  Winston natively supports the following log levels but you could add your own : 
1. silly
2. debug
3. verbose
4. http
5. info
6. warn
7. error

These follow the same general hierarchy as `console` but are a bit finer scoped.

It also allows you to create a standard logging template rather than having to remember to always output your logs in the same format.  Another convenient feature is built in log rotation with the `winston-daily-rotate-file` package.

## To console or not to console?
So the question is, do you actually need Winston?  Maybe, maybe not.  For small projects it is probably overkill and just more dependency bulk.  For larger projects it will allow you to enforce a consistent log format and it provides a lot of niceties that you would otherwise need to implement yourself.

## Log Rotation
In any long running application you're going to find the need for log file rotation.  This is simply writing to a new file at predetermined times.  Rotating the log file daily is pretty common but very high usage, or particularly chatty, applications might benefit from hourly rotation.  You should always include the date and/or timestamp in your rotated log file names.  For example, `application.2021-05-13.log` for daily or `application.2021-05-13T15:00.log`

Rotating log files at an appropriate interval keeps each file smaller which allows for easier research and transfers.

## What should you log?
More importantly, what should you not log?  We talked about common log fields for web services above.  The exact fields you need to log will vary based on the application but information that *shouldn't* be logged is pretty consistent.  While usually not true, you should treat your logs as if they were publicly available.  Because of that, you should never log sensitive information like passwords, tokens, API keys, secrets, encryption keys, etc.  In some situations it might even be recommended to avoid logging server names and IP addresses that could allow an attacker to enumerate your network.


## Log Management Tools
There are multiple tools that can help you search and analyze your log files.  The three most common are probably the [ELK Stack](https://www.elastic.co/what-is/elk-stack) (Elasticsearch, Logstash, and Kibana), [DataDog](https://www.datadoghq.com/), and [Splunk](https://www.splunk.com/).  They all fill the same basic need but have different interfaces and requirements.

## Performance
With something as simple and integral as logging, performance is often overlooked.  One important thing to keep in mind is that even if your logger is set to info level or higher, it still has to process debug statements and determine whether or not to output them.  Just because your log level excludes lower level events from output, it doesn't mean that those statements are ignored.

Your logger also might be a good candidate for use as a global singleton.  By creating a single instance and sharing it across your entire application you can reduce overhead and memory usage.

